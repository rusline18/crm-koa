$(document).ready(function () {
	$('#form-create_zakaz').submit(function (e) {
		console.log($(this).serialize());
		/** Создание формы для multipart/form-data */
		let formData = new FormData($(this)[0]);
		e.preventDefault();
		$.ajax({
			url: 'create/order',
			type: 'POST',
            contentType: false,
            processData: false,
			dataType: 'json',
			data: formData
		}).done((result)=> {
			if (result === true){
                /** Если пришло true то форма в модальном окне срасывается и одальное окно закрывается*/
				this.reset();
				$('#modal1').modal('close');
			} else {
				console.log('Не сохранились данные');
			}
		}).fail((textStatus) => {
			console.error('Произошла ошибка '+textStatus);
		});
	});
});