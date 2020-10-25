$(function(){
	'use strict';

	var $body	= $("html, body");
	$body.stop().animate({scrollTop:0}, 0);
	var winH;
	var tempH;
	var $JsAnimate      = $('.JsAnimate');
	var $JsAnimateDid 	= $('.JsAnimateDid');
	var $flowOne 		    = $('.flowOne');
	var $flowTwo 		    = $('.flowTwo');
	var $flowThree 		  = $('.flowThree');
	var $downLink 		  = $('a.downLink');
	var $joinBtn 		    = $('.joinBtn');
	var $anchorItem 	  = $('li.anchorItem');
	var $pageSection01 	= $('#pageSection01');
	var $videoSection 	= $('.videoSection');
	var $video 			    = $('iframe#video');
	var $queueSection08 = $('#pageSection08 .queueSection');


	function detectmob() {
		if ( navigator.userAgent.match(/Android/i)    ||
				navigator.userAgent.match(/webOS/i)      ||
				navigator.userAgent.match(/iPhone/i)     ||
				navigator.userAgent.match(/iPad/i)       ||
				navigator.userAgent.match(/iPod/i)       ||
				navigator.userAgent.match(/BlackBerry/i) ||
				navigator.userAgent.match(/Windows Phone/i)
		){
			// window.location.href = './sp/' + window.location.search;
			document.body.classList.add('sp');
		}
	}
	detectmob();

	resizeFun();
	// 每當頁面 resize，重新取得當前瀏覽器的高
	$(window).resize(function() {
		resizeFun();
	});

	$(window).on('load', function() {
		firstAnimate();
	});

	$(window).scroll(function() {
		var scroll = $(window).scrollTop();

		$JsAnimate.each(function() {
			var $this = $(this);
			var top   = $this.offset().top-tempH;
			if ( $this.hasClass('footerSection') && $this.prev($queueSection08).hasClass($JsAnimateDid)){
				top = $this.offset().top-winH*.7;
			}

			if ( scroll>top && !$this.hasClass($JsAnimateDid) ){
				// 影片載入並播放
				if ( $this.hasClass('videoSection') && $video.attr('src')=="" ){
					$video.attr('src', 'https://www.youtube.com/embed/OmXhhLiqLWc?autoplay=1');
					$videoSection.addClass('active');
				}
				else pageQueueAnimate($this);
			}
		});
	});

	// 頁面開場動畫
	function firstAnimate() {
		$pageSection01.addClass('active');
		pageQueueAnimate($pageSection01);
	}

	// 取得當前瀏覽器的高
	function resizeFun() {
		winH  = $(window).height();
		tempH	= winH * 6 / 10;
	}

	// 每區塊動畫部屬
	function pageQueueAnimate(tmp_this) {
		tmp_this.find('div').each(function() {
			var $this 	= $(this);
			var delay 	= $this.data('delay');

			setTimeout(function() {
				if ( $this.is('.flowOne, .flowTwo, .flowThree, .fadeInTop, .fadeInTop30, .fadeIn, .keyIn') ){
					$this.addClass('active');

					if ( $this.hasClass('numImg') && $this.find('ul').hasClass('numAnimate'))
						imageAnimate($this);
					else if ( $this.hasClass('number') && $this.hasClass('numAnimate'))
						numberAnimate($this);
				}
			}, delay);
		});
		return tmp_this.addClass('numAnimateDid').removeClass('numAnimate');
	}

	// 數字累增動畫
	function numberAnimate(tmp_this) {
		var id 	 = tmp_this.data('id');
		var nb 	 = tmp_this.data('nb');
		var unit = nb*0.05;
		
		var i = 1;
		var runNum = setInterval(function() {
			if ( i <= 20 ){	
				var num = parseInt(unit*i++).toString();
				var len = num.length;
				if ( id == 4)
					num = num.substring(0, len-1) + "." + num.substring(len-1);	
				else if ( id == 5 || id == 6)
					num = num.substring(0, len-3) + "," + num.substring(len-3);	

				tmp_this.html(num);
			}
			else clearInterval(runNum);
		}, 35);

		return tmp_this.addClass('numAnimateDid').removeClass('numAnimate');
	}
	
	// 動畫主程式
	function imageAnimate(tmp_this) {
		var $this  = tmp_this.find('ul'); 
		var times  = $this.data('times');
		var sec 	 = 1000 / times;
		var $clone = $this.html();
		var i = 1;
		var runImg = setInterval(function() {
			if ( i++ < times)
				$this.append($clone);
			else
				clearInterval(runImg);
		}, sec);
		return $this.addClass('numAnimateDid').removeClass('numAnimate');
	}

	$downLink.click(function() {
		$body.animate({scrollTop:$(window).height()}, 1000);
	});

	$anchorItem.click(function() {
		var $this  = $(this);
		var index  = $this.index();
		var anchor = '#'+$this.data('anchor');
		var sec 	 = $this.data('sec');
		$body.animate({scrollTop:$(anchor).offset().top}, sec);
	});

	$joinBtn.hover(function() {
		$(this).find('.moveBg').addClass('active').removeClass('inactive');
	}, function() {
		$(this).find('.moveBg').removeClass('active').addClass('inactive');
	});

	$flowOne.one('animationend', function() {
		$(this).removeClass('flowOne');
	});
	$flowTwo.one('animationend', function() {
		$(this).removeClass('flowTwo');
	});
	$flowThree.one('animationend', function() {
		$(this).removeClass('flowThree');
	});
});