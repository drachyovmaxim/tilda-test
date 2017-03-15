 
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

function t228_checkAnchorLinks(recid) {
    if ($(window).width() >= 960) {
        var t228_navLinks = $("#rec" + recid + " .t228__list_item a:not(.tooltipstered)[href*='#']");
        if (t228_navLinks.length > 0) {
            t228_catchScroll(t228_navLinks);
        }
    }
}

function t228_catchScroll(t228_navLinks) {
    var t228_clickedSectionId = null,
        t228_sections = new Array(),
        t228_sectionIdTonavigationLink = [],
        t228_interval = 100,
        t228_lastCall, t228_timeoutId;
    t228_navLinks = $(t228_navLinks.get().reverse());
    t228_navLinks.each(function() {
        var t228_cursection = t228_getSectionByHref($(this));
        if (typeof t228_cursection.attr("id") != "undefined") {
            t228_sections.push(t228_cursection);
        }
        t228_sectionIdTonavigationLink[t228_cursection.attr("id")] = $(this);
    });
		t228_updateSectionsOffsets(t228_sections);
		$(window).bind('resize', t_throttle(function(){t228_updateSectionsOffsets(t228_sections);}, 200));
		$('.t228').bind('displayChanged',function(){t228_updateSectionsOffsets(t228_sections);});
		setInterval(function(){t228_updateSectionsOffsets(t228_sections);},5000);
    t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);

    t228_navLinks.click(function() {
        if (!$(this).hasClass("tooltipstered")) {
            t228_navLinks.removeClass('t-active');
            t228_sectionIdTonavigationLink[t228_getSectionByHref($(this)).attr("id")].addClass('t-active');
            t228_clickedSectionId = t228_getSectionByHref($(this)).attr("id");
        }
    });
    $(window).scroll(function() {
        var t228_now = new Date().getTime();
        if (t228_lastCall && t228_now < (t228_lastCall + t228_interval)) {
            clearTimeout(t228_timeoutId);
            t228_timeoutId = setTimeout(function() {
                t228_lastCall = t228_now;
                t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
            }, t228_interval - (t228_now - t228_lastCall));
        } else {
            t228_lastCall = t228_now;
            t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
        }
    });
}


function t228_updateSectionsOffsets(sections){
	$(sections).each(function(){
		var t228_curSection = $(this);
		t228_curSection.attr("data-offset-top",t228_curSection.offset().top);
	});
}


function t228_getSectionByHref(curlink) {
    var t228_curLinkValue = curlink.attr("href").replace(/\s+/g, '');
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + t228_curLinkValue.substring(1) + "']");
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + t228_curLinkValue.substring(1) + "']");
    }
}

function t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId) {
    var t228_scrollPosition = $(window).scrollTop(),
        t228_valueToReturn = t228_clickedSectionId;
    /*if first section is not at the page top (under first blocks)*/
    if (t228_sections.length != 0 && t228_clickedSectionId == null && t228_sections[t228_sections.length-1].attr("data-offset-top") > (t228_scrollPosition + 300)){
      t228_navLinks.removeClass('t-active');
      return null;
    }

    $(t228_sections).each(function(e) {
        var t228_curSection = $(this),
            t228_sectionTop = t228_curSection.attr("data-offset-top"),
            t228_id = t228_curSection.attr('id'),
            t228_navLink = t228_sectionIdTonavigationLink[t228_id];
        if (((t228_scrollPosition + 300) >= t228_sectionTop) || (t228_sections[0].attr("id") == t228_id && t228_scrollPosition >= $(document).height() - $(window).height())) {
            if (t228_clickedSectionId == null && !t228_navLink.hasClass('t-active')) {
                t228_navLinks.removeClass('t-active');
                t228_navLink.addClass('t-active');
                t228_valueToReturn = null;
            } else {
                if (t228_clickedSectionId != null && t228_id == t228_clickedSectionId) {
                    t228_valueToReturn = null;
                }
            }
            return false;
        }
    });
    return t228_valueToReturn;
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
        if(bgopacitytwo=='0' || (typeof menushadow == "undefined" && menushadow == false)){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }else{
        el.css("background-color",bgcolor);
        if(bgopacityone=='0.0' || (typeof menushadow == "undefined" && menushadow == false)){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }
    });
  }
}

function t228_createMobileMenu(recid){
  var window_width=$(window).width(),
      el=$("#rec"+recid),
      menu=el.find(".t228"),
      burger=el.find(".t228__mobile");
  burger.click(function(e){
    menu.fadeToggle(300);
    $(this).toggleClass("t228_opened")
  })
  $(window).bind('resize', t_throttle(function(){
    window_width=$(window).width();
    if(window_width>980){
      menu.fadeIn(0);
    }
  }, 200));
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








 
function t281_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    var obj = $('a[href="'+hook+'"]');
    obj.click(function(e){
      t281_showPopup(recid);
      t281_resizePopup(recid);
      e.preventDefault();
      if(window.lazy=='y'){t_lazyload_update();}
      if (analitics == 'yes') {
        t281_sendPopupEventToStatistics(hook);
      }
    });
  }
}

function t281_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').click(function(e){
    if (e.target == this) { t281_closePopup(); }
  });

  el.find('.t-popup__close').click(function(e){
    t281_closePopup();
  });

  el.find('a[href*=#]').click(function(e){
    var url = $(this).attr('href');
    if (!url || url.substring(0,7) != '#price:') {
      t281_closePopup();
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t281_closePopup(); }
  });
}

