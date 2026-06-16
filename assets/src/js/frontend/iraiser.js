// Frontend script for iRaiser integration
// Version: 1.1.0
window.addEventListener("message", function (event) {

  if (!event.data?.iframeHeight) {
    return;
  }

  const iframe = document.querySelector(".iraiser_native");

  if (!iframe) {
    console.warn('⚠️ iraiser: iframe not found for height update');
    return;
  }

  console.log(
    `📏 iraiser: resizing iframe to ${event.data.iframeHeight}px`,
    iframe
  );

  iframe.style.height = event.data.iframeHeight + "px";
});
// Frontend script for iRaiser integration
try {
  // ✅ Disable in admin/editor
  if (
    window.location.href.includes('/wp-admin') ||
    window.location.href.includes('action=edit')
  ) {
    console.log('🧩 iraiser: Script disabled in WP admin/editor.');
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      // ✅ Detect iRaiser elements early and exit if none found
      document.querySelectorAll('a[href*="#iraiser_native"], a[href*="#iraiser_popin"]')
        .forEach(link => {

          const url = new URL(link.href, window.location.origin);

          if (url.hash === '#iraiser_native') {
            link.classList.add('iraiser_native');

            console.log('✅ native trigger detected', link);
          }

          if (url.hash === '#iraiser_popin') {
            link.classList.add('iraiser_popin');

            console.log('✅ popin trigger detected', link);
          }
        });

      // Use classes instead of ids
      const nativeAnchor = document.querySelector('.iraiser_native');
      const popinAnchor = document.querySelector('.iraiser_popin');

      if (!nativeAnchor && !popinAnchor) {
        console.log('🧩 iraiser: No iRaiser handles found — skipping script.');
        return;
      }

      console.log('🚀 iraiser: Found iRaiser handle(s) on page — initializing...');

      // ✅ Allowed origins for child message
      const ALLOWED_ORIGINS = [
        'https://lahjoita.greenpeace.org',
        'https://stoet.greenpeace.org',
        'https://bidra.greenpeace.org',
        'https://stod.greenpeace.org'
      ];

      // ✅ Wait for iRaiser script to become ready
      function onIRaiserReady(callback) {
        const MAX_ATTEMPTS = 200; // 20 seconds total
        let attempts = 0;

        const checkReady = () => {
          if (
            window.IRaiserFrame &&
            (typeof window.IRaiserFrame.setupNativeIframe === 'function' ||
              typeof window.IRaiserFrame.setupPopinIframes === 'function')
          ) {
            console.log(`✅ iraiser: IRaiserFrame available (after ${attempts + 1} attempt${attempts > 0 ? 's' : ''})`);
            callback();
            return;
          }

          if (++attempts < MAX_ATTEMPTS) {
            setTimeout(checkReady, 100);
          } else {
            console.error('❌ iraiser: IRaiserFrame.js never loaded.');
          }
        };

        checkReady();
      }

      // ✅ Main initialization
      onIRaiserReady(() => {
        console.log('✅ iraiser: iRaiser script ready — processing anchors...');
        window.IRaiserFrame.processAnchors();

        if (nativeAnchor) {
          console.log('🔹 iraiser: Transforming native anchor to iframe');
          window.IRaiserFrame.transformToIframe(nativeAnchor, 'native');
        }

        if (popinAnchor) {
          console.log('🔹 iraiser: Setting up popin iframe');
          window.IRaiserFrame.setupPopinIframes(popinAnchor, 'popin');
        }

        // ✅ Listen for child messages (only from allowed origins)
        window.addEventListener('message', (event) => {
          if (!ALLOWED_ORIGINS.includes(event.origin)) {
            console.warn('⚠️ iraiser: Message from untrusted origin:', event.origin);
            return;
          }

          if (event.data?.type === 'childReady') {
            console.log(`✅ iraiser: childReady received from ${event.origin}`);
            sendUTMtoIframe(event.source, event.origin);
          }
        });

        // ✅ Send data to child iframe
        function sendUTMtoIframe(targetWindow, origin) {
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

          console.log(`📤 iraiser: Sending UTM data to iframe (${origin}):`, message);
          targetWindow.postMessage(message, origin);
        }
      });
    });
  }

} catch (err) {
  console.warn('⚠️ iraiser: Script failed silently:', err);
}