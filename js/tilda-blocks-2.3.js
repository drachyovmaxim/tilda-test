 
function t117_appendMap() {
    if (typeof google === 'object' && typeof google.maps === 'object') {
        t117_handleApiReady();
    } else {
    	if(window.googleapiiscalled!==true){
	        var script = document.createElement("script");
	        script.type = "text/javascript";
	        script.src = "//maps.google.com/maps/api/js?callback=t117_handleApiReady";
	        document.body.appendChild(script);
	        window.googleapiiscalled=true;
	    }
    }
}

function t117_handleApiReady(){
    $('.t117_map').each(function(index,Element) {
		var el=$(Element);
		window.isDragMap = $isMobile ? false : true;
            
		if(el.attr('data-map-style')!=''){var mapstyle=eval(el.attr('data-map-style'));}else{var mapstyle='[]';}
	    var myLatlng = new google.maps.LatLng(parseFloat(el.attr('data-map-x')), parseFloat(el.attr('data-map-y')));
	    var myOptions = {
            zoom: parseInt(el.attr('data-map-zoom')),
			center:myLatlng,
			scrollwheel: false,
			draggable: window.isDragMap,          
			zoomControl: true,
            styles: mapstyle                                                     	
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
function t199_showMenu(recid){
  var el=$("#rec"+recid);
  el.find('.t199__js__menu').each(function() {
    var $toggler = el.find('.t199__js__menu-toggler'),
    $menu = $(this),
    $body = $('body'),
    CLASS_MENU = 't199__is__menu';
      
  $menu.find('.t199__menu-item').each(function() {
    if($(this).attr('href').indexOf('#') > -1 ){
      $(this).on('click', function(e) {
        $body.removeClass(CLASS_MENU);
        });
    }
  });      

    $toggler.on('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      $body.toggleClass(CLASS_MENU);
    });

    $(document).on('click', function() {
      $body.removeClass(CLASS_MENU);
    });

    $menu.on('click', function(e) {
      e.stopPropagation();
    });
  })
}

function t199_positionHeader(recid){
  var el=$("#rec"+recid);
  var $header = el.find('.t199__js__header'),

    isScrolling = false,

    CLASS_ACTIVE = 't199__is__active';

  function updateHeader() {
    isScrolling = true;

    if ($(window).scrollTop() > 0) $header.addClass(CLASS_ACTIVE);
    else $header.removeClass(CLASS_ACTIVE);
  }

  setInterval(function() {
    if(isScrolling) {
      isScrolling = false;
    }
  }, 100);

  $(window).on('scroll', updateHeader)
  updateHeader();
}

function t199_setPath(pageid){
  var current_path = window.location.pathname.split('/').pop();
  if(current_path=="page"+pageid+".html"){
    $("#t199linktopage"+pageid).css("opacity",".5");
  }
} 
function t228_highlight(){
  var loc=window.location.href;
  if(loc.substr(loc.length - 1) == "/"){ loc = loc.slice(0,-1); }
  $(".t228 a[href='"+loc+"']").addClass("t-active");
  $(".t228 a[href='"+loc+"/']").addClass("t-active");
}

function t228_setPath(){
}

function t228_setWidth(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      var left_exist=el.find('.t228__leftcontainer').length;
      var left_w=el.find('.t228__leftcontainer').outerWidth(true);
      var max_w=left_w;
      var right_exist=el.find('.t228__rightcontainer').length;
      var right_w=el.find('.t228__rightcontainer').outerWidth(true);
      if(left_w<right_w)max_w=right_w;
      max_w=Math.ceil(max_w);
      var center_w=0;
      el.find('.t228__centercontainer').find('li').each(function() {
        center_w+=$(this).outerWidth(true);
      });
      //console.log(max_w);
      //console.log(center_w);
      var padd_w=40;
      var maincontainer_width=el.find(".t228__maincontainer").outerWidth(true);
      if(maincontainer_width-max_w*2-padd_w*2>center_w+20){
          //if(left_exist>0 && right_exist>0){
            el.find(".t228__leftside").css("min-width",max_w+"px");
            el.find(".t228__rightside").css("min-width",max_w+"px");
          //}
       }else{
          el.find(".t228__leftside").css("min-width","");
          el.find(".t228__rightside").css("min-width","");               
      }
    });
  }
}

function t228_setBg(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      if(el.attr('data-bgcolor-setbyscript')=="yes"){
        var bgcolor=el.attr("data-bgcolor-rgba");
        el.css("background-color",bgcolor);             
      }
      });
      }else{
        $(".t228").each(function() {
          var el=$(this);
          var bgcolor=el.attr("data-bgcolor-hex");
          el.css("background-color",bgcolor);
          el.attr("data-bgcolor-setbyscript","yes");
      });
  }
}

