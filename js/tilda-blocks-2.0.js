 
window.t256showvideo = function(recid){
    $(document).ready(function(){
        var el = $('#coverCarry'+recid);
        var videourl = '';

        var youtubeid=$("#rec"+recid+" .t256-video__container").attr('data-content-popup-video-url-youtube');
        if(youtubeid > '') {
            videourl = 'https://www.youtube.com/embed/' + youtubeid;
        }

        $("body").addClass("t256-overflow");
		$("#rec"+recid+" .t256-cover").addClass( "t256-hidden");
        $("#rec"+recid+" .t256-video__container").removeClass( "t256-hidden");
        $("#rec"+recid+" .t256-video__carier").html("<iframe id=\"youtubeiframe"+recid+"\" class=\"t256-iframe\" width=\"100%\" height=\"540\" src=\"" + videourl + "?autoplay=1\" frameborder=\"0\" allowfullscreen></iframe><a class=\"t256-close__link\" href=\"javascript:t256hidevideo('"+recid+"');\"><div class=\"t256-close\"></div></a>");
    });
}

window.t256hidevideo = function(recid){
    $(document).ready(function(){
        $("body").removeClass("t256-overflow");
        $("#rec"+recid+" .t256-cover").removeClass( "t256-hidden");
        $("#rec"+recid+" .t256-video__container").addClass( "t256-hidden");
        $("#rec"+recid+" .t256-video__carier").html("<div class=\"t256-video__bg2\"></div>");
    });
} 
function t260_init(){
	$(".t260").each(function() {
		var el=$(this);
		if(el.attr('data-block-init')=='yes'){
		}else{
		  el.attr('data-block-init','yes');

          var toggler = el.find(".t260-header");
          var content = el.find(".t260-content");

          toggler.click(function() {
			$(this).toggleClass("t260-opened");
			if($(this).hasClass("t260-opened")==true){
				content.slideDown();
			}else{
				content.slideUp();
			}
          })

		}
	});
} 
function t262_appendMap() {
    if (typeof google === 'object' && typeof google.maps === 'object') {
        t262_handleApiReady();
    } else {
    	if(window.googleapiiscalled!==true){
	        var script = document.createElement("script");
	        script.type = "text/javascript";
	        script.src = "//maps.google.com/maps/api/js?callback=t262_handleApiReady";
	        document.body.appendChild(script);
	        window.googleapiiscalled=true;
	    }
    }
}

function t262_handleApiReady(){
    $('.t262_map').each(function(index,Element) {
		var el=$(Element);
		window.isDragMap = $isMobile ? false : true;

	    var myLatlng = new google.maps.LatLng(parseFloat(el.attr('data-map-x')), parseFloat(el.attr('data-map-y')));
	    var myOptions = {
            zoom: parseInt(el.attr('data-map-zoom')),
			center:myLatlng,
			scrollwheel: false,
			draggable: window.isDragMap,
			zoomControl: true
	    };
	    
	    var map = new google.maps.Map(Element, myOptions);
	
	    var marker = new google.maps.Marker({
	        position: myLatlng,
	        map: map,
	        title:el.attr('data-map-title')
	    });
	    
		// Resizing the map for responsive design
		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center); 
		}); 

        // DBL Click - activate on mobile      
        if ($isMobile) {
          google.maps.event.addDomListener(window, "dblclick", function() {
            if (window.isDragMap) {
	            window.isDragMap = false;
            } else {
	            window.isDragMap = true;
            }
            map.setOptions({draggable: window.isDragMap});
          }); 
        }

    });	
} 
window.t266showvideo = function(recid){
    $(document).ready(function(){
        var el = $('#coverCarry'+recid);
        var videourl = '';

        var youtubeid=$("#rec"+recid+" .t266-video__container").attr('data-content-popup-video-url-youtube');
        if(youtubeid > '') {
            videourl = 'https://www.youtube.com/embed/' + youtubeid;
        }

        $("body").addClass("t266-overflow");
		$("#rec"+recid+" .t266-cover").addClass( "t266-hidden");
        $("#rec"+recid+" .t266-video__container").removeClass( "t266-hidden");
        $("#rec"+recid+" .t266-video__carier").html("<iframe id=\"youtubeiframe"+recid+"\" class=\"t266-iframe\" width=\"100%\" height=\"540\" src=\"" + videourl + "?autoplay=1\" frameborder=\"0\" allowfullscreen></iframe><a class=\"t266-close__link\" href=\"javascript:t266hidevideo('"+recid+"');\"><div class=\"t266-close\"></div></a>");
    });
}

window.t266hidevideo = function(recid){
    $(document).ready(function(){
        $("body").removeClass("t266-overflow");
        $("#rec"+recid+" .t266-cover").removeClass( "t266-hidden");
        $("#rec"+recid+" .t266-video__container").addClass( "t266-hidden");
        $("#rec"+recid+" .t266-video__carier").html("<div class=\"t266-video__bg2\"></div>");
    });
} 
function t268_init(){
  $(function()
  {
    $(".t268-col_left").css({'height':($(".t268-col_right").height()+'px')});

    $(window).resize(function(){
      $(".t268-col_left").css({'height':($(".t268-col_right").height()+'px')});
    });
  });
}

$(document).ready(function(){
	t268_init();
});

 
function t281_popup_show(recid){
  var el=$('#rec'+recid).find('.t281');
  $('body').addClass('t281-body_popupshowed');
  el.addClass('t281-popup_show');
  el.find('.t281-close, .t281-bg').click(function(){
	t281_popup_close();
  });
}

function t281_popup_close(){
  $('body').removeClass('t281-body_popupshowed');
  $('.t281').removeClass('t281-popup_show');
}

function t281_init(recid){
  var el=$('#rec'+recid).find('.t281');
	var hook=el.attr('data-tooltip-hook');
    if(hook!==''){
		var obj = $('a[href*="'+hook+'"]');
        obj.click(function(e){
		  t281_popup_show(recid);
		  e.preventDefault();
        });
	}
}