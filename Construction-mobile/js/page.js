function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        document.documentElement.style.width="1280px";
    }
}

browserRedirect();
 
var pageJs =  function(config) {
	var _self = this;
    _self.config = $.extend({},config,pageJs.config);
    _self._init();
}

pageJs.config = {
	
}

pageJs.prototype = {
	_init: function() {
		$(document).ready(function(){//处理ie6下的hover
		    var bro=$.browser;
		    var binfo="";
		    if(bro.msie && bro.version == '6.0') {
		    	var pngImg = $('img.iepngfix');  
				pngImg.each(function(i, img){  
				    $(img).css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + img.src + '",sizingMethod="noscale");');  
				   img.src = 'http://img.china.alibaba.com/images/common/util/1x1.gif';  
				});  
		    	//侧导航的信息展示
		    	$(document).on('mouseover','.J_sidenav_item',function(e){
		    		var $target = $(e.target);
		    		var $J_sidenav_item = $target.parents('.J_sidenav_item');
		    		var $J_sidenav_itemBox = $J_sidenav_item.find('.J_sidenav_itemBox');
		    		$J_sidenav_itemBox.show();
		    	}).on('mouseout','.J_sidenav_item',function(e){
		    		var $target = $(e.target);
		    		var $J_sidenav_item = $target.parents('.J_sidenav_item');
		    		var $J_sidenav_itemBox = $J_sidenav_item.find('.J_sidenav_itemBox');
		    		$J_sidenav_itemBox.hide();
		    	})
		    	//微信的二维码
		    	$(document).on('mouseover','.J_header_weixin',function(e){
		    		var $target = $(e.target);
		    		var $J_header = $target.parents('.J_header');
		    		var $J_header_weixinCode = $J_header.find('.J_header_weixinCode');
		    		$J_header_weixinCode.show();
		    	}).on('mouseout','.J_header_weixin',function(e){
		    		var $target = $(e.target);
		    		var $J_header = $target.parents('.J_header');
		    		var $J_header_weixinCode = $J_header.find('.J_header_weixinCode');
		    		$J_header_weixinCode.hide();
		    	})
		    }
		})
	}
}

var $pageJs = new pageJs();

/*页尾hover事件*/
var timer = '';
var address_arr=['杭州市拱墅区祥园路智慧信息产业园3号楼7楼','西安市高新区沣惠南路18号西格玛大厦401室','长沙市高新区麓谷大道627号新长海中心B1栋2016号','台州市亿嘉路101号华中大厦一单元1802','']
$('.company-list').on('mouseenter',function(){
	var _self = this;
	var _node = $(this);
	timer = setTimeout(function(){
		$('.company-list').removeClass('click-choose');
		_node.addClass('click-choose');
		var _i = $('.company-list').index(_self);
		$('.company-address').text(address_arr[_i]);
	},300)
}).on('mouseleave',function(){
	clearTimeout(timer);
});
