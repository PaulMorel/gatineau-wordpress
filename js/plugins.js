// Tipsy

(function($) {
    $.fn.tipsy = function(options) {

        options = $.extend({}, $.fn.tipsy.defaults, options);
        
        return this.each(function() {
            
            var opts = $.fn.tipsy.elementOptions(this, options);
            
            $(this).hover(function() {

                $.data(this, 'cancel.tipsy', true);

                var tip = $.data(this, 'active.tipsy');
                if (!tip) {
                    tip = $('<div class="tipsy"><div class="tipsy-inner"/></div>');
                    tip.css({position: 'absolute', zIndex: 100000});
                    $.data(this, 'active.tipsy', tip);
                }

                if ($(this).attr('title') || typeof($(this).attr('original-title')) != 'string') {
                    $(this).attr('original-title', $(this).attr('title') || '').removeAttr('title');
                }

                var title;
                if (typeof opts.title == 'string') {
                    title = $(this).attr(opts.title == 'title' ? 'original-title' : opts.title);
                } else if (typeof opts.title == 'function') {
                    title = opts.title.call(this);
                }

                tip.find('.tipsy-inner')[opts.html ? 'html' : 'text'](title || opts.fallback);

                var pos = $.extend({}, $(this).offset(), {width: this.offsetWidth, height: this.offsetHeight});
                tip.get(0).className = 'tipsy'; // reset classname in case of dynamic gravity
                tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).appendTo(document.body);
                var actualWidth = tip[0].offsetWidth, actualHeight = tip[0].offsetHeight;
                var gravity = (typeof opts.gravity == 'function') ? opts.gravity.call(this) : opts.gravity;

                switch (gravity.charAt(0)) {
                    case 'n':
                        tip.css({top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}).addClass('tipsy-north');
                        break;
                    case 's':
                        tip.css({top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}).addClass('tipsy-south');
                        break;
                    case 'e':
                        tip.css({top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}).addClass('tipsy-east');
                        break;
                    case 'w':
                        tip.css({top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}).addClass('tipsy-west');
                        break;
                }

                if (opts.fade) {
                    tip.css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: 0.8});
                } else {
                    tip.css({visibility: 'visible'});
                }

            }, function() {
                $.data(this, 'cancel.tipsy', false);
                var self = this;
                setTimeout(function() {
                    if ($.data(this, 'cancel.tipsy')) return;
                    var tip = $.data(self, 'active.tipsy');
                    if (opts.fade) {
                        tip.stop().fadeOut(function() { $(this).remove(); });
                    } else {
                        tip.remove();
                    }
                }, 100);

            });
            
        });
        
    };
    
    // Overwrite this method to provide options on a per-element basis.
    // For example, you could store the gravity in a 'tipsy-gravity' attribute:
    // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
    // (remember - do not modify 'options' in place!)
    $.fn.tipsy.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };
    
    $.fn.tipsy.defaults = {
        fade: false,
        fallback: '',
        gravity: 'n',
        html: false,
        title: 'title'
    };
    
    $.fn.tipsy.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };
    
    $.fn.tipsy.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };
    
})(jQuery);

