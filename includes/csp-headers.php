<?php

/**
 * Update the CSP rules and allow the load of blob objects
 */

 add_action('wp_headers', function ($headers): array {
    $headers['Content-Security-Policy'] = implode(' ', [
        "default-src 'self';",
        "connect-src 'self' blob: data: https://app.convert.com;",
        "worker-src 'self' blob:;",
        "frame-ancestors 'self';"
    ]);
    return $headers;
}, 11, 1);
