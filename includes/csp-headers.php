<?php

/**
 * Update the CSP rules 
 */

 add_action('wp_headers', function ($headers): array {
    $new_sources = [
        "https://convert.com",
        "https://app.convert.com",
        "https://convertexperiments.com",
        "https://cdn-4.convertexperiments.com",
    ];

    if (isset($headers['Content-Security-Policy'])) {
        $policy = $headers['Content-Security-Policy'];

        if (preg_match('/connect-src\s([^;]*)/', $policy, $matches)) {
            // If connect-src exists, append sources if not already there
            $existing = explode(' ', $matches[1]);
            $merged = array_unique(array_merge($existing, $new_sources));
            $new_directive = 'connect-src ' . implode(' ', $merged);

            // Replace old connect-src with updated one
            $headers['Content-Security-Policy'] = preg_replace(
                '/connect-src\s[^;]*/',
                $new_directive,
                $policy
            );
        } else {
            // No connect-src found, add it safely
            $headers['Content-Security-Policy'] .= '; connect-src ' . implode(' ', $new_sources);
        }
    }

    return $headers;
}, 11, 1);