function t281_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t281_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height() - 120,
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}

function t281_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }
    
  virtPage += popupname;
  virtTitle += popupname;
  if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
    Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
  } else {
    
   if(ga) {
     if (window.mainTracker != 'tilda') {
       ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
     }
   }
  
   if (window.mainMetrika > '' && window[window.mainMetrika]) {
     window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
   }

  }
}


















function t330_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').click(function(e){
    if (e.target == this) { t330_closePopup(); }
  });

  el.find('.t-popup__close').click(function(e){
    t330_closePopup();
  });

  el.find('a[href*=#]').click(function(e){
    var url = $(this).attr('href');
    if (!url || url.substring(0,7) != '#price:') {
      t330_closePopup();
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t330_closePopup(); }
  });
}

function t330_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t330_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height() - 120,
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}

function t330_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }
    
  virtPage += popupname;
  virtTitle += popupname;
  if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
    Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
  } else {
    if(ga) {
      if (window.mainTracker != 'tilda') {
        ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
      }
    }
  
    if (window.mainMetrika > '' && window[window.mainMetrika]) {
      window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
    }
  }
}

function t330_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    var obj = $('a[href="'+hook+'"]');
    obj.click(function(e){
      t330_showPopup(recid);
      t330_resizePopup(recid);
      e.preventDefault();
      if(window.lazy=='y'){t_lazyload_update();}
      if (analitics == 'yes') {
        t330_sendPopupEventToStatistics(hook);
      }
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

function t331_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    var obj = $('a[href="'+hook+'"]');
    obj.click(function(e){
      t331_showPopup(recid);
      t331_resizePopup(recid);
      e.preventDefault();
      if (analitics == 'yes') {
        t331_sendPopupEventToStatistics(hook);
      }
    });
  }
}

function t331_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  var youtubeid = el.find(".t331__youtube").attr('data-content-popup-video-url-youtube');
  var videourl = 'https://www.youtube.com/embed/' + youtubeid;
  el.find(".t331__video-carier").html("<iframe id=\"youtubeiframe"+recid+"\" class=\"t331__iframe\" width=\"100%\" height=\"100%\" src=\"" + videourl + "?autoplay=1\" frameborder=\"0\" allowfullscreen></iframe>");

  popup.css('display', 'block');
  t331_setHeight(recid);
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').click(function(e){
    if (e.target == this) {
    t331_popup_close(recid);
    }
  });

  el.find('.t-popup__close').click(function(e){
    t331_popup_close(recid);
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t331_popup_close(recid); }
  });
}

function t331_popup_close(recid){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $("#rec"+recid+" .t331__video-carier").html("");
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t331_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height(),
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}

function t331_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }
    
  virtPage += popupname;
  virtTitle += popupname;
    
  if(ga) {
    if (window.mainTracker != 'tilda') {
      ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
    }
  }
  
  if (window.mainMetrika > '' && window[window.mainMetrika]) {
    window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
  }
} 
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
function t351_setSize(recid){
  var el=$("#rec"+recid);
  var height = el.find(".t351__sizer").height();
  var width = el.find(".t351__sizer").width();
  var ratio = width/height;
  var imgwrapper = el.find(".t351__imgwrapper");
  var imgwidth = imgwrapper.width();
  imgwrapper.css({'height':((imgwidth/ratio)+'px')});
} 
function t358_setHeight(recid){
  var el=$('#rec'+recid);
  var div = el.find(".t358__video-carier");
  var height=div.width() * 0.5625;
  div.height(height);
  div.parent().height(height);
}

function t358_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    var obj = $('a[href="'+hook+'"]');
    obj.click(function(e){
      t358_showPopup(recid);
      t358_resizePopup(recid);
      e.preventDefault();
      if (analitics == 'yes') {
        t358_sendPopupEventToStatistics(hook);
      }
    });
  }
}

function t358_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  var vimeoid=$("#rec"+recid+" .t358__vimeo").attr('data-content-popup-video-url-vimeo');
  var videourl = '//player.vimeo.com/video/' + vimeoid;
  $("#rec"+recid+" .t358__video-carier").html("<iframe id=\"vimeoiframe"+recid+"\" class=\"t358__iframe\" width=\"100%\" height=\"100%\" src=\"" + videourl + "?title=0&byline=0&portrait=0&badge=0&color=ffffff&autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");

  popup.css('display', 'block');
  t358_setHeight(recid);
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').click(function(e){
    if (e.target == this) {
    t358_popup_close(recid);
    }
  });

  el.find('.t-popup__close').click(function(e){
    t358_popup_close(recid);
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t358_popup_close(recid); }
  });
}

function t358_popup_close(recid){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $("#rec"+recid+" .t358__video-carier").html("");
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t358_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height(),
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}

function t358_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }
    
  virtPage += popupname;
  virtTitle += popupname;
    
  if(ga) {
    if (window.mainTracker != 'tilda') {
      ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
    }
  }
  
  if (window.mainMetrika > '' && window[window.mainMetrika]) {
    window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
  }
} 
function t362_sendPopupEventToStatistics(link_recid, popupname)
{
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Payment popup: ';
    if (popupname.substring(0,7) == '#price:') {
        popupname = popupname.substring(7);
    }
    
    virtPage = virtPage + link_recid + '/';
    virtTitle += popupname;
    
    if (Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle,'',0);
    } else {
        if (window.ga && window.mainTracker != 'tilda') {
            ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
        }
        
        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
        }
    }

}

