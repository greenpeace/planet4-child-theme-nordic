<?php

/**
 * Update the CSP rules and allow the load of blob objects
 */

add_action('wp_headers', function ($headers): array {
    // Modify Content-Security-Policy
    if (isset($headers['Content-Security-Policy'])) {
        $headers['Content-Security-Policy'] .= "; worker-src 'self' blob: * data: *;";
    }
    return $headers;
}, 11, 1);