function t228_appearMenu(recid) {
      var window_width=$(window).width();
      if(window_width>980){
           $(".t228").each(function() {
                  var el=$(this);
                  var appearoffset=el.attr("data-appearoffset");
                  if(appearoffset!=""){
                          if(appearoffset.indexOf('vh') > -1){
                              appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                          }

                          appearoffset=parseInt(appearoffset, 10);

                          if ($(window).scrollTop() >= appearoffset) {
                            if(el.css('visibility') == 'hidden'){
                                el.finish();
                                el.css("top","-50px");  
                                el.css("visibility","visible");
                                el.animate({"opacity": "1","top": "0px"}, 200,function() {
                                });       
                            }
                          }else{
                            el.stop();
                            el.css("visibility","hidden");
                          }
                  }
           });
      }

}

function t228_changebgopacitymenu() {
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      var bgcolor=el.attr("data-bgcolor-rgba");
      var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
      var bgopacityone=el.attr("data-bgopacity");
      var bgopacitytwo=el.attr("data-bgopacity-two");
      var menushadow=el.attr("data-menushadow");
      if(menushadow=='100'){
        var menushadowvalue=menushadow;
      }else{
        var menushadowvalue='0.'+menushadow;
      }
      if ($(window).scrollTop() > 20) {
        el.css("background-color",bgcolor_afterscroll);
        if(bgopacitytwo=='0' || menushadow==' '){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }else{
        el.css("background-color",bgcolor);
        if(bgopacityone=='0.0' || menushadow==' '){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }
    });
  }
}



 
window.t256showvideo = function(recid){
    $(document).ready(function(){
        var el = $('#coverCarry'+recid);
        var videourl = '';

        var youtubeid=$("#rec"+recid+" .t256__video-container").attr('data-content-popup-video-url-youtube');
        if(youtubeid > '') {
            videourl = 'https://www.youtube.com/embed/' + youtubeid;
        }

        $("body").addClass("t256__overflow");
		$("#rec"+recid+" .t256__cover").addClass( "t256__hidden");
        $("#rec"+recid+" .t256__video-container").removeClass( "t256__hidden");
        $("#rec"+recid+" .t256__video-carier").html("<iframe id=\"youtubeiframe"+recid+"\" class=\"t256__iframe\" width=\"100%\" height=\"540\" src=\"" + videourl + "?autoplay=1\" frameborder=\"0\" allowfullscreen></iframe><a class=\"t256__close-link\" href=\"javascript:t256hidevideo('"+recid+"');\"><div class=\"t256__close\"></div></a>");
    });
}

