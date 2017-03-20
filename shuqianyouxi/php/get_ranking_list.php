<?php 
	
	$mysqli = new mysqli(SAE_MYSQL_HOST_M,SAE_MYSQL_USER,SAE_MYSQL_PASS,SAE_MYSQL_DB,SAE_MYSQL_PORT);
	if ($mysqli->connect_errno) 
		die($mysqli->connect_error);
	$mysqli->query("set names utf8");
	$url = "SELECT * FROM userInfo ORDER BY score DESC";
	$result = $mysqli->query($url);

	$arr = array();
	if ($result->num_rows) {
		while ($rows = $result->fetch_array(MYSQLI_ASSOC)) {
			array_push($arr, $rows);
		}
	}

	$str = json_encode($arr);

	$mysqli->close();

	echo $str;
 ?>