<?php
/*
Template Name: External Counter Integration (GPN)
*/

// Example:
// externalCounter.php?var=unique_count&url=https://global-petition-counter-v2.appspot.com/counter/protect-oceans-2019

//get the params
$externalKey = $_GET['var'];
$externalURL = $_GET['url'];
//stringify the JSON
$externalJSON = file_get_contents($externalURL);
$externalData = json_decode($externalJSON, true);
//rewrite the key
$rewriteKey = $externalKey;
$rewriteValue = $externalData[$rewriteKey];
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