/*
* Slides, A Slideshow Plugin for jQuery
* Intructions: http://slidesjs.com
* By: Nathan Searles, http://nathansearles.com
* Version: 1.0.9
* Updated: January 4th, 2011
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

(function($){$.fn.slides=function(option){option=$.extend({},$.fn.slides.option,option);return this.each(function(){$('.'+option.container,$(this)).children().wrapAll('<div class="slides_control"/>');var elem=$(this),control=$('.slides_control',elem),total=control.children().size(),width=control.children().outerWidth(),height=control.children().outerHeight(),start=option.start-1,effect=option.effect.indexOf(',')<0?option.effect:option.effect.replace(' ','').split(',')[0],paginationEffect=option.effect.indexOf(',')<0?effect:option.effect.replace(' ','').split(',')[1],next=0,prev=0,number=0,current=0,loaded,active,clicked,position,direction;if(total<2){return;}
if(start<0){start=0;};if(start>total){start=total-1;};if(option.start){current=start;};if(option.randomize){control.randomize();}
$('.'+option.container,elem).css({overflow:'hidden',position:'relative'});control.css({position:'relative',width:(width*3),height:height,left:-width});control.children().css({position:'absolute',top:0,left:width,zIndex:0,display:'none'});if(option.autoHeight){control.animate({height:control.children(':eq('+start+')').outerHeight()},option.autoHeightSpeed);}
if(option.preload&&control.children()[0].tagName=='IMG'){elem.css({background:'url('+option.preloadImage+') no-repeat 50% 50%'});var img=$('img:eq('+start+')',elem).attr('src')+'?'+(new Date()).getTime();$('img:eq('+start+')',elem).attr('src',img).load(function(){$(this).fadeIn(option.fadeSpeed,function(){$(this).css({zIndex:5});elem.css({background:''});loaded=true;});});}else{control.children(':eq('+start+')').fadeIn(option.fadeSpeed,function(){loaded=true;});}
if(option.bigTarget){control.children().css({cursor:'pointer'});control.children().click(function(){animate('next',effect);return false;});}
if(option.hoverPause&&option.play){control.children().bind('mouseover',function(){stop();});control.children().bind('mouseleave',function(){pause();});}
if(option.generateNextPrev){$('.'+option.container,elem).after('<a href="#" class="'+option.prev+'">Prev</a>');$('.'+option.prev,elem).after('<a href="#" class="'+option.next+'">Next</a>');}
$('.'+option.next,elem).click(function(e){e.preventDefault();if(option.play){pause();};animate('next',effect);});$('.'+option.prev,elem).click(function(e){e.preventDefault();if(option.play){pause();};animate('prev',effect);});if(option.generatePagination){elem.append('<ul class='+option.paginationClass+'></ul>');control.children().each(function(){$('.'+option.paginationClass,elem).append('<li><a href="#'+number+'">'+(number+1)+'</a></li>');number++;});}else{$('.'+option.paginationClass+' li a',elem).each(function(){$(this).attr('href','#'+number);number++;});}
$('.'+option.paginationClass+' li:eq('+start+')',elem).addClass('current');$('.'+option.paginationClass+' li a',elem).click(function(){if(option.play){pause();};clicked=$(this).attr('href').match('[^#/]+$');if(current!=clicked){animate('pagination',paginationEffect,clicked);}
return false;});$('a.link',elem).click(function(){if(option.play){pause();};clicked=$(this).attr('href').match('[^#/]+$')-1;if(current!=clicked){animate('pagination',paginationEffect,clicked);}
return false;});if(option.play){playInterval=setInterval(function(){animate('next',effect);},option.play);elem.data('interval',playInterval);};function stop(){clearInterval(elem.data('interval'));};function pause(){if(option.pause){clearTimeout(elem.data('pause'));clearInterval(elem.data('interval'));pauseTimeout=setTimeout(function(){clearTimeout(elem.data('pause'));playInterval=setInterval(function(){animate("next",effect);},option.play);elem.data('interval',playInterval);},option.pause);elem.data('pause',pauseTimeout);}else{stop();}};function animate(direction,effect,clicked){if(!active&&loaded){active=true;switch(direction){case'next':prev=current;next=current+1;next=total===next?0:next;position=width*2;direction=-width*2;current=next;break;case'prev':prev=current;next=current-1;next=next===-1?total-1:next;position=0;direction=0;current=next;break;case'pagination':next=parseInt(clicked,10);prev=$('.'+option.paginationClass+' li.current a',elem).attr('href').match('[^#/]+$');if(next>prev){position=width*2;direction=-width*2;}else{position=0;direction=0;}
current=next;break;}
if(effect==='fade'){option.animationStart();if(option.crossfade){control.children(':eq('+next+')',elem).css({zIndex:10}).fadeIn(option.fadeSpeed,function(){if(option.autoHeight){control.animate({height:control.children(':eq('+next+')',elem).outerHeight()},option.autoHeightSpeed,function(){control.children(':eq('+prev+')',elem).css({display:'none',zIndex:0});control.children(':eq('+next+')',elem).css({zIndex:0});option.animationComplete(next+1);active=false;});}else{control.children(':eq('+prev+')',elem).css({display:'none',zIndex:0});control.children(':eq('+next+')',elem).css({zIndex:0});option.animationComplete(next+1);active=false;}});}else{option.animationStart();control.children(':eq('+prev+')',elem).fadeOut(option.fadeSpeed,function(){if(option.autoHeight){control.animate({height:control.children(':eq('+next+')',elem).outerHeight()},option.autoHeightSpeed,function(){control.children(':eq('+next+')',elem).fadeIn(option.fadeSpeed);});}else{control.children(':eq('+next+')',elem).fadeIn(option.fadeSpeed,function(){if($.browser.msie){$(this).get(0).style.removeAttribute('filter');}});}
option.animationComplete(next+1);active=false;});}}else{control.children(':eq('+next+')').css({left:position,display:'block'});if(option.autoHeight){option.animationStart();control.animate({left:direction,height:control.children(':eq('+next+')').outerHeight()},option.slideSpeed,function(){control.css({left:-width});control.children(':eq('+next+')').css({left:width,zIndex:5});control.children(':eq('+prev+')').css({left:width,display:'none',zIndex:0});option.animationComplete(next+1);active=false;});}else{option.animationStart();control.animate({left:direction},option.slideSpeed,function(){control.css({left:-width});control.children(':eq('+next+')').css({left:width,zIndex:5});control.children(':eq('+prev+')').css({left:width,display:'none',zIndex:0});option.animationComplete(next+1);active=false;});}}
if(option.pagination){$('.'+option.paginationClass+' li.current',elem).removeClass('current');$('.'+option.paginationClass+' li:eq('+next+')',elem).addClass('current');}}};});};$.fn.slides.option={preload:false,preloadImage:'/img/loading.gif',container:'slides_container',generateNextPrev:false,next:'next',prev:'prev',pagination:true,generatePagination:true,paginationClass:'pagination',fadeSpeed:350,slideSpeed:350,start:1,effect:'slide',crossfade:false,randomize:false,play:0,pause:0,hoverPause:false,autoHeight:false,autoHeightSpeed:350,bigTarget:false,animationStart:function(){},animationComplete:function(){}};$.fn.randomize=function(callback){function randomizeOrder(){return(Math.round(Math.random())-0.5);}
return($(this).each(function(){var $this=$(this);var $children=$this.children();var childCount=$children.length;if(childCount>1){$children.hide();var indices=[];for(i=0;i<childCount;i++){indices[indices.length]=i;}
indices=indices.sort(randomizeOrder);$.each(indices,function(j,k){var $child=$children.eq(k);var $clone=$child.clone(true);$clone.show().appendTo($this);if(callback!==undefined){callback($child,$clone);}
$child.remove();});}}));};})(jQuery);

/**
 * jquery.hoverColor Plugin
 * マウスオーバで画像の色変換 @ canvas
 * IEでは無理？
 */

