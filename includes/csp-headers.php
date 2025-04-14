<?php

/**
 * Update the CSP rules and allow the load of blob objects
 */

add_action('wp_headers', function ($headers): array {
    // Modify Content-Security-Policy
    if (isset($headers['Content-Security-Policy'])) {
        //whitelist the app.convert.com domain
        $headers['Content-Security-Policy'] .= " connect-src 'self' blob: data: https://app.convert.com;";
    }
    return $headers;
}, 11, 1);