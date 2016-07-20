function editSrmPopupColumns(){
  $('.tcrm-settings-tab-columns-name-edit').click(function() {
    var columnBody = $(this).closest('.tcrm-settings-tab-columns-item-info');
    var columnInput = columnBody.closest('.tcrm-settings-tab-columns-item').find('.tcrm-settings-tab-columns-item-input');
    columnBody.hide();
    columnInput.show();
  });

  $('.tcrm-settings-tab-columns-item-input-btn').click(function() {
    var columnBody = $(this).closest('.tcrm-settings-tab-columns-item-input');
    var columnInput = columnBody.closest('.tcrm-settings-tab-columns-item').find('.tcrm-settings-tab-columns-item-info');
    columnBody.hide();
    columnInput.show();
  });
}

function setSrmPopupColumnsColor(){
  var columnsItems = $(".tcrm-settings-tab-columns-item");
  var columnsCheckbox = columnsItems.find(".tcrm-checkbox");
  columnsCheckbox.each(function() {
    if ($(this).hasClass("checked")) {
      $(this).closest(columnsItems).addClass("tcrm-settings-tab-columns-item-active");
    } else {
      $(this).closest(columnsItems).removeClass("tcrm-settings-tab-columns-item-active");
    }
    $(this).click(function() {
      if ($(this).hasClass("checked")) {
        $(this).closest(columnsItems).addClass("tcrm-settings-tab-columns-item-active");
      } else {
        $(this).closest(columnsItems).removeClass("tcrm-settings-tab-columns-item-active");
      }
    });
  });
}

function addSrmNewUser(){
  $(".tcrm-users-tab-add").click(function() {
    closepopup();
    showpopup('#tcrm_popup_new_user');
  });

  $(".tcrm-users-add-btn, .tcrm-new-user-popup .td-popup-window__close").click(function() {
    closepopup();
    showpopup('#tcrm_popup_settings');
  });
}

function startSrmExport(){
  $(".tcrm-export-tab-btn").click(function() {
    closepopup();
    showpopup('#tcrm_popup_export');
  });

  $(".tcrm-export-popup .td-popup-window__close").click(function() {
    closepopup();
    showpopup('#tcrm_popup_settings');
  });
}

function newSrmColumn(){
  $(".tcrm-settings-tab-columns-add-item").click(function() {
    closepopup();
    showpopup('#tcrm-popup-new-column');
  });

  $(".tcrm-new-column-popup .td-popup-window__close, .tcrm-new-columns-popup-btn").click(function() {
    closepopup();
    showpopup('#tcrm_popup_settings');
  });
}

$(document).ready(function(){
  init_popup();
  editSrmPopupColumns();
  setSrmPopupColumnsColor();
  addSrmNewUser();
  startSrmExport();
  newSrmColumn();
});