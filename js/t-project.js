  function getUrlParameter(sParam)
  {
      var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++) 
      {
          var sParameterName = sURLVariables[i].split('=');
          if (sParameterName[0] == sParam) 
          {
              return sParameterName[1];
          }
      }
  }      
  
  function createpagefromexample_byid(examplepageid,projectid){
        showLoadIcon(); 
        $('#noactionlayer').css("display","block");
      $.ajax({
        type: "POST",
        url: "/projects/submit/",
        data: {comm: "addnewpagedublicateexample", projectid: projectid, examplepageid: examplepageid},
        dataType : "text",
        success: function(data){
        hideLoadIcon();                   
          if(data>0){       
          window.location.href = "/page/?pageid="+data;
        }else{
          alert(data);
          location.href = '/projects/';
        }
        },
        error: function(){
            alert('Request timeout (creating new page)');
            hideLoadIcon(); 
            location.reload();
        },
        timeout: 1000*90              
      });         
      event.preventDefault();
  }
  
  function projectPublish(projectid){ 
      showLoadIcon();     
      $('#noactionlayer').css("display","block");     
    $.ajax({
      type: "POST",
      url: "/page/publish/",
      data: {projectid: projectid},
      dataType : "text",
      success: function(data){
            hideLoadIcon(); 
            $('#noactionlayer').css("display","none");        
            $('#myModal').modal('show');
            $('#myModalContent').html(data);
            $('#myModal').on('hide.bs.modal', function () {
            location.reload();
          })
      },
      error: function(){
          alert('Request Timeout. Probably not all pages have been published. Please try to publish each page separately.');
          location.reload();
      },
      timeout: 1000*90      
    });
  }

  function dashboard_pagePublish(pageid){ 
      showLoadIcon();     
      $('#noactionlayer').css("display","block");     
    $.ajax({
      type: "POST",
      url: "/page/publish/",
      data: {pageid: pageid},
      dataType : "text",
      success: function(data){
            hideLoadIcon(); 
            $('#noactionlayer').css("display","none");        
            $('#myModal').modal('show');
            $('#myModalContent').html(data);
            $('#myModal').on('hide.bs.modal', function () {
            location.reload();
          })
      },
      error: function(){
          alert('Request Timeout. Please try to publish later.');
          location.reload();
      },
      timeout: 1000*90      
    });
  }

  function projectPublish_onebyone(projectid){  
      showLoadIcon();     
    $.ajax({
      type: "POST",
      url: "/projects/submit/",
      data: {comm: "publishallpages",projectid: projectid},
      dataType : "text",
      success: function(data){
            hideLoadIcon();
            $('#myModal').modal('show');
            $('#myModalContent').html(data);
            $('#myModal').on('hide.bs.modal', function () {
            location.reload();
          })
      }  
    });
  }
  
  function showformAddProject(){  
      showLoadIcon();     
    $.ajax({
      type: "POST",
      url: "/projects/submit/",
      data: {comm: "showaddprojectform"},
      dataType : "text",
      success: function(data){
            hideLoadIcon();         
            $('#myModal').modal('show');
            $('#myModalContent').html(data);
      },
      error: function(){
          alert('Request timeout (showing site creation dialog)');
          hideLoadIcon(); 
      },
      timeout: 1000*90                    
    });
  }

  function dublicatePage(pageid){
      showLoadIcon(); 
    $.ajax({
      type: "POST",
      url: "/projects/submit/",
      data: {comm: "dublicatepage", pageid: pageid},
      dataType : "text",
      success: function(data){
          hideLoadIcon();
          if(data==""){
            closepopup();         
            location.reload();
          }else if(data>0){
          closepopup();
          window.location.href = "/projects/pageduplicate/?pageid="+data;
        }else{
          $(".td-popup-error").html(data);
          }
      },
      error: function(){
          alert('Request timeout (page dupliaction)');
          hideLoadIcon(); 
          location.reload();
      },
      timeout: 1000*90      
    });
  }

  function delProject(projectid){
      showLoadIcon(); 
      $('#noactionlayer').css("display","block");
    $.ajax({
      type: "POST",
      url: "/projects/submit/",
      data: {comm: "delproject", projectid: projectid},
      dataType : "text",
      success: function(data){
          hideLoadIcon();   
          if(data!="")alert(data);
          location.href = '/projects/';
      },
      error: function(){
          alert('Request Timeout. Probably site is too big. Please check result of this command manually.');
          hideLoadIcon();
          location.href = '/projects/';
      },
      timeout: 1000*90      
    });
  }

  function showformAddPage(projectid){  
      showLoadIcon();     
    $.ajax({
      type: "POST",
      url: "/projects/submit/",
      data: {comm: "showaddpageform", projectid: projectid},
      dataType : "text",
      success: function(data){
            hideLoadIcon();         
            $('#myModalBig').modal('show');
            $('#myModalBigContent').html(data);
      },
      error: function(){
          alert('Request timeout (opening page creation dialog)');
          location.reload();
      },
      timeout: 1000*90      
    });
  }
  
  function delPage(pageid){
      showLoadIcon(); 
      $('#noactionlayer').css("display","block");
      closepopup();
    $.ajax({
      type: "POST",
      url: "/projects/submit/",
      data: {comm: "delpage", pageid: pageid},
      dataType : "text",
      success: function(data){
          hideLoadIcon();   
          $('#noactionlayer').css("display","none");            
          $("#page"+pageid).remove();
          if(data!='')alert(data);
      },
      error: function(){
          alert('Request Timeout. Probably page was too big. Please check result of this command manually.');
          hideLoadIcon(); 
          location.reload();
      },
      timeout: 1000*90            
    });
  }
  
  function updatePage(pageid){  
      showLoadIcon();     
    $.ajax({
      type: "POST",
      url: "/projects/submit/",
      data: {comm: "getpagehtml", pageid: pageid},
      dataType : "text",
      success: function(data){
            hideLoadIcon();         
          $("#page"+pageid).html(data);
      },
      error: function(){
          console.log('Request Timeout (page info update)');
          hideLoadIcon();
      },
      timeout: 1000*90      
    });
  }
  
  /*
  function showformEditPageSettings(pageid){  
      showLoadIcon();     
    $.ajax({
      type: "POST",
      url: "/projects/submit/",
      data: {comm: "editpagesettings", pageid: pageid},
      dataType : "text",
      success: function(data){
            hideLoadIcon();         
            $('#myModal').modal('show');
            $('#myModalContent').html(data);
      }
    });
  }
  */
  
  function showformEditPageSettings_new(pageid){  
      showLoadIcon();     
    $.ajax({
      type: "POST",
      url: "/projects/submit/",
      data: {comm: "editpagesettings", pageid: pageid},
      dataType : "text",
      success: function(data){
            hideLoadIcon();
            showpopup('#popup_pagesettings',data);
            init_popup();           
      },
      error: function(){
          alert('Request timeout (opening page settings dialog)');
          location.reload();
      },
      timeout: 1000*90      
    });
  } 

  /*
  function updateProject(projectid){  
      showLoadIcon();     
    $.ajax({
      type: "POST",
      url: "/projects/submit/",
      data: {comm: "getprojecthtml", projectid: projectid},
      dataType : "text",
      success: function(data){
            hideLoadIcon();         
          $("#project"+projectid).html(data);
      }
    });
  }
  */
  
  /*
  function showformEditProjectSettings(projectid,tabname){  
      showLoadIcon();     
    $.ajax({
      type: "POST",
      url: "/projects/submit/",
      data: {comm: "editprojectsettings", projectid: projectid},
      dataType : "text",
      success: function(data){
            hideLoadIcon();         
            $('#myModal').modal('show');
            $('#myModalContent').html(data);
            if(tabname)$('#myModal #myTabProjectSettings a[href="#'+tabname+'"]').tab('show');
      }
    });
  }
  */

  function showformEditProjectSettings_new(projectid,tabname){
    if(tabname){}else{tabname='';}  
    var gourl="/projects/settings/?projectid="+projectid;
    if(tabname){gourl+="#tab="+tabname;}
    window.location.href = gourl;
  }

  function showLoadIcon(){
    $('#loadicon').css({"display":"block"});  
  }

  function hideLoadIcon(){
    $('#loadicon').css({"display":"none"});     
  }

  /* for unpublish page */
  function pageUnpublish(pageid){
    //showpublishpopup();
    var data = "<div id='loadingcenter' style='margin:5px 0px; font-size:14px; text-align:left;'>";
      data += "<img src='/tpl/img/ajax-loader.gif' style='margin-right: 10px;'>";
      data += ""+(lang=="RU" ? "ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð° Ð¿Ð¾Ð´Ð¾Ð¶Ð´Ð¸Ñ‚Ðµ" : "Please wait")+"";
      data += "</div>";
    $('#formpageedit  #unpublishpagebox').html(data);
    
    $.ajax({
      type: "POST",
      url: "/page/unpublish/",
      data: {pageid: pageid},
      dataType : "text",
      success: function(data){
        $('#formpageedit #loadingcenter').slideUp();
        $('#formpageedit  #unpublishpagebox').html(data);
      },
      error: function(){
        alert('Request timeout (page unpublishing). Please try again.');
        hideLoadIcon();
      },
      timeout: 1000*90
    });
  }

  function savePagesSort() {
    var arrNewPages = [];
    clearTimeout($("#pagesortable").data('autosavepagesort'));
    var projectid = $("#pagesortable").data('projectid');
    
    $( "#pagesortable").find('div.td-page').each(function(){
      arrNewPages.push ($(this).attr('id').replace('page',''));
    });
    
    showLoadIcon();
    $.ajax({
      type: "POST",
      url: "/projects/submit/",
      data: {comm: "savepagessort", projectid: projectid, sorts: arrNewPages},
      dataType : "text",
      success: function(data){
      hideLoadIcon();
      },
      error: function(){
        alert('Request timeout (saving pages order)');
        hideLoadIcon();
        location.reload();
      },
      timeout: 1000*90
    });
    
  }
  
$(document).ready(function(){
  $("#pagesortable").data('autosavepagesort','0');
  $( "#pagesortable" ).sortable({
    helper: 'clone',
    items: "div.td-page",
    opacity: 0.8,
    placeholder: "td-page_highlight",
    axis:'y',
    revert: true,
    scrollSensitivity: 10,
    tolerance :'pointer',
    
    start: function(event, ui) {
      clearTimeout($("#pagesortable").data('autosavepagesort'));
      $("#pagesortable").data('autosavepagesort','0');
    },
    change: function(event, ui) {
      clearTimeout($("#pagesortable").data('autosavepagesort'));
      $("#pagesortable").data('autosavepagesort','0');
    },
    update: function(event, ui) {
      $("#pagesortable").data('autosavepagesort',setTimeout(function() {
        $("#pagesortable").data('autosavepagesort','0');
        savePagesSort();
      },1500));
    }
  });
  $( "#pagesortable .js-sortable-place" ).disableSelection();
});