function t362_sendPaymentEventToStatistics(product, price) {
    if (Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        var virtPage = '/tilda/payment/?product='+product+'&price='+price;
        var virtTitle = 'Order: '+product+' = '+price;
        Tilda.sendEventToStatistics(virtPage, virtTitle,'',price);
    } else {
        var virtPage = '/tilda/order/?product='+product+'&price='+price;
        var virtTitle = 'Order: '+product+' = '+price;

        if(window.ga && window.mainTracker != 'tilda') {
            ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
        }
        
        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
        }
    }
}

function t362_showPopup(recid,name,price){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  popup.css('display', 'block');
  el.find('.js-product-title').html(name+' = ' + price);
  el.find('.js-successbox').hide();
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').click(function(e){
    if (e.target == this) { t362_closePopup(); }
  });

  el.find('.t-popup__close').click(function(e){
    t362_closePopup();
  });
}

function t362_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t362_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height() - 120,
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}

window.t362_sendPaymentForm = function($form) {
  var recid = $form.attr('id').replace('form','');
  var $paymentForm = $('#formpayment'+recid);
  
  if($paymentForm.length == 0) {
    if ($form.data('success-url') > '') {
      window.location.href = $form.data('success-url');
    }
    return false;
  }

  var name = $paymentForm.find('.js_payment_product').val();
  var price = $paymentForm.find('.js_payment_price').val();

  if ($form.data('success-url') > '') {
    $paymentForm.find('.js_payment_successurl').val($form.data('success-url'));
  }
  if($paymentForm.find('.js_payment_successurl').val() == '') {
	$paymentForm.find('.js_payment_successurl').val(window.location.href);
  }

  if ($('#rec'+recid).find('.js-payment-type').length>0) {
    $paymentForm.find('input[name=paymentType]').val( $('#rec'+recid).find('.js-payment-type').val() );
  }

  var $ctrl=$paymentForm.find('[name=customerNumber]');

  var tildaformresult = $form.data('tildaformresult');
  if (tildaformresult && tildaformresult.tranid > '0') {
    if($ctrl.length > 0) {
      $ctrl.val(tildaformresult.tranid); /* dataid */
    }
    
    $ctrl=$paymentForm.find('.js_payment_ordernumber');
    if($ctrl.length > 0) {
      if (tildaformresult.orderid > '0') {
        $ctrl.val(tildaformresult.orderid);
      } else {
        $ctrl.val('');
      }
    }
  } else {
    if($ctrl.length > 0) {
      $ctrl.val('');
    }
  }

  t362_sendPaymentEventToStatistics(name,price);

  var actionUrl = $paymentForm.attr('action');
  if(actionUrl && actionUrl.indexOf('eshop.xml') > 0) {
    var allData = '';
    $form.find('input[type=text]').each(function(){
      var str = $(this).val();
      var cssclass=$(this).attr('class');
      if (!cssclass || cssclass.indexOf('js_pay')==-1) {
        allData = allData+''+str+'; ';
      }
      
      if (str > '' && str.indexOf('@')>0) {
        var $jqemail = $paymentForm.find('input[name=custEmail]');
        if (!$jqemail || $jqemail.length == 0) {
          $paymentForm.append("<input type=hidden name=custEmail value='"+str+"'>");
        } else {
          $jqemail.val(str);
        }
        
        $jqemail = $paymentForm.find('input[name=cps_email]');
        if (!$jqemail || $jqemail.length == 0) {
          $paymentForm.append("<input type=hidden name=cps_email value='"+str+"'>");
        } else {
          $jqemail.val(str);
        }

        if ($paymentForm.find('input[name=business]').length > 0) {
          var $jqemail = $paymentForm.find('input[name=email]');
          if (!$jqemail || $jqemail.length == 0) {
            $paymentForm.append("<input type=hidden name=email value='"+str+"'>");
          } else {
            $jqemail.val(str);
          }
        }
      }
    });
    
    var $jqord = $paymentForm.find('input[name=orderDetails]');
    if($jqord && $jqord.length > 0 && allData > '') {
      $jqord.val($jqord.val()+' ['+allData+']'); 
    }
  }

  $paymentForm.submit();
}

function t362_proccessError($form, recid) {
  var $recbox = $('#rec'+recid);

  $form.find('.js-errorbox-all').hide();
  $form.find('.js-rule-error').hide();
  $form.find('.js-error-rule-all').html('');
  $form.find('.js-successbox').hide();
  $form.find('.js-error-control-box').removeClass('js-error-control-box');

  $form.removeClass('js-send-form-error');
  $form.removeClass('js-send-form-success');

  var arError = validateForm($form);
  var $blockinput='';
  if (arError && arError.length > 0) {
    var clsInputBoxSelector = $form.data('inputbox');
    if ( !clsInputBoxSelector ) {
      clsInputBoxSelector = '.blockinput';
    }

    for(var i=0; i<arError.length; i++) {
      if (!arError[i] || !arError[i].obj) { continue; }
      
      arError[i].obj.closest(clsInputBoxSelector).addClass('js-error-control-box');
      
      for(j=0;j < arError[i].type.length;j++) {
        error = arError[i].type[j];
        var $errItem = $form.find('.js-rule-error-'+error);
        if ($errItem.length > 0){
          $errItem.css('display','block').show();
        }
      }
    }
    $form.find('.js-errorbox-all').css('display','block').show();
    return false;
  } else {
    return true;
  }
}

