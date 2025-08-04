<?php

/**
 * Update the CSP rules 
 */

add_action('wp_headers', function ($headers): array {
    $headers['Content-Security-Policy'] = "default-src 'self' data: blob: *; script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https://*.greenpeace.org https://*.convert.com https://*.convertexperiments.com http://*.convertexperiments.com https://*.iraiser.com https://*.fontawesome.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.greenpeace.org https://*.convert.com https://*.fontawesome.com; font-src 'self' data: https://fonts.gstatic.com https://*.fontawesome.com https://*.greenpeace.org; img-src 'self' data: blob: https://*.greenpeace.org https://*.convert.com https://*.iraiser.com https://cdnjs.cloudflare.com https://*.gravatar.com https://lh3.googleusercontent.com; connect-src 'self' https: http: wss: ws: https://*.convert.com https://*.iraiser.com https://*.greenpeace.org; frame-src 'self' https://*.convert.com https://*.convertexperiments.com http://*.convertexperiments.com https://*.iraiser.com https://*.greenpeace.org; frame-ancestors 'self';";
    $headers['X-Content-Security-Policy'] = $headers['Content-Security-Policy'];
    return $headers;
}, 11, 1);
