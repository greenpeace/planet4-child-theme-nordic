// Import the original CookiesFrontend component
import { CookiesFrontend } from '../../../../../../plugins/planet4-plugin-gutenberg-blocks/assets/src/blocks/Cookies/CookiesFrontend';

// Override the updateConsent function from the plugin
const originalUpdateConsent = CookiesFrontend.prototype.updateConsent;

// Extend the original updateConsent function
CookiesFrontend.prototype.updateConsent = function(key, granted) {
    // Call the original updateConsent function from the plugin
    originalUpdateConsent.call(this, key, granted);

    // Add ad_personalization and ad_user_data to the consent keys
    if (!this.consentKeys.includes('ad_personalization')) {
        this.consentKeys.push('ad_personalization');
    }
    if (!this.consentKeys.includes('ad_user_data')) {
        this.consentKeys.push('ad_user_data');
    }

    // Update consent for ad_personalization and ad_user_data based on ad_storage
    if (key === 'ad_storage') {
        const state = granted ? 'granted' : 'denied';
        this.updateConsent('ad_personalization', state);
        this.updateConsent('ad_user_data', state);
    }

    // Push consent update event to dataLayer
    dataLayer.push({
        event: 'updateConsent',
        [key]: granted ? 'granted' : 'denied',
    });

    if (!ENABLE_GOOGLE_CONSENT_MODE) {
        return;
    }

    // Update consent for the provided key
    gtag('consent', 'update', {
        [key]: granted ? 'granted' : 'denied',
    });
};