function t362_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');

  var el=$('#rec'+recid).find('.t362');
  $('[href^="#price"]').click(function(e){
    t362_closePopup();
    e.preventDefault();
    var tmp = $(this).attr('href');
    // format:  #price:Cost:Product name
    var arParam = tmp.split(':');
        var price = arParam[1].replace(',','.');
        price = parseInt(price.replace(/[^0-9\.]/g,''));
    var pricetext = arParam[1];
    var name = arParam[2];
    var link_recid='0';
    var $link_rec = $(this).closest('.r');
    var htmlpayment = '';
    
    if ($link_rec.length > 0) {
      link_recid = $link_rec.attr('id');
    
      if (! name) {
        var tmp=$link_rec.find('.t-title');
        if (tmp.length > 0) {
          name = tmp.text();
        }
        name = $(this).text();
      }
    }
    

    var $recbox = $('#rec'+recid);
    $recbox.find('.js_payment_product').val(name);
    $recbox.find('.js_payment_price').val(price);
    $recbox.find('#form'+recid).show();

    if(window.tilda_payment_type>'') {
      $recbox.find('.js-tilda-payment').remove();

      /* если Я.Касса подключенная по HTTP */
      if (window.tilda_payment_type == 'yakassa_http') {
		htnlpayment = '<input class="js-tilda-payment" type="hidden" name="tilda_p_projectid" value="'+$('#allrecords').attr('data-tilda-project-id')+'">';
        htmlpayment = htmlpayment + '<input class="js-tilda-payment" type="hidden" name="tilda_p_amount" value="'+price+'">';
        htmlpayment = htmlpayment + '<input class="js-tilda-payment" type="hidden" name="tilda_p_product_name_0" value="'+name+'">';
        htmlpayment = htmlpayment + '<input class="js-tilda-payment" type="hidden" name="tilda_p_product_amount_0" value="'+price+'">';

        htmlpayment = htmlpayment + '<input class="js-tilda-payment" type="hidden" name="tilda_srv_page" value="'+window.location.href+'">';
        htmlpayment = htmlpayment + '<input class="js-tilda-payment" type="hidden" name="tilda_srv_referrer" value="'+(document.referrer ? document.referrer : '')+'">';
        htmlpayment = htmlpayment + '<input class="js-tilda-payment" type="hidden" name="tilda_srv_uagent" value="'+navigator.userAgent+'">';
        htmlpayment = htmlpayment + '<input class="js-tilda-payment" type="hidden" name="tilda_srv_cookie" value="'+document.cookie+'">';
        var $paymentForm = $('#formpayment'+recid);
        $paymentForm.append(htmlpayment);
        htmlpayment = '';

        /* заменяем обработчик формы на свой */
        $('#form'+recid).removeClass('js-form-proccess').data('success-callback','');
        $('#form'+recid).addClass('js-form-yakassa-proccess');

        
        function t362_YaKassaPayment(e) {
          if (! $(this).hasClass('js-form-yakassa-proccess')) {
            return;
          }
          var $recbox = $('#rec'+recid);
          var $paymentForm = $('#formpayment'+recid);
          //var htmlpayment = '';
          
          e.stopPropagation();
          e.preventDefault();

          if (t362_proccessError($(this))) {
            var i,arFormElements = $('#form'+recid).serializeArray();
            var iCntSrv=0;
            for(i in arFormElements) {
              var elemvalue = arFormElements[i].value, elemname = arFormElements[i].name;
              
              if (elemname == 'productprice' || elemname == 'productname' || elemname == 'form-spec-comments' || elemname == 'tildaspec-cookie') {
                continue;
              }

              if (elemvalue > '' && elemvalue.indexOf('@')>0) {
                var $jqemail;
                /*
                $jqemail = $paymentForm.find('input[name=custEmail]');
                if (!$jqemail || $jqemail.length == 0) {
                  $paymentForm.append("<input type=hidden name=custEmail value='"+elemvalue+"'>");
                } else {
                  $jqemail.val(elemvalue);
                }
                */
                
                $jqemail = $paymentForm.find('input[name=cps_email]');
                if (!$jqemail || $jqemail.length == 0) {
                  $paymentForm.append("<input type=hidden name=cps_email value='"+elemvalue+"'>");
                } else {
                  $jqemail.val(elemvalue);
                }

                $jqemail = $paymentForm.find('input[name=customerNumber]');
                if (!$jqemail || $jqemail.length == 0) {
                  $paymentForm.append("<input type=hidden name=customerNumber value='"+elemvalue+"'>");
                } else {
                  $jqemail.val(elemvalue);
                }

                elemname = elemname.replace('[','_');
                elemname = elemname.replace(']','_');
                /* htmlpayment = htmlpayment + '<input class="js-tilda-payment" type="hidden" name="tildaform_'+elemname+'" value="'+elemvalue+'">'; */
                htmlpayment = htmlpayment + '<input class="js-tilda-payment" type="hidden" name="tildaform__'+parseInt(i)+'_'+elemname+'" value="'+elemvalue+'">';

              } else {
                
                if(arFormElements[i].name == 'formservices[]') {
                  htmlpayment = htmlpayment + '<input class="js-tilda-payment" type="hidden" name="tilda_fs_'+iCntSrv+'" value="'+elemvalue+'">';
                  iCntSrv = parseInt(iCntSrv)+1;
                } else {
                  elemname = elemname.replace('[','_');
                  elemname = elemname.replace(']','_');
                  /*
htmlpayment = htmlpayment + '<input class="js-tilda-payment" type="hidden" name="tildaform_'+elemname+'" value="'+elemvalue+'">';
*/
                  htmlpayment = htmlpayment + '<input class="js-tilda-payment" type="hidden" name="tildaform__'+parseInt(i)+'_'+elemname+'" value="'+elemvalue+'">';
                }
              }
            }

            if ($paymentForm.find('input[name=customerNumber]').val() == '') {
              var t = new Date();
              t = t.getTime();
              $paymentForm.find('input[name=customerNumber]').val(t);
            }

            if ($paymentForm.find('input[name=orderNumber]').val() == '') {
              $paymentForm.find('input[name=orderNumber]').remove();
            }

            if ($(this).data('success-url') > '') {
              $paymentForm.find('.js_payment_successurl').val($(this).data('success-url'));
            } else {
				if ($paymentForm.find('.js_payment_successurl').val() == '') {
              		$paymentForm.find('.js_payment_successurl').val(window.location.href);
				}
            }
            
            if ($paymentForm.find('.js_payment_failurl').val() == '') {
              $paymentForm.find('.js_payment_failurl').val(window.location.href);
            }
          
            if ($recbox.find('.js-payment-type').length>0) {
              $paymentForm.find('input[name=paymentType]').val( $recbox.find('.js-payment-type').val() );
            }

            $paymentForm.append(htmlpayment);

            $paymentForm.submit();
          }
        }
        
        $('#rec'+recid+' .js-form-yakassa-proccess').off('submit');
        $('#rec'+recid+' .js-form-yakassa-proccess').on('submit', t362_YaKassaPayment);
      } else {
            if(window.tilda_payment_type == 'robokassa') {
                /* заменяем обработчик формы на свой */
                $('#form'+recid).removeClass('js-form-proccess').data('success-callback','');
                $('#form'+recid).addClass('js-form-robokassa-proccess');

                $('#rec'+recid+' .js-form-robokassa-proccess').off('submit');
                $('#rec'+recid+' .js-form-robokassa-proccess').on('submit', function(e){
                    e.preventDefault();
                    $('#rec'+recid).find('.js-btn-robokassa').trigger('click');
                    return false;
                });
                
                $('#rec'+recid).find('.js-btn-robokassa').off('click');
                $('#rec'+recid).find('.js-btn-robokassa').on('click', function(e){
                    e.preventDefault();
                    var $recbox = $('#rec'+recid);
                    
                    var btnformsubmit = $(this);
                    var $form = $(this).closest('form');
                
                    if (!$form || $form.length == 0) {
                        return false;
                    }

                    if (! $form.hasClass('js-form-robokassa-proccess')) {
                        return;
                    }

                    var btnstatus = btnformsubmit.data('form-sending-status');
                    if (btnstatus >= '1') {
                        /* 0 - могу отправлять, 1 - отправляю, как только отправлено снова в ставим в 0 */
                        return false;
                    }
                    
                    btnformsubmit.addClass('t-btn_sending');
                    btnformsubmit.data('form-sending-status','1');
                    btnformsubmit.data('submitform', $form);
                    
                    var $errBox = $form.find('.js-errorbox-all');
                    if ($errBox && $errBox.length > 0) {
                        $errBox.hide();
                    }

                    if (t362_proccessError($form)) {

                        var $elem = $form.find('input[name=tildaspec-cookie]');
                        if (!$elem || $elem.length == 0){
                            $form.append('<input type="hidden" name="tildaspec-cookie" value="">');
                            $elem = $form.find('input[name=tildaspec-cookie]');
                        }
                        if ($elem.length > 0) {
                            $elem.val(document.cookie);
                        }
                        
                        $elem = $form.find('input[name=tildaspec-referer]');
                        if (!$elem || $elem.length == 0){
                            $form.append('<input type="hidden" name="tildaspec-referer" value="">');
                            $elem = $form.find('input[name=tildaspec-referer]');
                        }
                        if ($elem.length > 0) {
                            $elem.val(window.location.href);
                        }
                    
                        $elem = $form.find('input[name=tildaspec-projectid]');
                        if (!$elem || $elem.length == 0){
                            $form.append('<input type="hidden" name="tildaspec-projectid" value="'+parseInt($('#allrecords').data('tilda-project-id'))+'">');
                        }
                        $elem = $form.find('input[name=tildaspec-hash]');
                        if (!$elem || $elem.length == 0){
                            console.log('Empty hash for payment form');
                            return false;
                        }
                        
                        var amount = $form.find('.js_payment_price').val();
                        Tilda.robokassaPayment($form, btnformsubmit,'',amount);
                    } else {
                        btnformsubmit.removeClass('t-btn_sending');
                        btnformsubmit.data('form-sending-status','0');
                        btnformsubmit.data('submitform', $form);
                    }
                    return false;
                });
            
            } else {
                var htmlpayment = '<input class="js-tilda-payment" type="hidden" name="tildapayment[projectid]" value="'+$('#allrecords').attr('data-tilda-project-id')+'">';
                htmlpayment = htmlpayment + '<input class="js-tilda-payment" type="hidden" name="tildapayment[amount]" value="'+price+'">';
                htmlpayment = htmlpayment + '<input class="js-tilda-payment" type="hidden" name="tildapayment[products][0][product]" value="'+name+'">';
                htmlpayment = htmlpayment + '<input class="js-tilda-payment" type="hidden" name="tildapayment[products][0][amount]" value="'+price+'">';
          
                $('#form'+recid).append(htmlpayment);
            }
      }
    }
    
    t362_showPopup(recid,name,pricetext);
    t362_sendPopupEventToStatistics(link_recid,name);
    t362_resizePopup(recid);

    if ($recbox.find('.js-stripe-publishable-key').length > 0) {
      var companyname = $recbox.find('.js-stripe-company-name').val()
      if(! window.stripehandler) {
        window.stripehandler = StripeCheckout.configure({
          key: $recbox.find('.js-stripe-publishable-key').val(),
          image: $recbox.find('.js-stripe-logo').val(),
          name: (companyname ? companyname : window.location.host),
          locale: 'auto'
        });
        /* Close Checkout on page navigation:*/
        $(window).on('popstate', function() {
          window.stripehandler.close();
        });
      }
      
      
      /* заменяем обработчик формы на свой */
      $('#form'+recid).removeClass('js-form-proccess').data('success-callback','');
      //$('#rec'+recid).off('submit','.js-form-proccess');
      if($('#formpayment'+recid).attr('action') > '') {
        $('#form'+recid).data('success-url', $('#formpayment'+recid).attr('action'));
      }
      $('#form'+recid).addClass('js-form-stripe-proccess');

      function t362_stripePayment(e){
        if (! $(this).hasClass('js-form-stripe-proccess')) {
          return;
        }
        var $recbox = $('#rec'+recid);
        e.stopPropagation();
        e.preventDefault();
        
        if (t362_proccessError($(this),recid)) {
          
          window.stripehandler.open({
            name: $recbox.find('.js-stripe-company-name').val(),
            image: $recbox.find('.js-stripe-logo').val(),
            description: $recbox.find('.js_payment_product').val(),
            amount:  $recbox.find('.js_payment_price').val()*100,
            currency: $recbox.find('.js-stripe-currency').val(),
            shippingAddress: $recbox.find('.js-stripe-need-shipping').val() == '1' ? true : false,
            token: function(token, args) {
              if (token && token.id) {
                t362_sendPaymentEventToStatistics(name,price*100);
                $('#form'+recid).removeClass('js-form-stripe-proccess');
                $('#form'+recid).off('submit', t362_stripePayment);

                var htmlpayment = '<input class="js-tilda-payment js-stripe-tokenoptions" type="hidden" name="tildapayment[stripetoken]" value="'+token.id+'">';
                if (token.email) {
                  htmlpayment = htmlpayment + '<input class="js-tilda-payment js-stripe-tokenoptions" type="hidden" name="tildapayment[email]" value="'+token.email+'">';
                }
                htmlpayment = htmlpayment + '<input class="js-tilda-payment js-stripe-tokenoptions" type="hidden" name="tildapayment[currency]" value="'+$recbox.find('.js-stripe-currency').val()+'">';
                
                $('#form'+recid).find('.js-stripe-tokenoptions').remove();
                $('#form'+recid).append(htmlpayment);

                $('#form'+recid).addClass('js-form-proccess').submit();
              }
            }
            
          });
          
        }
        return false;
      }

      $('#rec'+recid+' .js-form-stripe-proccess').on('submit', t362_stripePayment);

    }

    if ($recbox.find('.js-cp-key').length > 0) {

      /* заменяем обработчик формы на свой */
      $('#form'+recid).removeClass('js-form-proccess').data('success-callback','');
      //$('#rec'+recid).off('submit','.js-form-proccess');
      if($('#formpayment'+recid).attr('action') > '') {
        $('#form'+recid).data('success-url', $('#formpayment'+recid).attr('action'));
      }
      $('#form'+recid).addClass('js-form-cp-proccess');

      function t362_cloudPayments(e){
        if (! $(this).hasClass('js-form-cp-proccess')) {
          return;
        }

        var $recbox = $('#rec'+recid);
        e.stopPropagation();
        e.preventDefault();
        
        var currency = $('#rec'+recid+' .js-currency').val();
        if(! window.cloudpaymentshandler) {
          var lang='';
          if ( $('#rec'+recid+' .js-language').length > 0) {
            lang = $('#rec'+recid+' .js-language').val();
          }
          if (lang == '') {
            lang = (currency == 'RUB' || currency == 'BYR' ? 'ru-RU' : 'en-US');
          }
          window.cloudpaymentshandler = new cp.CloudPayments({language: lang});
        }
        
        if (t362_proccessError($(this),recid)) {
          $recbox.find('.t-popup').css('z-index','8000');
          var $paymentForm = $('#formpayment'+recid), $form = $('#form'+recid), email, allData={};
          $form.find('input,textarea').each(function(){
            var str = $(this).val();
            var ctrlname = $(this).attr('name');
            if ( ctrlname.substring(0,8)!= 'formserv' && ctrlname != 'form-spec-comments' && str > '') {
              allData[ctrlname] = str;
            }
            if (str > '' && str.indexOf('@')>0) {
              var $jqemail = $paymentForm.find('input[name=accountId]');
              if (!$jqemail || $jqemail.length == 0) {
                $paymentForm.append("<input type=hidden name=accountId value='"+str+"'>");
              } else {
                $jqemail.val(str);
              }
            }
          });
          email = $paymentForm.find('input[name=accountId]').val();

          if ($paymentForm.data('recurrent') == 1) {
            allData.cloudPayments = {recurrent: { interval: 'Month', period: 1 }};
            if ($paymentForm.data('recurrent-interval') > '') {
                allData.cloudPayments.recurrent.interval = $paymentForm.data('recurrent-interval');
            }
            if ($paymentForm.data('recurrent-period') > '') {
                allData.cloudPayments.recurrent.period = parseInt($paymentForm.data('recurrent-period'));
            }
          }
          
         /* $('#rec'+recid).find('.t-popup').css('z-index','8000');*/

          window.cloudpaymentshandler.charge(
            {
              publicId: $recbox.find('.js-cp-key').val(), 
              description: $recbox.find('.js_payment_product').val(), 
              amount: parseFloat($recbox.find('.js_payment_price').val()),
              currency: $recbox.find('.js-currency').val(), 
              accountId: (email ? email : ''),
              data: allData
            },
            function (options) { /* success*/
              //действие при успешной оплате
              t362_sendPaymentEventToStatistics(name, price);
              $('#form'+recid).removeClass('js-form-cp-proccess');
              $('#form'+recid).off('submit', t362_cloudPayments);
              
              $('#form'+recid).addClass('js-form-proccess').submit();
              $recbox.find('.t-popup').css('z-index','');
            },
            function (reason, options) { // fail
              if ($('#rec'+recid+' .js-failure-url').val() > '') {
                window.location.href = $('#rec'+recid+' .js-failure-url').val();
              }
              $recbox.find('.t-popup').css('z-index','');
            }
          );

        }
        return false;
      }

      $('#rec'+recid+' .js-form-cp-proccess').on('submit', t362_cloudPayments);

    }

    return false;
  });

  if ($('#rec'+recid).find('[name=tildaspec-cookie]').length > 0 ) {
    $('#rec'+recid).find('[name=tildaspec-cookie]').val(document.cookie);
  }

  if ($('#rec'+recid).find('.js-stripe-publishable-key').length > 0 && window.stripeapiiscalled!==true){
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      document.body.appendChild(script);
      window.stripeapiiscalled=true;
  }

  if ($('#rec'+recid).find('.js-cp-key').length > 0 && window.cloudpaymentsapiiscalled!==true){
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://widget.cloudpayments.ru/bundles/cloudpayments";
      document.body.appendChild(script);
      window.cloudpaymentsapiiscalled=true;
  }

} 
function t366_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  popup.css('display', 'block');
  t366_resizeGallery(recid);
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').click(function(e){
    if (e.target == this) { t366_closePopup(); }
  });

  el.find('.t-popup__close').click(function(e){
    t366_closePopup();
  });

  el.find('a[href*=#]:not(.carousel-control,.t-carousel__control)').click(function(e){
    var url = $(this).attr('href');
    if (!url || url.substring(0,7) != '#price:') {
      t366_closePopup();
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t366_closePopup(); }
  });
}

