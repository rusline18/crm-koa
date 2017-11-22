$(document).ready(function(){
	$('.modal').modal();
	$('#datetime_control-zakaz').flatpickr({
		enableTime: true,
		local: 'ru',
		minDate: 'today',
		time_24hr: true,
	});
	$('select').material_select();
	$('.chips').material_chip();
	$('.chips-autocomplete').material_chip({
		autocompleteOptions: {
			data: {
				'Созвониться': null,
				'Оплачено': null,
				'Проблемный клиент': null,
			},
			limit: Infinity,
			minLength: 5
		}
	});
});