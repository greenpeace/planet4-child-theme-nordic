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
      script.addEventListener('load', () => setTimeout(callback, 50));
    } else {
    //   console.error('IRaiserFrame.js not found!');
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  onIRaiserReady(() => {
    // console.log('iRaiser script fully loaded and ready');
    window.IRaiserFrame.processAnchors();

    // Handle native form
    const nativeAnchor = document.querySelector('#iraiser_native a');
    if (nativeAnchor) {
      window.IRaiserFrame.transformToIframe(nativeAnchor, 'native');

      // Delay to allow iframe to be inserted
      setTimeout(() => {
        const iframe = document.querySelector('#iraiser_native iframe');
        if (!iframe || !iframe.contentWindow) {
        //   console.warn('Native iframe not yet available for postMessage');
          return;
        }

        function saveUtmParamsToLocalStorage() {
          const params = new URLSearchParams(window.location.search);
          ['utm_medium', 'utm_campaign', 'utm_content', 'utm_source'].forEach(key => {
            const value = params.get(key);
            if (value) {
              localStorage.setItem(`gtm_${key}`, value);
            }
          });
        }

        saveUtmParamsToLocalStorage();

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

        // console.log('👋 Parent: posting message to iframe:', message);
        iframe.contentWindow.postMessage(message, 'https://lahjoita.greenpeace.org');
      }, 500);
    }

    // Handle popup form
    const popinAnchor = document.querySelector('#iraiser_popin a');
    if (popinAnchor) {
      window.IRaiserFrame.setupPopinIframes(popinAnchor, 'popin');
    }
  });
});
