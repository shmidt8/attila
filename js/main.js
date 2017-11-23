jQuery(function($) {

// Check mobile
	function is_mobile() {return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));}
	if(is_mobile()) {
		$('html').css('width', window.innerWidth + 'px');
		$('.cre-animate').css({'visibility' : 'visible', 'top' : 0, 'left' : 0, 'transform': 'none', '-webkit-transform': 'none', '-moz-transform': 'none', '-ms-transform': 'none', '-o-transform': 'none', 'scale' : 1, 'opacity' : 1}).removeClass('.cre-animate');
		$('#video').remove();
	}
	
// Next block button
	$('a.next_block').each(function(){
		var _this = $(this);
		var dest = _this.parent().parent().next().offset().top;
		_this.click(function(){
			$('body, html').animate({scrollTop: dest}, 800);
			return false
		});
	});

// Services
	$('#services [class*="item"] a').each(function(){
		$(this).data('text', $(this).text());
	});
	$('#services [class*="item"] a').click(function(){
		var a = $(this);
		var number = $(this).parent().parent().attr('class');
		var text = $(this).data('text');
		$('#services [class*="more"]').each(function(){
			var _this = $(this);
			if(_this.data('for') == number){
				if(_this.css('display') == 'none'){
					_this.siblings('[class*="more"]').slideUp(400);
					_this.delay(400).slideDown(400);
					$('#services [class*="item"] a').each(function(){
						$(this).text(text);
					});
					a.text('Скрыть');
				}
				else {
					_this.slideUp(400);
					a.text(text)
				}
			}
		});
		return false
	});
	$('#services [class*="more"] .close').click(function(){
		$('#services [class*="more"]').slideUp(400);
		$('#services [class*="item"] a').each(function(){
			var _this = $(this);
			_this.text(_this.data('text'));
		});
		return false
	});
	$('#services [class*="item"]').each(function(){
		var _this = $(this);
		var a = _this.find('a');
		_this.click(function(){
			a.click();
		});
	});
	
// Examples
	$('#examples a.more').each(function(){
		var _this = $(this)
		_this.data('text', _this.text());
		if($('#examples [class*="item"]').length <= 6){
			_this.css('display', 'none');
		}
	});
	
	$('#examples [class*="item"] a').each(function(){
		$(this).data('text', $(this).text());
	});
	$('#examples [class*="item"] a').click(function(){
		var a = $(this);
		var number = $(this).parent().parent().data('class');
		var text = $(this).data('text');
		$('#examples [class^="more-"]').each(function(){
			var _this = $(this);
			if(_this.data('for') == number){
				if(_this.css('display') == 'none'){
					_this.siblings('[class^="more-"]').slideUp(400);
					_this.delay(400).slideDown(400);
					$('#examples [class*="item"] a').each(function(){
						$(this).text(text);
					});
					a.text('Скрыть');
				}
				else {
					_this.slideUp(400);
					a.text(text)
				}
			}
		});
		return false
	});
	$('#examples [class^="more-"] .close').click(function(){
		$('#examples [class^="more-"]').slideUp(400);
		$('#examples [class*="item"] a').each(function(){
			var _this = $(this);
			_this.text(_this.data('text'));
		});
		return false
	});
	$('#examples [class*="item"]').each(function(){
		var _this = $(this);
		var a = _this.find('a');
		_this.click(function(){
			a.click();
		});
	});
	$('#examples a.more').click(function(){
		var _this = $(this);
		var hidden = $('#examples .hidden');
		if(hidden.css('display') == 'none'){
			hidden.slideDown();
			_this.text('Скрыть');
		}
		else {
			hidden.slideUp();
			_this.text(_this.data('text'));
		}
		return false
	});
	
