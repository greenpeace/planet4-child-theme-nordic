<?php

/**
 * Update the CSP rules 
 */

add_action('wp_headers', function ($headers): array {

    $headers['Content-Security-Policy'] = "
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval'
            https://*.iraiser.eu https://*.convert.com https://*.greenpeace.org https://*.fontawesome.com;
        style-src 'self' 'unsafe-inline' https://*.greenpeace.org https://*.convert.com https://*.fontawesome.com;
        img-src 'self' data: blob: https://*.greenpeace.org https://*.convert.com https://*.iraiser.eu;
        font-src 'self' data: https://*.fontawesome.com https://*.convert.com;
        connect-src 'self'
            https://*.convert.com
            https://*.iraiser.eu
            https://*.greenpeace.org
            https:;
        frame-src
            https://*.iraiser.eu
            https://*.convert.com
            https://*.greenpeace.org
            https:;
        frame-ancestors 'self';
";
    $headers['X-Content-Security-Policy'] = $headers['Content-Security-Policy'];
    return $headers;
}, 11, 1);
