<?php
/*
Template Name: External Counter Integration (GPN)
*
* @package WordPress
* @subpackage Planet4 GP Nordic Child Theme
* @since Planet4 GP Nordic Child Theme 0.7
*Template Post Type: post, page
*
*/

// Example:
// page-external-counter.php?var=unique_count&url=https://global-petition-counter-v2.appspot.com/counter/protect-oceans-2019

//update the current page template meta to not show in the page list in the search results
$page_id = get_the_ID();
update_post_meta( $page_id, 'p4_do_not_index', true );

//get the params
$externalKey = $_GET['var'];
// Validate and sanitize the URL
$externalURL = isset($_GET['url']) ? $_GET['url'] : '';
$externalURL = filter_var($externalURL, FILTER_SANITIZE_URL);

// Check if the URL is valid
if (filter_var($externalURL, FILTER_VALIDATE_URL)) {
    // Fetch external JSON content
    $externalJSON = file_get_contents($externalURL);

    // Validate that $externalJSON contains valid JSON before decoding
    if ($externalJSON !== false) {
        // Decode JSON
        $externalData = json_decode($externalJSON, true);

        //rewrite the key
		$rewriteKey = $externalKey;
		$rewriteValue = isset($externalData[$rewriteKey]) ? $externalData[$rewriteKey] : 0;
		//Create array with the the new value and output as JSON
		$output = [ 'counter' => $rewriteValue ];

		function outputJSON($output) {
			header( 'Content-type: application/json; charset=utf-8; Cache-Control: no-cache, must-revalidate');
			header( 'Content-Description: External API Endpoint Formatting' );
			header( 'X-Robots-Tag: noindex, nofollow, noarchive', true );
			http_response_code(200);
			echo json_encode($output);
			exit();
		}
		outputJSON($output);

    } else {
        // Handle error loading external JSON
        echo json_encode(['error' => 'Unable to fetch external JSON']);
    }
} else {
    // Handle invalid URL
    echo json_encode(['error' => 'Invalid URL']);
}

?>