function t366_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t366_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height() - 120,
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}

function t366_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }
    
  virtPage += popupname;
  virtTitle += popupname;
    
  if(ga) {
    if (window.mainTracker != 'tilda') {
      ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
    }
  }
  
  if (window.mainMetrika > '' && window[window.mainMetrika]) {
    window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
  }
}

function t366_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    var obj = $('a[href="'+hook+'"]');
    obj.click(function(e){
      t366_showPopup(recid);
      t366_resizePopup(recid);
      e.preventDefault();
      if(window.lazy=='y'){t_lazyload_update();}
      if (analitics == 'yes') {
        t366_sendPopupEventToStatistics(hook);
      }
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
function t390_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').click(function(e){
    if (e.target == this) { t390_closePopup(); }
  });

  el.find('.t-popup__close').click(function(e){
    t390_closePopup();
  });

  el.find('a[href*=#]').click(function(e){
    var url = $(this).attr('href');
    if (!url || url.substring(0,7) != '#price:') {
      t390_closePopup();
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t390_closePopup(); }
  });
}

function t390_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t390_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height() - 120,
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}

function t390_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }
    
  virtPage += popupname;
  virtTitle += popupname;
    
  if(ga) {
    if (window.mainTracker != 'tilda') {
      ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
    }
  }
  
  if (window.mainMetrika > '' && window[window.mainMetrika]) {
    window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
  }
}

