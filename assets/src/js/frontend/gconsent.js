// Import the original CookiesFrontend component
import { CookiesFrontend } from '../../../../../../plugins/planet4-plugin-gutenberg-blocks/assets/src/blocks/Cookies/CookiesFrontend';

// Override the updateConsent function from the plugin
const originalUpdateConsent = CookiesFrontend.prototype.updateConsent;

// Extend the original updateConsent function
CookiesFrontend.prototype.updateConsent = function(key, granted) {
    // Call the original updateConsent function from the plugin
    originalUpdateConsent.call(this, key, granted);

    // Update additional consent keys and values
    if (key === 'ad_personalization' || key === 'ad_user_data') {
        if (granted) {
            console.log(`${key} consent granted.`);
            dataLayer.push({
                event: 'updateConsent',
                [key]: 'granted',
            });
        } else {
            console.log(`${key} consent denied.`);
            dataLayer.push({
                event: 'updateConsent',
                [key]: 'denied',
            });
        }
    }

    if (!ENABLE_GOOGLE_CONSENT_MODE) {
        return;
    }

    // Update consent for the provided key
    gtag('consent', 'update', {
        [key]: granted ? 'granted' : 'denied',
    });
};
