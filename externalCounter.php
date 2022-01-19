<?php
/*
Template Name: External Counter Integration (GPN)
*/

// Example:
// externalCounter.php?url=https://global-petition-counter-v2.appspot.com/counter/protect-oceans-2019

$externalURL = $_GET['url'];
$externalJSON = file_get_contents($externalURL);

$externalData = json_decode($externalJSON, true);

$rewriteKey = 'unique_count';
$rewriteValue = $externalData[$rewriteKey];

//Create array with the the new value and output as JSON
$output = [ 'counter' => $rewriteValue ];
header('Content-type: application/json');
echo json_encode($output);
?>