function t390_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    var obj = $('a[href="'+hook+'"]');
    obj.click(function(e){
      t390_showPopup(recid);
      t390_resizePopup(recid);
      e.preventDefault();
      if(window.lazy=='y'){t_lazyload_update();}
      if (analitics == 'yes') {
        t390_sendPopupEventToStatistics(hook);
      }
    });
  }
} 
function t391_checkSize(recid){
  var el=$("#rec"+recid);
  var cover = el.find('.t-cover');
  var carrier = el.find('.t-cover__carrier');
  var filter = el.find('.t-cover__filter');
  var height = el.find('.t391__firstcol').height() + el.find('.t391__secondcol').height();
  if (window.matchMedia('(max-width: 960px)').matches) {
    cover.css('height',height);
    carrier.css('height',height);
    filter.css('height',height);
  }
} 
function t397_init(recid){
  var el=$('#rec'+recid);
  el.find('.t397__tab').click(function() {
    el.find('.t397__tab').removeClass('t397__tab_active');
    $(this).addClass('t397__tab_active');
	t397_alltabs_updateContent(recid);
    t397_updateSelect(recid);
    $('.t347').trigger('displayChanged');
    $('.t346').trigger('displayChanged');
    $('.t351, .t353, .t341, .t404, .t385, .t386, .t412, .t268, .t425, .t409, .t384, .t279, .t428, .t418, .t433, .t121, .t478, .t498, .t552, .t544, .t554, .t545, .t486, .t570, .t422, .t601, .t228, .t229, .t456').trigger('displayChanged');
    setTimeout(function(){
      $('.t351, .t353, .t341, .t404, .t385, .t386, .t412, .t268, .t425, .t409, .t384, .t279, .t428, .t433, .t545, .t422, .t410').trigger('displayChanged');
    },50);
    if(window.lazy=='y'){t_lazyload_update();}
  });
  t397_alltabs_updateContent(recid);
  t397_updateContentBySelect(recid);
  var bgcolor=el.css("background-color");
  var bgcolor_target=el.find(".t397__select, .t397__firefoxfix");
  bgcolor_target.css("background-color", bgcolor);
}

