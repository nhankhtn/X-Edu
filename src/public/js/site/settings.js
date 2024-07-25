document.addEventListener("DOMContentLoaded", function () {
    $(".btn-back").on("click", function () {
        window.location.href = "/";
    });
    $(".btn-security").on("click", function () {
        $(this).addClass("active");
        $(".btn-profile").removeClass("active");
        $(".wrapper-security").removeClass("d-none");
        $(".wrapper-profile").addClass("d-none");
    })
    $(".btn-profile").on("click", function () {
        $(this).addClass("active");
        $(".btn-security").removeClass("active");
        $(".wrapper-profile").removeClass("d-none");
        $(".wrapper-security").addClass("d-none");
    })
});