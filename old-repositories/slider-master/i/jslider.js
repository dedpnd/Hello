;(function(){

	var jslider = {

		//Счетчик для добавления новых презентаций в основной контейнер
		count_presentation : 0,		

		//Функция для отображения предпросмотра презентаций
		img_preview : function (img_obj) {
			var slides_name = img_obj['name']; 
			var slide_path = img_obj['path'];
			var slides = img_obj['slides'];
			var target = img_obj['preview_target'];
			var slide_class = 'preview_slide';
			//Контейнер для слайдов 
			var slide_div = $('<div>',{
				class: 'img-preview'
			});
			//Иконка добавления презентации в основной контейнер
			var icon_hand = $('<i>',{
				class: 'fa fa-plus icon_slide icon_preview_add',
				click : function(){jslider.img_main(img_obj)}				
			});

			//Добавление слайдов в контейнер для слайдов
			for (var i=0; i<slides.length; i++){
				var img = $('<img>',{
					src : slide_path+slides[i],
					class : (i==0) ? slide_class+' slide_active' : slide_class,					
					name : slides_name 
				});				

				slide_div.append(img);
			}

			//Добавления иконки в контейнер для слайдов
			slide_div.append(icon_hand);			
			//Получившийся контейнер для слайдов добавляем в контейнер для предпросмотра
			$(''+target+'').append(slide_div);
			//Запускаем показ слайдов и добавляем эллементы навигации
			show_wiazard(slides_name, slide_class);
		},

		//Функция для отображения презентаций в основной контейнер
		img_main : function (img_obj) {
			//Добавляем к имени значения счетчика, чтобы создать для каждой презентации уникальный обработчик
			var slides_name = img_obj['name']+'_'+this.count_presentation; 
			var slide_path = img_obj['path'];
			var slides = img_obj['slides'];
			var target = img_obj['main_target'];	
			var slide_class = 'main_slide';		
			//Контейнер для слайдов 
			var slide_div = $('<div>',{
				class: 'img-main'
			});
			//Иконка удаления презентации
			var icon_remove = $('<i>',{
				class: 'fa fa-remove icon_slide icon_slide_remove',
				click : function(e){delete_presentation(e)}			
			});

			//Добавление слайдов в контейнер для слайдов
			for (var i=0; i<slides.length; i++){
				var img = $('<img>',{
					src : slide_path+slides[i],
					class : (i==0) ? slide_class+' slide_active' : slide_class,					
					name : slides_name 
				});				

				slide_div.append(img);
			}
			//Добавления иконки в контейнер для слайдов
			slide_div.append(icon_remove);			
			//Получившийся контейнер для слайдов добавляем в основной контейнер 
			$(''+target+'').prepend(slide_div);
			//Запускаем показ слайдов и добавляем эллементы навигации
			show_wiazard(slides_name, slide_class);

			//Увеличиваем счетчик презентаций
			this.count_presentation++;
		}

	};

	//Функция для запуска показа слайдов и добавления элементов навигации
	function show_wiazard (slides_name,slide_class){
		//Счетчик слайдов
		var i=0;
		//Псевдомассив слайдов
		var slide = $("img[name='"+slides_name+"']."+slide_class);	
		//Контейнер слайдов
		var presentation = $(slide[0]).closest('.img-main');

		//Анимация переключения слайдов 
		var switcher = function(){
			var slide_active = slide.filter(".slide_active");	

			slide_active.toggleClass('slide_active').fadeOut(500);
			$(slide[i]).toggleClass('slide_active').fadeIn(1000);
		}		

		//Автопереключение слайдов
		var autoswitcher = function(){		
			i++;

			// Если слайд последний, то начать показ с первого 
			if (slide.length == i) {
				i=0;
			}
			switcher();
		}

		//Запуск показа слайдов 
		switcher();

		//Запуск автопоказа слайдов с интервалом 4000мс
		var timer = setInterval(autoswitcher,4000);	
		//Флаг для обработчиков, чтобы таймер всегда был один
		var timer_flag = 1;
		//Флаг для обработчиков, чтобы обозначить приоритет обработчиков, в данном случае элементы навигации приоритет высший 
		var control_timer_flag = 0;

		//При входе курсора мышки в контейнер презентации останавливать автопереключение слайдов, при выходе запускать автопереключение, необходим приоритет control_timer_flag=0
		presentation.mouseenter(function(e){
			if (timer_flag==1 && control_timer_flag==0){
				clearInterval(timer);
				timer_flag=0;
			}  
		}).mouseleave(function(e){	
			if (timer_flag==0 && control_timer_flag==0){		
				timer=setInterval(autoswitcher,4000);
				timer_flag=1;
			} 
		});

		//Контейнер для элементов навигации
		var div_control = $('<div>',{
			class : 'control_panel'
		});

		/*
		Объект с элементами навигации:
		first : первый слайд в презентации 
		back : предыдущий слайд презентации
		pause : остановка автопереключения слайдов, control_timer_flag=1
		play : запуск автопереключения слайдов, control_timer_flag=0
		next : следующий слайд презентации 
		last : последний слайд презентации
		*/
		var control = {
			first : $('<i>',{
				class : 'fa fa-step-backward icon_slide icon_control_panel',
				name : 'first',
				click : function(e){
						i=0;
						switcher();
				}
			}),
			back : $('<i>',{
				class : 'fa fa-backward icon_slide icon_control_panel',
				name : 'back',
				click : function(e){
						i--;
						if (i<=0) {
							i=0;
						}
						switcher();
				}
			}), 
			pause : $('<i>',{
				class : 'fa fa-pause icon_slide icon_control_panel',
				name : 'pause',
				click : function(e){
						if (timer_flag==1){
							clearInterval(timer);
							timer_flag=0;
						}  
						control_timer_flag=1;
				}
			}),
			play : $('<i>',{
				class : 'fa fa-play icon_slide icon_control_panel',
				name : 'play',
				click : function(e){
						if (timer_flag==0){		
							timer=setInterval(autoswitcher,4000);
							timer_flag=1;
						} 
						control_timer_flag=0;
				}
			}),
			next : $('<i>',{
				class : 'fa fa-forward icon_slide icon_control_panel',
				name : 'next',
				click : function(e){
					i++;
					if (slide.length == i) {
						i=slide.length-1;
					}
					switcher();
				}
			}),
			last : $('<i>',{
				class : 'fa fa-step-forward icon_slide icon_control_panel',
				name : 'last',
				click: function(e){
					i=slide.length-1;
					switcher();
				}
			})
		};

		//Добавления элементов навигации в контейнер для навигации
		for (var key in control){
			div_control.append(control[key]);
		}

		//Добавление контейнера навигации в презентацию 
		presentation.append(div_control);
	}

	//Удаление презентации из основного контейнера 
	function delete_presentation(e){
		$(e.target).closest('.img-main').remove();
	}

	//Выносим объект из модуля
	window.jslider=jslider;

}());	