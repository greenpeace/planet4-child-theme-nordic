<?php

/**
 * Update the CSP rules 
 */

add_action('wp_headers', function ($headers): array {
    $new_sources = [
        "https://convert.com",
        "https://app.convert.com",
        "https://convertexperiments.com",
        "https://cdn-4.convertexperiments.com"
    ];

    if (isset($headers['Content-Security-Policy'])) {
        // No connect-src found, add it safely and inclue what's already whitelisted
        if (strpos($headers['Content-Security-Policy'], 'connect-src') === false) {
            $headers['Content-Security-Policy'] .= '; connect-src ' . implode(' ', $new_sources) . ';';
        } else {
            // If connect-src is already present, replace it with the new sources
            $headers['Content-Security-Policy'] = preg_replace('/connect-src [^;]+/', 'connect-src ' . implode(' ', $new_sources), $headers['Content-Security-Policy']);
        }
    }

    return $headers;
}, 11, 1);