window.t256hidevideo = function(recid){
    $(document).ready(function(){
        $("body").removeClass("t256__overflow");
        $("#rec"+recid+" .t256__cover").removeClass( "t256__hidden");
        $("#rec"+recid+" .t256__video-container").addClass( "t256__hidden");
        $("#rec"+recid+" .t256__video-carier").html("<div class=\"t256__video-bg2\"></div>");
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
    var t279 = {};
    
    t279.equalheight = function(recid) {

        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
            
        $('#rec'+recid+' .t279__textwrapper').each(function() {
     
            $el = $(this);
            $($el).height('auto')
            topPostion = $el.position().top;
       
            if (currentRowStart != topPostion) {
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0;
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    };
 
function t280_showMenu(recid){
  var el=$("#rec"+recid);
  el.find('.t280__burger, .t280__menu, .t280__menu__bg').click(function(){
    $('body').toggleClass('t280_opened');
  });
}

function t280_changeSize(recid){
  var el=$("#rec"+recid);
  var div = el.find(".t280__menu").height();
  var bottomheight = el.find(".t280__bottom").height();
  var headerheight = el.find(".t280__container").height();
  var wrapper = el.find(".t280__menu__wrapper");
  var win = $(window).height() - bottomheight - headerheight - 40;
  if (div > win ) {
    wrapper.addClass('t280__menu_static');
  }
  else {
    wrapper.removeClass('t280__menu_static');
  }
}

function t280_changeBgOpacityMenu(recid) {
            var window_width=$(window).width();
            var record = $("#rec"+recid);
               record.find(".t280__container__bg").each(function() {
                      var el=$(this);
                        var bgcolor=el.attr("data-bgcolor-rgba");
                        var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
                        var bgopacity=el.attr("data-bgopacity");
                        var bgopacity_afterscroll=el.attr("data-bgopacity2");
                        var menu_shadow=el.attr("data-menu-shadow");
                        if ($(window).scrollTop() > 20) {
                            el.css("background-color",bgcolor_afterscroll);
                            if (bgopacity_afterscroll != "0" && bgopacity_afterscroll != "0.0") {
                              el.css('box-shadow',menu_shadow);
                            } else {
                              el.css('box-shadow','none');
                            }
                        }else{
                            el.css("background-color",bgcolor);
                            if (bgopacity != "0" && bgopacity != "0.0") {
                              el.css('box-shadow',menu_shadow);
                            } else {
                              el.css('box-shadow','none');
                            }
                        }
               });
        
        } 
function t281_showPopup(recid){
  var el=$('#rec'+recid).find('.t281');
  $('body').addClass('t281__body_popupshowed');
  if(el.find('.t281__popup').attr('style') && el.find('.t281__popup').attr('style') > '') {
    el.find('.t281__popup').attr('style','');
  }
  el.addClass('t281__popup_show');
  el.find('.t281__close, .t281__content, .t281__bg').click(function(){
  t281_closePopup();
  });
  $('.t281__mainblock').click(function( event ) {
    event.stopPropagation();
  });
  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
     $('body').removeClass('t281__body_popupshowed');
      $('.t281').removeClass('t281__popup_show');
    }
  });
}

function t281_closePopup(){
  $('body').removeClass('t281__body_popupshowed');
  $('.t281').removeClass('t281__popup_show');
  $('.t281__mainblock').click(function( event ) {
    event.stopPropagation();
  });
}

function t281_resizePopup(recid){
  var el = $("#rec"+recid);
  var div = el.find(".t281__mainblock").height();
  var win = $(window).height() - 170;
  var popup = el.find(".t281__content");
  if (div > win ) {
    popup.addClass('t281__content_static');
  }
  else {
    popup.removeClass('t281__content_static');
  }
}

function t281_initPopup(recid){
  var el=$('#rec'+recid).find('.t281');
  var hook=el.attr('data-tooltip-hook');
  if(hook!==''){
      var obj = $('a[href*="'+hook+'"]');
      obj.click(function(e){
        t281_showPopup(recid);
        t281_resizePopup(recid);
        e.preventDefault();
      });
  }
} 
function t282_showMenu(recid){
  var el=$("#rec"+recid);
  el.find('.t282__burger, .t282__menu__item, .t282__overlay').click(function(){
    $('body').toggleClass('t282_opened');
    el.find('.t282__menu__container, .t282__overlay').toggleClass('t282__closed');
    el.find(".t282__menu__container").css({'top':(el.find(".t282__container").height()+'px')});
  });
}

function t282_changeSize(recid){
  var el=$("#rec"+recid);
  var bottomheight = el.find(".t282__menu__container");
  var headerheight = el.find(".t282__container");
  var menu = bottomheight.height() + headerheight.height();
  var win = $(window).height();
  if (menu > win ) {
    $("#nav"+recid).addClass('t282__menu_static');
  }
  else {
    $("#nav"+recid).removeClass('t282__menu_static');
  }
}

function t282_changeBgOpacityMenu(recid) {
            var window_width=$(window).width();
            var record = $("#rec"+recid);
               record.find(".t282__container__bg").each(function() {
                      var el=$(this);
                        var bgcolor=el.attr("data-bgcolor-rgba");
                        var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
                        var bgopacity=el.attr("data-bgopacity");
                        var bgopacity_afterscroll=el.attr("data-bgopacity2");
                        var menu_shadow=el.attr("data-menu-shadow");
                        if ($(window).scrollTop() > 20) {
                            el.css("background-color",bgcolor_afterscroll);
                            if (bgopacity_afterscroll != "0" && bgopacity_afterscroll != "0.0") {
                              el.css('box-shadow',menu_shadow);
                            } else {
                              el.css('box-shadow','none');
                            }
                        }else{
                            el.css("background-color",bgcolor);
                            if (bgopacity != "0" && bgopacity != "0.0") {
                              el.css('box-shadow',menu_shadow);
                            } else {
                              el.css('box-shadow','none');
                            }
                        }
               });
        
        } 
function t330_showPopup(recid){
  var el=$('#rec'+recid).find('.t330');
  $('body').addClass('t330__body_popupshowed');
  if(el.find('.t330__popup').attr('style') && el.find('.t330__popup').attr('style') > '') {
    el.find('.t330__popup').attr('style','');
  }
  el.addClass('t330__popup_show');
  el.find('.t330__close, .t330__content, .t330__bg').click(function(){
  t330_closePopup();
  });
  $('.t330__mainblock').click(function( event ) {
    event.stopPropagation();
  });
  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
     $('body').removeClass('t330__body_popupshowed');
      $('.t330').removeClass('t330__popup_show');
    }
});
}

function t330_closePopup(){
  $('body').removeClass('t330__body_popupshowed');
  $('.t330').removeClass('t330__popup_show');
  $('.t330__mainblock').click(function( event ) {
    event.stopPropagation();
  });
}

function t330_resizePopup(recid){
  var el = $("#rec"+recid);
  var div = el.find(".t330__mainblock").height();
  var win = $(window).height() - 170;
  var popup = el.find(".t330__content");
  if (div > win ) {
    popup.addClass('t330__content_static');
  }
  else {
    popup.removeClass('t330__content_static');
  }
}

function t330_initPopup(recid){
  var el=$('#rec'+recid).find('.t330');
  var hook=el.attr('data-tooltip-hook');
  if(hook!==''){
      var obj = $('a[href*="'+hook+'"]');
      obj.click(function(e){
        t330_showPopup(recid);
        t330_resizePopup(recid);
        e.preventDefault();
      });
  }
} 
function t331_setHeight(recid){
  var el=$('#rec'+recid);
  var div = el.find(".t331__video-carier");
  var height=div.width() * 0.5625;
  div.height(height);
  div.parent().height(height);
}

