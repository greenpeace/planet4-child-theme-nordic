// Import the original CookiesFrontend component
import { CookiesFrontend } from '../../../../../../plugins/planet4-plugin-gutenberg-blocks/assets/src/blocks/Cookies/CookiesFrontend';

// Override the updateConsent function
const originalUpdateConsent = CookiesFrontend.prototype.updateConsent;

// Extend the original updateConsent function
CookiesFrontend.prototype.updateConsent = function(key, granted) {
    // Call the original updateConsent function
    originalUpdateConsent.call(this, key, granted);

    // Add the 2 new consent keys if they don't exist
    if (!this.consentKeys.includes('ad_personalization')) {
        this.consentKeys.push('ad_personalization');
    }
    if (!this.consentKeys.includes('ad_user_data')) {
        this.consentKeys.push('ad_user_data');
    }

    // Log and push consent status for the 2 new keys
    if (granted) {
        console.log('Consent granted.');
        dataLayer.push({
            event: 'updateConsent',
            ad_personalization: 'granted',
            ad_user_data: 'granted'
        });
    } else {
        console.log('Consent denied.');
        dataLayer.push({
            event: 'updateConsent',
            ad_personalization: 'denied',
            ad_user_data: 'denied'
        });
    }

    // Update consent for the provided key
    if (ENABLE_GOOGLE_CONSENT_MODE) {
        gtag('consent', 'update', {
            [key]: granted ? 'granted' : 'denied',
        });
    }
};