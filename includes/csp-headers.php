<?php

/**
 * Update the CSP rules 
 */

add_action('wp_headers', function ($headers): array {
    $headers['Content-Security-Policy'] = "default-src * 'self' data: 'unsafe-inline' 'unsafe-eval' blob: *.greenpeace.org *.convert.com *.convertexperiments.com *.iraiser.com lahjoita.greenpeace.org www.planet4.test; frame-ancestors 'self'";
    $headers['X-Content-Security-Policy'] = $headers['Content-Security-Policy'];
    return $headers;
}, 11, 1);
