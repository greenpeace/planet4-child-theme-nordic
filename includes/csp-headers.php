<?php

/**
 * Update the CSP rules 
 */

add_action('wp_headers', function ($headers): array {

    $headers['Content-Security-Policy'] .= "; worker-src 'self' blob: * data: *; connect-src 'self' https://convert.com https://app.convert.com https://convertexperiments.com https://cdn-4.convertexperiments.com";
    return $headers;
    
}, 11, 1);