function t331_showPopup(recid){
  var el=$('#rec'+recid).find('.t331');
  $('body').addClass('t331__body_popupshowed');
  var youtubeid=$("#rec"+recid+" .t331__youtube").attr('data-content-popup-video-url-youtube');
  var videourl = 'https://www.youtube.com/embed/' + youtubeid;
  $("#rec"+recid+" .t331__video-carier").html("<iframe id=\"youtubeiframe"+recid+"\" class=\"t331__iframe\" width=\"100%\" height=\"100%\" src=\"" + videourl + "?autoplay=1\" frameborder=\"0\" allowfullscreen></iframe>");
  if(el.find('.t331__popup').attr('style') && el.find('.t331__popup').attr('style') > '') {
    el.find('.t331__popup').attr('style','');
  }
  el.addClass('t331__popup_show');
  el.find('.t331__close, .t331__bg').click(function(){
  t331_closePopup(recid);
  });
  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
     $('body').removeClass('t331__body_popupshowed');
      $('.t331').removeClass('t331__popup_show');
      $("#rec"+recid+" .t331__video-carier").html("");
    }
});
}

function t331_closePopup(recid){
  $('body').removeClass('t331__body_popupshowed');
  $('.t331').removeClass('t331__popup_show');
  $("#rec"+recid+" .t331__video-carier").html("");
}

function t331_initPopup(recid){
  var el=$('#rec'+recid).find('.t331');
  var hook=el.attr('data-tooltip-hook');
  if(hook!==''){
      var obj = $('a[href*="'+hook+'"]');
      obj.click(function(e){
        t331_showPopup(recid);
        t331_resizePopup(recid);
        e.preventDefault();
      });
  }
}

function t331_resizePopup(recid){
  var el = $("#rec"+recid);
  var div = el.find(".t331__mainblock").height();
  var win = $(window).height();
  var popup = el.find(".t331__content");
  if (div > win ) {
    popup.addClass('t331__content_static');
  }
  else {
    popup.removeClass('t331__content_static');
  }
} 
var t334 = {};
t334.initeffect = function (recid){
    $('#rec'+recid).find(".t334__cell").hover(function(){
      var sizer = $(this).find(".t334__button-container").height();
      $(this).find(".t334__textwrapper__content").css({'padding-bottom':(sizer+'px')});
      $(this).find(".t334__button-container").addClass("t334__button-container_show");
    }, function(){
      $(this).find(".t334__textwrapper__content").css("padding-bottom","0");
      $(this).find(".t334__button-container").removeClass("t334__button-container_show");
    });
};
  
 
	var t335 = {};
    t335.initeffect = function(recid) {
        $('#rec'+recid).find(".t335__cell").hover(function(){
            var sizer = $(this).find(".t335__button-container").height();
            $(this).find(".t335__textwrapper__content").css({'padding-bottom':(sizer+'px')});
            $(this).find(".t335__button-container").addClass("t335__button-container_show");
        }, function(){
            $(this).find(".t335__textwrapper__content").css("padding-bottom","0");
            $(this).find(".t335__button-container").removeClass("t335__button-container_show");
        });
    };
 
    var t336 = {};
    t336.initeffect = function(recid){
        $('#rec'+recid).find(".t336__cell").hover(function(){
            var sizer = $(this).find(".t336__button-container").height();
            $(this).find(".t336__textwrapper__content").css({'padding-bottom':(sizer+'px')});
            $(this).find(".t336__button-container").addClass("t336__button-container_show");
        }, function(){
            $(this).find(".t336__textwrapper__content").css("padding-bottom","0");
            $(this).find(".t336__button-container").removeClass("t336__button-container_show");
        });
    };
    
 
function t341_showCaptions(recid){
  var el=$("#t-carousel"+recid);
  var caption = el.find('.item:nth-child(1) .t-carousel__caption-inside');
  var captioncontainer = el.find('.t-carousel__caption__container');
  captioncontainer.html(caption.html());
  caption.css('display','none');

  $("#t-carousel"+recid).on('slide.bs.carousel', function(evt) {
    var el=$("#t-carousel"+recid);
    var caption = el.find('.item:nth-child(' + ($(evt.relatedTarget).index()+1) + ') .t-carousel__caption-inside');
    var captioncontainer = el.find('.t-carousel__caption__container');
    captioncontainer.html(caption.html());
    caption.css('display','none');
  });
}

function t341_checkSize(recid){
  var el=$("#rec"+recid);
  var containerinside = el.find(".t-carousel__arrows__container_inside");
  var containeroutside = el.find(".t-carousel__arrows__container_outside");
  var inner = el.find(".t-carousel__inner");
  var arrowleft = el.find(".t-carousel__arrow_left");
  var arrowright = el.find(".t-carousel__arrow_right");
  containeroutside.css({'max-width':(arrowleft.width()+arrowright.width()+inner.width()+ 60 +'px')});
  containerinside.css({'max-width':(inner.width()+'px')});

  var element = el.find('.t-carousel__checksize');
  var sizer = el.find('.t-carousel__height');
  if (window.matchMedia('(max-width: 800px)').matches) {
    var ratio = 0.9;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 700px)').matches) {
    var ratio = 0.8;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 600px)').matches) {
    var ratio = 0.7;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 500px)').matches) {
    var ratio = 0.6;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 400px)').matches) {
    var ratio = 0.5;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(min-width: 800px)').matches) {
    element.height(sizer.height());
  }
} 
function t347_setHeight(recid){
  var el=$('#rec'+recid);
  var div = el.find(".t347__table");
  var height=div.width() * 0.5625;
  div.height(height);
}

