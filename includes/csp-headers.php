<?php

/**
 * Update the CSP rules 
 */

 add_action('wp_headers', function ($headers): array {
    $add_connect = ["'self'", "*", "data:", "blob:"];

    $add_worker = ["'self'", 'blob:'];

    if (isset($headers['Content-Security-Policy'])) {
        $policy = $headers['Content-Security-Policy'];

        // CONNECT-SRC
        if (preg_match('/connect-src\s([^;]*)/', $policy, $matches)) {
            $existing = explode(' ', trim($matches[1]));
            $merged = array_unique(array_merge($existing, $add_connect));
            $policy = preg_replace('/connect-src\s[^;]*/', 'connect-src ' . implode(' ', $merged), $policy);
        } else {
            $policy .= '; connect-src ' . implode(' ', $add_connect);
        }

        // WORKER-SRC
        if (preg_match('/worker-src\s([^;]*)/', $policy, $matches)) {
            $existing = explode(' ', trim($matches[1]));
            $merged = array_unique(array_merge($existing, $add_worker));
            $policy = preg_replace('/worker-src\s[^;]*/', 'worker-src ' . implode(' ', $merged), $policy);
        } else {
            $policy .= '; worker-src ' . implode(' ', $add_worker);
        }

        $headers['Content-Security-Policy'] = $policy;
    }

    return $headers;
}, 11, 1);

