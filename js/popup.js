function showpopup(popup_div_id){
  $('body').addClass('te-body_popup-opened');
  $(popup_div_id).addClass('te-popup_opened');
  $(popup_div_id).fadeIn('fast');
  $(document).keyup(keyUpFunc); 
}

function keyUpFunc(e) {
  if (e.keyCode == 27) { 
    closepopup();
  }
}

function closepopup(){
  $('body').removeClass('te-body_popup-opened');
  var popup=$(".te-popup_opened"); 
  popup.fadeOut();
  $(document).unbind("keyup", keyUpFunc);
}


$(document).ready(function(){
  $(function() {
    $('.te-grid__topslide') .css({'height': (($(window).height() - 60))+'px'});
    $(window).resize(function(){
      $('.te-grid__topslide') .css({'height': (($(window).height() - 60))+'px'});
    });
  });
});

$(document).ready(function(){
  $('.te-header__dropdown__link').click(function() {
    $('body').toggleClass('te-header__dropdown_opened');
    $('body').removeClass('te-header__bookmarks_opened');
  });
});

$(document).ready(function(){
  $('.te-header__bookmarks__link').click(function() {
    $('body').toggleClass('te-header__bookmarks_opened');
    $('body').removeClass('te-header__dropdown_opened');
  });
});


$(document).ready(function(){
  $(".te-header__usermenu").hover(function(){
      $(".te-header__usermenu").toggleClass("te-header__usermenu__active");
  });

  $(".r").hover(function(){
      $(this).toggleClass("te-bookmarks__link_active");
  });
});

$(document).ready(function(){
  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
      $(".te-grid__topslide-arrow__wrapper").addClass("te-grid__topslide-arrow__wrapper_hidden");
    }
  });
});