// Forms

		// Phone mask
		$('input[name="client_phone"]').mask('+9 (999) 999-99-99', {placeholder:'_'});
		
		// IE placeholder
		$('input[placeholder], textarea[placeholder]').placeholder();
		
		// Placeholder focus
		$('input, textarea').focus(function(){
			var placeholder = $(this).attr('placeholder');
			$(this).attr('placeholder', '');
			$(this).blur(function(){
				$(this).attr('placeholder', placeholder);
			});
		});
		
		// Pseudo submit
		$('form .submit').click(function(){
			$(this).siblings('input[type="submit"]').click();
			return false
		});
		
	$('form').submit(function(){

		// Check
		var name = $(this).find('input[name=client_name]');
		var phone = $(this).find('input[name="client_phone"]');
		var mail = $(this).find('input[name="client_mail"]');
		var message = $(this).find('textarea[name="client_message"]');
		
		var send = true;
			
			if (name.val() == '') {
				name.si_show_message('Укажите ваше имя');
				send = false;
			}
			
			if (phone.size() > 0 && phone.val() == '') {
				phone.si_show_message('Укажите ваш телефон');
				send = false;
			}
			
			if (mail.size() > 0 && mail.val() == '') {
				mail.si_show_message('Укажите ваш e-mail');
				send = false;
			}
			
			if (message.size() > 0 && message.val() == '') {
				message.si_show_message('Укажите ваше сообщение');
				send = false;
			}
		
		if(send == false || $(this).find('input[type="submit"]').hasClass('non-click') || $(this).find('input[type="submit"]').hasClass('non-click')) {
			return false
		}
		
		// Send
		else {
			$(this).find('input[type="submit"]').addClass('non-click');
			$(this).find('.submit').addClass('non-click');
			$.post($(this).prop('action'), $(this).serialize(), function(res) {
			
				if (res.success == 1) {	
					$('#overlay_modal, #modals').fadeIn(600);
					$('[id^="modal_"], [id^="modal-"]').fadeOut(600);
					$('#modal_success').fadeIn(600).css('display', 'table');
					
					name.val('');
					phone.val('');
					mail.val('');
					message.val('');
					
					//yaCounterXXXXXX.reachGoal('target' + res.id);
					
				}
				else {
					alert(res.text);
				}
			
			}, 'json');
			
			return false
		};
	});
	
// Modals
	
	// Styles
	$(window).on('load resize', function(){
		$('#overlay_modal').css({'height' : $(document).height(), 'width' : $(document).width() + 17});
	});
	// Close
	$('.modal_close').click(function(e){
		$('[id*="modal"]').fadeOut(600); 
		$('form').find('.non-click').removeClass('non-click');
		$('html').removeClass('non-scroll');
		return false
	});
	$('#modals').click(function(e){
	if (e.target == this) {
		$('[id*="modal"]').fadeOut(600); 
		$('form').find('.non-click').removeClass('non-click');
		$('html').removeClass('non-scroll');
		return false
	}
	});
	
	/*--------------------------------------------------------------------------------------------*/
	
	$('.modal_callback').click(function(){
		$('#overlay_modal').css({'height' : $(document).height(), 'width' : $(document).width() + 17});
		$('html').addClass('non-scroll');
		$('#overlay_modal, #modals, #modal_callback_form').fadeIn(600);
		return false
	});
	$('.modal_confidence').click(function(){
		$('#overlay_modal').css({'height' : $(document).height(), 'width' : $(document).width() + 17});
		$('html').addClass('non-scroll');
		$('#overlay_modal, #modals, #modal_confidence').fadeIn(600);
		return false
	});
	
// Animation
	if(!/MSIE [6-8]/i.test(navigator.userAgent) && !is_mobile()){
		
		$('header .wrapper > [class*="item"] .count').countTo();
	
		$('header ul li[class*="item"]').fStepwise({'app_delay': 0, 'el_delay': 200, 'animation_speed': 400, 'all_after_first': true, 'offset': 100});
		$('#how .arrow').fStepwise({'app_delay': 0, 'el_delay': 400, 'animation_speed': 600, 'all_after_first': true, 'offset': 100});
		$('#clients [class*="logo"]').fStepwise({'app_delay': 0, 'el_delay': 100, 'animation_speed': 300, 'all_after_first': true, 'offset': 100});
		$('#bottom_form ul li[class*="item"]').fStepwise({'app_delay': 0, 'el_delay': 200, 'animation_speed': 400, 'all_after_first': true, 'offset': 100});
	}
	
});