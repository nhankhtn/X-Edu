document.addEventListener('DOMContentLoaded', function () {
    self.addEventListener('activate', (event) => {
        event.waitUntil(
            self.registration.navigationPreload.enable()
        );
    });
    self.addEventListener('fetch', (event) => {
        if (event.request.mode === 'navigate') {
            event.respondWith((async () => {
                const preloadResponse = await event.preloadResponse;
                if (preloadResponse) {
                    return preloadResponse;
                }
                return fetch(event.request);
            })());
        }
    });
    // Icon up/down in sidebar 
    $(".wrapper-lessons").on("click", function () {
        $(this).find(".icon-expand").toggleClass("bi-chevron-down").toggleClass("bi-chevron-up")
    })
    // Add query into url
    // const idLesson = lessons.find(lesson => lesson.lessonNumber === progress.lessonLatest)._id;
    let idLessonCurrent = progress.lessonLatest;
    if (!window.location.href.includes("?lesson=")) {
        window.location.href = `${window.location.href}/?lesson=${idLessonCurrent}`
    } else {
        idLessonCurrent = Number.parseInt(new URLSearchParams(window.location.search).get("lesson"));
    }

    // Unlock lesson when user finish previous lesson
    $(".wrapper-lesson-items").each(function (index, element) {
        if (element.dataset.lesson <= progress.lessonLatest) {
            element.classList.remove("locked");
        }
        if (element.dataset.lesson == idLessonCurrent) {
            element.classList.add("active");
        }
    });
    if (progress.progress > 80 || progress.lessonLatest > idLessonCurrent) {
        $(".btn-next").removeClass("disabled");
        const nextLesson = progress.lessonLatest + 1;
        $(".wrapper-lesson-items[data-lesson='" + nextLesson + "']").removeClass("locked");
    }
    const handleUpdateProgress = async () => {
        try {
            await fetch(`/courses/progress/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idProgress: progress._id,
                    progress,
                }),
            });
        } catch (err) {
            console.log(err);
        }
    }
    const formatTime = (time) => {
        const h = Math.floor(time / 3600);
        const m = Math.floor((time % 3600) / 60);
        const s = Math.floor(time % 60);
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    // If user finish lesson, update progress in database - only update when user learning new lesson and finish it
    $("#video-lesson").on("timeupdate", async function (e) {
        const percent = Math.floor((e.target.currentTime / e.target.duration) * 100);
        if (percent > 80 && progress.progress < 80 && progress.lessonLatest === idLessonCurrent) {
            $(".btn-next").removeClass("disabled");
            const nextLesson = progress.lessonLatest + 1;
            $(".wrapper-lesson-items[data-lesson='" + nextLesson + "']").removeClass("locked");
            progress.progress = percent;
            await handleUpdateProgress();
        }
        // Display time at btn-add-note 
        $(".btn-add-note .time").text(formatTime(e.target.currentTime));

    })
    $(".btn-toggle-sidebar").on("click", function () {
        $("#sidebar-learning").toggleClass("show");
        const hasShow = $("#sidebar-learning").hasClass("show");
        $(this).children("i").toggleClass("bi bi-arrow-right", hasShow).toggleClass("bi bi-list", !hasShow);
    })
    $(".wrapper-lesson-items").on("click", function () {
        if ($(this).hasClass('locked') || $(this).hasClass('active')) return;

        $(".wrapper-lesson-items.active").removeClass("active");
        const lessonNumber = $(this).data("lesson");
        window.location.href = `${window.location.href.split("?")[0]}?lesson=${lessonNumber}`;
    })
    // Handle navigation between lessons of navigation button 
    if (idLessonCurrent > 1) {
        $(".btn-prev").removeClass("disabled");
    }
    $(".btn-next").on("click", async function () {
        if ($(this).hasClass("disabled")) return;
        const nextLesson = idLessonCurrent + 1;
        if (nextLesson > lessons.length) {
            handleCompleteCourse();
            if (progress.lessonLatest <= lessons.length) {
                progress.lessonLatest++;
                await handleUpdateProgress();
            }
            return;
        }
        window.location.href = `${window.location.href.split("?")[0]}?lesson=${nextLesson}`;
    })
    $(".btn-prev").on("click", function () {
        if ($(this).hasClass("disabled")) return;
        const prevLesson = idLessonCurrent - 1;
        window.location.href = `${window.location.href.split("?")[0]}?lesson=${prevLesson}`;
    })
    const handleCompleteCourse = () => {
        console.log("Complete course")
    }
    // Handle user click btn back
    $(".btn-back").on("click", function () {
        const propPaths = window.location.pathname.split("/");
        const slug = propPaths[propPaths.length - 2];
        window.location.href = `/courses/${slug}`;
    })
});