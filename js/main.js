(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.lozad = factory());
  }(this, (function () { 'use strict';
  
    /**
     * Detect IE browser
     * @const {boolean}
     * @private
     */
    var isIE = typeof document !== 'undefined' && document.documentMode;
  
    var defaultConfig = {
      rootMargin: '0px',
      threshold: 0,
      load: function load(element) {
        if (element.nodeName.toLowerCase() === 'picture') {
          var img = document.createElement('img');
          if (isIE && element.getAttribute('data-iesrc')) {
            img.src = element.getAttribute('data-iesrc');
          }
  
          if (element.getAttribute('data-alt')) {
            img.alt = element.getAttribute('data-alt');
          }
  
          element.append(img);
        }
  
        if (element.nodeName.toLowerCase() === 'video' && !element.getAttribute('data-src')) {
          if (element.children) {
            var childs = element.children;
            var childSrc = void 0;
            for (var i = 0; i <= childs.length - 1; i++) {
              childSrc = childs[i].getAttribute('data-src');
              if (childSrc) {
                childs[i].src = childSrc;
              }
            }
  
            element.load();
          }
        }
  
        if (element.getAttribute('data-poster')) {
          element.poster = element.getAttribute('data-poster');
        }
  
        if (element.getAttribute('data-src')) {
          element.src = element.getAttribute('data-src');
        }
  
        if (element.getAttribute('data-srcset')) {
          element.setAttribute('srcset', element.getAttribute('data-srcset'));
        }
  
        var backgroundImageDelimiter = ',';
        if (element.getAttribute('data-background-delimiter')) {
          backgroundImageDelimiter = element.getAttribute('data-background-delimiter');
        }
  
        if (element.getAttribute('data-background-image')) {
          element.style.backgroundImage = 'url(\'' + element.getAttribute('data-background-image').split(backgroundImageDelimiter).join('\'),url(\'') + '\')';
        } else if (element.getAttribute('data-background-image-set')) {
          var imageSetLinks = element.getAttribute('data-background-image-set').split(backgroundImageDelimiter);
          var firstUrlLink = imageSetLinks[0].substr(0, imageSetLinks[0].indexOf(' ')) || imageSetLinks[0]; // Substring before ... 1x
          firstUrlLink = firstUrlLink.indexOf('url(') === -1 ? 'url(' + firstUrlLink + ')' : firstUrlLink;
          if (imageSetLinks.length === 1) {
            element.style.backgroundImage = firstUrlLink;
          } else {
            element.setAttribute('style', (element.getAttribute('style') || '') + ('background-image: ' + firstUrlLink + '; background-image: -webkit-image-set(' + imageSetLinks + ');     (' + imageSetLinks + ')'));
          }
        }
  
        if (element.getAttribute('data-toggle-class')) {
          element.classList.toggle(element.getAttribute('data-toggle-class'));
        }
      },
      loaded: function loaded() {}
    };

    function markAsLoaded(element) {
      element.setAttribute('data-loaded', true);
    }
  
    var isLoaded = function isLoaded(element) {
      return element.getAttribute('data-loaded') === 'true';
    };
  
    var onIntersection = function onIntersection(load, loaded) {
      return function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio > 0 || entry.isIntersecting) {
            observer.unobserve(entry.target);
  
            if (!isLoaded(entry.target)) {
              load(entry.target);
              markAsLoaded(entry.target);
              loaded(entry.target);
            }
          }
        });
      };
    };
  
    var getElements = function getElements(selector) {
      var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  
      if (selector instanceof Element) {
        return [selector];
      }
  
      if (selector instanceof NodeList) {
        return selector;
      }
  
      return root.querySelectorAll(selector);
    };
  
    function lozad () {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.lozad';
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  
      var _Object$assign = Object.assign({}, defaultConfig, options),
          root = _Object$assign.root,
          rootMargin = _Object$assign.rootMargin,
          threshold = _Object$assign.threshold,
          load = _Object$assign.load,
          loaded = _Object$assign.loaded;
  
      var observer = void 0;
  
      if (typeof window !== 'undefined' && window.IntersectionObserver) {
        observer = new IntersectionObserver(onIntersection(load, loaded), {
          root: root,
          rootMargin: rootMargin,
          threshold: threshold
        });
      }
  
      return {
        observe: function observe() {
          var elements = getElements(selector, root);
  
          for (var i = 0; i < elements.length; i++) {
            if (isLoaded(elements[i])) {
              continue;
            }
  
            if (observer) {
              observer.observe(elements[i]);
              continue;
            }
  
            load(elements[i]);
            markAsLoaded(elements[i]);
            loaded(elements[i]);
          }
        },
        triggerLoad: function triggerLoad(element) {
          if (isLoaded(element)) {
            return;
          }
  
          load(element);
          markAsLoaded(element);
          loaded(element);
        },
  
        observer: observer
      };
    }
  
    return lozad;
  
}))); 

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function() {
	setTimeout(function() {
		$('#mobile-menu div').click(function() {
			$('#menu div[class*="-container"] > ul ul.active').removeClass('active')
			$('#menu').toggleClass('active');
			$(this).toggleClass('active');
		});
    }, 1000);
    setTimeout(function() {
	    $('section img[width]').each(function() {
	        var img = $(this),
	            width = img.attr('width'),
	            div = img.closest('.wp-caption');
	            
	        if (width) {// && width <= 250) {
	            img.addClass('sized');
	
	            if (width <= 50) {
	                img.addClass('size-50');
	                div.addClass('size-50');
	            }
	            else if (width <= 100) {
	                img.addClass('size-100');
	                div.addClass('size-100');
	            }
	            else if (width <= 150) {
	                img.addClass('size-150');
	                div.addClass('size-150');
	            }
	            else if (width <= 200) {
	                img.addClass('size-200');
	                div.addClass('size-200');
	            }
	            else if (width <= 300) {
	                img.addClass('size-300');
	                div.addClass('size-300');
	            }
	            else if (width < 460) {
	                img.addClass('size-375');
	                div.addClass('size-375');
	            }
	            else if (width >= 460 && width < 560) {
	                img.addClass('size-460');
	                div.addClass('size-460');
	            }
	            else if (width >= 560 && width < 768) {
	                img.addClass('size-560');
	                div.addClass('size-560');
	            }
	            else if (width >= 768 && width < 960) {
	                img.addClass('size-768');
	                div.addClass('size-768');
	            }
	            else {
	                img.addClass('size-desktop');
	                div.addClass('size-desktop');
	            }
	        }
	    });
	    $('#toc').each(function() {
		    var toc = $(this);
		    
		    toc.find('p.toc_title a').click(function() {
			    toc.toggleClass('active');
		    });
	    })
    }, 100);
    lozad(".lazy-load").observe();
    
    function is_touch_device() {
	    
	    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
	    
	    var mq = function (query) {
	        return window.matchMedia(query).matches;
	    }
	
	    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
	        return true;
	    }
	
	    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
	    // https://git.io/vznFH
	    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
	    return mq(query);
	}
	
	if (is_touch_device()) {
		document.body.classList.add('touch');
		$('#menu div[class*="-container"] > ul li > a').click(function() {
			var a = $(this),
				li = a.parent(),
				ul = a.next('ul')
			
				console.log('>>>' + a.text());
			if (ul.get(0)) {
				if (!ul.hasClass('active')) {
					
					var title = function(n, p) {
						var a = $(n).prev('a');
						
						console.log(p + ' ' + a.text());
					}
					
					li.parent('ul').each(function() {
						title(this, ' ADD FIX');
						$(this).addClass('fix');
					});							
					
					$('#menu div[class*="-container"] > ul ul.active:not(.fix)').each(function() {
						title(this, ' REMOVE ACTIVE');
						$(this).removeClass('active');
					});							
						
					li.parent('ul.fix').each(function() {
						title(this, ' REMOVE FIX');
						$(this).removeClass('fix');
					});	
						
					ul.addClass('active');
					
					return false;
				}
			}
			else {
				$('#menu div[class*="-container"] > ul ul.active').removeClass('active');
			}
		});
	}
});