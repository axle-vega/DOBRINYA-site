// partials/app.js
// partials/bootstrap.js
// partials/device.min.js

$(function(){
	$("#phone").mask("+7 (999) 999-99-99");
	$(window).scroll(function () { 
		var p = $(document).scrollTop();
		if (p >= 300) { $('#back-top').fadeIn(); } else { $('#back-top').fadeOut(); } 
	});
	$('#back-top').click(function() { $('body,html').animate({scrollTop: 0}, 300); return false;});
	$(".sliderBig").RotatorTVV({ delay_time : 5000, animation_speed : 2000});
	$('#BoxModalMain2').click(function(){$("#Dialog").empty(); $("#BoxModalMain").slideUp(150); return false;});
	
	$(document).on('click','#nav_2', function(e){
		e.stopPropagation();
		e.preventDefault();
		$('.popup3').slideUp(150);
		$('.popup2').slideToggle(150);
		return false;
	});
	$(document).on('click','#nav_3', function(e){
		e.stopPropagation();
		e.preventDefault();
		$('.popup2').slideUp(150);
		$('.popup3').slideToggle(150);
		return false;
	});
});

function errorSity(msg){
	modalSity(msg);
	setTimeout(function(){$("#BoxModalMain").slideUp(150);}, 3000);
	return false;
};

function modalSity(msg){
	$('#BoxModalMain1').css('top','-500px');
	$("#Dialog").html(msg);
	$("#BoxModalMain").slideDown(150, function(){
		var hD = $('#Dialog').outerHeight(true), h = $(window).height();
		$('#BoxModalMain1').height(hD).animate({top: (h - hD)/2 , opacity:1},300);
	});
}

function moderator(sid,name){
	//alert(sid+name);
	$.post('/ajaxmod.php',{name:name, sid:sid, flagMain:1},function(data){ $('#Modal3').html(data); $('#Modal').slideDown(150);});
}