<?php 
	
	// 根据前台传过来的openid,更新前台传过来的分数
	function updateScore($openid,$score){
		$mysqli = new mysqli(SAE_MYSQL_HOST_M,SAE_MYSQL_USER,SAE_MYSQL_PASS,SAE_MYSQL_DB,SAE_MYSQL_PORT);
		if ($mysqli->connect_errno) 
			die($mysqli->connect_error);
		$mysqli->query("set names utf8");
		
		$url = "UPDATE userInfo SET score = $score WHERE openid = '$openid'";

		$result = $mysqli->query($url);

		$mysqli->close();
	}

	$openid = $_GET["openid"];

	$score = $_GET["score"];

	function getScore($openid){
		$mysqli = new mysqli(SAE_MYSQL_HOST_M,SAE_MYSQL_USER,SAE_MYSQL_PASS,SAE_MYSQL_DB,SAE_MYSQL_PORT);
		if ($mysqli->connect_errno) 
			die($mysqli->connect_error);
		$mysqli->query("set names utf8");
		
		
		$url = "SELECT * FROM userInfo WHERE openid='$openid'";

		$result = $mysqli->query($url);

		$score = 0;
		if ($result->num_rows) {
			$user = $result->fetch_array(MYSQLI_ASSOC);
			$score = $user["score"];
		}
		$mysqli->close();

		return $score;
	}

	$sqlScore = getScore($openid);
	// 如果前台传过来的值score 大于数据库的数值
	if ($score > $sqlScore) {
		// 那么执行更新方法
		updateScore($openid,$score);
		// 并且返回最大值
		echo $score;
	}else{
		// 否则返回最大值
		echo $sqlScore;
	}
 ?>