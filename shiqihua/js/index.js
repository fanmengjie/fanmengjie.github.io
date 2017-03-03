function setSize(){
	var win = $(window);
	var initWidth = 1920,
	initHeight = 1129,
	scale = initWidth / initHeight;

	var obj = $(".reset");
	

	function set(){
		$(".index").css({"width": win.width(), "height": win.height()});
		var _w = win.width() + (2400-1920)*win.width()/1920


		$(".ani_x img").css("width", _w);
		$(".ani_y img").css("width", win.width());
		winWidth = win.width();
		winHeight = win.height();

		obj.each(function(e){
			var _this = $(this);
			var objScale = _this.attr("_width") / _this.attr("_height");
			var torb, torb_value, lorr, lorr_value;
			if( _this.attr("_top") ){
				torb = "top";
				torb_value = _this.attr("_top");
				_this.css("top", torb_value * winHeight/initHeight);
			}else{
				torb = "bottom";
				torb_value = _this.attr("_bottom");
				_this.css("bottom", torb_value * winHeight/initHeight);
			}

			if( _this.attr("_marginleft") ){
				if( winWidth/winHeight < scale ){
					_this.css({
						"marginLeft": "-" + (_this.attr("_width") * winWidth/initWidth)/2 + "px"
					});
				}else{
					_this.css({
						"marginLeft": "-" + (_this.attr("_width") * winHeight/initHeight)/2 + "px"
					});
				}
			}

			if( _this.attr("_marginTop") ){
				if( winWidth/winHeight < scale ){
					_this.css({
						"marginTop": "-" + (_this.attr("_width") * winWidth/initWidth) / objScale / 2 + "px"
					});
				}else{
					_this.css({
						"marginTop": "-" + (_this.attr("_width") * winHeight/initHeight) / objScale / 2 + "px"
					});
				}
			}

			if( winWidth/winHeight < scale ){
				_this.css({
					"width": _this.attr("_width") * winWidth/initWidth,
					"height": _this.attr("_width") * winWidth/initWidth / objScale,
					"left": _this.attr("_left") * winWidth/initWidth
				});
			}else{
				_this.css({
					"width": _this.attr("_width") * winHeight/initHeight,
					"height": _this.attr("_width") * winHeight/initHeight / objScale,
					"left": _this.attr("_left") * winWidth/initWidth
				});
			}

			if(_this.attr("_right")){
				if( winWidth/winHeight < scale ){
					_this.css({
						"right": "-"+_this.attr("_width") * winWidth/initWidth+"px",
						"left": "auto"
					});
				}else{
					_this.css({
						"right": "-"+_this.attr("_width") * winHeight/initHeight+"px",
						"left": "auto"
					});
				}
			}
		});

		_lineHeight = 28;

		// alert(win.width()+" "+win.height()+" "+win.width()/win.height());

		if(win.width() < 1400){
			$(".wrap.index").addClass("scale2");
			_lineHeight = 24;
			return;
		}

		if(win.width() < 1200){
			$(".wrap.index").addClass("scale3");
			_lineHeight = 22;
			return;
		}

		if(win.width()/win.height() >= 2){
			$(".wrap.index").addClass("scale3");
			_lineHeight = 22;
			return;
		}

		if(win.width()/win.height() >= 1.8){
			$(".wrap.index").addClass("scale2");
			_lineHeight = 24;
		}
	}

	set();

	win.resize(function(){
		set();
	});

}

setSize();

var appleSt,
	menuSt;
var animateType = 0;


// jie20160110视频部分
//全屏
$(window).resize(function(){
    var $this = $(this),
        sWidth = 1920,
        sHeight = 1129,
        winWidth = $this.width(),
        marginLeft = 0,
        marginTop = 0,
        winHeight = $this.height();
    if(sWidth/winWidth<sHeight/winHeight)
    {
        sHeight = sHeight/sWidth*winWidth;
        sWidth = winWidth;
    }
    else
    {
        sWidth = sWidth/sHeight*winHeight;
        sHeight = winHeight;
    }
    marginTop = (winHeight - sHeight)/2;
    marginLeft = (winWidth - sWidth)/2;
    $('.boxpic').css({
        width:sWidth + 'px',
        height:sHeight + 'px',
        marginTop:marginTop + 'px',
        marginLeft:marginLeft + 'px'
    });

}).trigger('resize');
	
