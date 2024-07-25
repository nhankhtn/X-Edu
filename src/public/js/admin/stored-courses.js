import createTippy from "../components/tippy.js";

document.addEventListener("DOMContentLoaded", function () {
    var courseId;
    const deleteForm = document.forms["delete-item-form"];

    $("#delete-item-modal").on("show.bs.modal", function (event) {
        var button = $(event.relatedTarget);
        courseId = button.data("id");

        $(this).find(".modal-body").text(`Are you sure you want to delete course ${courseId}?`)
        $(this).find("#btn-delete-item").click(function () {
            deleteForm.action = `/courses/${courseId}?_method=DELETE`;
            deleteForm.submit();
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    var checkboxAll = $("#checkbox-all");
    var courseItemCheckbox = $('input[name="courseIds[]"]');
    var checkAllSubmitBtn = $(".btn-check-all-submit");
    var containerForm = $('form[name="container-form"]');

    checkboxAll.change(function () {
        var isCheckedAll = $(this).prop("checked");
        courseItemCheckbox.prop("checked", isCheckedAll);
        renderCheckAllSubmitBtn();
    });
    courseItemCheckbox.change(function () {
        var isCheckedAll = courseItemCheckbox.length === $('input[name="courseIds[]"]:checked').length;
        checkboxAll.prop("checked", isCheckedAll); renderCheckAllSubmitBtn();
    });
    function renderCheckAllSubmitBtn() {
        var checkedCount = $('input[name="courseIds[]"]:checked').length;
        checkAllSubmitBtn.attr("disabled", checkedCount == 0);
    }
});
document.addEventListener("DOMContentLoaded", createTippy(
    ".more-icon",
    [
        {
            class: "rename-btn",
            fieldName: "name",
            title: "Rename",
            modal: "#edit-modal"
        },
        {
            class: "edit-description-btn",
            fieldName: "description",
            title: "Edit description",
            modal: "#edit-modal"
        },
        {
            class: "change-price-btn",
            fieldName: "price",
            title: "Change price",
            modal: "#edit-modal"
        },
        {
            class: "delete-btn",
            title: "Delete",
            modal: "#delete-item-modal"
        },
    ]
))
document.addEventListener("DOMContentLoaded", function () {
    $("#edit-modal").on("show.bs.modal", function (e) {
        const idCourse = $(e.relatedTarget).data("id")
        const clickedBtn = $(e.relatedTarget).data("name")
        const editForm = document.forms["edit-item-form"];

        $(this).find(".modal-title").text($(e.relatedTarget).text())
        $(this).find("#btn-confirm-edit").click(function (e) {
            editForm.action = `/courses/${idCourse}/edit/${clickedBtn}?_method=PATCH`
            editForm.submit();
        })

    })
})
// Add course
document.addEventListener("DOMContentLoaded", function () {
    const targetValues = [];

    // Handle event add target
    $("#btn-add-target").on("click", function () {
        const inputTargetValue = $("#target").val().trim();
        const li = document.createElement("li");
        const btnDelete = `<button type="button" class="ml-2 btn-delete-target" data-id=${targetValues.length}>
                    <i class="bi bi-x-lg"></i>
                </button>   
            `
        if (!inputTargetValue) return;

        li.innerHTML = `${inputTargetValue} ${btnDelete}`;
        $("#targets-course").append(li);
        $("#target").val("");
        targetValues.push(inputTargetValue);
    })

    // Handle event delete target 
    $("#targets-course").on("click", ".btn-delete-target", function () {
        const indexDeleted = $(this).data("id");
        targetValues.splice(indexDeleted, 1);
        $(this).closest("li").remove();
        $("#targets-course .btn-delete-target").each(function (index) {
            $(this).data("id", index);
        });
    });

    // Validate value price 
    const patternValidate = /^\d+$/;
    $("#price").on("input", function () {
        if (!$(this).val() || patternValidate.test($(this).val())) {
            $(".warning-price").text("");
        }
        else {
            $(".warning-price").text("Invalid, you must enter a number!");
        }
    })

    $("#category").on("change", function () {
        if ($("#category").val() === 'Pro') {
            $(".form-price").removeClass("d-none");
        } else {
            $(".form-price").addClass("d-none");
        }
    })

    // Handle event submit form 
    $("form").on("submit", function () {
        $("#targets-input").val(JSON.stringify(targetValues));
        $("#category-input").val($("#category").val());
    })
})