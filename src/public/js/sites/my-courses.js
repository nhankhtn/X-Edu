

document.addEventListener("DOMContentLoaded", async function () {
    const updateProgress = async () => {
        const res = await fetch(`/courses/progresses/${user.id}`);
        const progresses = await res.json();

        progresses.forEach(progress => {
            const cardItem = $(`.card-course-item[data-id=${progress.courseId}]`);
            const course = courses.find(course => course.slug === progress.course);
            const progressCompleted = Math.floor((progress.lessonLatest - 1) * 100 / course.numberLesson);
            const date = new Date(progress.updatedAt);

            $(cardItem).find(".progress").removeClass("d-none").children().css("width", `${progressCompleted}%`).attr("aria-valuenow", progressCompleted);
            $(cardItem).find(".last-completed").text(`Lần học gần nhất vào ${date.getMonth()}/${date.getFullYear()}`)
        })
    }
    await updateProgress();
})