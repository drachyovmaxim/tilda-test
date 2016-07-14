function changeListHeight() {
  var list = $(".tcrm-list");
  var listHeight = $(window).height() - $(".tcrm-header").innerHeight() - 95;
  list.height(listHeight);
}

function showCrmDropDown() {
  $(".tcrm-table-header-dropdown-body").click(function() {
    $(".tcrm-table-header-dropdown-content").toggleClass("tcrm-table-header-dropdown-content-show");
  });
}

function showCrmSearch() {
  var searchWrapper = $(".tcrm-filter");
  $(".tcrm-search-icon-body").click(function() {
    searchWrapper.toggleClass("tcrm-filter-hidden");
    $(this).toggleClass("tcrm-search-icon-body-flipped");
    changeListHeight();
  });
}

function initCrmDatePicker() {
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
}

function initCrmTabs() {
  $('.tcrm-tabs-item').click(function() {
    removeActiveCheckboxes();
    $('.tcrm-tabs-item').removeClass('tcrm-active');
    $(this).addClass('tcrm-active');
    $(".tcrm-list-tab").removeClass('tcrm-list-tab-active');
    var activeContent = $(this).attr("data-crm-tab");
    $("#" + activeContent + "").addClass('tcrm-list-tab-active');
    
  });
}

function removeActiveCheckboxes() {
  if ($('.tcrm-checkbox-main').hasClass("checked")) {
    $('.tcrm-checkbox-main').trigger("click");
  }
  var activeCheckboxes = $(".tcrm-list-tab-active").find('.tcrm-checkbox');
  activeCheckboxes.each(function() {
    if ($(this).hasClass("checked")) {
      $(this).trigger("click");
    }
  });
}

function checkCrmCheckboxes() {
  $('.tcrm-checkbox-main').click(function() {
    var activeCheckboxes = $(".tcrm-list-tab-active").find('.tcrm-checkbox');
    activeCheckboxes.each(function() {
      if ($(this).hasClass("checked") && ($(".tcrm-checkbox.checked").size() == activeCheckboxes.size())) {
      } else {
        $(this).trigger("click");
      }
    });
  });
}

function showMoreCrm(id){
  var showmore_list = $('#' + id + '')
  showmore_list.find(".tcrm-list-item").hide();
  showmore_list.find('.tcrm-list-item:lt(20)').show();
  showmore_list.find('.tcrm-showmore').each(function(i) {
    var showmore_list_item = showmore_list.find('.tcrm-list-item');
    cards_size = showmore_list_item.size();
    cards_count= 20;
    this.x=cards_count;
    this.y=cards_count;
    $(this).click(function () {
      this.x= (this.x+this.y <= cards_size) ? this.x+this.y : cards_size;
      showmore_list.find('.tcrm-list-item:lt('+this.x+')').show();
      if(this.x == cards_size){
        $(this).hide();
      }
    });
  });
}

function setCrmItemWidth(){
  $('.tcrm-list-item').each(function(i) {
    $(this).find('.tcrm-table-col').each(function(i) {
      $(this).addClass("tcrm-table-col-" + [i] +"");
    });
  });
  var totalWidth=0;
  $('.tcrm-table-header .tcrm-table-col').each(function(i) {
    totalWidth += $(this).width() + 1;
    var tableContainer = $(".tcrm-table-container").innerWidth();
    var tableWrapper = $(".tcrm-table-wrapper").innerWidth();
    if (tableContainer < totalWidth) {
      $(".tcrm-table-wrapper").css("min-width", totalWidth);
    } else {
      $(".tcrm-table-wrapper").css("min-width", "");
    }
    $(this).addClass("tcrm-table-col-" + [i] +"");
    $(this).attr("data-crm-col-index", "col-index-" + [i] + "")
    $('.tcrm-list-item').each(function(i) {
      $(this).find('.tcrm-table-col').each(function(i) {
        $(this).addClass("tcrm-table-col-" + [i] +"");
        $(this).css("width", ($(".tcrm-table-col-" + [i] +"").width() + "px"))
      });
    });
  });
}

function resizeCrmCol(){
  $(".tcrm-table-col").resizable({
    stop: function(event, ui) {
      var text = $(this).attr("data-crm-col-index");
      var textwidth = $(this).width();
      localStorage.setItem(text, textwidth);
    }
  });

  $('.tcrm-table-header .tcrm-table-col').each(function(i) {
    this.lll = $(this).attr("data-crm-col-index");
    value = localStorage.getItem(this.lll);
    $(this).width(value);
  });
}

$(document).ready(function(){
  $('.tcrm-checkbox').styler();
  changeListHeight(); 
  showCrmSearch(); 
  showCrmDropDown();
  initCrmDatePicker();
  initCrmTabs();
  showMoreCrm('tcrm-list-tab-first');
  showMoreCrm('tcrm-list-tab-second');
  showMoreCrm('tcrm-list-tab-third');
  setCrmItemWidth();
  checkCrmCheckboxes();
  resizeCrmCol();
  $(".tcrm-table-header").css("overflow-y", "hidden");
});


$(window).load(function() {
  changeListHeight();
  setCrmItemWidth();
  $(".tcrm-table-header").css("overflow-y", "");
});


$(window).resize(function() {
  changeListHeight();
  setCrmItemWidth();
});
