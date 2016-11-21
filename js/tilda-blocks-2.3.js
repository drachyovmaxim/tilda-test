 
function t121_setHeight(recid){
    var div=$("#youtubeiframe"+recid);
    var height=div.width() * 0.5625;
    div.height(height);
    div.parent().height(height);         
} 
function t117_appendGoogleMap(recid, key) {
	var grecid = recid;
	if (typeof google === 'object' && typeof google.maps === 'object') {
		t117_handleGoogleApiReady(grecid);
	} else {
		if(window.googleapiiscalled!==true){
		
			var runfunc = 'window.t117_handleGoogleApiReady_'+grecid+' = function () { t117_handleGoogleApiReady("'+grecid+'") }';
			eval(runfunc);
			
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "//maps.google.com/maps/api/js?key="+jQuery.trim(key)+"&callback=t117_handleGoogleApiReady_"+grecid;
			document.body.appendChild(script);
			window.googleapiiscalled=true;
		} else {
		  setTimeout(function(){
			t117_appendGoogleMap(grecid,key);
		  },200);
	  }
	}
}

function t117_handleGoogleApiReady(recid){
	$('#rec'+recid).find('.t117_map').each(function(index,Element) {
		var el=$(Element);
		var arMarkers = window['arMapMarkers'+recid];
		window.isDragMap = $isMobile ? false : true;
			
		if(el.attr('data-map-style')!=''){var mapstyle=eval(el.attr('data-map-style'));}else{var mapstyle='[]';}
		var myLatLng = arMarkers.length > 0 ? new google.maps.LatLng(parseFloat(arMarkers[0].lat), parseFloat(arMarkers[0].lng)) : false;
		var myOptions = {
			zoom: parseInt(el.attr('data-map-zoom')),
			center:myLatLng,
			scrollwheel: false,
			draggable: window.isDragMap,
			zoomControl: true,
			styles: mapstyle
		};
		
		var map = new google.maps.Map(Element, myOptions);
	
		var i, mrk, marker, markers=[], infowindow;
		var bounds = new google.maps.LatLngBounds();
		for(i in arMarkers) {
			mrk = arMarkers[i];
			myLatLng = new google.maps.LatLng(parseFloat(mrk.lat), parseFloat(mrk.lng));
			marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: mrk.title
			});
			bounds.extend(myLatLng);

			if (mrk.descr > '') {
				attachInfoMessage(marker, mrk.descr);
			} else {
				attachInfoMessage(marker, mrk.title);
			}

			markers[markers.length] = marker;
			infowindow='';
			marker='';
		}
		
		function attachInfoMessage(marker, descr) {
			var infowindow = new google.maps.InfoWindow({
				content:  $("<textarea/>").html(descr).text()
			});
		  
			marker.addListener('click', function() {
				infowindow.open(marker.get('map'), marker);
			});
		}
		
		if (arMarkers.length > 1) {
			map.fitBounds(bounds);
			if (map.getZoom() > parseInt(el.attr('data-map-zoom'))) {
				map.setZoom(parseInt(el.attr('data-map-zoom')));
			}
		}

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


function t117_appendYandexMap(recid,key) {
	var yarecid = recid;
	if (typeof ymaps === 'object' && typeof ymaps.Map === 'function') {
		t117_handleYandexApiReady(recid);
	} else {
		if(window.yandexmapsapiiscalled!==true){
			var runfunc = 'window.t117_handleYandexApiReady_'+yarecid+' = function () { return t117_handleYandexApiReady("'+yarecid+'") }';
			eval(runfunc);

			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "https://api-maps.yandex.ru/2.1/?lang=ru-RU&coordorder=latlong&onload=t117_handleYandexApiReady_"+yarecid;
			if (key > '') {
				script.src = script.src + '&apikey='+key;
			}
			document.body.appendChild(script);
			window.yandexmapsapiiscalled=true;
		} else {
		  setTimeout(function(){
			t117_appendYandexMap(yarecid,key);
		  },200);
	  }
	}
}

function t117_handleYandexApiReady(recid){
	$('#rec'+recid).find('.t117_map').each(function(index,Element) {
		var el=$(Element);
		var arMarkers = window['arMapMarkers'+recid];
		window.isDragMap = $isMobile ? false : true;
			
		if(el.attr('data-map-style')!=''){var mapstyle=eval(el.attr('data-map-style'));}else{var mapstyle='[]';}
		var myLatlng = arMarkers.length > 0 ? [parseFloat(arMarkers[0].lat), parseFloat(arMarkers[0].lng)] : false;
		var myStates = {
			zoom: parseInt(el.attr('data-map-zoom')),
			center:myLatlng,
			scrollZoom: false,
			controls: ['typeSelector','zoomControl'],
			drag: window.isDragMap
		};

		var map = new ymaps.Map(Element, myStates), i, mrk, marker;
		var myGroup = new ymaps.GeoObjectCollection({}) ;
		
		map.behaviors.disable('scrollZoom');

		for(i in arMarkers) {
			mrk = arMarkers[i];
			myLatlng = [parseFloat(mrk.lat), parseFloat(mrk.lng)];

			myGroup.add(new ymaps.Placemark(myLatlng, { hintContent: mrk.title, balloonContent: mrk.descr > '' ? $("<textarea/>").html(mrk.descr).text() : mrk.title }));			
		}
		map.geoObjects.add(myGroup);
		if (arMarkers.length > 1) {
			map.setBounds(myGroup.getBounds(), {checkZoomRange: true}) ;
		}
		$(window).resize(function(){
			map.container.fitToViewport();
		});

		// DBL Click - activate on mobile      
		if ($isMobile) {
			$(window).dblclick(function() {
				if (window.isDragMap) {
					window.isDragMap = false;
				} else {
					window.isDragMap = true;
				}
				if (window.isDragMap) {
					map.behaviors.enable('drag');
				} else {
					map.behaviors.disable('drag');
				}
			});
		}

	});
} 
function t142_checkSize(recid){
  var el=$("#rec"+recid).find(".t142__submit");
  if(el.length){
    var btnheight = el.height() + 5;
    var textheight = el[0].scrollHeight;
    if (btnheight < textheight) {
      var btntext = el.text();
      el.addClass("t142__submit-overflowed");
      el.html("<span class=\"t142__text\">" + btntext + "</span>");
    }
  }
} 
function t228_highlight(){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t228__list_item a[href='"+url+"']").addClass("t-active");
  $(".t228__list_item a[href='"+url+"/']").addClass("t-active");
  $(".t228__list_item a[href='"+pathname+"']").addClass("t-active");
  $(".t228__list_item a[href='/"+pathname+"']").addClass("t-active");
  $(".t228__list_item a[href='"+pathname+"/']").addClass("t-active");
  $(".t228__list_item a[href='/"+pathname+"/']").addClass("t-active");
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
	  var items_align=el.attr('data-menu-items-align');
      if(left_w<right_w)max_w=right_w;
      max_w=Math.ceil(max_w);
      var center_w=0;
      el.find('.t228__centercontainer').find('li').each(function() {
        center_w+=$(this).outerWidth(true);
      });
      var padd_w=40;
      var maincontainer_width=el.find(".t228__maincontainer").outerWidth(true);
      if(maincontainer_width-max_w*2-padd_w*2>center_w+20){
          //if(left_exist>0 && right_exist>0){
		  if(items_align=="center" || typeof items_align==="undefined"){
            el.find(".t228__leftside").css("min-width",max_w+"px");
            el.find(".t228__rightside").css("min-width",max_w+"px");
            el.find(".t228__list").removeClass("t228__list_hidden");
          }
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

function t228_changebgopacitymenu(recid) {
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

function t228_createMobileMenu(recid) {
  var window_width=$(window).width();
  var el=$("#rec"+recid);
  var menu = el.find(".t228");
  var burger = el.find(".t228__mobile");
  if(980>window_width){
    burger.click(function(e){
      menu.fadeToggle(300);
      $(this).toggleClass("t228_opened");
    });
  }
}



 
function t235__next(){
    if((cur+1)>=$(".r").not('[data-t263-block-notslide=yes]').size())return;    
    cur++;
    $(".r").not('[data-t263-block-notslide=yes]').each(function(i) {
        if((cur-1)==i){
            var el=$(this);
            //el.slideUp();
			//el.css('display','none');
			var trans_out_y='-100px';
			if(el.height()+100>$(window).height())trans_out_y='0px';
			el.transition({ y: trans_out_y,opacity: 0},250,'out',function() {
				el.css('display','none');
		    });
        }        
        if(cur==i){
            var el=$(this);
            var speed='slow';
            if(cur==0){
                speed=0;
                //el.fadeIn();
            }

            el.css('display','none');
			var trans_in_y='50px';
			if(el.height()+100>$(window).height())trans_in_y='0px';
			el.transition({y:trans_in_y},1,'ease',function() {});
			el.animate({opacity:"0"}, 300, function() {
                el.css('display','block');
                el.css('opacity','0');
                el.transition({y:'0px',opacity: 1},500,'ease',function() {});
				$('.r').removeClass('t235__active');
				el.addClass('t235__active');
			});


            //el.slideDown(speed,function() {
			//el.fadeIn(speed,function() {
                if(el.height()>$(window).height()){
                    $('#t235__scrldonwicon').fadeIn('slow',function(){
                        $('#t235__scrldonwicon').delay(1000).fadeOut('slow');	
                    });
                }
            //});

            var bg=el.attr('data-bg-color');
            if(bg!==undefined && bg!=='none'){
                $('#allrecordstable').css('background-color',bg);
            }else{
                $('#allrecordstable').css('background-color','');
            }
        }
    });
    t235__update();
    setTimeout(function(){
      $(window).trigger('resize');
    },400);
}

function t235__prev(){
    if((cur-1)==-1)return;
    cur--;    
    $(".r").not('[data-t263-block-notslide=yes]').each(function(i) {
        if((cur+1)==i){
            var el=$(this);
            el.css('display','none');
        }        
        if(cur==i){
            var el=$(this);
            el.css('display','block');
			el.css('opacity','0');
			el.transition({ y: '0px'},1,'easeOutSine');
			el.animate({opacity:"1"}, 50, function() {});
            $('.r').removeClass('t235__active');
            el.addClass('t235__active');

            var bg=el.css('background-color');
            if(bg!==undefined && bg!=='none'){
                $('#allrecordstable').css('background-color',bg);
            }else{
                $('#allrecordstable').css('background-color','');
            }              
        }
    });
    t235__update();
    setTimeout(function(){
      $(window).trigger('resize');
    },400);
}  

function t235__galnext(){
	var elactive=$('.t235__active');
	var tplid=elactive.attr('data-record-type');
	if(tplid=='5')elactive.find('[data-slide=next]').trigger('click');
}

function t235__update(){
  var c=cur+1;
  var t=$(".r").not('[data-t263-block-notslide=yes]').size();
  $('.t235__count').html(c+'/'+t);
}

function t235__init(){
  $("#allrecords").wrap("<table id='allrecordstable' width='100%' height='100%' style='height:100vh; border:0px; margin:0px; padding:0px; border-spacing:0px;'><tr><td></td></tr></table>");
  $("#allrecords").css('width','100vw');
  var wnd = $(window);
  $(".r").not('[data-t263-block-notslide=yes]').each(function(i) {
      var el=$(this);
      el.css('padding','0px');
      if(el.height()>wnd.height()){
          el.css('padding-top','150px');
          el.css('padding-bottom','150px');            	
      }
      el.css('display','none');
      el.css('opacity','');   
	  el.css('background-color','');   
  });
  t235__next();
  $('#tildacopy').css('display','none');

  $('.t235').css('right','-=100');
  setTimeout(function() {
      $('.t235').addClass('t235_anim');
      $('.t235').css('right','+=100');    
  }, 800);   

  $(document).keydown(function(e) {
      switch(e.which) {
          case 38: t235__prev();// up
          break;

          case 40: t235__next(); // down
          break;

          case 33: t235__prev();// pageup
          break;

          case 34: t235__next(); // pagedown
          break;

          case 32: t235__next(); // space
          break;

          case 190: t235__galnext(); // space
          break;

          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  $('#allrecordstable').css('transition','background-color 500ms linear');
  $('.t-cover__carrier').css('background-attachment','scroll');
} 
function t260_init(){
	$(".t260").each(function() {
		var el=$(this);
		if(el.attr('data-block-init')=='yes'){
		}else{
		  el.attr('data-block-init','yes');

          var toggler = el.find(".t260__header");
          var content = el.find(".t260__content");

          toggler.click(function() {
			$(this).toggleClass("t260__opened");
			if($(this).hasClass("t260__opened")==true){
				content.slideDown();
			}else{
				content.slideUp();
			}
          })

		}
	});
} 
function t280_showMenu(recid){
  var el=$("#rec"+recid);
  el.find('.t280__burger, .t280__menu__bg, .t280__menu__item:not(".tooltipstered")').click(function(){
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

function t280_appearMenu(recid) {
      var window_width=$(window).width();
           $(".t280").each(function() {
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

function t280_highlight(recid){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t280__menu a[href='"+url+"']").addClass("t-active");
  $(".t280__menu a[href='"+url+"/']").addClass("t-active");
  $(".t280__menu a[href='"+pathname+"']").addClass("t-active");
  $(".t280__menu a[href='/"+pathname+"']").addClass("t-active");
  $(".t280__menu a[href='"+pathname+"/']").addClass("t-active");
  $(".t280__menu a[href='/"+pathname+"/']").addClass("t-active");
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
      var obj = $('a[href="'+hook+'"]');
      obj.click(function(e){
        t281_showPopup(recid);
        t281_resizePopup(recid);
        e.preventDefault();
      });
  }
} 
function t282_showMenu(recid){
  var el=$("#rec"+recid);
  el.find('.t282__burger, .t282__menu__item:not(".tooltipstered"), .t282__overlay').click(function(){
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

function t282_highlight(recid){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t282__menu a[href='"+url+"']").addClass("t-active");
  $(".t282__menu a[href='"+url+"/']").addClass("t-active");
  $(".t282__menu a[href='"+pathname+"']").addClass("t-active");
  $(".t282__menu a[href='/"+pathname+"']").addClass("t-active");
  $(".t282__menu a[href='"+pathname+"/']").addClass("t-active");
  $(".t282__menu a[href='/"+pathname+"/']").addClass("t-active");
}

function t282_appearMenu(recid) {
      var window_width=$(window).width();
           $(".t282").each(function() {
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
      var obj = $('a[href="'+hook+'"]');
      obj.click(function(e){
        t330_showPopup(recid);
        t330_resizePopup(recid);
        e.preventDefault();
      });
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

  var sizer = el.find('.t-carousel__height');
  var height = sizer.height();
  var width = sizer.width();
  if (width==0) {
    var width = $(window).width();
  }
  var ratio = width/height;
  var gallerywrapper = el.find(".t-carousel__checksize");
  var gallerywidth = gallerywrapper.width();

  if (height != $(window).height()) {
    gallerywrapper.css({'height':((gallerywidth/ratio)+'px')});
  }
} 
function t381_appearMenu(recid) {
    var window_width=$(window).width();
    if(window_width>980){
         $(".t381").each(function() {
                var el=$(this);
                var appearoffset=el.attr("data-appearoffset");
                var hideoffset=el.attr("data-hideoffset");
                if(appearoffset!=""){
                        if(appearoffset.indexOf('vh') > -1){
                            appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                        }

                        appearoffset=parseInt(appearoffset, 10);

                        if ($(window).scrollTop() >= appearoffset) {
                          if(el.css('visibility') == 'hidden'){
                              el.finish();
                              el.css("visibility","visible");
                              el.animate({"opacity": "1"}, 300,function() {
                              });       
                          }
                        }else{
                          el.stop();
                          el.css("visibility","hidden");
                        }
                }

                if(hideoffset!=""){
                        if(hideoffset.indexOf('vh') > -1){
                            hideoffset = Math.floor((window.innerHeight * (parseInt(hideoffset) / 100)));
                        }

                        hideoffset=parseInt(hideoffset, 10);

                        if ($(window).scrollTop()+$(window).height() >= $(document).height() - hideoffset) {
                          if(el.css('visibility') != 'hidden'){
                              el.finish();
                              el.css("visibility","hidden");
                          }
                        }else{
                          if (appearoffset!="") {
                              if($(window).scrollTop() >= appearoffset){
                                el.stop();
                                el.css("visibility","visible");
                              }
                          }else{
                              el.stop();
                              el.css("visibility","visible");
                          }
                        }
                }
         });
    }
}

 
    var t385 = {};
    
    t385.equalheight = function(recid) {

        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
            
        $('#rec'+recid+' .t385__textwrapper').each(function() {
     
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
 
    var t386 = {};
    
    t386.equalheight = function(recid) {

        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
            
        $('#rec'+recid+' .t386__textwrapper').each(function() {
     
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
 
function t390_showPopup(recid){
  var el=$('#rec'+recid).find('.t390');
  $('body').addClass('t390__body_popupshowed');
  el.addClass('t390__popup_show');
  el.find('.t390__close, .t390__content, .t390__bg, a[href*=#]').click(function(){
	var url = $(this).attr('href');
	if (!url || url.substring(0,7) != '#price:') {
	  	t390_closePopup();
        console.log('no');
	}
  });
  $('.t390__mainblock').click(function( event ) {
    event.stopPropagation();
  });
  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
    	$('body').removeClass('t390__body_popupshowed');
      $('.t390').removeClass('t390__popup_show');
    }
});
}

function t390_closePopup(){
  $('body').removeClass('t390__body_popupshowed');
  $('.t390').removeClass('t390__popup_show');
  $('.t390__mainblock').click(function( event ) {
    event.stopPropagation();
  });
}

function t390_resizePopup(recid){
  var el = $("#rec"+recid);
  var div = el.find(".t390__mainblock").height();
  var win = $(window).height() - 170;
  var popup = el.find(".t390__content");
  if (div > win ) {
    popup.addClass('t390__content_static');
  }
  else {
    popup.removeClass('t390__content_static');
  }
}

function t390_initPopup(recid){
  var el=$('#rec'+recid).find('.t390');
  var hook=el.attr('data-tooltip-hook');
  if(hook!==''){
      var obj = $('a[href="'+hook+'"]');
      obj.click(function(e){
        t390_closePopup();
        t390_showPopup(recid);
        t390_resizePopup(recid);
        e.preventDefault();
        console.log('yes');
      });
  }
} 
function t418_checkSize(recid){
  var el=$("#rec"+recid);
  var sizer = el.find('.t418__height');
  var height = sizer.height();
  var width = sizer.width();
  var ratio = width/height;
  var gallerywrapper = el.find(".t418__checksize");
  var gallerywidth = gallerywrapper.width();
  gallerywrapper.css({'height':((gallerywidth/ratio)+'px')});

  var maxwidth = el.find(".t418__height").width();
  var windowwidth  = $(window).width();
  var value = windowwidth - 80;
  if (maxwidth > windowwidth) {
    el.find(".t418__item").css("max-width", value + "px");
    el.find(".t418__img").css("left", "20px");
    el.find(".t418__img").css("right", "20px");
  } else {
    el.find(".t418__item").css("max-width", "");
    el.find(".t418__img").css("left", "");
    el.find(".t418__img").css("right", "");
  }
}

function t418_init(recid){
  var el=$('#rec'+recid);
  var pos = 0;
  var t418_doResize;
  var totalSlides = el.find('.t418__item').length;
  var sliderWidth = el.find('.t418__item').width();

  $(window).resize(function() {
    if (t418_doResize) clearTimeout(t418_doResize);
    t418_doResize = setTimeout(function() {
      sliderWidth = el.find('.t418__slider').width();
      el.find('.t418__slidecontainer').width(sliderWidth*totalSlides);
      console.log(sliderWidth);
    }, 200); 
  });
  
  el.find('.t418__slidecontainer').width(sliderWidth*totalSlides);
  
  el.find('.t418__next').click(function(){
    slideRight(recid);
  });

  el.find('.t418__previous').click(function(){
    slideLeft(recid);
  });

  function slideLeft(recid){
    var el=$('#rec'+recid);
    pos--;
    if(pos==-1){ pos = totalSlides-1; }
    el.find('.t418__slidecontainer').css({transform: 'translate(-' + (sliderWidth*pos) + 'px, 0)'})
    el.find('.t418__slidecontainer').css("transition-duration", ".3s");
  }

  function slideRight(recid){
    var el=$('#rec'+recid);
    pos++;
    if(pos==totalSlides){ pos = 0; }
    el.find('.t418__slidecontainer').css({transform: 'translate(-' + (sliderWidth*pos) + 'px, 0)'})
    el.find('.t418__slidecontainer').css("transition-duration", ".3s");
  }

  var swipeOptions = {
      triggerOnTouchEnd: true,
      swipeStatus: swipeStatus,
      allowPageScroll: "vertical",
      threshold: 75
  };

  el.find(".t418__slidecontainer").swipe(swipeOptions);
  el.find(".t418__slidecontainer").swipe( {
    tap:function(event, target) {
      slideRight(recid);
    }
  });

  function swipeStatus(event, phase, direction, distance) {
      if (phase == "move" && (direction == "left" || direction == "right")) {
          var duration = 0;

          if (direction == "left") {
              scrollImages((sliderWidth * pos) + distance, duration);
          } else if (direction == "right") {
              scrollImages((sliderWidth * pos) - distance, duration);
          }

      } else if (phase == "cancel") {
          scrollImages(sliderWidth * pos);
      } else if (phase == "end") {
          if (direction == "right") {
              slideLeft(recid);
          } else if (direction == "left") {
              slideRight(recid);
          }
      }
  }

  function scrollImages(distance, duration) {
      //el.find(".t418__slidecontainer").css("transition-duration", "0s");
      el.find(".t418__slidecontainer").css("transition-duration", (duration / 1000).toFixed(1) + "s");
      var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
      el.find(".t418__slidecontainer").css("transform", "translate(" + value + "px, 0)");
  }
}

                               
 
function t433_appendGoogleMap(recid, key) {
	var grecid = recid;

	if (typeof google === 'object' && typeof google.maps === 'object') {
		t433_handleGoogleApiReady(grecid);
	} else {
		if(window.googleapiiscalled!==true){
			var runfunc = 'window.t433_handleGoogleApiReady_'+grecid+' = function () { t433_handleGoogleApiReady("'+grecid+'") }';
			eval(runfunc);

			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "//maps.google.com/maps/api/js?key="+jQuery.trim(key)+"&callback=t433_handleGoogleApiReady_"+grecid;
			document.body.appendChild(script);
			window.googleapiiscalled=true;
		} else {
			setTimeout(function(){
			  t433_appendGoogleMap(grecid, key);
			},200);
		}
	}
}

function t433_setMapHeight(recid) {
	var el=$('#rec'+recid);
	var map = el.find('.t433__map');
	var textwrapper = el.find('.t433__col_text').height();
	map.css('height', textwrapper);
}

function t433_handleGoogleApiReady(recid){
	$('#rec'+recid).find('.t433__map').each(function(index,Element) {
		var el=$(Element);
		var arMarkers = window['arMapMarkers'+recid];
		window.isDragMap = $isMobile ? false : true;
	
		var myLatLng = arMarkers.length > 0 ? new google.maps.LatLng(parseFloat(arMarkers[0].lat), parseFloat(arMarkers[0].lng)) : false;
		var myOptions = {
			zoom: parseInt(el.attr('data-map-zoom')),
			center:myLatLng,
			scrollwheel: false,
			draggable: window.isDragMap,
			zoomControl: true
		};

		var map = new google.maps.Map(Element, myOptions);

		var i, mrk, marker, markers=[], infowindow;
		var bounds = new google.maps.LatLngBounds();
		for(i in arMarkers) {
			mrk = arMarkers[i];
			myLatLng = new google.maps.LatLng(parseFloat(mrk.lat), parseFloat(mrk.lng));
			marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: mrk.title
			});
			bounds.extend(myLatLng);

			if (mrk.descr > '') {
				attachInfoMessage(marker, mrk.descr);
			} else {
				attachInfoMessage(marker, mrk.title);
			}

			markers[markers.length] = marker;
			infowindow='';
			marker='';
		}
		
		function attachInfoMessage(marker, descr) {
			var infowindow = new google.maps.InfoWindow({
				content:  $("<textarea/>").html(descr).text()
			});
		  
			marker.addListener('click', function() {
				infowindow.open(marker.get('map'), marker);
			});
		}
		
		if (arMarkers.length > 1) {
			map.fitBounds(bounds);
			if (map.getZoom() > parseInt(el.attr('data-map-zoom'))) {
				map.setZoom(parseInt(el.attr('data-map-zoom')));
			}
		}

	  
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


function t433_appendYandexMap(recid,key) {
	var yarecid = recid;
	if (typeof ymaps === 'object' && typeof ymaps.Map === 'function') {
		t433_handleYandexApiReady(recid);
	} else {
		if(window.yandexmapsapiiscalled!==true){
			var runfunc = 'window.t433_handleYandexApiReady_'+yarecid+' = function () { return t433_handleYandexApiReady("'+yarecid+'") }';
			eval(runfunc);

			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "https://api-maps.yandex.ru/2.1/?lang=ru-RU&coordorder=latlong&onload=t433_handleYandexApiReady_"+yarecid;
			if (key > '') {
				script.src = script.src + '&apikey='+key;
			}
			document.body.appendChild(script);
			window.yandexmapsapiiscalled=true;
		} else {
		  setTimeout(function(){
			t433_appendYandexMap(yarecid,key);
		  },200);
	  }
	}
}

function t433_handleYandexApiReady(recid){
	$('#rec'+recid).find('.t433__map').each(function(index,Element) {
		var el=$(Element);
		var arMarkers = window['arMapMarkers'+recid];

		window.isDragMap = $isMobile ? false : true;
			
		if(el.attr('data-map-style')!=''){var mapstyle=eval(el.attr('data-map-style'));}else{var mapstyle='[]';}
		var myLatlng = arMarkers.length > 0 ? [parseFloat(arMarkers[0].lat), parseFloat(arMarkers[0].lng)] : false;
		var myStates = {
			zoom: parseInt(el.attr('data-map-zoom')),
			center:myLatlng,
			scrollZoom: false,
			controls: ['typeSelector','zoomControl'],
			drag: window.isDragMap
		};

		var map = new ymaps.Map(Element, myStates), i, mrk, marker;
		var myGroup = new ymaps.GeoObjectCollection({}) ;
		
		map.behaviors.disable('scrollZoom');

		for(i in arMarkers) {
			mrk = arMarkers[i];
			myLatlng = [parseFloat(mrk.lat), parseFloat(mrk.lng)];

			myGroup.add(new ymaps.Placemark(myLatlng, { hintContent: mrk.title, balloonContent: mrk.descr > '' ? $("<textarea/>").html(mrk.descr).text() : mrk.title }));			
		}
		map.geoObjects.add(myGroup);
		if (arMarkers.length > 1) {
			map.setBounds(myGroup.getBounds(), {checkZoomRange: true}) ;
		}
		
		$(window).resize(function(){
			map.container.fitToViewport();
		});

		// DBL Click - activate on mobile      
		if ($isMobile) {
			$(window).dblclick(function() {
				if (window.isDragMap) {
					window.isDragMap = false;
				} else {
					window.isDragMap = true;
				}
				if (window.isDragMap) {
					map.behaviors.enable('drag');
				} else {
					map.behaviors.disable('drag');
				}
			});
		}

	});
} 
function t449_appearMenu(recid) {
    var window_width=$(window).width();
    if(window_width>980){
         $(".t449").each(function() {
                var el=$(this);
                var appearoffset=el.attr("data-appearoffset");
                var hideoffset=el.attr("data-hideoffset");
                if(appearoffset!=""){
                        if(appearoffset.indexOf('vh') > -1){
                            appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                        }

                        appearoffset=parseInt(appearoffset, 10);

                        if ($(window).scrollTop() >= appearoffset) {
                          if(el.hasClass('t449__beforeready')){
                              el.finish(); 
                              el.removeClass("t449__beforeready");
                          }
                        }else{
                          el.stop();
                          el.addClass("t449__beforeready");
                        }
                }

                if(hideoffset!=""){
                        if(hideoffset.indexOf('vh') > -1){
                            hideoffset = Math.floor((window.innerHeight * (parseInt(hideoffset) / 100)));
                        }

                        hideoffset=parseInt(hideoffset, 10);

                        if ($(window).scrollTop()+$(window).height() >= $(document).height() - hideoffset) {
                          if(!el.hasClass('t449__beforeready')){
                              el.finish();
                              el.addClass("t449__beforeready");
                          }
                        }else{
                          if (appearoffset!="") {
                              if($(window).scrollTop() >= appearoffset){
                                el.stop();
                                el.removeClass("t449__beforeready");
                              }
                          }else{
                              el.stop();
                              el.removeClass("t449__beforeready");
                          }
                        }
                }
         });
    }
} 
function t477_setHeight(recid) {
  var el=$('#rec'+recid);
  el.find('.t-container').each(function() {
    var highestBox = 0;
    $('.t477__col', this).each(function(){
        if($(this).height() > highestBox)highestBox = $(this).height(); 
    });
    $('.t477__textwrapper',this).css('min-height', highestBox);
    $('.t477__blockimg',this).css('min-height', highestBox);
  });
} 
function t478_setHeight(recid) {
  var el=$('#rec'+recid);
  var sizer = el.find('.t478__sizer');
  var height = sizer.height();
  var width = sizer.width();
  var ratio = width/height;
  var imgwrapper = el.find(".t478__blockimg, .t478__textwrapper");
  var imgwidth = imgwrapper.width();
  if (height != $(window).height()) {
    imgwrapper.css({'min-height':((imgwidth/ratio)+'px')});
  }
} 
function t480_setHeight(recid) {
  var el=$('#rec'+recid);
  var sizer = el.find('.t480__sizer');
  var height = sizer.height();
  var width = sizer.width();
  var ratio = width/height;
  var imgwrapper = el.find(".t480__blockimg, .t480__textwrapper");
  var imgwidth = imgwrapper.width();
  if (height != $(window).height()) {
    imgwrapper.css({'min-height':((imgwidth/ratio)+'px')});
  }
} 
function t481_highlight(){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t481__list_item a[href='"+url+"']").addClass("t-active");
  $(".t481__list_item a[href='"+url+"/']").addClass("t-active");
  $(".t481__list_item a[href='"+pathname+"']").addClass("t-active");
  $(".t481__list_item a[href='/"+pathname+"']").addClass("t-active");
  $(".t481__list_item a[href='"+pathname+"/']").addClass("t-active");
  $(".t481__list_item a[href='/"+pathname+"/']").addClass("t-active");
}

function t481_setPath(){
}

function t481_setWidth(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t481").each(function() {
      var el=$(this);
      var left_exist=el.find('.t481__leftcontainer').length;
      var left_w=el.find('.t481__leftcontainer').outerWidth(true);
      var max_w=left_w;
      var right_exist=el.find('.t481__rightcontainer').length;
      var right_w=el.find('.t481__rightcontainer').outerWidth(true);
    var items_align=el.attr('data-menu-items-align');
      if(left_w<right_w)max_w=right_w;
      max_w=Math.ceil(max_w);
      var center_w=0;
      el.find('.t481__centercontainer').find('li').each(function() {
        center_w+=$(this).outerWidth(true);
      });
      //console.log(max_w);
      //console.log(center_w);
      var padd_w=40;
      var maincontainer_width=el.find(".t481__maincontainer").outerWidth(true);
      if(maincontainer_width-max_w*2-padd_w*2>center_w+20){
          //if(left_exist>0 && right_exist>0){
      if(items_align=="center" || typeof items_align==="undefined"){
            el.find(".t481__leftside").css("min-width",max_w+"px");
            el.find(".t481__rightside").css("min-width",max_w+"px");
            
          }
       }else{
          el.find(".t481__leftside").css("min-width","");
          el.find(".t481__rightside").css("min-width","");  
          
      }
    });
  }
}

function t481_setBg(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t481").each(function() {
      var el=$(this);
      if(el.attr('data-bgcolor-setbyscript')=="yes"){
        var bgcolor=el.attr("data-bgcolor-rgba");
        el.css("background-color",bgcolor);             
      }
      });
      }else{
        $(".t481").each(function() {
          var el=$(this);
          var bgcolor=el.attr("data-bgcolor-hex");
          el.css("background-color",bgcolor);
          el.attr("data-bgcolor-setbyscript","yes");
      });
  }
}

function t481_appearMenu(recid) {
      var window_width=$(window).width();
      if(window_width>980){
           $(".t481").each(function() {
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
                                el.css("visibility","visible");
                                el.animate({"opacity": "1"}, 200,function() {
                                });       
                            }
                          }else{
                            el.stop();
                            el.animate({"opacity": "0"}, 200,function() {
                            });
                            el.css("visibility","hidden");
                          }
                  }
           });
      }

}

function t481_changebgopacitymenu(recid) {
  var window_width=$(window).width();
  if(window_width>980){
    $(".t481").each(function() {
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

function t481_createMobileMenu(recid) {
  var window_width=$(window).width();
  var el=$("#rec"+recid);
  var menu = el.find(".t481");
  var burger = el.find(".t481__mobile");
  if(980>window_width){
    burger.click(function(e){
      menu.fadeToggle(300);
      $(this).toggleClass("t481_opened");
    });
  }
}



 
function t486_setHeight(recid) {
  var el=$('#rec'+recid);
  var window_width=$(window).width();
  if(window_width>980){
    el.find('.t486__blockimg').css('height', el.find('.t486__blockimg').innerWidth());
    var textwrapper = el.find('.t486__textwrapper');
    var blockimg = el.find('.t486__imgcontainer');
    textwrapper.css('min-height', blockimg.innerHeight());

    
  } else {
    el.find('.t486__blockimg').css('height', el.find('.t486__blockimg').width());
    el.find('.t486__textwrapper').css('min-height', 'auto'); 
  }
} 
function t509_setHeight(recid) {  
  var t509__el=$("#rec"+recid);	
  var t509__image = t509__el.find(".t509__blockimg");
  t509__image.each(function() {
    var t509__width = $(this).attr("data-image-width");
    var t509__height = $(this).attr("data-image-height");	
    var t509__ratio = t509__height/t509__width;
    var t509__padding = t509__ratio*100;    	
    $(this).css("padding-bottom",t509__padding+"%");		
  });
  
  if ($(window).width()>960){
    var t509__textwr = t509__el.find(".t509__textwrapper");
    var t509__deskimg = t509__el.find(".t509__desktopimg");
    t509__textwr.each(function() {    
    $(this).css("height", t509__deskimg.innerHeight());	
    });
  }
}
 
function t_slidesInit(recid) {
  var el = $('#rec'+recid),
      windowWidth = $(window).width(),
      sliderItem = el.find('.t-slides__item'),
      sliderWrapper = el.find('.t-slides__items-wrapper'),
      sliderArrows = el.find('.t-slides__arrow_wrapper'),
      sliderWidth = el.find('.t-slides__container').width(),
      firstSlide = sliderItem.filter(':first'),
      lastSlide = sliderItem.filter(':last'),
      totalSlides = sliderItem.length,
      sliderDoResize,
      pos = 1;

  $(window).resize(function() {
    if (sliderDoResize) clearTimeout(sliderDoResize);
    sliderDoResize = setTimeout(function() {
      windowWidth = $(window).width();
      sliderWidth = el.find('.t-slides__container').width();
      t_slides_setSliderWidth(recid, sliderWidth, totalSlides);
      slideMove();
    }, 200);        
  });

  firstSlide.before(lastSlide.clone(true).attr('data-slide-index', '0')); 
  lastSlide.after(firstSlide.clone(true).attr('data-slide-index', '4').removeClass('t-slides__item_active'));
  t_slides_setSliderHeight(recid);
  t_slides_setSliderWidth(recid, sliderWidth, totalSlides);

  if (980 > windowWidth) {
    sliderWrapper.css({transform: 'translate3d(-' + (sliderWidth*pos) + 'px, 0, 0)'});
  } else {
    sliderWrapper.css('transform', '');
  }

  el.find('.t-slides__arrow_wrapper-right').click(function(){
    if (!$(this).is('.t-slides__arrow-clicked')) {
      $(this).addClass('t-slides__arrow-clicked');
      slideRight(); 
    }
  });

  el.find('.t-slides__arrow_wrapper-left').click(function(){
    if (!$(this).is('.t-slides__arrow-clicked')) {
      $(this).addClass('t-slides__arrow-clicked');
      slideLeft();
    }
  });

  el.find('.t-slides__bullet').click(function(){
    pos = $(this).attr('data-slide-bullet-for');
    slideMove();
  });

  function slideLeft(){
    pos--;
    slideMove();
  }

  function slideRight(){
    pos++;
    slideMove();
  }

  function slideMove(){
    sliderWrapper.addClass('t-slides_animated');
    if (980 > windowWidth) {
      sliderWrapper.css({transform: 'translate3d(-' + (sliderWidth*pos) + 'px, 0, 0)'});
    } else {
      sliderWrapper.css('transform', '');
    }

    if(pos==(totalSlides+1)){ pos = 1; }
    if(pos==0){ pos = totalSlides; }

    setTimeout(function(){
      sliderWrapper.removeClass('t-slides_animated');
      if (980 > windowWidth) {
        sliderWrapper.css({transform: 'translate3d(-' + (sliderWidth*pos) + 'px, 0, 0)'});
      } else {
        sliderWrapper.css('transform', '');
      }
      $('.t-slides__arrow_wrapper').removeClass('t-slides__arrow-clicked');
    }, 300);

    t_slides_setActiveBullet(recid, pos);
    t_slides_setActiveSlide(recid, pos);
    t_slides_setSliderHeight(recid);
  }

  delete Hammer.defaults.cssProps.userSelect;
  hammer = new Hammer( el.find('.t-slides__items-wrapper')[ 0 ], {
    domEvents: true,
    threshold: 0,
    direction: Hammer.DIRECTION_VERTICAL
  } );
  hammer.on('pan', function(event){
    if (980 > windowWidth) {
      var distance = event.deltaX,
          percentage = 100 / totalSlides * event.deltaX / $(window).innerWidth(),
          sensitivity = 20;

      t_slides_scrollImages(recid, (sliderWidth * pos) - distance);

      if( event.isFinal ) {
        if( event.velocityX > 1 ) {
          slideLeft();
        } else if( event.velocityX < -1 ) {
          slideRight();
        } else {
          if ( percentage <= -( sensitivity / totalSlides ) ) {
            slideRight();
          } else if ( percentage >= ( sensitivity / totalSlides ) ) {
            slideLeft();
          } else {
            slideMove();
          }
        }
      }
    }
  });
}

function t_slides_scrollImages(recid, distance) {
  var el = $('#rec'+recid),
      value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
  el.find(".t-slides__items-wrapper").css("transform", "translate3d(" + value + "px, 0, 0)");
}

function t_slides_setActiveBullet(recid, pos) {
  var el = $('#rec'+recid),
      bullet = el.find('.t-slides__bullet'),
      bulletActive = el.find('.t-slides__bullet[data-slide-bullet-for="' + pos + '"]');
  bullet.removeClass('t-slides__bullet_active');
  bulletActive.addClass('t-slides__bullet_active');
}

function t_slides_setActiveSlide(recid, pos) {
  var el = $('#rec'+recid),
      slide = el.find('.t-slides__item'),
      slideActive = el.find('.t-slides__item[data-slide-index="' + pos + '"]');
  slide.removeClass('t-slides__item_active');
  slideActive.addClass('t-slides__item_active');
}

function t_slides_setSliderWidth(recid, sliderWidth, totalSlides){
  var el = $('#rec'+recid);
  el.find('.t-slides__items-wrapper').width(sliderWidth*(totalSlides+2));
  el.find('.t-slides__item').width(sliderWidth);
}

function t_slides_setSliderHeight(recid) {
  var el = $('#rec'+recid);
  el.find('.t-slides__items-wrapper').height(el.find('.t-slides__item_active').height());
  el.find('.t-slides__arrow_wrapper').height(el.find('.t-slides__item_active').height());
} 
function t520_unifyHeight(recid) {
  var el = $('#rec'+recid),
      image = el.find('.t520__bgimg'),
      text = el.find('.t-slides__item');
  image.css('min-height', '');
  text.each(function() {
    if($(window).width()>=640){
      $('.t520__bgimg', this).css('height', $(this).height()); 
    }else{
      $('.t520__bgimg', this).css('min-height', '');    
    }
  });
} 
function t533_equalHeight(recid){
  var el = $('#rec'+recid);
  el.find('.t533').css('visibility', 'visible');
  el.find('.t533__textwrapper').css('height','auto');
  $('#rec'+recid+' .t533__row').each(function() {
    var highestBox = 0;
    $('.t533__textwrapper', this).each(function(){
      if($(this).height() > highestBox)highestBox = $(this).height(); 
    });  
    if($(window).width()>=960 && $(this).is(':visible')){
      $('.t533__textwrapper',this).css('height', highestBox); 
    }else{
      $('.t533__textwrapper',this).css('height', "auto");    
    }
  });
}; 
function t534_setWidth(recid){
  var el = $('#rec'+recid),
      topsection = el.find('.t534__topsection'),
      slidewidth = el.find('.t-slides__container').width();
  topsection.css('max-width', slidewidth);
} 
function t536_setWidth(recid){
  var el = $('#rec'+recid),
      topsection = el.find('.t536__topsection'),
      slidewidth = el.find('.t-slides__container').width();
  topsection.css('max-width', slidewidth);
} 
function t538_setWidth(recid){
  var el = $('#rec'+recid),
      topsection = el.find('.t538__topsection'),
      slidewidth = el.find('.t-slides__container').width();
  topsection.css('max-width', slidewidth);
}