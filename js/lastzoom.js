function t_initZoom() {
  // if ($('[data-zoomable="yes"]').length) {
  //   $('[data-zoomable="yes"]').addClass("t-zoomable");
  //   $("body").append('<div class="t-zoomer__wrapper">\
  //     <div class="t-zoomer__container">\
  //     </div>\
  //     <div class="t-zoomer__close">\
  //       <div class="t-zoomer__close-line t-zoomer__close-line-first"></div>\
  //       <div class="t-zoomer__close-line t-zoomer__close-line-second"></div>\
  //     </div>\
  //   </div>');
  //   t_showZoom();
  // }

  if (window.$isMobile) {
    $('#reczoom').addClass('reczoom-mobile');
  }

  t_sldsInit('zoom');

  $('.zcontainer').each(function(index) {
    var element = $('#reczoom');
    var container = $(this);
    var image = $(this).find('.zimg');
    var imageW = image.width();
    var imageH = image.height();
    var maxW = container.width();
    var maxH = container.height();
    var defaultScale = true;
    if (imageW > maxW || imageH > maxH) {
      var scale = Math.min(maxW / imageW, maxH / imageH);
      var zoomedScale = 1;
      var minScale = scale;
      if (imageW < maxW || imageH < maxH) {
        zoomedScale = Math.max(maxW / imageW, maxH / imageH);
        defaultScale = false;
        minScale = zoomedScale;
      }
      var maxScale = 1;
      var allowZoom = true;
      var currentW = imageW*scale;
      var currentH = imageH*scale;
      var imgOffsetX = (maxW-currentW)/2;
      var imgOffsetY = (maxH-currentH)/2;
      var clicked = false;
      var coorX = 0;
      var coorY = 0;
      var clickX = 0;
      var clickY = 0;
      var zoomedClickX = 0;
      var zoomedClickY = 0;
      var width = 0;
      var height = 0;
      var lastPosX = imgOffsetX;
      var lastPosY = imgOffsetY;
      var adjustScale = scale;
      var currentScale = null;
      var isDragging = false;
      var deltaX = 0;
      var deltaY = 0;
      var x1 = 0;
      var y1 = 0;
      if (imageW>maxW) {
        width = maxW;
      } else {
        width = imageW;
      }
      if (imageH>maxH) {
        height = maxH;
      } else {
        height = imageH;
      }
      
      var coorMaxX = width - imageW;
      var coorMinX = maxW - width;
      var coorMaxY = height - imageH;
      var coorMinY = maxH - height;

      if (!defaultScale) {
        coorMaxX = maxW - maxW*zoomedScale/scale;
        coorMaxY = maxH - maxH*zoomedScale/scale;
      }
    } else {
      var scale = 1;
    }

    image.on('mousedown', function(e) {
      e.preventDefault();
    });

    image.width(imageW).height(imageH).css({
      transform: 'translate3d('+imgOffsetX+'px, '+imgOffsetY+'px, 0) scale(' + scale + ')'
    });

    if (allowZoom) {
      delete Hammer.defaults.cssProps.userSelect;
      var hammer = new Hammer(image[0], {
        domEvents: true,
        threshold: 0,
        recognizers: [
          [Hammer.Pan, { direction: Hammer.DIRECTION_ALL }],
          [Hammer.Tap],
          [Hammer.Pinch]
        ]
      });

      hammer.on('tap', function(ev) {
        if (clicked) {
          image.css({
            transform: 'translate3d('+imgOffsetX+'px, '+imgOffsetY+'px, 0) scale(' + scale + ')'
          });
          $('#reczoom .t-slds__items-wrapper').attr('data-slider-stop', 'false');
          lastPosX = imgOffsetX;
          lastPosY = imgOffsetY;
          adjustScale = scale;
          clicked = false;
        } else {
          clicked = true;
          $('#reczoom .t-slds__items-wrapper').attr('data-slider-stop', 'true');
          image.addClass('zimg-animated');
          clickX = ev.center.x - image.offset().left;
          clickY = ev.center.y - (image.offset().top - element.offset().top);
          zoomedClickX = clickX*zoomedScale/scale;
          zoomedClickY = clickY*zoomedScale/scale;
          coorX = clickX - zoomedClickX + imgOffsetX;
          coorY = clickY - zoomedClickY + imgOffsetY;

          if (coorX<coorMaxX) {coorX=coorMaxX}
          if (coorX>coorMinX) {coorX=coorMinX}
          if (coorY<coorMaxY) {coorY=coorMaxY}
          if (coorY>coorMinY) {coorY=coorMinY}

          if (imageW < maxW) { coorX = 0; }
          if (imageH < maxH) { coorY = 0; }

          image.css({
            transform: 'translate3d(' + coorX + 'px, ' + coorY + 'px, 0) scale(' + zoomedScale + ')'
          });

          lastPosX = coorX;
          lastPosY = coorY;
          adjustScale = zoomedScale;
        }
      });

      // hammer.on('pinch', function(ev) {
      //   $('#reczoom .t-slds__items-wrapper').attr('data-slider-stop', 'true');
      //   image.removeClass('zimg-animated');
      //   currentScale = adjustScale * ev.scale;
      //   if (currentScale>maxScale) { currentScale=maxScale }
      //   if (currentScale<minScale) { currentScale=minScale }

      //   if (ev.pointers[0].clientX > ev.pointers[1].clientX) {
      //     x1 = ev.pointers[0].clientX - (ev.pointers[0].clientX - ev.pointers[1].clientX)/2 - imgOffsetX;
      //   } else {
      //     x1 = ev.pointers[1].clientX - (ev.pointers[1].clientX - ev.pointers[0].clientX)/2 - imgOffsetX;
      //   }
      //   if (ev.pointers[0].clientY > ev.pointers[1].clientY) {
      //     y1 = ev.pointers[0].clientY - (ev.pointers[0].clientY - ev.pointers[1].clientY)/2 - imgOffsetY;
      //   } else {
      //     y1 = ev.pointers[1].clientY - (ev.pointers[1].clientY - ev.pointers[0].clientY)/2 - imgOffsetY;
      //   }

      //   // if (maxW>imageW*currentScale) {
      //   //   coorX = x1 - x1*currentScale - lastPosX*currentScale;
      //   //   console.log('width')
      //   // } else {
      //     coorX = x1 - x1*currentScale + lastPosX*currentScale;
      //   // }

      //   // if (maxH>imageH*currentScale) {
      //   //   coorY = y1 - y1*currentScale - lastPosY*currentScale;
      //   //   console.log('height')
      //   // } else {
      //     coorY = y1 - y1*currentScale + lastPosY*currentScale;
      //   // }

      //   image.css({
      //     transform: 'translate3d(' + coorX + 'px, ' + coorY + 'px, 0) scale(' + currentScale + ')'
      //   });
      // });

      // hammer.on("pinchend", function (ev) {
      //   adjustScale = currentScale;
      //   lastPosX = coorX;
      //   lastPosY = coorY;

      //   image.addClass('zimg-animated').css({
      //     transform: 'translate3d(' + coorX + 'px, ' + coorY + 'px, 0) scale(' + currentScale + ')'
      //   });

      //   // $('#reczoom .t-slds__items-wrapper').attr('data-slider-stop', 'false');
      //   // if (currentScale<minScale*1.5) {
      //   //   console.log(currentScale,minScale*2)
      //   //   if (!image.hasClass('zimg-animated')) {
      //   //     image.addClass('zimg-animated');
      //   //   }
      //   //   image.css({
      //   //     transform: 'translate3d('+imgOffsetX+'px, '+imgOffsetY+'px, 0) scale(' + scale + ')'
      //   //   });
      //   //   $('#reczoom .t-slds__items-wrapper').attr('data-slider-stop', 'false');
      //   //   clicked = false;
      //   //   dragged = true;
      //   //   hammer.off('pan pinch pinchend tap');
      //   // }
      // });

      hammer.on('pan', function(ev) {
        if (clicked) {
          if ( ! isDragging ) {
            isDragging = true;
            image.removeClass('zimg-animated').addClass('z-img-dragable');
          }
          currentScale = adjustScale * ev.scale;
          deltaX = ev.deltaX;
          deltaY = ev.deltaY;
          coorX = lastPosX * currentScale + deltaX * currentScale;
          coorY = lastPosY * currentScale + deltaY * currentScale;

          image.css({
            transform: 'translate3d(' + coorX + 'px, ' + coorY + 'px, 0) scale(' + currentScale + ')'
          });

          if (ev.isFinal) {
            isDragging = false;
            image.addClass('zimg-animated').removeClass('z-img-dragable');
            coorX = coorX + ev.velocityX*100;
            coorY = coorY + ev.velocityY*100; 
            image.css({
              transform: 'translate3d(' + coorX + 'px, ' + coorY + 'px, 0) scale(' + currentScale + ')'
            });

            if (coorX<coorMaxX) {coorX=coorMaxX}
            if (coorX>coorMinX) {coorX=coorMinX}
            if (coorY<coorMaxY) {coorY=coorMaxY}
            if (coorY>coorMinY) {coorY=coorMinY}

            if (imageW < maxW) { coorX = 0; }
            if (imageH < maxH) { coorY = 0; }

            image.css({
              transform: 'translate3d(' + coorX + 'px, ' + coorY + 'px, 0) scale(' + currentScale + ')'
            });
            lastPosX = coorX;
            lastPosY = coorY;
          }
        }
      });
    }
  });
}

