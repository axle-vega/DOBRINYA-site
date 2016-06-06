(function($){
	$.fn.RotatorTVV = function(options){
		var settings = $.extend({ delay_time : 5000, animation_speed : 2000, navNext : false, navPrev : false }, options);
		var div = $(this), ul = $("ul", div), tLi = $("li", ul), tLiFirst = $("li:first", ul), tLiLast = $("li:last", ul), current, next, kolElem, newTime, firstTime = false, uprDiv = $('.upr'), strUpr;
		$(ul).css({'listStyle':'none','margin':'0','padding':'0','position':'relative','width': '100%','height':'100%', 'position':'absolute','top':0,'left':0});
		$(div).css({'overflow':'hidden', 'position':'relative'});
		$(tLi).css({'top':0,'position':'absolute','left':0,'display':'none','overflow':'hidden','width': '100%','height':'100%','zIndex':1}); // 'background':'#fff',
		$(tLi).eq(0).addClass('show').css('display','block');
		$(ul).css({'visibility': 'visible'});
		$(tLi).eq(0).find('p').css('left','10px');
		uprDiv.children('span:eq(0)').addClass('current');
		kolElem = $(tLi).length;
		if(kolElem < 2) { return false; }
		if(settings.navNext && settings.navPrev) {
			$(settings.navNext).click(function(){
				allNav(0);
			});
			$(settings.navPrev).click(function(){
				allNav(1);
			});
		}
		if( $(uprDiv).is('div') ) {
			$(uprDiv).on('click','span', function(){
				clearInterval(play);
				strUpr = $(this);
				strUpr.addClass('current').siblings('span.current').removeClass('current');
				$(ul).children('li:eq('+strUpr.index()+')').addClass('show').css('display','list-item').siblings('li.show').css('display','none').removeClass('show').children('p').css('left','100%');
				$(ul).children('li:eq('+strUpr.index()+')').children('p').css('left','10px');
				mainRotator();
			});
		}
		//newTime = settings.animation_speed;
		newTime = settings.delay_time;

		var mainRotator = function(){
			play = setInterval(function(){
			current = $(ul).find('li.show');
			next = ((current.next().length) ? ((current.next().hasClass('show')) ? $(tLiFirst) :current.next()) : $(tLiFirst));	
			next.addClass('show').fadeIn(settings.animation_speed,  function(){ 
				next.find('p').animate({left:'10px'},300)} ).
				siblings('li.show').removeClass('show').fadeOut(settings.animation_speed, function(){
				current.find('p').css('left','100%');
				uprDiv.children('span:eq('+next.index()+')').addClass('current').siblings('span.current').removeClass('current');
				});
			if(firstTime) { clearInterval(play); newTime = settings.delay_time; firstTime = false; mainRotator();}
			}, newTime);
		};
		
		var allNav = function(xxx){
			$(ul).stop(true,true);
			clearInterval(play);
			current = $(ul).find('li.show');
			if( xxx == 0 ) { next = ((current.next().length) ? ((current.next().hasClass('show')) ? $(tLiFirst) :current.next()) : $(tLiFirst)); }
			else { next = ((current.prev().length) ? ((current.prev().hasClass('show')) ? $(tLiFirst) :current.prev()) : $(tLiLast)); }
			next.css('left','0');
			next.addClass('show').css({'zIndex':1, 'display':'block'}).siblings('li.show').removeClass('show').css({'zIndex':1, 'display':'none'});
			mainRotator();
		};

		mainRotator();
	};
})(jQuery);