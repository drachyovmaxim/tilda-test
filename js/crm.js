function menu(menu){
  $(".ss-content").find('.ss-menu-pane').removeClass('ss-menu-pane_active');
  $(menu).addClass('ss-menu-pane_active');
}

function switchtab(tab){
  $(".ss-content").find('.ss-tab-pane').removeClass('ss-tab-pane_active');
  $(tab).addClass('ss-tab-pane_active');
}

$(document).ready(function(){
  $(".tcrm-table-header-dropdown-body").click(function() {
    $(".tcrm-table-header-dropdown-content").toggleClass("tcrm-table-header-dropdown-content-show");
  });

  // var mainCheckbox = $(".tcrm-checkbox-main");

  $('.tcrm-input-date').pickmeup({
    hide_on_select: true,
    locale      : {
      days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'December'],
      monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    },  
  });

  $('.tcrm-tabs-item').click(function() {
    $('.tcrm-tabs-item').removeClass('tcrm-active');
    $(this).addClass('tcrm-active');
    $(".tcrm-list-tab").removeClass('tcrm-list-tab-active');
    var activeContent = $(this).attr("data-crm-tab");
    $("#" + activeContent + "").addClass('tcrm-list-tab-active');
  });

  var showmoreId = $('.tcrm-showmore').attr("data-crm-shom-more-id");
  $("#" + showmoreId + " .tcrm-list-item").hide();
  cards_size = $("#" + showmoreId + " .tcrm-list-item").size();
  cards_count= 15;
  x=cards_count;
  y=cards_count;
  $('#' + showmoreId + ' .tcrm-list-item:lt('+x+')').show();
  $('#' + showmoreId + ' .tcrm-showmore').click(function () {
      x= (x+y <= cards_size) ? x+y : cards_size;
      $('#' + showmoreId + ' .tcrm-list-item:lt('+x+')').show();
      if(x == cards_size){
          $('#' + showmoreId + ' .tcrm-showmore').hide();
      }
  });

  $('.tcrm-checkbox').styler();

  $('.tcrm-list-item').each(function(i) {
    $(this).find('.tcrm-table-col').each(function(i) {
      $(this).addClass("tcrm-table-col-" + [i] +"");
    });
  });

  var totalWidth = 0;
  $('.tcrm-table-header .tcrm-table-col').each(function(i) {
    totalWidth += parseInt($(this).innerWidth(), 10);
    var tableContainer = $(".tcrm-table-container").width();
    var tableWrapper = $(".tcrm-table-wrapper").width();
    if (tableContainer < totalWidth) {
      $(".tcrm-table-wrapper").width(totalWidth);
    } else {
      $(".tcrm-table-wrapper").css("width", "");
    }
    $(this).addClass("tcrm-table-col-" + [i] +"")
    $('.tcrm-list-item').each(function(i) {
      $(this).find('.tcrm-table-col').each(function(i) {
        $(this).addClass("tcrm-table-col-" + [i] +"");
        $(this).css("width", ($(".tcrm-table-col-" + [i] +"").width() + "px"))
      });
    });
  });
});
