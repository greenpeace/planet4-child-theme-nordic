<?php

/**
 * Update the CSP rules 
 */

add_action('wp_headers', function ($headers): array {

    $headers['Content-Security-Policy'] = "default-src * 'self' data: 'unsafe-inline' 'unsafe-eval' blob: *.convert.com *.convertexperiments.com *.iraiser.com; frame-ancestors 'self'";
    return $headers;

}, 11, 1);
