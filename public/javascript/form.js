$(document).ready(function () {
    tags = new Set();
    $('#tags').on('chip.add', function(e, chip){
        tags.add(chip.tag);
    });
    $('#tags').on('chip.delete', function(e, chip){
        tags.delete(chip.tag);
    });
	$('#form-create_zakaz').submit(function (e) {
		/** Создание формы для multipart/form-data */
		let formData = new FormData($(this)[0]);
		formData.append('tags', Array.from(tags));
		e.preventDefault();
		$.ajax({
			url: 'create-order',
			type: 'POST',
            contentType: false,
            processData: false,
			dataType: 'json',
			data: formData
		}).done((result)=> {
			if (result !== false){
                /** Если пришло true то форма в модальном окне срасывается и одальное окно закрывается*/
				this.reset();
				$('.chip').remove();
				$('#modal1').modal('close');
                switch (result.status) {
					case 0:
						result.status = 'Дизайнера';
						break;
					case 1:
						result.status = 'Мастера';
						break;
					case 2:
						result.status = 'Аутсорс';
						break;
				}
				let date = new Date(result.time);
                let month = [
                    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
				];
                let minutes = date.getMinutes();
                if(minutes < 10){
                	minutes = '0'+minutes;
				}
                result.time = `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${minutes}`;
				$('table').append(`<tr>
					<td>Новый</td>
					<td>${result.time}</td>
					<td>${result.description}</td>
					<td>${result.tags}</td>
					<td></td>
					<td>${result.juid}</td>
					<td>${result.status}</td>
				</tr>`)
			} else {
				console.log('Не сохранились данные');
			}
		}).fail((textStatus) => {
			console.error(`Произошла ошибка ${textStatus}`);
		});
	});
});