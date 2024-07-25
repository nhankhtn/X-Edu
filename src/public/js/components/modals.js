// Handle event of modal - video - intro 
document.addEventListener("DOMContentLoaded", function () {
    $('#modal-video-intro').click(function (e) {
        if
            (!$(e.target).closest('.modal-video-intro').length) {
            $(e.target).addClass("d-none").removeClass("d-flex")
        }
    });
    $('.btn-close').click(function () {
        $('#modal-video-intro').addClass("d-none").removeClass("d-flex")
    });


})

document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener('message', (event) => {
        if (event.data.type === 'register-success') {
            $('#modal-register').modal('hide');
            window.location.reload();
        }

        if (event.data.type === 'login-success') {
            $('#modal-login').modal('hide');
            window.location.reload();
        }
    });
})