// 判断是否能用vedio
var canh5 = false;
if(getCookie("welcome_video") == "played"){
	
}else if(navigator.userAgent.indexOf("MSIE")>0) {   
	if(navigator.userAgent.indexOf("MSIE 8.0")>0 ){   
		//低于ie9
	}else{
		canh5 = false;
	}
}else{
	canh5 = false;
}	
var vUrl = $("#vediobox").attr("vUrl");
if(canh5 == false){
	$("#vediobox").append('<video src="'+ vUrl +'" preload="auto" width="100%" height="100%" id="h5vedio"></video>');
	h5vedio = document.getElementById("h5vedio");
}


// 视频点击
// $(".vedio_picbox").on('click',function(){
// 	$(this).fadeOut(1000);
	if(canh5 == true){
		// localStorage.setItem("isSaw", "yes");
		h5vedio.addEventListener('canplay',function(){
			$(".vedio_picbox").fadeOut();
			h5vedio.play();
			// h5vedio.removeEventListener('canplay');
			h5vedio.addEventListener('timeupdate',function(){
				if(h5vedio.currentTime >= 11.9){
					$(".vlogo").hide(100);
					h5vedio.removeEventListener('timeupdate');
				}
			})
		})

		h5vedio.addEventListener('ended',function(){
			$(".vclose").fadeOut();
			setTimeout(function(){
				$(".index_vedio").remove();
				bannerAni(0);
				menuFade = setTimeout(function(){
					$(".menu .relation,.menu ul.list").fadeOut(300);
					$(".index .menu .icon").fadeIn(300);
					canh5 = false;
				},1300)
			},1000)
			
		})
	}else{
		$(".index_vedio").remove();
		bannerAni(0);
		menuFade = setTimeout(function(){
			$(".menu .relation,.menu ul.list").fadeOut(300);
			$(".index .menu .icon").fadeIn(300);
			canh5 = false;
		},1300)
		// videoPlay("vediobox");
	}
// })

// 播放函数
// function videoPlay(playBox){

// 		 flowplayer(playBox, 
// 			"swf/flowplayer-3.2.7.swf",{
// 				clip: {
// 					url: vUrl,
// 					autoPlay: true, 
// 					autoBuffering: true
// 			   },
// 			   onFinish: function(){
// 			   		$(".index_vedio").fadeOut(300,function(){
// 						$(".index_vedio").remove();
// 						// jie20160108
// 						menuFade = setTimeout(function(){
// 							$(".menu .relation,.menu ul.list").fadeOut(300);
// 							$(".index .menu .icon").fadeIn(300);
// 						},1000)
// 					})
// 					// 开始波的功能
// 					bannerAni(0);
// 			   }, 
			   
// 			   controls: { 
//                     bottom: 0,//功能条距底部的距离 
//                     height: 20, //功能条高度 
//                     zIndex: 3, 
//                     fontColor: '#ffffff', 
//                     timeFontColor: '#333333', 
//                     playlist: false,//上一个、下一个按钮 
//                     play:true, //开始按钮 
//                     volume: true, //音量按钮 
//                     mute: true, //静音按钮 
//                    stop: false,//停止按钮 
//                     fullscreen: true, //全屏按钮 
//                     scrubber: true,//进度条 
//                     url: "swf/flowplayer.controls-3.2.5.swf", //决定功能条的显示样式（功能条swf文件,根据项目定亦可引用								      												:http://releases.flowplayer.org/swf/flowplayer.controls-3.2.12.swf） 
//                     time: true, //是否显示时间信息 
//                     autoHide: false, //功能条是否自动隐藏 
//                     backgroundColor: '#2d2e32', //背景颜色 
//                     backgroundGradient: [0.1, 0.1, 1.0], //背景颜色渐变度（等分的点渐变） 
//                     opacity: 0.5, //功能条的透明度 
//                     borderRadius: '30',//功能条边角 
//                 tooltips: { 
//                         buttons: false,//是否显示 
//                         fullscreen: '全屏',//全屏按钮，鼠标指上时显示的文本 
//                         stop:'停止', 
//                         play:'开始', 
//                         volume:'音量', 
//                         mute: '静音', 
//                         next:'下一个', 
//                         previous:'上一个'
//                     }  
//                 }     
// 			}	
// 		 );		  	
// }

