$(document).ready(function(){

	
	// Fade in images so there isn't a color "pop" document load and then on window load
	$('ul.portfolio li img').fadeIn(500);
	
	// Set canvas hover color
	$('ul.portfolio li img').hoverColor({defaultAlpha:'1', overAlpha:'0', time:200})
	
	//$('.me-myself').hoverColor({defaultAlpha:'1', overAlpha:'0', time:400})
	
	// Set opacity
	$("ul.portfolio li a").css({opacity:0.5});	
	$("ul.portfolio li a").mouseenter(function(e) {
		$(this).fadeTo(200, 1)
		$(this).find('span').animate({ marginTop: -50 }, 200);
		e.preventDefault();
	}).mouseleave(function(e) {
		$(this).fadeTo(200, 0.5);
		$(this).find('span').animate({ marginTop: 0 }, 200);
		e.preventDefault();
   });
  
	// Set opacity
	/*$(".flickr-set li").css({opacity:0.5});	
	$(".flickr-set li").mouseenter(function() {
		$(this).fadeTo(200, 1)
		//return false;
	}).mouseleave(function() {
		$(this).fadeTo(200, 0.5);
		//return false;
   });*/
		
	// Disable CSS Hover
	$(".links-social li a").css({"background-image":"none"}).append("<span></span>");
	$(".links-social li span").css({opacity:0});  
	

	// Social Media Icon Fade Hover Animation
	$(".links-social li span").mouseover(function () {
		$(this).stop().animate({
			opacity: 0.8
		}, 200);
	}).mouseout(function () {
		$(this).stop().animate({
			opacity: 0
		}, 200);
	});
	
	$('.links-social li a').tipsy({fade: true});
	$('.mini-colophon span').tipsy({fade: true, gravity:'e'});
	
	 $(".slider").slides({
		preload: true,
		preloadImage: '/img/loading.gif',
		play: 5000,
		pause: 2500,
		hoverPause: true,
		paginationClass: 'slider-stops'
	  });
  
	$(".slider-stops").addClass("clearfix");
	$(".slider-stops a").html("&bull;");
	
	var widthMultiplyer = $(".slider-stops li").length;
	$(".slider-stops").width(widthMultiplyer * 12);

	//Google Analytics tracking for identified outbound links	
/*	$("a[rel*=external]").click(function(){
				
		var outboundURL = $(this).attr("href");
		var trackingCategory = "Outgoing &raquo;";
		var trackingLabel = $(this).text();
		
		if (trackingLabel == "") {
			trackingLabel = $(this).attr("title");
		}
		
	  try {
		var myTracker=_gat._getTrackerByName();
		_gaq.push(['myTracker._trackEvent', ' + trackingCategory + ', ' + trackingLabel + ']);
		setTimeout('document.location = "' + outboundURL + '"', 100)
	  }catch(err){}

	});*/
/*
var sliderHeight=0;
var sliderImage;
$(".slides_container").each(function () {
    if ( $(this).outerHeight() > sliderHeight ) {
        sliderImage=this;
        sliderHeight=sliderImage.outerHeight();
		alert(sliderHeight);
    }
	
$(".slides_container").height(sliderHeight);*/
//});
});