window.t347showvideo = function(recid){
    $(document).ready(function(){
        var el = $('#rec'+recid);
        var videourl = '';

        var youtubeid=$("#rec"+recid+" .t347__video-container").attr('data-content-popup-video-url-youtube');
        if(youtubeid > '') {
            videourl = 'https://www.youtube.com/embed/' + youtubeid;
        }

        $("#rec"+recid+" .t347__video-container").removeClass( "t347__hidden");
        $("#rec"+recid+" .t347__video-carier").html("<iframe id=\"youtubeiframe"+recid+"\" class=\"t347__iframe\" width=\"100%\" height=\"100%\" src=\"" + videourl + "?autoplay=1\" frameborder=\"0\" allowfullscreen></iframe>");
    });
}

window.t347hidevideo = function(recid){
    $(document).ready(function(){
        $("#rec"+recid+" .t347__video-container").addClass( "t347__hidden");
        $("#rec"+recid+" .t347__video-carier").html("");
    });
} 
function t900_appendMap() {
    if (typeof google === 'object' && typeof google.maps === 'object') {
        t900_handleApiReady();
    } else {
      if(window.googleapiiscalled!==true){
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "//maps.google.com/maps/api/js?callback=t900_handleApiReady";
          document.body.appendChild(script);
          window.googleapiiscalled=true;
      }
    }
}

function t900_handleApiReady(){
    $('.t900_map').each(function(index,Element) {
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
function t349_floating_init(el){
    console.log('floating_init');

    var wnd=$(window);
    var col=el.parent();

    el.css('max-width',el.width());
    el.css('width','100%');
    col.css('min-height',el.height());

    var timer;
    var timer_count=0;
    var timer_react=5;

    wnd.scroll(function() {
        if(timer) {
            window.clearTimeout(timer);
            if(timer_count>=timer_react){
                t349_floating_scroll(el,wnd,col);
                timer_count=0;
            }
            timer_count++;
        }

        timer = window.setTimeout(function() {
                t349_floating_scroll(el,wnd,col);
                timer_count=0;    
        }, 50);
    });        


    wnd.resize(function() {
         wnd.scroll();
    });

    wnd.scroll();
}

function t349_floating_scroll(el,wnd,col){
    var wnd_height = wnd.height();
    var wnd_width = wnd.width();

    if(wnd_width<=1024){
        el.removeClass('t349__fixedTop');
        el.removeClass('t349__fixedBottom');
        el.removeClass('t349__floating');
        return('');
    }

    el.css('max-width',col.width());

    if(col.height()<el.height() && col.height()>0){
        col.height(el.height());
    }

    var el_height = el.height();
    var col_top = col.offset().top;
    var col_width = col.width();
    var col_height = col.height();
    var col_bottom = col_top + col_height;

    var wnd_top = wnd.scrollTop();
    var wnd_bottom = wnd_top + wnd_height;  

    if(wnd_top+el_height+50 >= col_bottom){
        //console.log('fixedbottom');
        el.addClass('t349__fixedBottom');
        el.removeClass('t349__fixedTop');
        el.removeClass('t349__floating');
    }else if(wnd_top+50 > col_top){
        //console.log('floating');
        el.addClass('t349__floating');
        el.removeClass('t349__fixedBottom');
        el.removeClass('t349__fixedTop');
    }else{
        //console.log('fixedtop');
        el.addClass('t349__fixedTop');
        el.removeClass('t349__fixedBottom');  
        el.removeClass('t349__floating');
    }
} 
function t351_setSize(recid){
  var el=$("#rec"+recid);
  var height = el.find(".t351__sizer").height();
  var width = el.find(".t351__sizer").width();
  var ratio = width/height;
  var imgwrapper = el.find(".t351__imgwrapper");
  var imgwidth = imgwrapper.width();
  imgwrapper.css({'height':((imgwidth/ratio)+'px')});
} 
function t353_setSize(recid){
  var el=$("#rec"+recid);
  var height = el.find(".t353__sizer").height();
  var width = el.find(".t353__sizer").width();
  var ratio = width/height;
  var imgwrapper = el.find(".t353__imgwrapper");
  var imgwidth = imgwrapper.width();
  imgwrapper.css({'height':((imgwidth/ratio)+'px')});
}

function t353_setHeight(recid){
  var currentTallest = 0,
      currentRowStart = 0,
      rowDivs = new Array(),
      $el,
      topPosition = 0;
      
  $('#rec'+recid+' .t353__wrapper').each(function() {

      $el = $(this);
      $($el).height('auto')
      topPostion = $el.position().top;
 
      if (currentRowStart != topPostion) {
          for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
              rowDivs[currentDiv].height(currentTallest);
          }
          rowDivs.length = 0;
          currentRowStart = topPostion;
          currentTallest = $el.height();
          rowDivs.push($el);
      } else {
          rowDivs.push($el);
          currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
      }
      for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
          rowDivs[currentDiv].height(currentTallest);
      }
  });
  $('#rec'+recid+' .t353__textwrapper').each(function() {

      $el = $(this);
      $($el).height('auto')
      topPostion = $el.position().top;
 
      if (currentRowStart != topPostion) {
          for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
              rowDivs[currentDiv].height(currentTallest);
          }
          rowDivs.length = 0;
          currentRowStart = topPostion;
          currentTallest = $el.height();
          rowDivs.push($el);
      } else {
          rowDivs.push($el);
          currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
      }
      for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
          rowDivs[currentDiv].height(currentTallest);
      }
  });
} 
function t354_createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function t354_readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function t354_checkPosition(recid){
  var el = $('#rec'+recid).find('.t354__opener');
  var name = el.attr('data-cookie-name');
  var time = el.attr('data-cookie-time');
  var multiplier = el.attr('data-trigger-position');
  var position = $(window).height() * multiplier;
  var value = "t354cookie";
  var cookie = t354_readCookie(name);
  if (cookie) {
    $("#rec"+recid+" .t354").html("");
  }else if (el.length){
    var scroll = $(window).scrollTop() + position;
    var objoffset = el.offset().top;
    if (scroll >= objoffset) {
      el.trigger('click');
      $("#rec"+recid+" .t354").html("");
      t354_createCookie(name,value,time);
    }
  }
} 
function t358_setHeight(recid){
  var el=$('#rec'+recid);
  var div = el.find(".t358__video-carier");
  var height=div.width() * 0.5625;
  div.height(height);
  div.parent().height(height);
}

