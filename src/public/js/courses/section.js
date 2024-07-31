import createTippy from "../components/tippy.js";

document.addEventListener("DOMContentLoaded", function () {
    var sectionId;
    const deleteForm = document.forms["delete-item-form"];

    $("#delete-item-modal").on("show.bs.modal", function (event) {
        var button = $(event.relatedTarget);
        sectionId = button.data("id");

        $(this).find(".modal-body").text(`Are you sure you want to delete section ${sectionId}?`)
        $(this).find("#btn-delete-item").click(function () {
            deleteForm.action = `/courses/${course.slug}/section/${sectionId}?_method=DELETE`;
            deleteForm.submit();
        });
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
            class: "delete-btn",
            title: "Delete",
            modal: "#delete-item-modal"
        }
    ]
))
document.addEventListener("DOMContentLoaded", function () {
    $("form[name='edit-item-form']").append(`<input type='text' class='form-control' id='title' name="title"/>`);

    $("#edit-modal").on("show.bs.modal", function (e) {
        const idSection = $(e.relatedTarget).data("id")
        const editForm = document.forms["edit-item-form"];

        $(this).find(".modal-title").text($(e.relatedTarget).text())

        $(this).find("#btn-confirm-edit").click(function (e) {
            editForm.action = `/courses/${course.slug}/section/${idSection}/edit?_method=PATCH`
            editForm.submit();
        })

    })
})  