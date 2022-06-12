var toastem = (function ($) {

    function show(type, content) {
        var prefix = '';
        switch (type) {
            case 'success':
                prefix = '<i class="fa fa-check fa-lg"></i>';
                break;
            case 'danger':
                prefix = '<i class="fa fa-warning fa-lg"></i>';
                break;
            default:
                prefix = '<i class="fa fa-info-circle fa-lg"></i>';
                break;
        }
        var item = $(`<div class="notification ${type}"><div class="f-16">${prefix} ${content}</span></div>`);
        $('#toastem').append($(item));
        $(item).animate({ 'right': '12px' }, 'fast');
        setTimeout(function () {
            $(item).animate({ 'right': '-400px' }, function () {
                $(item).remove();
            });
        }, 4000);
    }

    $(document).on('click', '.notification', function () {
        $(this).fadeOut(400, function () {
            $(this).remove();
        });
    });

    return {
        show: show
    };

})(jQuery);