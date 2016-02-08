 
function t260_init(){
	$(".t260").each(function() {
		var el=$(this);
		if(el.attr('data-block-init')=='yes'){
		}else{
		  el.attr('data-block-init','yes');

          var toggler = el.find(".t260-header");
          var content = el.find(".t260-content");

          toggler.click(function() {
			$(this).toggleClass("t260-opened");
			if($(this).hasClass("t260-opened")==true){
				content.slideDown();
			}else{
				content.slideUp();
			}
          })

		}
	});
} 
function t300_init(){
  $(".t300").each(function() {
	var $hook=$(this).attr('data-tooltip-hook');
    if($hook!==''){
		var $obj = $('a[href*="'+$hook+'"]');
		var $content=$(this).find('.t300-content').html();
		if($hook.charAt(0)=='#'){var touchDevices=true;}else{var touchDevices=false;}
		var position=$(this).attr('data-tooltip-position');
		if(position!==''){}else{position='top';}
	    $obj.tooltipster({'theme':'t300-tooltipster-noir','contentAsHTML': true,'content': $content, interactive:true, touchDevices:touchDevices, position:position});
	}
  });
}

$(document).ready(function(){
	t300_init();
});
