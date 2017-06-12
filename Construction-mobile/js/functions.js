//函数用于对ul列表结构的菜单进行操作
// 参数 start 为默认选中项，值默认为0，当值大于li总数时默认为最后一个
// 参数 tabType 为切换的类型，值默认为0即不需要id，当值为1时可为每个项指定特殊的选择样式
(function($) {
$.fn.listMenuTab =function(options) {
	//接收并处理参数
	var defaults = {
		start : 0,//the type of the effect 
		tabType : 1,//only works in some types
		bindFn : null,
		sonpanel : false
	};
	var wrap=$(this),lis=wrap.find("li"),li_num=lis.size();
	var settings = $.extend(defaults, options || {});
	var def_start=settings.start>li_num?0:settings.start;
	var type=settings.tabType?settings.tabType:0;
	var panel_str=settings.sonpanel?".inner-data-panel":".data-panel";
	//
	if(type==0){
		lis.click(function(){
			var wrap_id=wrap.attr("id");
			if(!$(this).hasClass(wrap_id+"-act")){
				lis.removeClass(wrap_id+"-act");
				$(this).addClass(wrap_id+"-act");
				var content_box=$(this).attr("id");
				$(this).parent().parent().parent().find(panel_str).hide();
				$(this).parent().parent().parent().find("."+content_box).show();
				if(settings.bindFn)
					settings.bindFn(content_box);
			}
		});
		lis.eq(def_start).trigger("click");
	}
	//
	else if(type==1){
		lis.click(function(){
			var content_box=$(this).attr("id");
			if($("."+content_box+":hidden").size())
			{
				var special_class=content_box+"-act";
				lis.each(function(){
					$(this).removeClass($(this).attr("id")+"-act");
				})
				$(this).addClass(special_class);
				$(this).parent().parent().parent().find(panel_str).hide();
				$(this).parent().parent().parent().find("."+content_box).show();
			}
			if(settings.bindFn)
				settings.bindFn(content_box);
		});
		lis.eq(def_start).trigger("click");
	}
	else if(type==2){
		lis.click(function(){
			var special_class=$(this).attr("id")+"-act";
			if(!$(this).hasClass(special_class))
			{
				lis.each(function(){
					$(this).removeClass($(this).attr("id")+"-act");
				})
				var content_box=$(this).attr("id");
				$(this).addClass(special_class);
				$(this).parent().parent().find("."+content_box).show().siblings(".inner-data-panel").hide();
			}
		});
		lis.eq(def_start).trigger("click");
	}
	else if(type==3){
		lis.click(function(){
			var wrap_id=wrap.attr("id");
			lis.removeClass(wrap_id+"-act");
			$(this).addClass(wrap_id+"-act");
			var content_box=$(this).attr("id");
			if(settings.bindFn)
				settings.bindFn(content_box);
		});
		lis.eq(def_start).trigger("click");
	}
}
/*
 * jQuery图片特效插件
 * add by hjw @ 20140821
 * 插件依赖于页面样式和结构
 */
$.fn.imgEffect = function(options) {
	//默认参数
	var defaults = {
		type : 0,//the type of the effect 
		direction : "left",//only works in some types
		duration : 0.6,//unit:seconds
		interval : 3,//unit:seconds
		startIndex : 0,
		hideControlBar : true,
		hideShowPanel : true,
		discache:true,
		css3Rend : false
	};
	var settings = $.extend(defaults, options || {});
	//获取特效类型，根据类型进行处理
	var effectType=settings.type;
	var discache=settings.discache;
	//计算相关数据
	var wrapper = $(this);
	init(effectType);
	var time_click;
	//初始化
	function init(effectType){
		switch (effectType){
			case 0 :
				var ul = wrapper.children("ul");var lis = ul.find("li");var firstPic = lis.first().find("img");
				var li_num = lis.size(), li_height = lis.height(), li_width = lis.width();
				//定义滚动顺序:ASC/DESC
				if(!wrapper.size()) return false; //无指定容器直接返回
				//函数开关控制	
				var order_by=wrapper.data("order_by","ASC");
				if (settings.direction == "left") {
					ul.css("width", li_num * li_width + "px");
				} else {
					ul.css("height", li_num * li_height + "px");
				}
			
				ul.find('li:eq('+settings.startIndex+')').addClass('cur-item');
				//获取内容条数据
				var shadow_panel = $('<div class="shadow-panel"></div>').appendTo(wrapper);
				var img_desc = $('<span class="img-desc"></span>').html(function(){
					var active = ul.find("li.cur-item").find("a"), text = active.attr("title"), href = active.attr("href");
					return $("<a>").attr("href", href).text(text);
				}).appendTo(shadow_panel);
				//生成控制条数据	
				var control_panel = $('<div class="control-panel"></div>').appendTo(wrapper);
				var control_bar = control_panel.html(function(){
					var control_bar_str="";
					for(i=0;i<li_num;i++){var cur_index=i==settings.startIndex?' cur-index':'';control_bar_str+='<a class="i-index'+cur_index+'" href="javascript:void(0);">';}
					return control_bar_str;
				});
				if(lis.size()>1)
					start();
				$(".i-index").mouseover(function(){
					image_control($(this).index());
				});
				if(settings.hideShowPanel)
					shadowBarSwitch();
				break;
			case 1:
				var effect_panel=wrapper.find(".effect-panel");
				var son_ul=effect_panel.children("ul");
				var cell_width=son_ul.children().width();
				var max_width=cell_width*son_ul.children().size();
				if(max_width>cell_width){
					son_ul.css({"width":max_width});
				}
				wrapper.find(".slide-left").click(function(){
					if(son_ul.children().size()>1){
						son_ul.stop().animate({marginLeft:-cell_width},settings.duration*1000,				function(){
							son_ul.children(":first").insertAfter(son_ul.children(":last"));
							son_ul.css("margin-left",0);																						   							});
					}
				})
				wrapper.find(".slide-right").click(function(){
					if(son_ul.children().size()>1){
						son_ul.children(":last").insertBefore(son_ul.children(":first"));
						son_ul.css("margin-left",-cell_width);
						son_ul.stop().animate({marginLeft:0}, settings.duration*1000);
					}
				})
				start();
			case 2:
				var ul = wrapper.children("ul");var lis = ul.find("li");var li_num = lis.size();
				li_width = lis.width();
				//生成控制条数据	
				var control_panel = $('<div class="control-panel"></div>').appendTo(wrapper);
				var control_bar = control_panel.html(function(){
					var control_bar_str='<a class="cur-i"></a>';
					for(i=0;i<li_num;i++){control_bar_str+='<a class="i-index" href="javascript:void(0);">';}
					return control_bar_str;
				});
				wrapper.hover(function(){
					effectStop();
				},function(){
					start();
				});
				$(".i-index").mouseover(function(){
					var i_index=$(this).index(".i-index");
					switchImage(i_index,true);
				});
				start();
			default :
				break;
		}
		
	}
	//开始轮播
	function start() {
		switch (effectType){
			case 0 :
				slideImage();
				break;
			case 1 :
				if(settings.interval&&$.isNumeric(settings.interval)){
					time_click=setTimeout(autoScroll,settings.interval*1000);
				}
				break;
			case 2:
				var index=$(".cur-i").attr("ci");
				index=index?index:0;
				switchImage(index);
				break;
			default :
				break;
		}
		
	};
	//控制幻灯自动切换
	function autoScroll(){
		wrapper.find(".slide-right").click();
		clearTimeout(time_click);
		time_click=setTimeout(autoScroll,settings.interval*1000);
	}
	//控制显示条的显示和隐藏
	function shadowBarSwitch(){
		switch (effectType){
			case 0 :
				var shadow_panel=$(".shadow-panel");
				wrapper.hover(function(){
					effectStop();
					shadow_panel.stop().fadeIn("normal");
				},function(){
					shadow_panel.stop().fadeOut("slow");
					start();
				});
				break;
			default :
				break;
		}
	}
	function image_control(index){
		wrapper.find(".i-index:eq("+index+")").addClass("cur-index").siblings().removeClass("cur-index");
		var cur_item=wrapper.find("li:eq("+index+")");
		var cur_item_a=cur_item.find("a");
		cur_item.addClass("cur-item").siblings().removeClass("cur-item");
		wrapper.find('.img-desc').find('a').attr('href', cur_item_a.attr('href')).text(cur_item_a.attr('title'));
		if(!cur_item.find("img").size()){
			var img_src=cur_item.find("a").attr("dimg");
			cur_item.find("a").append('<img src="'+img_src+'"/>');
		}
		slideImage(1);
	}
	function slideImage(slide_auto){
		slide_no=slide_auto?false:true;//是否只进行动画不开始播放
		var ul = wrapper.children("ul");var lis = ul.find("li");
		var li_num = lis.size(), li_height = lis.height(), li_width = lis.width();
		if(li_num>1){
			var cur_item = ul.find('li.cur-item'), cur_item_a = cur_item.find('a');
			var index = cur_item.index();
			delay_image_load(index);
			if(settings.direction == 'left'){
				offset = index * li_width * -1;
				param = {'marginLeft':offset + 'px' };
			}else{
				offset = index * li_height * -1;
				param = {'marginTop':offset + 'px' };
			}
			wrapper.find(".i-index:eq("+index+")").addClass("cur-index").siblings().removeClass("cur-index");
			wrapper.find('.img-desc').find('a').attr('href', cur_item_a.attr('href')).text(cur_item_a.attr('title'));
			var order_by=wrapper.data("order_by");
			ul.stop().animate(param, settings.duration*1000, function() {
				cur_item.removeClass("cur-item");
				if(order_by=='ASC'){
					if (cur_item.next().size()){
						cur_item.next().addClass("cur-item");
					}else{
						wrapper.data("order_by","DESC");
						cur_item.prev().addClass("cur-item");
					}
				}else if(order_by=="DESC"){
					if (cur_item.prev().size()){
						cur_item.prev().addClass("cur-item");
					}else{
						wrapper.data("order_by","ASC");
						cur_item.next().addClass("cur-item");
					}
				}
			});
			if(slide_no)
				time_click=setTimeout(slideImage, settings.interval*1000);
		}
	}
	function switchImage(index,static){
		var ul = wrapper.children("ul");var lis = ul.find("li");var li_num = lis.size();
		var t_index=index%li_num;var cur_item=lis.eq(t_index);
		var index_left=($(".cur-i").width()+2)*t_index;
		$(".cur-i").attr("ci",t_index);
		if(!cur_item.find("img").size()){
			var img_src=cur_item.find("a").attr("dimg");
			discache&&img_src+'?pid='+Math.random();
			cur_item.find("a").append('<img src="'+img_src+'" alt=""/>');
		}
		cur_item.siblings().stop().fadeOut(settings.duration*1000);
		$(".cur-i").removeClass().addClass("cur-i").stop().animate({"left":index_left+"px"},"normal",function(){
$(this).addClass("cur-i-"+t_index);t_index++;});
		cur_item.stop().fadeIn(settings.duration*2000);
		if(!static)
			time_click=setTimeout(function(){switchImage(t_index);}, settings.interval*1000);
	}
	function delay_image_load(index){
		var next_item=wrapper.find("li:eq("+index+")").next();
		if(!next_item.find("img").size()){
			var img_src=next_item.find("a").attr("dimg");
			discache&&img_src+'?pid='+Math.random();
			next_item.find("a").append('<img src="'+img_src+'" alt=""/>');
		}
	}
	//停止轮播
	var effectStop = function(){
		clearTimeout(time_click);
	};
		
};
// 延迟加载图片
// 参数 panel_class 指定模块的类名
$.fn.delayLoadImg =function(){
	var obj=$(this);
	if(obj.length>0&&!obj.hasClass('J-loaded')){
		obj.find('.J-img-delay').each(function(i){
			var img_url=$(this).attr("dimg");
			if(img_url&&!$(this).find("img").size()){
				if($(this).hasClass("J-rep-ele")){
					var panel_class=$(this).attr("class");
					$(this).replaceWith("<img class='"+panel_class+"' src='"+img_url+"' alt='' />");
				}
				else{
					$(this).append("<img src='"+img_url+"' alt='' />");
				}
				$(this).removeClass('J-img-delay');
			}
		});
	}
	return obj;
}

})(jQuery);

// 固定配置页面模块延迟加载图片
// 参数 panel_class 指定模块的类名
function staticConfImgLazyLoad(config){
	var config = config;
	if(config&&!$.isEmptyObject(config)){
		scrollEvent();
		$(window).scroll(scrollEvent);
	}
	function scrollEvent(){
		var winScrollTop = $(window).scrollTop();
		$.each(config,function(i,n){
			if(winScrollTop-i >= 0&&$(n).size()){
				$(n).delayLoadImg().addClass('J-loaded');
			}
		})
	}
}
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	function converted(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			return config.json ? JSON.parse(s) : s;
		} catch(er) {}
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		var result = key ? undefined : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = decode(parts.join('='));

			if (key && key === name) {
				result = converted(cookie);
				break;
			}

			if (!key) {
				result[name] = converted(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));