(function($,window,undefined) {
  var isIE8 = /MSIE ([0-9]{1,}[\.0-9]{0,})/i.test(navigator.userAgent);
  
  //------------------------------
  //  OPTION
  //------------------------------
  var hoverColorOption = {
    enable        : true,
    selector      : 'img.color',
    time        : 400,
    defaultAlpha    : '0',
    overAlpha      : '1',
    color        : 'monochro',
    isTouch        : true
  }
  
  
  //------------------------------
  //  PLUGIN
  //------------------------------
  // hoverColor
  $.fn.hoverColor = function(param){
    var op = hoverColorOption;
    if(param) op = $.extend({}, op, param);
    $(this).each(function(){
      var element = $(this);
      if(!isIE8){
        var canvas = document.createElement('canvas'), ctx, pixels, w, h, l, color = [], gray, i, rgb = [];
        switch(op.color) {
          case 'monochro':
            color = [1, 1, 1];
          break;
          case 'sepia':
            color = [0.9, 0.7, 0.4];
          break;
          default:
            rgb = HEX2RGB(op.color);
            color = [rgb[0]/255, rgb[1]/255, rgb[2]/255];
          break;
        };
        element.after(canvas);
          
        $(window).load(function(){
          console.log('test');
          ctx = canvas.getContext("2d");
          w = element.width();
          h = element.height();
          element.parent().css({'width':parseInt(w)+'px','height':parseInt(h)+'px'});
          $(canvas).attr({'width':w,'height':h, 'style':'position:absolute; top:0; left:0;'});
          console
          $(canvas).fadeTo(0, op.defaultAlpha);
          ctx.drawImage(element[0], 0, 0);
          pixels = ctx.getImageData(0, 0, w, h);
          l = pixels.data.length;
          for(i=0; i<l; i+=4) {
            // NTSC Grayscale R*0.298912 + G*0.586611 + B*0.114478
            rgb = [pixels.data[i + 0], pixels.data[i + 1], pixels.data[i + 2]];
            gray = rgb[0]*0.299 + rgb[1]*0.587 + rgb[2]*0.114;
            pixels.data[i + 0] = gray * color[0];
            pixels.data[i + 1] = gray * color[1];
            pixels.data[i + 2] = gray * color[2];
          }
          ctx.putImageData(pixels, 0, 0);
        });
        
        //MouseEvent
        element.parent().bind('mouseover', function(e){
          $(this).css('cursor','pointer');
          $(canvas).stop(true).fadeTo(op.time, op.overAlpha);
        }).bind('mouseout', function(e){
          $(this).css('cursor',"default");
          $(canvas).stop(true).fadeTo(op.time, op.defaultAlpha);
        });
      }else{
        // IE8-
        $(window).load(function(){
          element.parent().css({'width':element.width().toString()+'px','height':element.height().toString()+'px'});
        });
        //MouseEvent
        element.parent().bind('mouseover', function(e){
          element.css('filter','progid:DXImageTransform.Microsoft.BasicImage(GrayScale='+op.overAlpha+')');
        }).bind('mouseout', function(e){
          element.css('filter','progid:DXImageTransform.Microsoft.BasicImage(GrayScale='+op.defaultAlpha+')');
        });
        element.css('filter','progid:DXImageTransform.Microsoft.BasicImage(GrayScale='+op.defaultAlpha+')');
      }
    }).css({'display':'block',/*'position':'absolute',*/'top':'0','left':'0'}).parent().css({'display':'block','position':'relative'});
  };
  
  //------------------------------
  // UTILITY
  //------------------------------
  // #FF0000 > [255, 0, 0]
  function HEX2RGB(hex){
    hex = (hex.indexOf("#") != -1)? hex.replace("#","") : hex;
    if(hex.length == 3){
      hex = hex.substr(0,1)+hex.substr(0,1)+hex.substr(1,1)+hex.substr(1,1)+hex.substr(2,1)+hex.substr(2,1);
    }
    var color = parseInt(hex.replace("#", ""), 16);
    return [((color >> 16) & 0xff)  , ((color >> 8) & 0xff) , (color & 0xff)];
  }
  
  // [255, 0, 0] > #FF0000
  function RGB2HEX(rgb){
    return '#' + (((256 + rgb[0] << 8) + rgb[1] << 8) + rgb[2]).toString(16).slice(1);
  }
  
  
  //------------------------------
  // DOM-READY initialize
  //------------------------------
  /*$(function() {
    $(hoverColorOption.selector).hoverColor();

  });*/
  
  
})(jQuery, this);

