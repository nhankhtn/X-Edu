document.addEventListener("DOMContentLoaded", function () {
    $('#carouselExampleInterval').on('slid.bs.carousel', function (event) {
        // Lấy phần tử active
        var activeItem = $(event.relatedTarget);
        console.log('Active item:', activeItem.data('id'));
    });
})