function t397_alltabs_updateContent(recid){
  var el=$('#rec'+recid);
  el.find(".t397__tab").each(function (i) {
    var rec_ids = $(this).attr('data-tab-rec-ids').split(',');
	rec_ids.forEach(function(rec_id, i, arr) {
	  var rec_el=$('#rec'+rec_id);
	  rec_el.attr('data-connect-with-tab','yes');
	  rec_el.attr('data-animationappear','off');
	  rec_el.addClass('t379__off');
	});
  });

  el.find(".t397__tab_active").each(function (i) {
    var rec_ids = $(this).attr('data-tab-rec-ids').split(',');
	rec_ids.forEach(function(rec_id, i, arr) {
	  //console.log(rec_id);
	  var rec_el=$('#rec'+rec_id);
	  rec_el.removeClass('t379__off');
	  rec_el.css('opacity','');
	});
  });
}

function t397_updateContentBySelect(recid) {
  var el=$('#rec'+recid);
  el.find(".t397__select").change(function() {
    var select_val = el.find(".t397__select").val();
    var tab_index = el.find(".t397__tab[data-tab-rec-ids='" + select_val + "']");
    tab_index.trigger('click');
  });
}

function t397_updateSelect(recid) {
  var el=$('#rec'+recid);
  var current_tab = el.find(".t397__tab_active").attr('data-tab-rec-ids');
  var el_select=el.find(".t397__select");
  el_select.val(current_tab);
}
 