function t_showZoom() {
    $('.t-zoomable').click(function(e) {
        $("body").addClass("t-zoomer__show");
        $(".t-zoomer__container").html('<div class="t-carousel__zoomed">\
      <div class="t-carousel__zoomer__slides">\
        <div class="t-carousel__zoomer__inner">\
        </div>\
        <div class="t-carousel__zoomer__control t-carousel__zoomer__control_left" data-zoomer-slide="prev">\
          <div class="t-carousel__zoomer__arrow__wrapper t-carousel__zoomer__arrow__wrapper_left">\
            <div class="t-carousel__zoomer__arrow t-carousel__zoomer__arrow_left t-carousel__zoomer__arrow_small"></div>\
          </div>\
        </div>\
        <div class="t-carousel__zoomer__control t-carousel__zoomer__control_right" data-zoomer-slide="next">\
          <div class="t-carousel__zoomer__arrow__wrapper t-carousel__zoomer__arrow__wrapper_right">\
            <div class="t-carousel__zoomer__arrow t-carousel__zoomer__arrow_right t-carousel__zoomer__arrow_small"></div>\
          </div>\
        </div>\
      </div>\
    </div>');
        var id = $(this).closest(".r").attr("id"),
            images = $("#" + id + "").find(".t-zoomable");
        images.each(function() {
            var images_urls = $(this).attr('data-img-zoom-url').split(',');
            if ($(this).is("img")) {
                var imgdescr = $(this).attr('alt')
            }
            if ($(this).is("div")) {
                var imgdescr = $(this).attr('title')
            }
            images_urls.forEach(function() {
                if (typeof imgdescr !== "undefined" && imgdescr !== !1) {
                    $(".t-carousel__zoomer__inner").append("<div class=\"t-carousel__zoomer__item\"><div class=\"t-carousel__zoomer__wrapper\"><img class=\"t-carousel__zoomer__img\" src=\"" + images_urls + "\"></div><div class=\"t-zoomer__comments\"><div class=\"t-zoomer__descr t-descr t-descr_xxs\">" + imgdescr + "</div></div></div>")
                } else {
                    $(".t-carousel__zoomer__inner").append("<div class=\"t-carousel__zoomer__item\"><div class=\"t-carousel__zoomer__wrapper\"><img class=\"t-carousel__zoomer__img\" src=\"" + images_urls + "\"></div><div class=\"t-zoomer__comments\"></div></div>")
                }
            })
        });

        var image_descr = $(".t-carousel__zoomer__item");
        image_descr.each(function() {
            $(this).css("display", "block");
            var height = $(this).find(".t-zoomer__comments").height();
            $(this).css("display", "");
            var image_active = $(this).find(".t-carousel__zoomer__wrapper");
            image_active.css("bottom", height)
        });

       

        $('.t-zoomer__close, .t-zoomer__bg').click(function(e) {
            $('body').removeClass("t-zoomer__show");
            $('body').removeClass("t-zoomer__show_fixed");
            $(document).unbind('keydown')
        })

        $(document).keydown(function(e) {
            if (e.keyCode == 37) {
                pos = (pos - 1) % slideItem.length;
                slideItem.hide(0).eq(pos).show(0)
            }
            if (e.keyCode == 39) {
                pos = (pos + 1) % slideItem.length;
                slideItem.hide(0).eq(pos).show(0)
            }
            if (e.keyCode == 27) {
                $('body').removeClass("t-zoomer__show");
                $('body').removeClass("t-zoomer__show_fixed");
                $(document).unbind('keydown')
            }
        });
        var slides_count = $(".t-carousel__zoomer__item").size();
        if (slides_count > 1) {
            $('body').addClass("t-zoomer__show_fixed")
        } else {
            $(".t-carousel__zoomer__control").css("display", "none")
        }
        $('.t-carousel__zoomer__inner').click(function(e) {
            $('body').removeClass("t-zoomer__show");
            $('body').removeClass("t-zoomer__show_fixed");
            $(document).unbind('keydown')
        });
        var lastScrollTop = 0;
        $(window).scroll(function(event) {
            var st = $(this).scrollTop();
            if (st > lastScrollTop) {
                $('body').not('.t-zoomer__show_fixed').removeClass("t-zoomer__show");
                $(document).unbind('keydown')
            }
            lastScrollTop = st
        })
    })
}

$(document).ready(function() {
    setTimeout(function() {
        t_initZoom()
    }, 500)
})