function t358_showPopup(recid){
  var el=$('#rec'+recid).find('.t358');
  $('body').addClass('t358__body_popupshowed');
  var vimeoid=$("#rec"+recid+" .t358__vimeo").attr('data-content-popup-video-url-vimeo');
  var videourl = '//player.vimeo.com/video/' + vimeoid;
  $("#rec"+recid+" .t358__video-carier").html("<iframe id=\"vimeoiframe"+recid+"\" class=\"t358__iframe\" width=\"100%\" height=\"100%\" src=\"" + videourl + "?title=0&byline=0&portrait=0&badge=0&color=ffffff&autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
  if(el.find('.t358__popup').attr('style') && el.find('.t358__popup').attr('style') > '') {
    el.find('.t358__popup').attr('style','');
  }
  el.addClass('t358__popup_show');
  el.find('.t358__close, .t358__bg').click(function(){
  t358_closePopup(recid);
  });
  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
     $('body').removeClass('t358__body_popupshowed');
      $('.t358').removeClass('t358__popup_show');
      $("#rec"+recid+" .t358__video-carier").html("");
    }
});
}

function t358_closePopup(recid){
  $('body').removeClass('t358__body_popupshowed');
  $('.t358').removeClass('t358__popup_show');
  $("#rec"+recid+" .t358__video-carier").html("");
}

function t358_initPopup(recid){
  var el=$('#rec'+recid).find('.t358');
  var hook=el.attr('data-tooltip-hook');
  if(hook!==''){
      var obj = $('a[href*="'+hook+'"]');
      obj.click(function(e){
        t358_showPopup(recid);
        t358_resizePopup(recid);
        e.preventDefault();
      });
  }
}

function t358_resizePopup(recid){
  var el = $("#rec"+recid);
  var div = el.find(".t358__mainblock").height();
  var win = $(window).height();
  var popup = el.find(".t358__content");
  if (div > win ) {
    popup.addClass('t358__content_static');
  }
  else {
    popup.removeClass('t358__content_static');
  }
} 
function t359_showPopup(recid){
  var el=$('#rec'+recid).find('.t359');
  $('body').addClass('t359__body_popupshowed');
  if(el.find('.t359__popup').attr('style') && el.find('.t359__popup').attr('style') > '') {
    el.find('.t359__popup').attr('style','');
  }
  el.addClass('t359__popup_show');
  el.find('.t359__close, .t359__bg').click(function(){
  t359_closePopup(recid);
  });
  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
     $('body').removeClass('t359__body_popupshowed');
     $('.t359').removeClass('t359__popup_show');
    }
  });
}

function t359_closePopup(recid){
  $('body').removeClass('t359__body_popupshowed');
  $('.t359').removeClass('t359__popup_show');
}

function t359_initPopup(recid){
  var el=$('#rec'+recid).find('.t359');
  var hook=el.attr('data-tooltip-hook');
  if(hook!==''){
    var obj = $('a[href*="'+hook+'"]');
    obj.click(function(e){
      el.addClass('t-hookable');
      t359_showPopup(recid);
      t359_resizePopup(recid);
      t359_resizeGallery(recid);
      e.preventDefault();
    });
  }
}

function t359_resizePopup(recid){
  var el = $("#rec"+recid);
  var div = el.find(".t359__mainblock").height();
  var win = $(window).height();
  var popup = el.find(".t359__content");
  if (div > win ) {
    popup.addClass('t359__content_static');
  }
  else {
    popup.removeClass('t359__content_static');
  }
}

