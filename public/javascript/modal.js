$(document).ready(function(){
	$('.modal').modal();
	$('#datetime_control-zakaz').flatpickr({
		enableTime: true,
		local: 'ru',
		minDate: 'today',
		time_24hr: true,
	});
	$('select').material_select();
    $('.chips-autocomplete').material_chip({
        autocompleteOptions: {
        	data: {
                'Созвониться': null,
                'Крупный заказ': null,
                'Оплачено': null
			},
            limit: Infinity,
            minLength: 5
        }
    });
});