var menuFade = "";
$(".vclose").on('click',function(){
	boxHide();
})

var boxHide = function(){
	$(".index_vedio").fadeOut(800,function(){
		$(".index_vedio").remove();
		menuFade = setTimeout(function(){
			$(".menu .relation,.menu ul.list").fadeOut(300);
			$(".index .menu .icon").fadeIn(300);
		},1000)
	})
	bannerAni(0);
}
//jie end



$(".menu").hover(function(){
	clearTimeout(menuSt);
	$(".menu .icon").fadeOut(500);
	$(".menu ul.list").fadeIn(500);
	$(".menu .relation").fadeIn(500);
	clearTimeout(menuFade);
}, function(){
	// var _time = 300;
	// if(animateType == 1){
	// 	_time = 1000;
	// }
	// animateType = 1;
	menuSt = setTimeout(function(){
		$(".menu .icon").fadeIn(500);
		$(".menu ul.list").fadeOut(500);
		$(".menu .relation").fadeOut(500);
	}, 500);
});

var _lineHeight;

$(".menu ul.list").children("li").children("a").bind("click", function(){
	if($(this).parent().hasClass("on")){
		$(this).parent().removeClass("on");
		$(this).siblings().animate({"height": "0px"}, 500);
		return;
	}
	$(".menu ul.list").children("li").removeClass("on");
	$(this).parent().siblings().find("ul.second_list").animate({"height": "0px"}, 500);
	$(this).parent().addClass("on");
	$(this).siblings().animate({"height": $(this).siblings().children("li").length*_lineHeight}, 500);
});

var bannerSt1,bannerSt2,bannerSt3;
var bannerPopSt;
var _bannerCur = -1;
var _bannerPopTop;

$(".banner .pop").hover(function(){
	$(".banner .list li").removeClass("ani");
	clearTimeout(bannerSt1);
	clearTimeout(bannerSt2);
	clearTimeout(bannerSt3);
	clearTimeout(bannerPopSt);
	_bannerPopTop = 0;
	// if(_bannerCur == 0){
	// 	_bannerPopTop = 8.33;
	// }
	$(".banner .pop li").eq(_bannerCur).find("h3").animate({"top": "-5%", "opacity":"0"}, 500);
	$(".banner .list li").eq(_bannerCur).find("img").addClass("blur");
	$(".banner .pop li").eq(_bannerCur).find(".txt").animate({"top":"7.5%", "opacity":"1"}, 500, function(){
		$(".banner .pop li").eq(_bannerCur).find(".btn").fadeIn(500);
	});
}, function(){
	bannerPopSt = setTimeout(function(){
		$(".banner .pop li").eq(_bannerCur).find("h3").animate({"top":_bannerPopTop+"%", "opacity":"1"}, 500);
		$(".banner .pop li").eq(_bannerCur).find(".btn").fadeOut(500);
		$(".banner .list li").eq(_bannerCur).find("img").removeClass("blur");
		$(".banner .pop li").eq(_bannerCur).find(".txt").animate({"top":"10%", "opacity":"0"}, 500);
		bannerSt1 = setTimeout(bannerAni, 4000);
	}, 500);
});

var lastCur;

