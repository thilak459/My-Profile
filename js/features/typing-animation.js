const roles = ["Full-Stack developer", "MERN enthusiast", "Competitive Programmer"];
let i = 0;
let j = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
    const element = document.getElementById("typing-text");

    if (!element) return;

    if (!isDeleting) {
        currentText = roles[i].slice(0, j++);
    } else {
        currentText = roles[i].slice(0, j--);
    }

    element.textContent = currentText;

    let speed = isDeleting ? 80 : 120;

    if (!isDeleting && j === roles[i].length + 1) {
        speed = 1000;
        isDeleting = true;
    }

    if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % roles.length;
    }

    setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", typeEffect);