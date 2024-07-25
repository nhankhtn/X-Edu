document.addEventListener('DOMContentLoaded', function () {
    var courseId;
    const deleteForm = document.forms['delete-course-form'];
    const restoreForm = document.forms['restore-course-form'];
    const btnDeleteCourse = document.getElementById('btn-delete-course');
    const btnRestore = $('.btn-restore');

    $('#delete-course-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        courseId = button.data('id');
    });

    btnDeleteCourse.onclick = function () {
        deleteForm.action = '/courses/' + courseId + '/force?_method=DELETE';
        deleteForm.submit();
    }

    btnRestore.click(function (e) {
        e.preventDefault();
        const courseId = $(this).data('id');
        restoreForm.action = '/courses/' + courseId + '/restore?_method=PATCH';
        restoreForm.submit();
    })
});