function fontGame() {
	//获取元素对象
	var time = document.getElementById('time');
	var show = document.getElementById('show');
	var rule = document.getElementById('rule');
	var list = document.getElementById('list');
	var scoring = document.getElementById('scoring');
	var lis = document.getElementsByTagName('li');
	// 预备文字和颜色数组
	var colors = ["red","green","blue","yellow","black"];
	var fonts = ["红","绿","蓝","黄","黑"];
	var num = 0;
	var timeBol = false;
	var count = 10;
	var clickBol = true;

	//随机产生大字
	function showRand(){
		colorIndex = randFn(colors.length);
		var fontsIndex = randFn(fonts.length);

		show.style.color = colors[colorIndex];
		show.innerHTML = fonts[fontsIndex];
	}

	//随机方法
	function randFn(max){
		//随机获取从0~4
		return parseInt(Math.random() * max);
	}

	//数组排重
	function removeRepeat(){
		var arr = [];
		/*var rand = randFn(5);
		arr.push(rand);*/
		while(arr.length < 5){
			var rand = randFn(5);
			var bol = true;
			//使用循环进行数组排重
			for (var i = 0; i < arr.length; i++) {
				//如果重复，那么将开关置为false
				if(arr[i] == rand){
					bol = false;
					break;
				}
			}
			//如果开关的值是真，那么将随机的数放进数组中
			if (bol) {
			arr.push(rand);
			}
		}
		return arr;
	}

	//设置选项的文字和颜色
	function liRand(){
		var colorArr = removeRepeat();
	    var fontArr = removeRepeat();
		// 使用循环设置每个li的文字和颜色
		for (var i = 0; i < colorArr.length; i++) {
			lis[i].style.color = colors[colorArr[i]];
			lis[i].innerHTML = fonts[fontArr[i]];

			//给每个li定义夜歌下标用于和大字下标进行比较
			lis[i].fontIndex = fontArr[i];
		};
	}

	//开始选择
	for (var i = 0; i < lis.length; i++) {
		lis[i].onclick = function(){
			//判断按键的文字和大字的颜色是否相同
			if (this.fontIndex == colorIndex && clickBol) {
				rule.style.opacity = 0;
				liRand();
				showRand();
				num++;
				scoring.innerHTML = "完成:" + num;
				timeBol = true;
			};
		}
	};

	//计时
	var timer = setInterval(function(){
		if (timeBol) {
			count--;
			time.innerHTML = "剩余时间:" + count + "s";
			if (count == 0) {
				clearInterval(timer);
				timer = null;
				timeBol = false;

				//游戏结束
				gameOver();
				clickBol = false;
			};
		};
	},1000);

	function gameOver(){
		if (num < 2) {
			alert("色盲级别!");
		}else if(num < 5){
			alert("眼神还可以!");
		}else if(num < 10){
			alert("NB!");
		}else{
			alert("非常NB!");
		}
	}

	//初始化
	function init(){
		showRand();
		liRand();
	}
	init();
}
fontGame();