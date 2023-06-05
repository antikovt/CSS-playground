document.getElementById("container").onmousemove = e => {
    for (const card of document.getElementsByClassName("outline")) {
        const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    }
}

gallery = document.getElementById("gallery");
for (let i = 1; i < 16; i++) {
    const photo = document.createElement("img");
    photo.setAttribute("src", "Photos/photo_"+i+".jpg");
    gallery.appendChild(photo);
}

let mouseDown;
let curMouse;
let curPercent = 0;
let savedPercent = 0;
let isMouseDown = false;
const duration = gallery.getElementsByTagName("img").length*150;

document.getElementById("second_effect").onmousedown = e => {
    mouseDown = e.clientX;
    isMouseDown = true;
}

document.getElementById("second_effect").onmousemove = e => {
    if (isMouseDown === false) {
        return
    }

    curMouse = mouseDown-e.clientX;
    curPercent = savedPercent + curMouse / (window.innerWidth/200);
    if (curPercent < 0) {
        curPercent = 0;
    } else if (curPercent > 100) {
        curPercent = 100;
    }

    gallery.animate({
        transform: `translateX(${-curPercent}%)`
    }, {
        duration: duration, fill: "forwards"
    });

    for (const image of gallery.getElementsByTagName("img")) {
        image.animate({
            objectPosition: `${-curPercent+100}% 50%`,
            transform: `translateX(${curPercent-50}%)`
        }, {
            duration: duration, fill: "forwards"
        });
    }
}

document.getElementById("second_effect").onmouseup = () => {
    savedPercent = curPercent;
    isMouseDown = false;
}

const blob = document.getElementById("blob-shape");
document.getElementById("blob-container").onmousemove = e => {
    blob.animate({
        left: `${e.clientX-blob.clientWidth/2}px`,
        top: `${e.clientY-blob.clientHeight/2}px`
    }, {
        duration: 500, fill: "forwards"
    });
}