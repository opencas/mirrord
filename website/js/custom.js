// JavaScript Document

var Util = {

    uuid:function () {
        var uuid = (function () {
            var i, c = "89ab", u = [];
            for (i = 0; i < 36; i += 1) {
                u[i] = (Math.random() * 16 | 0).toString(16);
            }
            u[8] = u[13] = u[18] = u[23] = "-";
            u[14] = "4";
            u[19] = c.charAt(Math.random() * 4 | 0);
            return u.join("");
        })();
        return {
            toString:function () {
                return uuid;
            },
            valueOf:function () {
                return uuid;
            }
        };
    },

    isIOS6:function () {
        if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
            if (/OS [6](.*) like Mac OS X/i.test(navigator.userAgent)) {
                return true;
            }
        }
        return false;
    },

    isOpera:function () {
        return window.opera || jQuery.browser.opera;
    },

    isIE:function () {
        return jQuery.browser.msie;
    },

    isChrome:function () {
        return (typeof window.chrome === "object") ||
            /chrome/.test(navigator.userAgent.toLowerCase()) ||
            /chrom(e|ium)/.test(navigator.userAgent.toLowerCase())
    },

    closeDDLevelsMenu:function (e, target) {
        var close = true;
        var subuls = ddlevelsmenu.topitems['nav'];
        if (subuls) {
            for (var i = 0; i < subuls.length; i++) {
                if (jQuery(subuls[i].parentNode).has(target).length > 0) {
                    close = false;
                }
            }
        }
        if (close) {
            subuls = ddlevelsmenu.subuls['nav'];
            if (subuls) {
                for (i = 0; i < subuls.length; i++) {
                    if (jQuery(subuls[i]).has(target).length > 0) {
                        close = false;
                    }
                }
            }
        }
        if (close) {
            subuls = ddlevelsmenu.subuls['nav'];
            if (subuls) {
                for (i = 0; i < subuls.length; i++) {
                    ddlevelsmenu.hidemenu(subuls[i].parentNode);
                }
            }
        }
    }

};

(function ($) {

    $.fn.flexSliderInitializer = function (flexSliderObj) {

        var effect = flexSliderObj.effect;
        var slideshow = flexSliderObj.slideshow;
        var sliderSelector = flexSliderObj.selector;
        var sliders = $(sliderSelector);
        var players;

        if (sliders.length > 0) {
            sliders.each(function () {
                var sliderElement = this;
                var initSlidersInvoked = false;
                var unloadedImagesCount = 0;
                var unloadedImages = [];

                var sliderImages = $(sliderElement).find('img');
                sliderImages.each(function () {
                    if (!this.complete && this.complete != undefined) {
                        unloadedImages.push(this);
                        unloadedImagesCount++;
                    }
                });

                if (unloadedImagesCount == 0) {
                    initSlider(sliderElement);
                } else {
                    var loadedImagesCount = 0;
                    $(unloadedImages).bind('load', function () {
                        loadedImagesCount++;
                        if (loadedImagesCount === unloadedImagesCount) {
                            if (!initSlidersInvoked) {
                                initSlidersInvoked = true;
                                initSlider(sliderElement);
                            }
                        }
                    });
                    var timer = window.setTimeout( function() {
                        window.clearTimeout(timer);
                        $(unloadedImages).each(function() {
                            if(this.complete || this.complete === undefined) {
                                $(this).trigger('load');
                            }
                        });
                    }, 50);
                }
            });
        }

        function initSlider(sliderElement) {
            var slider = $(sliderElement);
            players = slider.find('iframe');

            slider.fitVids().flexslider({
                animation:effect,
                smoothHeight: (effect=='slide'),
                pauseOnHover:true, //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
                video: (effect=='slide'),
                slideshow: slideshow,
                controlsContainer:sliderSelector,
                before:function (slider) {
                    pausePlayers();
                }
            });

            // Swipe gestures support
            if (Modernizr.touch && $().swipe) {
                var next = slider.find('a.flex-next');
                var prev = slider.find('a.flex-prev');

                function doFlexSliderSwipe(e, dir) {
                    if (dir.toLowerCase() == 'left') {
                        next.trigger('click');
                    }
                    if (dir.toLowerCase() == 'right') {
                        prev.trigger('click');
                    }
                }

                slider.swipe({
                    click:function (e, target) {
                        $(target).trigger('click');
                    },
                    swipeLeft:doFlexSliderSwipe,
                    swipeRight:doFlexSliderSwipe,
                    allowPageScroll:'auto'
                });
            }
        }

        function pausePlayers() {
            if (players.length > 0 && window.$f) {
                players.each(function () {
                    try {
                        $f(this).api('pause');
                    } catch (e) {
                    }
                });
            }
        }

    };

})(jQuery);

