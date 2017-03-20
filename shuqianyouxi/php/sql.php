<?php 

	function insertUserInfo($userinfo){
		$openid = $userinfo->openid;
		$nickname = $userinfo->nickname;
		$sexNumber = $userinfo->sex;
		if ($sexNumber == 1) {
			$sex = "男";
		}elseif ($sexNumber == 2) {
			$sex = "女";
		}else{
			$sex = "未知";
		}
		$province = $userinfo->province;
		$city = $userinfo->city;
		$country = $userinfo->country;
		$headimgurl = $userinfo->headimgurl;

		$mysqli = new mysqli(SAE_MYSQL_HOST_M,SAE_MYSQL_USER,SAE_MYSQL_PASS,SAE_MYSQL_DB,SAE_MYSQL_PORT);
		if ($mysqli->connect_errno) 
			die($mysqli->connect_error);
		$mysqli->query("set names utf8");
		$url = "INSERT INTO userInfo(openid,nickname,sex,province,city,country,headimgurl) VALUES('$openid','$nickname','$sex','$province','$city','$country','$headimgurl')";
		$mysqli->query($url);
		$mysqli->close();
	}


	function isUserExist($openid){
		$mysqli = new mysqli(SAE_MYSQL_HOST_M,SAE_MYSQL_USER,SAE_MYSQL_PASS,SAE_MYSQL_DB,SAE_MYSQL_PORT);
		if ($mysqli->connect_errno) 
			die($mysqli->connect_error);
		$mysqli->query("set names utf8");
		$url = "SELECT * FROM userInfo WHERE openid = '$openid'";
		$result = $mysqli->query($url);

		if ($result->num_rows) {
			$isExist = true;
		}else{
			$isExist = false;
		}

		$mysqli->close();

		return $isExist;
	}




 ?>