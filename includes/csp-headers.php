<?php

/**
 * Update the CSP rules 
 */

add_action('wp_headers', function ($headers): array {

    $headers['Content-Security-Policy'] .= "; worker-src 'self'; connect-src 'self' convert.com app.convert.com convertexperiments.com cdn-4.convertexperiments.com";

    return $headers;
}, 11, 1);
