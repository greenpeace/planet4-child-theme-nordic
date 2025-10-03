try {
  // Prevent running in WP admin/editor
  if (!window.location.href.includes('/wp-admin') && !window.location.href.includes('action=edit')) {

    document.addEventListener('DOMContentLoaded', function () {

      function onIRaiserReady(callback) {
        const MAX_ATTEMPTS = 200; // 20 seconds total
        let attempts = 0;

        const checkReady = () => {
          if (
            window.IRaiserFrame &&
            (typeof window.IRaiserFrame.setupNativeIframe === 'function' ||
             typeof window.IRaiserFrame.setupPopinIframes === 'function')
          ) {
            console.log('✅  iraiser: IRaiserFrame available');
            //console log on which attempt it was found
            console.log(` iraiser: IRaiserFrame found after ${attempts + 1} attempt(s)`);
            callback();
            return;
          }

          if (++attempts < MAX_ATTEMPTS) {
            setTimeout(checkReady, 100);
          } else {
            console.log(` iraiser: IRaiserFrame not found after ${attempts} attempt(s)`);
            console.error('❌ iraiser: IRaiserFrame.js never loaded.');
          }
        };

        checkReady();
      }

      onIRaiserReady(() => {
        console.log('✅  iraiser: iRaiser script fully loaded and ready');
        window.IRaiserFrame.processAnchors();

        const nativeAnchor = document.querySelector('#iraiser_native a');
        const popinAnchor = document.querySelector('#iraiser_popin a');

        if (nativeAnchor) window.IRaiserFrame.transformToIframe(nativeAnchor, 'native');
        if (popinAnchor) window.IRaiserFrame.setupPopinIframes(popinAnchor, 'popin');

        // --- Wait for childReady from iframe ---
        window.addEventListener('message', (event) => {
          if (
            event.origin === 'https://lahjoita.greenpeace.org' &&
            event.data?.type === 'childReady'
          ) {
            console.log('✅ iraiser: childReady received from:', event.origin);
            sendUTMtoIframe(event.source);
          }
        });

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

          console.log('📤 iraiser: Sending UTM data to iframe:', message);
          targetWindow.postMessage(message, 'https://lahjoita.greenpeace.org');
        }

      });

    });

  } else {
    console.log('🧩 iraiser: iRaiser script disabled in WP admin/editor.');
  }

} catch (err) {
  console.warn('iraiser: iRaiser script failed silently:', err);
}