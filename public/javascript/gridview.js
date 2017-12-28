$(document).ready(function () {
    $('.header').click(function(){
        let lineTr = $(this);
        if($(this).hasClass('expand')){
            let key = lineTr.data('key');
            $.get({
                url: '/order/'+key,
            }).done((order) => {
                lineTr.closest('table').find('.header').addClass('expand');
                lineTr.closest('table').find('.child').remove();
                lineTr.removeClass('expand').after(`<tr class="child"><td colspan="7">${order}</td></tr>`);
                setTimeout(() => {
                    lineTr.parent().find('.child').addClass('animate');
                }, 0);
            });
        }else{
            lineTr.addClass('expand').parent().find('.child').removeClass('animate');
            setTimeout(() => {
                lineTr.parent().find('.child').remove();
            }, 500);
        }
    })
})