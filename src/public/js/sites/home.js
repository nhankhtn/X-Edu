

document.addEventListener("DOMContentLoaded", async function () {
    $('#carouselExampleInterval').on('slide.bs.carousel', function (event) {
        // Lấy phần tử active
        var activeItem = $(event.relatedTarget);
        $('.slick-dots').children().removeClass('active');
        $('.slick-dots').children(`:nth-child(${activeItem.data('id')})`).addClass("active");
    });
    $(".slick-dots").children().on('click', function () {
        $('#carouselExampleInterval').carousel($(this).index());
    })

    const updatePopper = async () => {
        const res = await fetch(`/courses/progresses/${user.id}`);
        const progresses = await res.json();

        progresses.forEach(progress => {
            const menuItem = $(`.menu-item[data-name=${progress.course}]`);
            const course = courses.find(course => course.slug === progress.course);
            const progressCompleted = Math.floor((progress.lessonLatest - 1) * 100 / course.numberLesson);
            const date = new Date(progress.updatedAt);

            $(menuItem).find(".btn-start-learning").addClass("d-none");
            $(menuItem).find(".progress").removeClass("d-none").children().css("width", `${progressCompleted}%`).attr("aria-valuenow", progressCompleted);
            $(menuItem).find(".last-completed").text(`Lần học gần nhất vào ${date.getMonth()}/${date.getFullYear()}`)
        })
    }
    await updatePopper();

    const render = function () {
        const popper = document.querySelector(".popper-my-course");

        return { popper };
    }
    $('.btn-my-course').each(function () {
        tippy(this, {
            appendTo: 'parent',
            interactive: true,
            offset: [-120, 20],
            placement: "bottom",
            render: instance => render({
                ...instance,
                dataId: $(this).data("id")
            })
            ,
            trigger: "click",
            onShow(instance) {
                instance.popper.classList.remove("d-none");
                instance.popper.addEventListener("click", function (e) {
                    instance.hide();
                })
            }
        })
    })
})