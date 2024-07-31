import createTippy from "../components/tippy.js";

// Handle event delete lesson 
document.addEventListener("DOMContentLoaded", function () {
    var lessonId;
    const deleteForm = document.forms["delete-item-form"];

    $("#delete-item-modal").on("show.bs.modal", function (event) {
        var button = $(event.relatedTarget);
        lessonId = button.data("id");

        $(this).find(".modal-body").text(`Are you sure you want to delete lesson ${lessonId}?`)
        $(this).find("#btn-delete-item").click(function () {
            deleteForm.action = `/courses/${courseId}/section/${sectionId}/lesson/${lessonId}?_method=DELETE`;
            deleteForm.submit();
        });
    });
});
// Handle event back of user 
document.addEventListener("DOMContentLoaded", function () {
    $(".btn-back").click(function () {
        const propPath = window.location.pathname.split("/").slice(0, 3).join("/");
        window.location.href = propPath + "/sections";
    });
});
document.addEventListener("DOMContentLoaded", createTippy(
    ".more-icon",
    [
        {
            class: "edit-title-btn",
            fieldName: "title",
            title: "Edit title",
            modal: "#edit-modal"
        },
        {
            class: "edit-url-btn",
            fieldName: "url",
            title: "Edit video",
            modal: "#edit-modal"
        },
        {
            class: "delete-btn",
            title: "Delete",
            modal: "#delete-item-modal"
        }
    ]
))
// Show tippy when hover in more icon 
document.addEventListener("DOMContentLoaded", function () {
    $("#edit-modal").on("show.bs.modal", function (e) {
        const lessonId = $(e.relatedTarget).data("id")
        const fieldEdit = $(e.relatedTarget).data("name");
        const editForm = document.forms["edit-item-form"];

        $(this).find(".modal-title").text($(e.relatedTarget).text())

        if (fieldEdit === "title") {
            $(editForm).append(`<input type='text' class='form-control' id='title' name="title"/>`)
        } else {
            $(editForm).append(`<input
                            type='file'
                            class='form-control'
                            id='video'
                            name='video'
                            accept='video/*'
                        />
                `)
            $(editForm).attr("enctype", "multipart/form-data")
        }
        $(this).find("#btn-confirm-edit").click(function (e) {
            editForm.action = `/courses/${course.slug}/section/${sectionId}/lesson/${lessonId}/edit/${fieldEdit}?_method=PATCH`
            editForm.submit();
        })
    }).on("hidden.bs.modal", function (e) {
        const editForm = document.forms["edit-item-form"];
        $(editForm).empty();
    })
})  