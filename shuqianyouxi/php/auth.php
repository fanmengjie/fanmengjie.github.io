<?php 
	// 引入sql.php文件
	require("sql.php");

	// 让用户点击的url,目的是为了让用户点击授权按钮
	
	header("Content-Type:text/html;charset=utf8");
	
	// 拿到code值
	$code = $_GET["code"];

	// 第二步：通过code换取网页授权access_token和openid
	$response = httpGet("https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx92a5b5a4849ae0e6&secret=63ac1800b061c53dd2b05c35ecbe02d0&code={$code}&grant_type=authorization_code");
	// json转对象
	$responseObj = json_decode($response);
	// 拿到accessToken
	$access_token = $responseObj->access_token;
	// 拿到openId
	$openid = $responseObj->openid;
	// echo $openid;

	session_start();
	$_SESSION["openid"] = $openid;

	// 第四步：拉取用户信息(需scope为 snsapi_userinfo)
	$url = "https://api.weixin.qq.com/sns/userinfo?access_token={$access_token}&openid={$openid}&lang=zh_CN";
	// 网络请求
	$response = httpGet($url);
	$userinfo = json_decode($response);
	
	// 查询数据库中是否拥有这条数据,如果为false
	if (isUserExist($openid) == false) {
		// 那么插入信息
		insertUserInfo($userinfo);	
	}
	
	echo "<script>window.location.href='../index.html'</script>";

	


	
	// 网络请求
	function httpGet($url){
		$curl = curl_init();
		curl_setopt($curl,CURLOPT_URL,$url);
		curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($curl);
		curl_close($curl);
		return $result;}
	function httpPost($url,$data){
		$curl = curl_init();
		curl_setopt($curl,CURLOPT_POST,true);
		curl_setopt($curl,CURLOPT_URL,$url);
        curl_setopt($curl,CURLOPT_POSTFIELDS,$data);
		curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
		$result = curl_exec($curl);
		curl_close($curl);
		return $result;}
 ?>