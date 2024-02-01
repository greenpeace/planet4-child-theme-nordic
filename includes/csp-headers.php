<?php

/**
 * Update the CSP rules and allow the load of blob objects
 */

add_action('wp_headers', function ($headers): array {
    if (empty($headers['Content-Security-Policy'])) {
        return $headers;
    }
    $headers['Content-Security-Policy'] .= "; worker-src 'self' blob: * data: *; frame-ancestors 'self' www.greenpeace.rocks;";
    return $headers;
}, 11, 1);