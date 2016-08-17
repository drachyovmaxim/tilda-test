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
  $('.tcrm-input-date').datetimepicker({
    format:'d.m.Y',
    timepicker: false
  });
  $('#datetimepicker').datetimepicker({
    format:'d.m.Y H:i',
    step: 5,
    lazyInit: true
  });
  $.datetimepicker.setLocale('ru');
}

function initCrmTabs() {
  var tabsWrapper = $(".tcrm-tabs");
  if (tabsWrapper.length ) {
    $('.tcrm-tabs-item').click(function() {
      removeActiveCheckboxes();
      $('.tcrm-tabs-item').removeClass('tcrm-active');
      $(this).addClass('tcrm-active');
      $(".tcrm-list-tab").removeClass('tcrm-list-tab-active');
      var activeContent = $(this).attr("data-crm-tab");
      $("#" + activeContent + "").addClass('tcrm-list-tab-active');
    });
    $(".tcrm-header").removeClass("tcrm-header-no-tabs");
  } else {
    $(".tcrm-header").addClass("tcrm-header-no-tabs");
  }
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

function setCrmContainerWidth(){
  var totalWidth=0;
  $('.tcrm-table-header .tcrm-table-col').each(function() {
    totalWidth += ($(this).innerWidth() + 5);
    var tableContainer = $(".tcrm-table-container").innerWidth();
    var tableWrapper = $(".tcrm-table-wrapper").innerWidth();
    if (tableContainer < totalWidth) {
      $(".tcrm-table-wrapper").css("min-width", totalWidth);
    } else {
      $(".tcrm-table-wrapper").css("min-width", "");
    }
  });
}

function setCrmItemWidth(){
  $('.tcrm-table-header .tcrm-table-col').each(function(i) {
    $(this).attr("data-crm-col-index", "col-index-" + [i] + "");
    this.column_attribute = $(this).attr("data-crm-col-index");
    if (localStorage.getItem(this.column_attribute) != null) {
      value = localStorage.getItem(this.column_attribute);
      $(this).width(value);
    }
  });
}

function setCrmListItemWidth(){
  $('.tcrm-list-item').each(function() {
    $(this).find('.tcrm-table-col').each(function(i) {
      $(this).css("width", ($(".tcrm-table-header .tcrm-table-col").eq([i]).width() + "px"))
    });
  });
}

function resizeCrmCol(){
  $('.tcrm-table-header .tcrm-table-col').resizable({
    minWidth: 100,
    resize: function(event, ui) {
      $(".tcrm-table-wrapper").css({
        'min-width' : '3000px'
      });
    },
    stop: function(event, ui) {
      var text = $(this).attr("data-crm-col-index");
      var textwidth = $(this).width();
      localStorage.setItem(text, textwidth);
      setCrmContainerWidth();
    }
  });
}

$(document).ready(function(){
  setCrmItemWidth();
  setCrmContainerWidth();
  setCrmListItemWidth();
  $('.tcrm-checkbox').styler();
  changeListHeight(); 
  showCrmSearch(); 
  showCrmDropDown();
  initCrmDatePicker();
  initCrmTabs();
  showMoreCrm('tcrm-list-tab-first');
  showMoreCrm('tcrm-list-tab-second');
  showMoreCrm('tcrm-list-tab-third');
  checkCrmCheckboxes();
  resizeCrmCol();
});

$(window).resize(function() {
  changeListHeight();
  setCrmListItemWidth();
  setCrmContainerWidth();
});
