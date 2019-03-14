$(function(){

	var current_array,
		container_number = $("#src_array"),
		center_block = $("div.center_block"),
		new_array_block = $("#new_array"),
		stop_step = null;

	/*Функция сортировки "всплытием"*/
	function bubble_sort(arr){
		var count = arr.length,
			i=0,
			j=0,
			first_item,
			second_item,
			min;


		function step(){
			if(i<count){
				i++;
				step2();
			} else {
				return 
			}
		}	

		function step2(){
			if(j<count-i){
				get_color($(arr[j]), $(arr[j+1]));									
				if(+$(arr[j]).text() < +$(arr[j+1]).text()){	
					get_animated($(arr[j+1]))					
					min = $(arr[j]).text();					
					$(arr[j]).text($(arr[j+1]).text());
					$(arr[j+1]).text(min);		
				}
				j++;
				/*Остановка цикла при нажатии кнопки"Сбросить"*/
				if (stop_step == null){
					setTimeout(step2,500);					
				}							
			} else {
				$(arr[j]).addClass('successful_number');
				/*Добавляем "всплывшее" число в регион "Отсортированный массив"*/
				add_element([$(arr[j]).text()],new_array_block);	
				j = 0;
				step();
			}
		}

		/*Анимация сдвига элемента массива*/
		function get_animated(second_item){
			second_item.animateCss('bounceIn');
		}

		/*Анимация цикла по массиву*/
		function get_color(first_item,second_item){			           
				first_item.removeClass('selected_number');         
		        second_item.toggleClass('selected_number');                
		}

		/*Запуск объекта*/
		this.run = function (){
			stop_step = null;
			/*Очистка элементов массива от прошлой анимации и задержки*/
			$(arr).removeClass('animated rollIn').css("animation-delay",'0.1s');
			step();
		}
	}		

	/*Запуск сортировки*/
	function startSort(){		
		var arr_html,
			b_sort;
		add_element(current_array,center_block);
		arr_html = center_block.find("span.array_number");

		b_sort = new bubble_sort(arr_html);
		setTimeout(b_sort.run,2000);		
	}

	/*Получения нового массива*/
	function getCollect(){
		var arr_number = rnd_collect(100, 30);
		add_element(arr_number,container_number)	
	}

	/*Добавления чисел из массива на страницу + анимация к ним*/
	function add_element(obj,target){
		var arr_number_html,animated_delay;
		for (var i = 0; i < obj.length; i++) {
				animated_delay = i / 50;
				arr_number_html = $('<span>',{
					text: obj[i],
					'data-value': obj[i],
					class: 'array_number animated rollIn',
					style: 'animation-delay:'+animated_delay+'s'		
				});		
				target.append(arr_number_html);
		}			
	}

	/*Генератор массива случайных чисел*/
	function rnd_collect(max_size,count){
		var arr = [];
		for (var i = 0; i < count; i++) {
			arr.push(Math.floor(Math.random()*max_size));
		}
		current_array = arr;
		return arr
	}

	/*Очистка всех регионов с массивами и остановка сортировки*/
	function clear_all_array(){
		$("span.array_number").remove();
		stop_step = 1;
	}

	/*Функция добавления анимации*/
	$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
	});

	/*Обработчики событий*/
	/*При загрузки страницы генерируется новый массив*/
	$(document).ready(function() {
		getCollect();
	});

	/*Кнопка "Старт"" - запуск сортировки*/
	$("#start").click(function(){
		startSort();
		$(this).attr("disabled","disabled");
	});

	/*Кнопка "Сбросить" очистить страницу и получить новый массив*/
	$("#reset").click(function(){
		clear_all_array();
		getCollect();
		$("#start").removeAttr('disabled');
	});

});	