function bannerAni(n){
	$(".banner .list li").removeClass("ani");
	clearTimeout(bannerSt1);
	// clearTimeout(bannerSt2);
	// clearTimeout(bannerSt3);
	// clearTimeout(bannerPopSt);
	// if(num == _bannerCur){
	// 	bannerSt1 = setTimeout(bannerAni, 500);
	// 	return;
	// }
	// lastCur = _bannerCur;
//	if(_bannerCur == -1){
//		lastCur = 0;
//	}
	_bannerCur++;
	if(_bannerCur >= $(".banner .list li").length){
		_bannerCur = 0;
	}
	if(n!=undefined) {
		_bannerCur = n;
		console.log(n)
	}
	// $(".banner .list li").hide();
	//$(".banner .pop").hide();
	$(".banner .pop li").removeClass("on");
	$(".banner .point li").removeClass("on");
	$(".banner .list li").eq(_bannerCur).addClass("ani");
	$(".banner .list li").eq(_bannerCur).fadeIn(1000).siblings().fadeOut(1000);
	//$(".banner .pop").fadeIn(500);
	$(".banner .pop li").eq(_bannerCur).addClass("on");
	$(".banner .point li").eq(_bannerCur).addClass("on");
	setTimeout(function(){
		//$(".banner .list li").eq(_bannerCur).siblings().hide();
	}, 500);
	bannerSt1 = setTimeout(bannerAni, 6000);
	// if(num >= 0){
	// 	if(num == lastCur){
	// 		return;
	// 	}
	// 	_bannerCur = num;
	// }
	// $(".banner .list li.on").siblings().hide();
	// $(".banner .list li").removeClass("ani");
	// $(".banner .list li").removeClass("on");
	// $(".banner .list li").eq(_bannerCur).show();
	// $(".banner .pop").hide();
	// $(".banner .pop li").removeClass("on");
	// $(".banner .point li").removeClass("on");
	// $(".banner .pop li").eq(_bannerCur).addClass("on");
	// $(".banner .point li").eq(_bannerCur).addClass("on");
	// $(".banner .list li").eq(_bannerCur).addClass("ani");
	// // $(".banner .list li").eq(_bannerCur).show();
	// bannerSt2 = setTimeout(function(){
	// 	$(".banner .list li").eq(_bannerCur).addClass("on");
	// 	$(".banner .pop").fadeIn(4000);
	// 	bannerSt3 = setTimeout(function(){
	// 		$(".banner .list li").eq(lastCur).hide();
	// 		$(".banner .list li").eq(_bannerCur).removeClass("ani");
	// 		bannerSt1 = setTimeout(bannerAni, 500);
	// 	}, 4500);
	// }, 100);
}


$(".banner .point li").bind("click", function(){
	clearTimeout(bannerSt1);
	clearTimeout(bannerSt2);
	clearTimeout(bannerSt3);
	clearTimeout(bannerPopSt);
	bannerAni($(this).index());
});







//$(".btn_right a").bind("click", function(){
//	clearTimeout(bannerSt1);
//	clearTimeout(bannerSt2);
//	clearTimeout(bannerSt3);
//	clearTimeout(bannerPopSt);
//	bannerAni();
//});
//
//$(".btn_left a").bind("click", function(){
//	clearTimeout(bannerSt1);
//	clearTimeout(bannerSt2);
//	clearTimeout(bannerSt3);
//	clearTimeout(bannerPopSt);
//	bannerAni(0);
//});
//



$(function(){
	// bannerSt1 = setTimeout(bannerAni, 4000);
	// bannerAni(0);
	// if(canh5 == true){
	// 	if(localStorage.isSaw == "yes"){
	// 		$(".index_vedio").remove();
	// 		bannerAni(0);	
	// 		menuFade = setTimeout(function(){
	// 			$(".menu .relation,.menu ul.list").fadeOut(300);
	// 		},1000)
	// 	}
	// }
	// 播放器背景色，傻逼360;
	var bili = $(document).height() / $(document).width();
	if(navigator.userAgent.indexOf("Chrome") !== -1 && bili >= 0.53){
		$(".vediobox").css({"background":"#101010"});
	}
	// logo位置
	function logoIn(){
		var dhi =  $(document).height();
		var dwi =  $(document).width();
		var pcha =  dhi * 16 / 9;
		if(dwi > pcha){
			var wcha = (dwi - pcha) / 2 + 2;
			$(".vlogo").css({left:wcha});
			$(".vclose").css({right:wcha});
		}else{
			$(".vlogo").css({left:"10px"});
			$(".vclose").css({right:"10px"});
		}	
	}
	logoIn();
	$(window).resize(function(){
		logoIn();
	})


	// 20160126
	$(".btn a").hover(function(){
		defaultText = $(this).text();
		var ahref = $(this).attr("href");
		if(ahref == "javascript:void(0);"){
			$(this).text("敬请期待");
			$(this).addClass("nohref"); 
		}
	},function(){
		$(this).text(defaultText);
		$(this).removeClass("nohref");
	})

});


function setCookie(name,value){ 
    document.cookie = name + "="+ escape (value); 
} 

//读取cookies 
function getCookie(name){ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]); 
    else 
        return null; 
} 
//$(function(){
//	$(".index_banner").click(function(){
//	    
//	   $(this).css("opacity",0.5).hide(1000).siblings(".index").show(1000);
//	});
//});



	




















