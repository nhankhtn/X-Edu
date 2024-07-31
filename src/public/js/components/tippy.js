export default function createTippy(selectorTarget, content = []) {
    const render = function (attrs) {
        const popper = document.createElement('div');
        popper.classList.add('popper');
        const menuItems = attrs.props.content;

        for (let i = 0; i < menuItems.length; i++) {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item', 'd-flex', 'align-items-center', 'justify-content-center');
            menuItem.innerHTML = `
                    <button  
                        class='btn w-100 h-100 ${menuItems[i].class}'
                        data-toggle='modal'
                        data-id='${attrs.dataId}'
                        data-target='${menuItems[i]?.modal}'
                        data-name='${menuItems[i]?.fieldName}'
                    >
                        ${menuItems[i].title}
                    </button>
                `
            popper.appendChild(menuItem);
        }


        return { popper };
    }

    $(selectorTarget).each(function () {
        tippy(this, {
            appendTo: 'parent',
            content,
            interactive: true,
            offset: [-110, -30],
            placement: "bottom",
            render: (instance) => {
                return render({
                    ...instance,
                    dataId: $(this).data("id")
                })
            },
            trigger: "click",
            onShow(instance) {
                instance.popper.addEventListener("click", function (e) {
                    instance.hide();
                })
            }
        })
    })
}


