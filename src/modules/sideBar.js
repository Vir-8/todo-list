export function highLightButton() {

    let buttons = document.querySelectorAll('.sideBarButton');

    buttons.forEach(button => {

        button.onclick = () => {
            buttons = document.querySelectorAll('.sideBarButton');

            buttons.forEach(button => button.classList.remove('highlight-button'));
            button.classList.add('highlight-button');
        };
    });
}