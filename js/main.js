var el = document.querySelector('.background-image');


var last_known_scroll_position = 0;
var ticking = false;

// how far is the center of the element from the center of the screen?
function percentFromCenter(scroll_pos, window_height, element) {
    var element_center_pos = element.offsetTop + (element.offsetHeight / 2);
    var screen_center_post = scroll_pos + (window_height / 2);
    return element_center_pos / screen_center_post;
}

function isOnscreen(scroll_pos, window_height, element) {

    // top of element is above the bottom of the screen
    topIsOnscreen = element.offsetTop < (scroll_pos + window_height);

    // bottom of element is below top of screen
    bottomIsOnscreen = (element.offsetTop + element.offsetHeight) > scroll_pos;

    if (topIsOnscreen && bottomIsOnscreen) {
        var background_offset = (50 * percentFromCenter(scroll_pos, window_height, element)) + "%"
        console.log(background_offset);
        element.style.backgroundPositionY = background_offset;
    }
}

function doSomething(scroll_pos) {
    console.log(scroll_pos, el.offsetTop);

}

window.addEventListener('scroll', function (e) {

    last_known_scroll_position = window.scrollY;
    window_height = document.documentElement.clientHeight;

    if (!ticking) {

        window.requestAnimationFrame(function () {
            isOnscreen(last_known_scroll_position, window_height, el);
            ticking = false;
        });

        ticking = true;

    }

});