function t359_showCaptions(recid){
  var el=$("#t-carousel"+recid);
  var caption = el.find('.item:nth-child(1) .t-carousel__caption-inside');
  var captioncontainer = el.find('.t-carousel__caption__container');
  captioncontainer.html(caption.html());
  caption.css('display','none');

  $("#t-carousel"+recid).on('slide.bs.carousel', function(evt) {
    var el=$("#t-carousel"+recid);
    var caption = el.find('.item:nth-child(' + ($(evt.relatedTarget).index()+1) + ') .t-carousel__caption-inside');
    var captioncontainer = el.find('.t-carousel__caption__container');
    captioncontainer.html(caption.html());
    caption.css('display','none');
  });
}

function t359_positionArrows(recid){
  var el=$("#rec"+recid);
  var containerinside = el.find(".t-carousel__arrows__container_inside");
  var containeroutside = el.find(".t-carousel__arrows__container_outside");
  var inner = el.find(".t-carousel__inner");
  var arrowleft = el.find(".t-carousel__arrow_left");
  var arrowright = el.find(".t-carousel__arrow_right");
  containeroutside.css({'max-width':(arrowleft.width()+arrowright.width()+inner.width()+ 60 +'px')});
  containerinside.css({'max-width':(inner.width()+'px')});
}

function t359_resizeGallery(recid){
  var el=$("#rec"+recid);
  var element = el.find('.t-carousel__checksize');
  var sizer = el.find('.t-carousel__height');
  if (window.matchMedia('(max-width: 800px)').matches) {
    var ratio = 0.9;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 700px)').matches) {
    var ratio = 0.8;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 600px)').matches) {
    var ratio = 0.7;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 500px)').matches) {
    var ratio = 0.6;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 400px)').matches) {
    var ratio = 0.5;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(min-width: 800px)').matches) {
    element.height(sizer.height());
  }
} 
function t364_createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function t364_readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function t364_showPopup(recid){
  var el=$('#rec'+recid).find('.t364');
  $('body').addClass('t364__body_popupshowed');
  el.addClass('t364__popup_show');
  el.find('.t364__close, .t364__content, .t364__bg').click(function(){
    t364_closePopup();
  });
  el.find('.t364__text').click(function(){
    t364_closePopup();
    t364_createCookie('t364closefb','yes',30);
  });
  $('.t364__mainblock').click(function( event ) {
    event.stopPropagation();
  });
  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
     $('body').removeClass('t364__body_popupshowed');
      $('.t364').removeClass('t364__popup_show');
    }
});
}

function t364_closePopup(){
  $('body').removeClass('t364__body_popupshowed');
  $('.t364').removeClass('t364__popup_show');
  $('.t364__mainblock').click(function( event ) {
    event.stopPropagation();
  });
}

function t364_resizePopup(recid){
  var el = $("#rec"+recid);
  var div = el.find(".t364__mainblock").height();
  var win = $(window).height() - 30;
  var popup = el.find(".t364__content");
  if (div > win ) {
    popup.addClass('t364__content_static');
  }
  else {
    popup.removeClass('t364__content_static');
  }
}

function t364_initPopup(recid){
  var el=$('#rec'+recid).find('.t364');
  var hook=el.attr('data-tooltip-hook');
  var cookieexist=el.attr('data-cookies-exist');
  if(cookieexist!=='yes'){
    var cookie = t364_readCookie('');
  } else var cookie = t364_readCookie('t364closefb');
  if(hook!=='' && cookie!=='yes'){
    var obj = $('a[href*="'+hook+'"]');
    obj.click(function(e){
      t364_showPopup(recid);
      t364_resizePopup(recid);
      e.preventDefault();
    });
  }
} 
function t365_createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function t365_readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function t365_showPopup(recid){
  var el=$('#rec'+recid).find('.t365');
  $('body').addClass('t365__body_popupshowed');
  if(el.find('.t365__popup').attr('style') && el.find('.t365__popup').attr('style') > '') {
    el.find('.t365__popup').attr('style','');
  }
  el.addClass('t365__popup_show');
  el.find('.t365__close, .t365__content, .t365__bg').click(function(){
    t365_closePopup();
  });
  el.find('.t365__text').click(function(){
    t365_closePopup();
    t365_createCookie('t365closefb','yes',30);
  });
  $('.t365__mainblock').click(function( event ) {
    event.stopPropagation();
  });
  $(document).keydown(function(e) {
      if (e.keyCode == 27) {
       $('body').removeClass('t365__body_popupshowed');
        $('.t365').removeClass('t365__popup_show');
      }
  });
}

function t365_closePopup(){
  $('body').removeClass('t365__body_popupshowed');
  $('.t365').removeClass('t365__popup_show');
  $('.t365__mainblock').click(function( event ) {
    event.stopPropagation();
  });
}

