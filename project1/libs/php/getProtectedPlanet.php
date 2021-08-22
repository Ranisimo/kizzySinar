<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	$url='http://api.protectedplanet.net/v3/countries/' . $_REQUEST['iso'] . '?token=40443092885a889142e0bce8b74975b3';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['landarea'] = $decode['country']['statistics']['land_area'];
	$output['marinearea'] = $decode['country']['statistics']['marine_area'];
	$output['palandarea'] = $decode['country']['statistics']['pa_land_area'];
	$output['pamarinearea'] = $decode['country']['statistics']['pa_marine_area'];
	$output['percentpalandarea'] = $decode['country']['statistics']['percentage_pa_land_cover'];
	$output['percentpamarinearea'] = $decode['country']['statistics']['percentage_pa_marine_cover'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>