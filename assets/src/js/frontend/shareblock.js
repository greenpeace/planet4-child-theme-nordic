//Shared blocks pattern
// shared-blocks.js
window.addEventListener('DOMContentLoaded', () => {
  pathnameUrl();

  function pathnameUrl() {
    const country = window.location.pathname.split('/')[1];
    const pageUrl = window.location.origin + window.location.pathname;
    let copyLabel = '';
    let copiedLabel = '';
    let whatsappMessage = '';

    switch (country) {
      case 'denmark':
        copyLabel = 'Kopier link';
        copiedLabel = 'Link kopieret';
        whatsappMessage =
          'Jeg har lige skrevet under. Vil du også være med?\n\n';
        break;

      case 'finland':
        copyLabel = 'Kopioi linkki';
        copiedLabel = 'Linkki kopioitu';
        whatsappMessage =
          'Allekirjoitin juuri tämän vetoomuksen. Liity mukaan!\n\n';
        break;

      case 'norway':
        copyLabel = 'Kopier lenke';
        copiedLabel = 'Lenke kopiert';
        whatsappMessage =
          'Jeg har nettopp signert denne kampanjen. Vil du også signere?\n\n';
        break;

      case 'sweden':
        copyLabel = 'Kopiera länk';
        copiedLabel = 'Länken kopierad';
        whatsappMessage =
          'Jag har precis skrivit under uppropet.\n\nHoppas du också vill skriva under!\n\n';
        break;

      default:
        copiedLabel = 'Link copied';
        copyLabel = 'Copy link';
        whatsappMessage = 'I just signed, would you join me too?';
        break;
    }

    function pushShareEvent(channel) {
      window.dataLayer = window.dataLayer || [];

      window.dataLayer.push({
        event: "uaevent",
        eventCategory: "Reusable Share Block",
        eventAction: channel,
      });
    }

    async function copyText(text) {
      await navigator.clipboard.writeText(text);
    }

    //
    // Copy button
    //
    document.querySelectorAll('.gp-share-copy .wp-block-button__link').forEach(link => {

      link.textContent = copyLabel;
      link.href = '#';

      link.addEventListener('click', async (e) => {
        e.preventDefault();

        await copyText(pageUrl + '?utm_source=copy_link&utm_medium=share_button');
        pushShareEvent('copy link');

        link.classList.add('is-copied');
        link.textContent = copiedLabel;

        setTimeout(() => {
          link.classList.remove('is-copied');
          link.textContent = copyLabel;
        }, 2000);
      });
    });

    //
    // WhatsApp
    //
    document
      .querySelectorAll('.gp-share-whatsapp .wp-block-button__link')
      .forEach(link => {

        const shareBlock = link.closest('.share-block__buttons');
        let message = whatsappMessage; // default translation
        const customMessage = shareBlock?.querySelector('.share-message');

        if (customMessage) {
          const text = customMessage.textContent.trim();

          if (text.length) {
            message = text;
          }
        }

        //console.log(message);

        link.href =
          'https://api.whatsapp.com/send?text=' +
          encodeURIComponent(message + '\n\n' + pageUrl + '?utm_source=whatsapp&utm_medium=share_button');

        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        link.addEventListener('click', () => {
          pushShareEvent('whatsapp');
        });
      });

    //
    // LinkedIn
    //
    document.querySelectorAll('.gp-share-linkedin .wp-block-button__link').forEach(link => {
      link.href =
        'https://www.linkedin.com/sharing/share-offsite/?url=' +
        encodeURIComponent(pageUrl + '?utm_source=linkedin&utm_medium=share_button');
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.addEventListener('click', () => {
        pushShareEvent('linkedin');
      });
    });

    //
    // Facebook
    //
    document.querySelectorAll('.gp-share-facebook .wp-block-button__link').forEach(link => {
      link.href =
        'https://www.facebook.com/sharer/sharer.php?u=' +
        encodeURIComponent(pageUrl + '?utm_source=facebook&utm_medium=share_button');
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.addEventListener('click', () => {
        pushShareEvent('facebook');
      });
    });
  }
});