function t365_resizePopup(recid){
  var el = $("#rec"+recid);
  var div = el.find(".t365__mainblock").height();
  var win = $(window).height() - 30;
  var popup = el.find(".t365__content");
  if (div > win ) {
    popup.addClass('t365__content_static');
  }
  else {
    popup.removeClass('t365__content_static');
  }
}

function t365_initPopup(recid){
  var el=$('#rec'+recid).find('.t365');
  var hook=el.attr('data-tooltip-hook');
  var cookieexist=el.attr('data-cookies-exist');
  if(cookieexist!=='yes'){
    var cookie = t365_readCookie('');
  } else var cookie = t365_readCookie('t365closefb');
  if(hook!=='' && cookie!=='yes'){
    var obj = $('a[href*="'+hook+'"]');
    obj.click(function(e){
      t365_showPopup(recid);
      t365_resizePopup(recid);
      e.preventDefault();
    });
  }
} 
function t366_showPopup(recid){
  var el=$('#rec'+recid).find('.t366');
  $('body').addClass('t366__body_popupshowed');
  el.addClass('t366__popup_show');
  el.find('.t366__close, .t366__bg, .t366__closer').click(function(e){
    t366_closePopup();
  });
  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
     t366_closePopup();
    }
  });
}

function t366_closePopup(){
  $('body').removeClass('t366__body_popupshowed');
  $('.t366').removeClass('t366__popup_show');
}

function t366_resizePopup(recid){
  var el = $("#rec"+recid);
  var div = el.find(".t366__mainblock").height();
  var win = $(window).height() - 170;
  var popup = el.find(".t366__content");
  if (div > win ) {
    popup.addClass('t366__content_static');
  }
  else {
    popup.removeClass('t366__content_static');
  }
}

function t366_initPopup(recid){
  var el=$('#rec'+recid).find('.t366');
  var hook=el.attr('data-tooltip-hook');
  if(hook!==''){
      var obj = $('a[href*="'+hook+'"]');
      obj.click(function(e){
        t366_showPopup(recid);
        t366_resizePopup(recid);
        t366_resizeGallery(recid);
        e.preventDefault();
      });
  }
}

function t366_resizeGallery(recid){
  var el=$("#rec"+recid);
  var element = el.find('.t-carousel__checksize');
  var sizer = el.find('.t-carousel__height');
  if (window.matchMedia('(max-width: 800px)').matches) {
    var ratio = 0.9;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 700px)').matches) {
    var ratio = 0.8;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 600px)').matches) {
    var ratio = 0.7;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 500px)').matches) {
    var ratio = 0.6;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 400px)').matches) {
    var ratio = 0.5;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(min-width: 800px)').matches) {
    element.height(sizer.height());
  }
} 
function t367_createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function t367_readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function t367_autoInit(recid){
  var el = $('#rec'+recid).find('.t367__opener');
  var name = el.attr('data-cookie-name');
  var time = el.attr('data-cookie-time');
  var value = "t367cookie";
  var cookie = t367_readCookie(name);
  var delay = el.attr('data-trigger-time');
  var delaytime = delay * 1000;
  if (cookie) {
    $("#rec"+recid+" .t367").html("");
  }else if (el.length){
    setTimeout(function () {
      el.trigger('click');
      $("#rec"+recid+" .t367").html("");
      t367_createCookie(name,value,time);
    }, delaytime);
  }
} 
function t369_showPopup(recid){
  var el=$('#rec'+recid).find('.t369');
  $('body').addClass('t369__body_popupshowed');
  el.addClass('t369__popup_show');
  el.find('.t369__close, .t369__bg, .t369__closer').click(function(e){
    t369_closePopup();
  });
  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
     t369_closePopup();
    }
  });
}

function t369_closePopup(){
  $('body').removeClass('t369__body_popupshowed');
  $('.t369').removeClass('t369__popup_show');
}

function t369_resizePopup(recid){
  var el = $("#rec"+recid);
  var div = el.find(".t369__mainblock").height();
  var win = $(window).height() - 170;
  var popup = el.find(".t369__content");
  if (div > win ) {
    popup.addClass('t369__content_static');
  }
  else {
    popup.removeClass('t369__content_static');
  }
}

function t369_initPopup(recid){
  var el=$('#rec'+recid).find('.t369');
  var hook=el.attr('data-tooltip-hook');
  if(hook!==''){
      var obj = $('a[href*="'+hook+'"]');
      obj.click(function(e){
        t369_showPopup(recid);
        t369_resizePopup(recid);
        t369_resizeGallery(recid);
        e.preventDefault();
      });
  }
}

function t369_resizeGallery(recid){
  var el=$("#rec"+recid);
  var element = el.find('.t-carousel__checksize');
  var sizer = el.find('.t-carousel__height');
  if (window.matchMedia('(max-width: 800px)').matches) {
    var ratio = 0.9;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 700px)').matches) {
    var ratio = 0.8;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 600px)').matches) {
    var ratio = 0.7;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 500px)').matches) {
    var ratio = 0.6;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(max-width: 400px)').matches) {
    var ratio = 0.5;
    element.height(sizer.height() * ratio);
  }
  if (window.matchMedia('(min-width: 800px)').matches) {
    element.height(sizer.height());
  }
}