(function ($) {

    $.fn.responsiveSearch = function (op) {
        var rs = $.fn.responsiveSearch;
        var settings = $.extend({}, rs.defaults, op);
        var searchInput = $(this);
        var searchButton = $('#search-submit');

        installListeners();

        function setSearchInputVisible(display) {
            if (display) {
                searchInput.fadeIn(settings.animSpeed);
            } else {
                searchInput.fadeOut(settings.animSpeed);
            }
        }

        function installListeners() {
            searchButton.bind('click', function () {
                var isSearchHidden = (searchInput.css('display') == 'none');
                if (isSearchHidden) {
                    setSearchInputVisible(true);
                    return false;
                } else if ($.trim(searchInput.val()) == '') {
                    setSearchInputVisible(false);
                    return false;
                } else {
                    return true;
                }
            });
        }

        rs.hide = function (target) {
            if (target.id != 's' && target.id != 'search-submit') {
                var isSearchVisible = (searchInput.css('display') != 'none');
                if (isSearchVisible) {
                    setSearchInputVisible(false);
                }
            }
        };

        return rs;

    };

    var pcc = $.fn.responsiveSearch;
    pcc.defaults = {
        animSpeed:500
    };

})(jQuery);

// This library re-implements setTimeout, setInterval, clearTimeout, clearInterval for iOS6.
// iOS6 suffers from a bug that kills timers that are created while a page is scrolling.
// This library fixes that problem by recreating timers after scrolling finishes (with interval correction).
// This code is free to use by anyone (MIT, blabla).
// Original Author: rkorving@wizcorp.jp
if (Util.isIOS6()) {
    (function (window) {
        var timeouts = {};
        var intervals = {};
        var orgSetTimeout = window.setTimeout;
        var orgSetInterval = window.setInterval;
        var orgClearTimeout = window.clearTimeout;
        var orgClearInterval = window.clearInterval;
        // To prevent errors if loaded on older IE.
        if (!window.addEventListener) return false;
        function createTimer(set, map, args) {
            var id, cb = args[0],
                repeat = (set === orgSetInterval);

            function callback() {
                if (cb) {
                    cb.apply(window, arguments);
                    if (!repeat) {
                        delete map[id];
                        cb = null;
                    }
                }
            }

            args[0] = callback;
            id = set.apply(window, args);
            map[id] = {
                args:args,
                created:Date.now(),
                cb:cb,
                id:id
            };
            return id;
        }

        function resetTimer(set, clear, map, virtualId, correctInterval) {
            var timer = map[virtualId];
            if (!timer) {
                return;
            }
            var repeat = (set === orgSetInterval);
            // cleanup
            clear(timer.id);
            // reduce the interval (arg 1 in the args array)
            if (!repeat) {
                var interval = timer.args[1];
                var reduction = Date.now() - timer.created;
                if (reduction < 0) {
                    reduction = 0;
                }
                interval -= reduction;
                if (interval < 0) {
                    interval = 0;
                }
                timer.args[1] = interval;
            }
            // recreate
            function callback() {
                if (timer.cb) {
                    timer.cb.apply(window, arguments);
                    if (!repeat) {
                        delete map[virtualId];
                        timer.cb = null;
                    }
                }
            }

            timer.args[0] = callback;
            timer.created = Date.now();
            timer.id = set.apply(window, timer.args);
        }

        window.setTimeout = function () {
            return createTimer(orgSetTimeout, timeouts, arguments);
        };
        window.setInterval = function () {
            return createTimer(orgSetInterval, intervals, arguments);
        };
        window.clearTimeout = function (id) {
            var timer = timeouts[id];
            if (timer) {
                delete timeouts[id];
                orgClearTimeout(timer.id);
            }
        };
        window.clearInterval = function (id) {
            var timer = intervals[id];
            if (timer) {
                delete intervals[id];
                orgClearInterval(timer.id);
            }
        };
        //check and add listener on the top window if loaded on frameset/iframe
        var win = window;
        while (win.location != win.parent.location) {
            win = win.parent;
        }
        win.addEventListener('scroll', function () {
            // recreate the timers using adjusted intervals
            // we cannot know how long the scroll-freeze lasted, so we cannot take that into account
            var virtualId;
            for (virtualId in timeouts) {
                resetTimer(orgSetTimeout, orgClearTimeout, timeouts, virtualId);
            }
            for (virtualId in intervals) {
                resetTimer(orgSetInterval, orgClearInterval, intervals, virtualId);
            }
        });
    }(window));
}

