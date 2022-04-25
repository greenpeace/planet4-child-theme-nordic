<?php
/*
Template Name: External Counter Integration (GPN)
*/

// Example:
// page-external-counter.php?var=unique_count&url=https://global-petition-counter-v2.appspot.com/counter/protect-oceans-2019

//update the current page template meta to not show in the page list in the search results
$page_id = get_the_ID();
update_post_meta( $page_id, 'p4_do_not_index', true );

//get the params
$externalKey = $_GET['var'];
$externalURL = $_GET['url'];

//if url is empty, return the permalink of the current page with the external key
if ( !empty( $externalURL ) ) {
	$externalKey = $_GET['var'];
	$externalURL = $_GET['url'];
}
//returns the value of the url
else
{
	// $externalURL = get_permalink();
	$externalKey = 'value';
	//add a sample counter to the url so it doesn't return an error
	$externalURL = 'https://api.countapi.xyz/get/greenpeace.rocks/visits';
}

//stringify the JSON
$externalJSON = file_get_contents($externalURL);
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

?>
