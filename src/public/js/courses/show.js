document.addEventListener("DOMContentLoaded", function () {
    // Handle event user click btn more at wrapper-item-lesson
    $(".btn-more").on("click", function () {
        $(this).children(".icon-more").toggleClass("d-none");
        $(this).children(".icon-less").toggleClass("d-none");

        const idCollapseLessons = $(this).data("target");
        $(idCollapseLessons).toggleClass("d-none")
    })

    // Handle event click btn 
    $("#expand-all-btn").on("click", function () {
        const lessonItems = $(this).data("target");
        const isExpandHide = $(this).children(".expand").hasClass("d-none");

        $(lessonItems).toggleClass("d-none", isExpandHide);
        $(".btn-more").children(".icon-more").toggleClass("d-none", !isExpandHide);
        $(".btn-more").children(".icon-less").toggleClass("d-none", isExpandHide);
        $(this).children(".expand").toggleClass("d-none");
        $(this).children(".shrink").toggleClass("d-none");
    })

    // Handle event click preview course
    $(".preview-course").on("click", function () {
        $("#modal-video-intro").addClass("d-flex");
    })

    const redirectLearning = function () {
        const propPaths = window.location.pathname.split("/");
        const slug = propPaths[propPaths.length - 1];
        window.location.href = `/courses/learning/${slug}`;
    }

    // Handle event click register course
    $("#register-course").on("click", function () {
        // Require user login to register course
        if ($("#login-btn").length) {
            $("#modal-login").modal("show");
            return;
        }

        redirectLearning();
    })

    window.addEventListener('message', (event) => {
        if (event.data.type === 'login-success' || event.data.type === 'register-success') {
            redirectLearning();
        }
    });

})