// jQuery Initialization
jQuery(document).ready(function ($) {

    /* ---------------------------------------------------------------------- */
    /*	Detect Touch Device
    /* ---------------------------------------------------------------------- */

    if (Modernizr.touch) {
        function removeHoverState() {
            $("body").addClass("no-touch");
        }
    }

    /* ---------------------------------------------------------------------- */
    /* Fixes for Browsers
    /* ---------------------------------------------------------------------- */

    if (Util.isOpera()) {
        $('.flexslider .slides > li').each(function () {
            $(this).css('overflow', 'hidden');
        });
    }

    /* ---------------------------------------------------------------------- */
    /* jCarousel
    /* ---------------------------------------------------------------------- */

    var allCarousels = [
        {'selector':'.post-carousel', 'customSettings':{}},
        {'selector':'.testimonial-carousel', 'customSettings':{auto:5}},
        {'selector':'.project-carousel', 'customSettings':{scroll:4, visible:null}}
    ];

    function resetCarouselPosition(carousel) {
        if (carousel.data('resizing')) {
            carousel.css('left', '0');
        }
    }

    function getCarouselScrollCount() {
        var windowWidth = $(window).width();
        if (windowWidth < 480) {
            return 1;
        } else if (windowWidth < 768) {
            return 2;
        } else if (windowWidth < 960) {
            return 3;
        } else {
            return 4;
        }
    }

    function swipeCarousel(e, dir) {
        var carouselParent = $(e.currentTarget).parents().eq(2);
        if (dir.toLowerCase() == 'left') {
            carouselParent.find('.jcarousel-next').trigger('click');
        }
        if (dir.toLowerCase() == 'right') {
            carouselParent.find('.jcarousel-prev').trigger('click');
        }
    }

    function initCarousel(carouselObj, bindGestures) {
        var carouselSelector = carouselObj.selector;
        var customSettings = carouselObj.customSettings;

        var carousels = $(carouselSelector);
        if (carousels.length > 0) {
            carousels.each(function (i) {
                var carousel = $(this);
                var defaultSettings = {
                    scroll:1,
                    visible:1,
                    wrap:"last",
                    easing:"swing",
                    itemVisibleInCallback:function () {
                        onBeforeAnimation : resetCarouselPosition(carousel);
                        onAfterAnimation : resetCarouselPosition(carousel);
                    }
                };
                var settings = $.extend({}, defaultSettings, customSettings);
                settings.scroll = Math.min(getCarouselScrollCount(), settings.scroll);
                carousel.jcarousel(settings);
            });

            if (bindGestures && Modernizr.touch && $().swipe) {
                carousels.swipe({
                    click:function (e, target) {
                        $(target).trigger('click');
                    },
                    swipeLeft:swipeCarousel,
                    swipeRight:swipeCarousel,
                    allowPageScroll:'auto'
                });
            }
        }
    }

    function resizeCarousel(carouselObj) {
        var carousels = $(carouselObj.selector);
        if (carousels.length > 0) {
            carousels.each(function () {
                var carousel = $(this);
                var carouselChildren = carousel.children('li');
                var carouselItemWidth = carouselChildren.first().outerWidth(true);
                var newWidth = carouselChildren.length * carouselItemWidth + 100;
                if (carousel.width() !== newWidth) {
                    carousel.css('width', newWidth).data('resizing', 'true');
                    initCarousel(carouselObj, false);
                    carousel.jcarousel('scroll', 1);
                    var timer = window.setTimeout(function () {
                        window.clearTimeout(timer);
                        carousel.data('resizing', null);
                    }, 600);
                }
            });
        }
    }

    function resizeAllCarousels() {
        if ($().jcarousel && allCarousels) {
            for (var i = 0; i < allCarousels.length; i++) {
                resizeCarousel(allCarousels[i]);
            }
        }
    }

    function initAllCarousels() {
        if ($().jcarousel && allCarousels) {
            for (var i = 0; i < allCarousels.length; i++) {
                initCarousel(allCarousels[i], true);
            }
        }
    }

    initAllCarousels();

    /* ---------------------------------------------------------------------- */
    /* Tiny Nav
    /* ---------------------------------------------------------------------- */

    if ($().tinyNav) {

        $('html').addClass('js');
        $("#navlist").tinyNav();

    }

    /* ---------------------------------------------------------------------- */
    /* Responsive Search (must be placed after Tiny Nav)
    /* ---------------------------------------------------------------------- */

    var searchInput = $('#s');
    if (searchInput.length > 0) {
        var responsiveSearchInstance = searchInput.responsiveSearch();
    }

    /* ---------------------------------------------------------------------- */
    /* Responsive Video Embeds (must be called before the FlexSlider initialization)
    /* ---------------------------------------------------------------------- */

    function resizeVideoEmbed() {
        if ($().fitVids) {
            $(".entry-video").fitVids();
        }
    }

    resizeVideoEmbed();

    /* ---------------------------------------------------------------------- */
    /* Flex Slider
    /* ---------------------------------------------------------------------- */

    var allFlexSliders = [
        {'selector':'#flexslider-home', 'effect':'fade', 'slideshow':true},
        {'selector':'#flexslider-about-us', 'effect':'slide', 'slideshow':false},
        {'selector':'#flexslider-portfolio-item', 'effect':'slide', 'slideshow':false}
    ];

    function initAllFlexSliders() {
        if ($().flexslider && allFlexSliders) {
            for (var i = 0; i < allFlexSliders.length; i++) {
                $().flexSliderInitializer(allFlexSliders[i]);
            }
        }
    }

    initAllFlexSliders();
	
	/* ---------------------------------------------------------------------- */
    /* Revolution Slider
    /* ---------------------------------------------------------------------- */
	
	if ($().revolution) {
		
	var tpj=jQuery;
	tpj.noConflict();

	tpj(document).ready(function() {

	if (tpj.fn.cssOriginal!=undefined)
		tpj.fn.css = tpj.fn.cssOriginal;

		tpj('.banner').revolution(
			{
				delay:6000,
				startwidth:1020,
				startheight:430,
				hideThumbs:200,
				thumbWidth:100,							// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
				thumbHeight:50,
				thumbAmount:5,
				navigationType:"bullet",					//bullet, thumb, none, both		(No Thumbs In FullWidth Version !)
				navigationArrows:"verticalcentered",		//nexttobullets, verticalcentered, none
				navigationStyle:"round",
				touchenabled:"on",						// Enable Swipe Function : on/off
				onHoverStop:"on",
				navOffsetHorizontal:0,
				navOffsetVertical:20,
				stopAtSlide:-1,							// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
				stopAfterLoops:-1,						// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic
				hideCaptionAtLimit:0,					// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
				hideAllCaptionAtLilmit:0,				// Hide all The Captions if Width of Browser is less then this value
				hideSliderAtLimit:0,
				shadow:0,								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
				fullWidth:"off"							// Turns On or Off the Fullwidth Image Centering in FullWidth Modus
			});
		});
	
	}

    /* ---------------------------------------------------------------------- */
    /* Lightbox
    /* ---------------------------------------------------------------------- */

    function lightbox() {
        if ($().fancybox) {

            function swipeFancyBox(e, dir) {
                var buttonBox = $('#fancybox-buttons');
                var nextButton = buttonBox.find('.btnNext');
                var prevButton = buttonBox.find('.btnPrev');
                if (dir.toLowerCase() == 'left' && nextButton) {
                    nextButton.trigger('click');
                }
                if (dir.toLowerCase() == 'right' && prevButton) {
                    prevButton.trigger('click');
                }
            }

            function calculateLightboxIFrameSize(origWidth, origHeight) {
                var windowWidth = $(window).width();
                if (windowWidth < origWidth * 1.3) {
                    var width = windowWidth * 0.75;
                    var height = (width * origHeight) / origWidth;
                    return {'width':width, 'height':height};
                } else {
                    return false;
                }
            }

            /* Video in Lightbox */
            $(".lightbox-video").each(function () {
                var $this = $(this);
                var origWidth = $this.data('width') ? $this.data('width') : 800;
                var origHeight = $this.data('height') ? $this.data('height') : 450;
                $this.fancybox({
                    autoScale:false,
                    transitionIn:'none',
                    transitionOut:'none',
                    title:this.title,
                    width:origWidth,
                    height:origHeight,
                    type:'iframe',
                    fitToView:false,

                    openEffect:'fade',
                    closeEffect:'fade',
                    nextEffect:'fade',
                    prevEffect:'fade',
                    arrows:!Modernizr.touch,
                    helpers:{
                        title:{
                            type:'inside'
                        },
                        buttons:{},
                        media:{}
                    },
                    beforeShow:function () {
                        var $this = this;
                        var size = calculateLightboxIFrameSize(origWidth, origHeight);
                        if (size) {
                            $this.width = size.width;
                            $this.height = size.height;
                        }
                    },
                    onUpdate:function () {
                        var $this = this;
                        var size = calculateLightboxIFrameSize(origWidth, origHeight);
                        if (size) {
                            $this.width = size.width;
                            $this.height = size.height;
                        }
                    },
                    beforeLoad:function () {
                        this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
                    },
                    afterShow:function () {
                        if (Modernizr.touch && $().swipe) {
                            var fancyBoxOuter = $('.fancybox-wrap');
                            var isSwipeAdded = fancyBoxOuter.data('swipe') === 'true';
                            if (!isSwipeAdded) {
                                fancyBoxOuter.data('swipe', 'true');
                                fancyBoxOuter.swipe({
                                    click:function (e, target) {
                                        $(target).trigger('click');
                                    },
                                    swipeLeft:swipeFancyBox,
                                    swipeRight:swipeFancyBox,
                                    allowPageScroll:'auto'
                                });
                            }
                        }
                    }
                });
            });

            /* Image in Lightbox */
            var lightboxImages = [];
            $(".lightbox").each(function () {
                var parent = $(this).parent();
                var add = true;
                if (parent && parent.hasClass('clone')) {
                    add = false;
                }
                if (add) {
                    lightboxImages.push(this);
                }
            });

            $(lightboxImages).fancybox({
                openEffect:'fade',
                closeEffect:'fade',
                nextEffect:'fade',
                prevEffect:'fade',
                arrows:!Modernizr.touch,
                helpers:{
                    title:{
                        type:'inside'
                    },
                    buttons:{},
                    media:{}
                },
                beforeLoad:function () {
                    this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
                },
                afterShow:function () {
                    if (Modernizr.touch && $().swipe) {
                        var fancyBoxOuter = $('.fancybox-wrap');
                        var isSwipeAdded = fancyBoxOuter.data('swipe') === 'true';
                        if (!isSwipeAdded) {
                            fancyBoxOuter.data('swipe', 'true');
                            fancyBoxOuter.swipe({
                                click:function (e, target) {
                                    $(target).trigger('click');
                                },
                                swipeLeft:swipeFancyBox,
                                swipeRight:swipeFancyBox,
                                allowPageScroll:'auto'
                            });
                        }
                    }
                }
            });
        }
    }

    lightbox();

    /* ---------------------------------------------------------------------- */
    /* Tooltips
    /* ---------------------------------------------------------------------- */

    if ($().tipsy) {

        $('.clients img[title], .social-links a[title], .about-us img[title]').tipsy({
            fade:true,
            gravity:$.fn.tipsy.autoNS,
            offset:3
        });

    }

    /* ---------------------------------------------------------------------- */
    /* Scroll to Top
    /* ---------------------------------------------------------------------- */

    if ($().UItoTop) {

        $().UItoTop({
            scrollSpeed:400
        });

    }

    /* ---------------------------------------------------------------------- */
    /* Fix for YouTube Iframe Z-Index
    /* ---------------------------------------------------------------------- */

    $("iframe").each(function () {
        var ifr_source = $(this).attr('src');
        var wmode = "wmode=transparent";
        if (ifr_source.indexOf('?') != -1) {
            var getQString = ifr_source.split('?');
            var oldString = getQString[1];
            var newString = getQString[0];
            $(this).attr('src', newString + '?' + wmode + '&' + oldString);
        }
        else $(this).attr('src', ifr_source + '?' + wmode);
    });

    /* ---------------------------------------------------------------------- */
    /* Notification Boxes
    /* ---------------------------------------------------------------------- */

    $(".notification-close-info").click(function () {
        $(".notification-box-info").fadeOut("fast");
        return false;
    });

    $(".notification-close-success").click(function () {
        $(".notification-box-success").fadeOut("fast");
        return false;
    });

    $(".notification-close-warning").click(function () {
        $(".notification-box-warning").fadeOut("fast");
        return false;
    });

    $(".notification-close-error").click(function () {
        $(".notification-box-error").fadeOut("fast");
        return false;
    });

    /* ---------------------------------------------------------------------- */
    /* Tabs
    /* ---------------------------------------------------------------------- */

    if ($().tabs) {
        $(".tabs").tabs();
    }

    /* ---------------------------------------------------------------------- */
    /* Toggle
    /* ---------------------------------------------------------------------- */

    if ($().toggle) {

        $(".toggle").each(function () {
            if ($(this).attr('data-id') == 'open') {
                $(this).accordion({header:'.toggle-title', collapsible:true, heightStyle:"content"});
            } else {
                $(this).accordion({header:'.toggle-title', collapsible:true, heightStyle:"content", active:false});
            }
        });

    }

    /* ---------------------------------------------------------------------- */
    /* Accordion
    /* ---------------------------------------------------------------------- */

    if ($().accordion) {
        $(".accordion").accordion({
            header:'.accordion-title',
            collapsible:true,
            heightStyle:"content"
        });
    }

    /* ---------------------------------------------------------------------- */
    /* Portfolio Filter
    /* ---------------------------------------------------------------------- */

    var $container = $('#gallery');

    if ($.isotope) {
        // initialize Isotope
        $container.isotope({
            // options...
            itemSelector:'.entry'
        });
    }

    // filter items when filter link is clicked
    $('#filter').find('a').click(function () {
        var selector = $(this).attr('data-filter');
        $container.isotope({ filter:selector });
        return false;
    });

    // set selected menu items
    var $optionSets = $('.option-set'),
        $optionLinks = $optionSets.find('a');

    $optionLinks.click(function () {
        var $this = $(this);
        // don't proceed if already selected
        if ($this.hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
    });

    /* ---------------------------------------------------------------------- */
    /* Form Validation
    /* ---------------------------------------------------------------------- */

    if ($().validate) {
        $("#comment-form").validate();
    }

    var contactForm = $("#contact-form");
    if (contactForm && contactForm.length > 0) {
        var contactFormSubmit = contactForm.find("#submit");

        contactFormSubmit.bind("click", function (evt) {

            if (contactForm.valid()) {
                contactFormSubmit.attr('disabled', 'disabled');
                $.ajax({
                    type:"POST",
                    url:"contact-processor.php",
                    data:getFormData(),
                    statusCode:{
                        200:function () {
                            $("#contact-notification-box-success").css('display', '');
                            contactFormSubmit.removeAttr('disabled', '');
                            resetFormData();
                        },
                        500:function () {
                            $("#contact-notification-box-error").css('display', '');
                            contactFormSubmit.removeAttr('disabled');
                        }
                    }
                });
            }

            function getFormData() {
                var data = 'timestamp=' + evt.timeStamp;
                contactForm.find(":input").each(function () {
                    var field = $(this);
                    var add = true;
                    if (field.is(':checkbox') && !field.is(':checked')) {
                        add = false;
                    }
                    if (add) {
                        var fieldName = field.attr('name');
                        var fieldValue = $.trim(field.val());
                        if (fieldValue.length > 0) {
                            data += '&' + fieldName + '=' + fieldValue;
                        }
                    }
                });
                return data;
            }

            function resetFormData() {
                contactForm.find(":input").each(function () {
                    var field = $(this);
                    var tagName = field.prop("nodeName").toLowerCase();
                    if (tagName == 'select') {
                        field.prop('selectedIndex', 0);
                    } else {
                        if (field.is(':checkbox')) {
                            field.attr("checked", field.prop("defaultChecked"));
                        } else {
                            var defaultValue = field.prop("defaultValue");
                            if (defaultValue) {
                                field.val(defaultValue);
                            } else {
                                field.val('');
                            }
                        }
                    }
                });
            }

            return false;
        });
    }

    /* ---------------------------------------------------------------------- */
    /* Newsletter Subscription
    /* ---------------------------------------------------------------------- */

    if ($().validate) {
        $("#send-newsletter-form").validate();
    }

    var newsletterForm = $("#newsletter-form");
    if (newsletterForm && newsletterForm.length > 0) {
        var newsletterSubscribeButton = newsletterForm.find("#subscribe");
        var newsletterEmailInput = newsletterForm.find("#newsletter");

        newsletterSubscribeButton.bind("click", function () {

            if ($("#newsletter-form").valid()) {
                $("#subscribe").attr('disabled', 'disabled');
                jQuery.ajax({
                    type:"POST",
                    url:"newsletter.php",
                    data:getSubscribeFormData(),
                    statusCode:{
                        200:function () {
                            $("#newsletter-notification-box-success").css('display', '');
                            newsletterSubscribeButton.removeAttr('disabled', '');
                            resetSubscribeFormData();
                        },
                        500:function () {
                            $("#newsletter-notification-box-error").css('display', '');
                            newsletterSubscribeButton.removeAttr('disabled');
                        }
                    }
                });
            }

            function getSubscribeFormData() {
                var data = 'action=subscribe';
                if (newsletterEmailInput && newsletterEmailInput.length > 0) {
                    data += '&email=' + newsletterEmailInput.attr('value');
                }
                return data;
            }

            function resetSubscribeFormData() {
                if (newsletterEmailInput && newsletterEmailInput.length > 0) {
                    newsletterEmailInput.attr('value', '');
                }
            }

            return false;
        });
    }

    /* ---------------------------------------------------------------------- */
    /* Twitter Widget
    /* ---------------------------------------------------------------------- */

    if ($().tweet) {

        $(".tweet").tweet({
            username:"ixtendo", // Change username here
            join_text:false,
            avatar_size:false, // you can activate the avatar
            count:2, // number of tweets
            view_text:"view tweet on twitter",
            seconds_ago_text:"about %d seconds ago",
            a_minutes_ago_text:"about a minute ago",
            minutes_ago_text:"about %d minutes ago",
            a_hours_ago_text:"about an hour ago",
            hours_ago_text:"about %d hours ago",
            a_day_ago_text:"about a day ago",
            days_ago_text:"about %d days ago",
            template:"{avatar}{text}{join}{time}" // [string or function] template used to construct each tweet <li> - see code for available vars
        });

    }

    /* ---------------------------------------------------------------------- */
    /* Flickr Widget
    /* ---------------------------------------------------------------------- */

    if ($().jflickrfeed) {

        $('.flickr-feed').jflickrfeed({
            limit:6,
            qstrings:{
                id:'52617155@N08' // Flickr ID (Flickr IDs can be found using this tool: http://idgettr.com/)
            },
            itemTemplate:'<li><a href="{{link}}" title="{{title}}" target="_blank"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
        });

    }

    /* ---------------------------------------------------------------------- */
    /* Google Maps
    /* ---------------------------------------------------------------------- */

    var mapObject = $('#map');
    if ($().gMap && mapObject.length > 0) {
        var lat = mapObject.data('lat'); //uses data-lat attribute
        var lng = mapObject.data('lng'); //uses data-lng attribute
        var addr = mapObject.data('address'); //uses data-address attribute
        var zoom = mapObject.data('zoom'); //uses data-zoom attribute
        var markers = {};
        if (addr) {
            markers['address'] = addr;
        } else {
            markers['latitude'] = lat;
            markers['longitude'] = lng;
        }

        mapObject.gMap({ markers:[markers], zoom:zoom });
    }

    function resizeGoogleMap() {
        if (mapObject.length > 0) {
            var mapWidth = mapObject.width();
            var mapHeight = Math.round(mapWidth * 0.425);
            mapObject.height(mapHeight);
        }
    }

    resizeGoogleMap();
	
    /* ---------------------------------------------------------------------- */
    /* Sticky Footer
    /* ---------------------------------------------------------------------- */

    // Set minimum height so that the footer will stay at the bottom of the window even if there isn't enough content
    function setMinHeight() {
        var body = $('body');
        var wrap = $('#wrap');
        var content = $('#content');
        content.css('min-height',
            $(window).outerHeight(true)
                - ( body.outerHeight(true) - body.height() )
                - ( wrap.outerHeight(true) - wrap.height() )
                - $('#header').outerHeight(true)
                - $('#slider-home').outerHeight(true)
                - $('#page-title').outerHeight(true)
                - ( content.outerHeight(true) - content.height() )
                - $('#footer').outerHeight(true)
        );
    }

    // Init
    setMinHeight();

    // Window resize
    $(window).on('resize', function () {
        var timer = window.setTimeout(function () {
            window.clearTimeout(timer);
            setMinHeight();
            resizeAllCarousels();
            resizeGoogleMap();
        }, 30);
    });


    if (Modernizr.touch) {
        $(document).on('touchstart', function (e) {
            var target = e.target;
            if (responsiveSearchInstance) {
                responsiveSearchInstance.hide(target);
            }
            Util.closeDDLevelsMenu(e, target);
        });
    } else {
        $(document).click(function (e) {
            Util.closeDDLevelsMenu(e, '');
            if (responsiveSearchInstance) {
                responsiveSearchInstance.hide(e.target);
            }
        });
    }
		
    /* ---------------------------------------------------------------------- */
    /* Style Switcher
    /* ---------------------------------------------------------------------- */

    var windowWidth = $(window).width();
    if (windowWidth > 480) {
        var sw = (window.location.href.indexOf('#nosw') < 0);
        if ($().styleSwitcher && sw) {
            var styleSwitcher = $().styleSwitcher();
            styleSwitcher.loadStyleSwitcher();
            styleSwitcher.applySettings();
        }
    }

});