function t412_unifyHeights(recid) {
    var el=$("#rec"+recid);

    el.find('.t412__descr').css('height', "auto");  
    $('#rec'+recid+' .t412 .t-container').each(function() {
        var highestBox2 = 0;
        $('.t412__descr', this).each(function(){
            if($(this).height() > highestBox2)highestBox2 = $(this).height(); 
        });  
        if($(window).width()>=960 && $(this).is(':visible')){
        	$('.t412__descr',this).css('height', highestBox2); 
        }else{
	        $('.t412__descr',this).css('height', "auto");    
        }
    });

    el.find('.t412__title').css('height', "auto");
    $('#rec'+recid+' .t412 .t-container').each(function() {
        var highestBox3 = 0;
        $('.t412__title', this).each(function(){
            if($(this).height() > highestBox3)highestBox3 = $(this).height(); 
        });  
        if($(window).width()>=960 && $(this).is(':visible')){
        	$('.t412__title',this).css('height', highestBox3); 
        }else{
	        $('.t412__title',this).css('height', "auto");    
        }
    });

    el.find('.t412__wrapper').css('height', "auto");
    $('#rec'+recid+' .t412 .t-container').each(function() {
        var highestBox = 0;
        $('.t412__wrapper', this).each(function(){
            if($(this).height() > highestBox)highestBox = $(this).height();
        });  
        if($(window).width()>=960 && $(this).is(':visible')){
        	$('.t412__wrapper',this).css('height', highestBox); 
        }else{
	        $('.t412__wrapper',this).css('height', "auto");    
        }
    });
} 
function t425_unifyHeights(recid) {
    var el=$("#rec"+recid);

    el.find('.t425__col').css('height', "auto");
    $('#rec'+recid+' .t425 .t-container').each(function() {
        var t425__highestBox = 0;
        $('.t425__col', this).each(function(){						
			var t425__curcol=$(this);	
			var t425__curcolchild=t425__curcol.find('.t425__col-wrapper');
			if(t425__curcol.height() < t425__curcolchild.height())t425__curcol.height(t425__curcolchild.height());
            if(t425__curcol.height() > t425__highestBox)t425__highestBox = t425__curcol.height();			
        });  
        if($(window).width()>=960){
        	$('.t425__col',this).css('height', t425__highestBox); 
        }else{
	        $('.t425__col',this).css('height', "auto");    
        }
    });
}; 
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
 
function t520_unifyHeight(recid) {
  var el = $('#rec'+recid),
      image = el.find('.t520__bgimg'),
      text = el.find('.t-slides__item');
  image.css('height', '');
  text.each(function() {
    if($(window).width()>=640){
      $('.t520__bgimg', this).css('height', $(this).height()); 
      console.log($(this).height())
    }else{
      $('.t520__bgimg', this).css('height', '');    
    }
  });
  
}