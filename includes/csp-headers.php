<?php

/**
 * Update the CSP rules and allow the load of blob objects
 */

add_action('wp_headers', function ($headers): array {
    // Modify Content-Security-Policy
    if (isset($headers['Content-Security-Policy'])) {
        $headers['Content-Security-Policy'] .= "; worker-src 'self' blob: * data: *; frame-ancestors 'self' www.greenpeace.rocks;";
    }

    // Modify X-Frame-Options
    if (isset($headers['X-Frame-Options']) && $headers['X-Frame-Options'] === 'SAMEORIGIN') {
        // Change SAMEORIGIN to whatever is needed, e.g., 'ALLOW-FROM https://www.greenpeace.rocks/'
        $headers['X-Frame-Options'] = 'ALLOW-FROM https://www.greenpeace.rocks/';
    }    
    return $headers;
}, 11, 1);