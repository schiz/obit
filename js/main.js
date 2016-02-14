jQuery(document).ready(function($) {
	if (navigator.userAgent.indexOf('Mac') != -1 && navigator.userAgent.indexOf('Safari') != -1) {      
	    $('html').addClass('mac-os safari-mac');
	}
	else if (navigator.userAgent.indexOf('Mac') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
		$('html').addClass('mac-os chrome-mac');
	}

	$('input[placeholder], textarea[placeholder]').placeholder();
	$('.spoiler-js').spoilerJs();

	$('._dropdown')
		.on('click.DROPDOWN', function (e) {
			if ($(this).is('.opened')) {
				$(this).removeClass('opened');
				return;
			}

			$('._dropdown').filter('.opened').removeClass('opened');
			$(this).addClass('opened');
		})

		.find('.dropdown-close')
			.on('click.DROPDOWNCLOSE', function (e) {
				$(this).parents('._dropdown').removeClass('opened');
			}).end()
		
		.find('.stop_propagation')
			.on('click.DROPDOWN', function (e) {
				e.stopPropagation();
			}).end()
		
		.filter('.dropdown-menu').find('.item')
			.on('click.DROPDOWNMENU', function (e) {
				var text = $(this).text();

				$(this)
					.addClass('selected')
					.siblings('.selected')
						.removeClass('selected').end()
					.parents('.dropdown-menu').find('.value').text(text);
			});

	$('.press-article')
		.find('a.readmore')
			.on('click', function (e) {
				e.preventDefault();

				var $parent = $(this).parents('.press-article');
				
				$(this).fadeOut(200);

				$parent.find('.other-text').fadeIn(200, function () {	
					$parent.find('a.article-close').fadeIn(200);
				});

			}).end()
		.find('a.article-close')
			.on('click', function (e) {
				e.preventDefault();

				var $parent = $(this).parents('.press-article');

				$(this).fadeOut(200);

				$parent.find('.other-text').fadeOut(200, function () {	
					$parent.find('a.readmore').fadeIn(200);
				});
			});
	
	$('.more-news').on('click', function (e) {
		e.preventDefault();

		$.ajax({
			url: '_ajax.html',
			success: function(data){
				console.log(data);
				$('.press-articles')
					.append(data)
					.find('.press-article.hidden').fadeIn(500, function () {
						$(this).removeClass('hidden');
					});
			}
		});
	});

	var phoneNamber = [];

	$('.write-to-us input[type="text"].phone')
		.on('focus keydown', function (e) {


			var backspace = (e.keyCode || e.charCode) == 8,
				fucus     = e.type == 'focus',
				nambers   = phoneNamber.length,
				self      = this;

			function setValue_f () {
				var value = [
					'+7 (',
					(phoneNamber[0]) ? phoneNamber[0] : ' -',
					(phoneNamber[1]) ? phoneNamber[1] : ' -',
					(phoneNamber[2]) ? phoneNamber[2] : ' -',
					') ',
					(phoneNamber[3]) ? phoneNamber[3] : ' -',
					(phoneNamber[4]) ? phoneNamber[4] : ' -',
					(phoneNamber[5]) ? phoneNamber[5] : ' -',
					' ',
					(phoneNamber[6]) ? phoneNamber[6] : ' -',
					(phoneNamber[7]) ? phoneNamber[7] : ' -',
					' ',
					(phoneNamber[8]) ? phoneNamber[8] : ' -',
					(phoneNamber[9]) ? phoneNamber[9] : ' -'
				].join('');

	            self.value = '';
	            self.value = value;
			}

			function nambersPosition_f () {
				var arrSize = (backspace) ? nambers - 2 : nambers;

	            var nambersPosition = 
	            	(arrSize <  0) ? 5  :
	            	(arrSize == 0) ? 5  :
	            	(arrSize == 1) ? 6  :
	            	(arrSize == 2) ? 7  :
	            	(arrSize == 3) ? 10 :
	            	(arrSize == 4) ? 11 :
	            	(arrSize == 5) ? 12 :
	            	(arrSize == 6) ? 14 :
	            	(arrSize == 7) ? 15 :
	            	(arrSize == 8) ? 17 :
	            	(arrSize == 9) ? 18 : 18 ;
	            	
	            console.log(arrSize);
	            console.log(nambersPosition);

				self.setSelectionRange(nambersPosition, nambersPosition);
			}

			/*if (fucus) {
				setValue_f();
				nambersPosition_f();

				e.preventDefault();
      			return false;
      			return false;
			}*/
			
			if (backspace) {
				phoneNamber = phoneNamber.slice(0, nambers - 1);
			} else {	
				if (!/[0-9]|\./.test(String.fromCharCode(e.keyCode))) {
	                return false;   
	            }

	            if (nambers >= 10 && this.value.length >= 19) return false;
	            if (nambers <= 9) phoneNamber.push(String.fromCharCode(e.keyCode));
			}

	        setValue_f();
            nambersPosition_f();

            return false;
		});

});

(function($){
	$.fn.spoilerJs = function() {
		var self = this;

		this.find('> li').addClass('spoiler-item').find('> span.spoiler-item')
			.on('click', function (e) {
				var open = $(this).parent().is('.open');

				if (open) {
					$(this).siblings('div').fadeOut(200, function () {
						$(this).parent().removeClass('open');
					});
				} else {
	  			$(this).siblings('div').fadeIn(200).end()
	  				.parent().addClass('open');
				}
			}).end()
			.find('div.ctrl > span.turn')
				.on('click', function (e) {
					$(this).parents('li.spoiler-item').find('> div').fadeOut(200, function () {
						$(this).parent().removeClass('open');
					});
				});  
	};
})(jQuery);