// ColorBox v1.3.15 - a full featured, light-weight, customizable lightbox based on jQuery 1.3+
// Copyright (c) 2010 Jack Moore - jack@colorpowered.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
(function(b,ib){var t="none",M="LoadedContent",c=false,v="resize.",o="y",q="auto",e=true,L="nofollow",m="x";function f(a,c){a=a?' id="'+i+a+'"':"";c=c?' style="'+c+'"':"";return b("<div"+a+c+"/>")}function p(a,b){b=b===m?n.width():n.height();return typeof a==="string"?Math.round(/%/.test(a)?b/100*parseInt(a,10):parseInt(a,10)):a}function U(b){return a.photo||/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(b)}function cb(a){for(var c in a)if(b.isFunction(a[c])&&c.substring(0,2)!=="on")a[c]=a[c].call(l);a.rel=a.rel||l.rel||L;a.href=a.href||b(l).attr("href");a.title=a.title||l.title;return a}function w(c,a){a&&a.call(l);b.event.trigger(c)}function jb(){var b,e=i+"Slideshow_",c="click."+i,f,k;if(a.slideshow&&h[1]){f=function(){F.text(a.slideshowStop).unbind(c).bind(V,function(){if(g<h.length-1||a.loop)b=setTimeout(d.next,a.slideshowSpeed)}).bind(W,function(){clearTimeout(b)}).one(c+" "+N,k);j.removeClass(e+"off").addClass(e+"on");b=setTimeout(d.next,a.slideshowSpeed)};k=function(){clearTimeout(b);F.text(a.slideshowStart).unbind([V,W,N,c].join(" ")).one(c,f);j.removeClass(e+"on").addClass(e+"off")};a.slideshowAuto?f():k()}}function db(c){if(!O){l=c;a=cb(b.extend({},b.data(l,r)));h=b(l);g=0;if(a.rel!==L){h=b("."+G).filter(function(){return (b.data(this,r).rel||this.rel)===a.rel});g=h.index(l);if(g===-1){h=h.add(l);g=h.length-1}}if(!u){u=D=e;j.show();if(a.returnFocus)try{l.blur();b(l).one(eb,function(){try{this.focus()}catch(a){}})}catch(f){}x.css({opacity:+a.opacity,cursor:a.overlayClose?"pointer":q}).show();a.w=p(a.initialWidth,m);a.h=p(a.initialHeight,o);d.position(0);X&&n.bind(v+P+" scroll."+P,function(){x.css({width:n.width(),height:n.height(),top:n.scrollTop(),left:n.scrollLeft()})}).trigger("scroll."+P);w(fb,a.onOpen);Y.add(H).add(I).add(F).add(Z).hide();ab.html(a.close).show()}d.load(e)}}var gb={transition:"elastic",speed:300,width:c,initialWidth:"600",innerWidth:c,maxWidth:c,height:c,initialHeight:"450",innerHeight:c,maxHeight:c,scalePhotos:e,scrolling:e,inline:c,html:c,iframe:c,photo:c,href:c,title:c,rel:c,opacity:.9,preloading:e,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",open:c,returnFocus:e,loop:e,slideshow:c,slideshowAuto:e,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:c,onLoad:c,onComplete:c,onCleanup:c,onClosed:c,overlayClose:e,escKey:e,arrowKey:e},r="colorbox",i="cbox",fb=i+"_open",W=i+"_load",V=i+"_complete",N=i+"_cleanup",eb=i+"_closed",Q=i+"_purge",hb=i+"_loaded",E=b.browser.msie&&!b.support.opacity,X=E&&b.browser.version<7,P=i+"_IE6",x,j,A,s,bb,T,R,S,h,n,k,J,K,Z,Y,F,I,H,ab,B,C,y,z,l,g,a,u,D,O=c,d,G=i+"Element";d=b.fn[r]=b[r]=function(c,f){var a=this,d;if(!a[0]&&a.selector)return a;c=c||{};if(f)c.onComplete=f;if(!a[0]||a.selector===undefined){a=b("<a/>");c.open=e}a.each(function(){b.data(this,r,b.extend({},b.data(this,r)||gb,c));b(this).addClass(G)});d=c.open;if(b.isFunction(d))d=d.call(a);d&&db(a[0]);return a};d.init=function(){var l="hover",m="clear:left";n=b(ib);j=f().attr({id:r,"class":E?i+"IE":""});x=f("Overlay",X?"position:absolute":"").hide();A=f("Wrapper");s=f("Content").append(k=f(M,"width:0; height:0; overflow:hidden"),K=f("LoadingOverlay").add(f("LoadingGraphic")),Z=f("Title"),Y=f("Current"),I=f("Next"),H=f("Previous"),F=f("Slideshow").bind(fb,jb),ab=f("Close"));A.append(f().append(f("TopLeft"),bb=f("TopCenter"),f("TopRight")),f(c,m).append(T=f("MiddleLeft"),s,R=f("MiddleRight")),f(c,m).append(f("BottomLeft"),S=f("BottomCenter"),f("BottomRight"))).children().children().css({"float":"left"});J=f(c,"position:absolute; width:9999px; visibility:hidden; display:none");b("body").prepend(x,j.append(A,J));s.children().hover(function(){b(this).addClass(l)},function(){b(this).removeClass(l)}).addClass(l);B=bb.height()+S.height()+s.outerHeight(e)-s.height();C=T.width()+R.width()+s.outerWidth(e)-s.width();y=k.outerHeight(e);z=k.outerWidth(e);j.css({"padding-bottom":B,"padding-right":C}).hide();I.click(d.next);H.click(d.prev);ab.click(d.close);s.children().removeClass(l);b("."+G).live("click",function(a){if(!(a.button!==0&&typeof a.button!=="undefined"||a.ctrlKey||a.shiftKey||a.altKey)){a.preventDefault();db(this)}});x.click(function(){a.overlayClose&&d.close()});b(document).bind("keydown",function(b){if(u&&a.escKey&&b.keyCode===27){b.preventDefault();d.close()}if(u&&a.arrowKey&&!D&&h[1])if(b.keyCode===37&&(g||a.loop)){b.preventDefault();H.click()}else if(b.keyCode===39&&(g<h.length-1||a.loop)){b.preventDefault();I.click()}})};d.remove=function(){j.add(x).remove();b("."+G).die("click").removeData(r).removeClass(G)};d.position=function(f,d){function b(a){bb[0].style.width=S[0].style.width=s[0].style.width=a.style.width;K[0].style.height=K[1].style.height=s[0].style.height=T[0].style.height=R[0].style.height=a.style.height}var e,h=Math.max(document.documentElement.clientHeight-a.h-y-B,0)/2+n.scrollTop(),g=Math.max(n.width()-a.w-z-C,0)/2+n.scrollLeft();e=j.width()===a.w+z&&j.height()===a.h+y?0:f;A[0].style.width=A[0].style.height="9999px";j.dequeue().animate({width:a.w+z,height:a.h+y,top:h,left:g},{duration:e,complete:function(){b(this);D=c;A[0].style.width=a.w+z+C+"px";A[0].style.height=a.h+y+B+"px";d&&d()},step:function(){b(this)}})};d.resize=function(b){if(u){b=b||{};if(b.width)a.w=p(b.width,m)-z-C;if(b.innerWidth)a.w=p(b.innerWidth,m);k.css({width:a.w});if(b.height)a.h=p(b.height,o)-y-B;if(b.innerHeight)a.h=p(b.innerHeight,o);if(!b.innerHeight&&!b.height){b=k.wrapInner("<div style='overflow:auto'></div>").children();a.h=b.height();b.replaceWith(b.children())}k.css({height:a.h});d.position(a.transition===t?0:a.speed)}};d.prep=function(m){var c="hidden";function l(s){var p,f,m,c,l=h.length,q=a.loop;d.position(s,function(){function s(){E&&j[0].style.removeAttribute("filter")}if(u){E&&o&&k.fadeIn(100);k.show();w(hb);Z.show().html(a.title);if(l>1){typeof a.current==="string"&&Y.html(a.current.replace(/\{current\}/,g+1).replace(/\{total\}/,l)).show();I[q||g<l-1?"show":"hide"]().html(a.next);H[q||g?"show":"hide"]().html(a.previous);p=g?h[g-1]:h[l-1];m=g<l-1?h[g+1]:h[0];a.slideshow&&F.show();if(a.preloading){c=b.data(m,r).href||m.href;f=b.data(p,r).href||p.href;c=b.isFunction(c)?c.call(m):c;f=b.isFunction(f)?f.call(p):f;if(U(c))b("<img/>")[0].src=c;if(U(f))b("<img/>")[0].src=f}}K.hide();a.transition==="fade"?j.fadeTo(e,1,function(){s()}):s();n.bind(v+i,function(){d.position(0)});w(V,a.onComplete)}})}if(u){var o,e=a.transition===t?0:a.speed;n.unbind(v+i);k.remove();k=f(M).html(m);k.hide().appendTo(J.show()).css({width:function(){a.w=a.w||k.width();a.w=a.mw&&a.mw<a.w?a.mw:a.w;return a.w}(),overflow:a.scrolling?q:c}).css({height:function(){a.h=a.h||k.height();a.h=a.mh&&a.mh<a.h?a.mh:a.h;return a.h}()}).prependTo(s);J.hide();b("#"+i+"Photo").css({cssFloat:t,marginLeft:q,marginRight:q});X&&b("select").not(j.find("select")).filter(function(){return this.style.visibility!==c}).css({visibility:c}).one(N,function(){this.style.visibility="inherit"});a.transition==="fade"?j.fadeTo(e,0,function(){l(0)}):l(e)}};d.load=function(u){var n,c,s,q=d.prep;D=e;l=h[g];u||(a=cb(b.extend({},b.data(l,r))));w(Q);w(W,a.onLoad);a.h=a.height?p(a.height,o)-y-B:a.innerHeight&&p(a.innerHeight,o);a.w=a.width?p(a.width,m)-z-C:a.innerWidth&&p(a.innerWidth,m);a.mw=a.w;a.mh=a.h;if(a.maxWidth){a.mw=p(a.maxWidth,m)-z-C;a.mw=a.w&&a.w<a.mw?a.w:a.mw}if(a.maxHeight){a.mh=p(a.maxHeight,o)-y-B;a.mh=a.h&&a.h<a.mh?a.h:a.mh}n=a.href;K.show();if(a.inline){f().hide().insertBefore(b(n)[0]).one(Q,function(){b(this).replaceWith(k.children())});q(b(n))}else if(a.iframe){j.one(hb,function(){var c=b("<iframe frameborder='0' style='width:100%; height:100%; border:0; display:block'/>")[0];c.name=i+ +new Date;c.src=a.href;if(!a.scrolling)c.scrolling="no";if(E)c.allowtransparency="true";b(c).appendTo(k).one(Q,function(){c.src="//about:blank"})});q(" ")}else if(a.html)q(a.html);else if(U(n)){c=new Image;c.onload=function(){var e;c.onload=null;c.id=i+"Photo";b(c).css({border:t,display:"block",cssFloat:"left"});if(a.scalePhotos){s=function(){c.height-=c.height*e;c.width-=c.width*e};if(a.mw&&c.width>a.mw){e=(c.width-a.mw)/c.width;s()}if(a.mh&&c.height>a.mh){e=(c.height-a.mh)/c.height;s()}}if(a.h)c.style.marginTop=Math.max(a.h-c.height,0)/2+"px";h[1]&&(g<h.length-1||a.loop)&&b(c).css({cursor:"pointer"}).click(d.next);if(E)c.style.msInterpolationMode="bicubic";setTimeout(function(){q(c)},1)};setTimeout(function(){c.src=n},1)}else n&&J.load(n,function(d,c,a){q(c==="error"?"Request unsuccessful: "+a.statusText:b(this).children())})};d.next=function(){if(!D){g=g<h.length-1?g+1:0;d.load()}};d.prev=function(){if(!D){g=g?g-1:h.length-1;d.load()}};d.close=function(){if(u&&!O){O=e;u=c;w(N,a.onCleanup);n.unbind("."+i+" ."+P);x.fadeTo("fast",0);j.stop().fadeTo("fast",0,function(){w(Q);k.remove();j.add(x).css({opacity:1,cursor:q}).hide();setTimeout(function(){O=c;w(eb,a.onClosed)},1)})}};d.element=function(){return b(l)};d.settings=gb;b(d.init)})(jQuery,this);
