<?php
if ( ! defined( 'WP_DEBUG' ) ) define( 'WP_DEBUG', true );
if ( ! defined( 'WP_DEBUG_LOG' ) ) define( 'WP_DEBUG_LOG', true );
if ( ! defined( 'WP_DEBUG_DISPLAY' ) ) define( 'WP_DEBUG_DISPLAY', true );
if ( ! defined( 'SCRIPT_DEBUG' ) ) define( 'SCRIPT_DEBUG', true );
// Enable WordPress debugging

// Display all PHP errors on screen
ini_set( 'display_errors', '1' );
ini_set( 'display_startup_errors', '1' );
ini_set( 'html_errors', '0' );
error_reporting( E_ALL );

add_action('after_setup_theme', function () {
    set_error_handler(function ($errno, $errstr, $errfile, $errline) {
        $levels = [
            E_ERROR => 'E_ERROR',
            E_WARNING => 'E_WARNING',
            E_PARSE => 'E_PARSE',
            E_NOTICE => 'E_NOTICE',
            E_CORE_ERROR => 'E_CORE_ERROR',
            E_CORE_WARNING => 'E_CORE_WARNING',
            E_COMPILE_ERROR => 'E_COMPILE_ERROR',
            E_COMPILE_WARNING => 'E_COMPILE_WARNING',
            E_USER_ERROR => 'E_USER_ERROR',
            E_USER_WARNING => 'E_USER_WARNING',
            E_USER_NOTICE => 'E_USER_NOTICE',
            E_STRICT => 'E_STRICT',
            E_RECOVERABLE_ERROR => 'E_RECOVERABLE_ERROR',
            E_DEPRECATED => 'E_DEPRECATED',
            E_USER_DEPRECATED => 'E_USER_DEPRECATED',
        ];
        $level = $levels[$errno] ?? "UNKNOWN ($errno)";
        echo "<pre style='background:#fee;padding:1em;border:1px solid #c00;color:#000'>";
        echo "[PHP ERROR] $level\nMessage: $errstr\nFile: $errfile\nLine: $errline\n";
        echo "</pre>";
        return true;
    });
});

/**
 * Pretty browser-visible error handler.
 */
set_error_handler( function ( $errno, $errstr, $errfile, $errline ) {
    if ( !( error_reporting() & $errno ) ) return;

    $level = match ( $errno ) {
        E_ERROR             => 'E_ERROR',
        E_WARNING           => 'E_WARNING',
        E_PARSE             => 'E_PARSE',
        E_NOTICE            => 'E_NOTICE',
        E_CORE_ERROR        => 'E_CORE_ERROR',
        E_CORE_WARNING      => 'E_CORE_WARNING',
        E_COMPILE_ERROR     => 'E_COMPILE_ERROR',
        E_COMPILE_WARNING   => 'E_COMPILE_WARNING',
        E_USER_ERROR        => 'E_USER_ERROR',
        E_USER_WARNING      => 'E_USER_WARNING',
        E_USER_NOTICE       => 'E_USER_NOTICE',
        E_STRICT            => 'E_STRICT',
        E_RECOVERABLE_ERROR => 'E_RECOVERABLE_ERROR',
        E_DEPRECATED        => 'E_DEPRECATED',
        E_USER_DEPRECATED   => 'E_USER_DEPRECATED',
        default             => "UNKNOWN ($errno)",
    };

    echo "<pre style='background:#fee;padding:1em;border:1px solid #c00;color:#000'>";
    echo "[PHP ERROR] {$level}\n";
    echo "Message : {$errstr}\n";
    echo "File    : {$errfile}\n";
    echo "Line    : {$errline}\n";
    echo "</pre>";

    return true;
});

/**
 * Show uncaught exceptions in browser
 */
set_exception_handler( function ( $exception ) {
    echo "<pre style='background:#fee;padding:1em;border:1px solid #c00;color:#000'>";
    echo "[UNCAUGHT EXCEPTION]\n";
    echo "Message : " . $exception->getMessage() . "\n";
    echo "File    : " . $exception->getFile() . "\n";
    echo "Line    : " . $exception->getLine() . "\n";
    echo "</pre>";
});

/**
 * Display fatal errors too
 */
register_shutdown_function( function () {
    $error = error_get_last();
    if ( $error && in_array( $error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR] ) ) {
        echo "<pre style='background:#fee;padding:1em;border:1px solid #c00;color:#000'>";
        echo "[FATAL ERROR]\n";
        echo "Message : " . $error['message'] . "\n";
        echo "File    : " . $error['file'] . "\n";
        echo "Line    : " . $error['line'] . "\n";
        echo "</pre>";
    }
});

// Test error
// trigger_error( "This is a browser-visible test warning", E_USER_WARNING );
