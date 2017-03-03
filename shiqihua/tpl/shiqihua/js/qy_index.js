$(document).ready(function(){

// 01首页menu


        $('.li_box').hover(function(){$(this).find('.erji_box').show();
        },function(){$(this).find('.erji_box').hide();
        })


//菜单栏目的当前状态
	$('.li_box ').click(function(){
		var index = $(this).index();
		$(this).addClass('li_box_cur').siblings().removeClass('li_box_cur');
	})

























































})