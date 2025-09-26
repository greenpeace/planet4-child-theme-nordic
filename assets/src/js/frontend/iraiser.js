function onIRaiserReady(callback) {
  if (
    window.IRaiserFrame &&
    (typeof window.IRaiserFrame.setupNativeIframe === 'function' ||
     typeof window.IRaiserFrame.setupPopinIframes === 'function')
  ) {
    callback();
  } else {
    const script = document.querySelector('script[src*="IRaiserFrame.js"]');
    if (script) {
      script.addEventListener('load', () => {
        console.log('IRaiserFrame.js loaded, running callback as fallback');
        callback();
      });
    } else {
      console.error('IRaiserFrame.js not found!');
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  onIRaiserReady(() => {
    console.log('iRaiser script fully loaded and ready');
    window.IRaiserFrame.processAnchors();

    const nativeAnchor = document.querySelector('#iraiser_native a');
    const popinAnchor = document.querySelector('#iraiser_popin a');

    // --- Initialize forms ---
    let nativeIframe, popinIframe;

    if (nativeAnchor) {
      nativeIframe = window.IRaiserFrame.transformToIframe(nativeAnchor, 'native');
      setupIframeReady(nativeIframe);
    }

    if (popinAnchor) {
      popinIframe = window.IRaiserFrame.setupPopinIframes(popinAnchor, 'popin');
      // popup iframe might not exist until button click
      setupPopupListener(popinAnchor);
    }

    // --- Shared childReady listener ---
    window.addEventListener('message', (event) => {
      if (event.origin === 'https://lahjoita.greenpeace.org' && event.data?.type === 'childReady') {
        console.log('✅ childReady received from:', event.origin);
        sendUTMtoIframe(event.source);
      }
    });

    // --- Failsafe: poll iframe existence and send UTMs if childReady never arrives ---
    function setupIframeReady(iframe) {
      if (!iframe) return;

      let attempts = 0;
      const maxAttempts = 20;
      const interval = setInterval(() => {
        if (iframe.contentWindow) {
          console.warn('⚠️ childReady not received, sending fallback UTMs');
          sendUTMtoIframe(iframe.contentWindow);
          clearInterval(interval);
        } else if (++attempts >= maxAttempts) {
          clearInterval(interval);
          console.error('⚠️ iframe never became ready for UTMs');
        }
      }, 50); // check every 50ms
    }

    // --- For popups: wait for user click to insert iframe ---
    function setupPopupListener(anchor) {
      anchor.addEventListener('click', () => {
        // small delay to let iframe insert
        setTimeout(() => {
          const iframe = anchor.closest('#iraiser_popin').querySelector('iframe');
          setupIframeReady(iframe);
        }, 50);
      });
    }

    // --- Send UTM function ---
    function sendUTMtoIframe(targetWindow) {
      if (!targetWindow) return;

      const params = new URLSearchParams(window.location.search);
      ['utm_medium', 'utm_campaign', 'utm_content', 'utm_source'].forEach(key => {
        const value = params.get(key);
        if (value) localStorage.setItem(`gtm_${key}`, value);
      });

      const message = {
        type: 'parentPageInit',
        parentUrl: window.location.href,
        localStorageData: {
          gtm_timestamp: localStorage.getItem('gtm_timestamp'),
          gtm_utm_medium: localStorage.getItem('gtm_utm_medium'),
          gtm_utm_campaign: localStorage.getItem('gtm_utm_campaign'),
          gtm_utm_content: localStorage.getItem('gtm_utm_content'),
          gtm_utm_source: localStorage.getItem('gtm_utm_source')
        }
      };

      console.log('👋 Sending UTM data to iframe:', message);
      targetWindow.postMessage(message, 'https://lahjoita.greenpeace.org');
    }
  });
});
