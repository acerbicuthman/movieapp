const header = document.querySelector("header");
const menus = document.querySelector(".menus");
const sliders = document.querySelectorAll(".slide");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const sliderContents = document.querySelectorAll(".slide-content"); // Define Slidercontent

window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 20){
        menus.classList.add("sticky")
    }else{
        menus.classList.remove("sticky")
    }

})

let activeSlide = 0;

// Set the background image of the header
function setBgBody() {
    const bgImage = getComputedStyle(sliders[activeSlide]).backgroundImage;
    header.style.backgroundImage = bgImage;
}

// Set the active slide class
function setActiveSlide() {
    sliders.forEach((slide) => slide.classList.remove("active"));
    sliders[activeSlide].classList.add("active");
}

// Set the active content class
function setContent() {
    sliderContents.forEach((content) => content.classList.remove("active"));
    sliderContents[activeSlide].classList.add("active");
}

// Move to the next slide
function nextSlide() {
    activeSlide = (activeSlide + 1) % sliders.length; // Loop back to the start
    updateSlider();
}

// Move to the previous slide
function previousSlide() {
    activeSlide = (activeSlide - 1 + sliders.length) % sliders.length; // Loop back to the end
    updateSlider();
}

// Update the slider (background, active slide, and content)
function updateSlider() {
    setBgBody();
    setActiveSlide();
    setContent();
}

// Set initial background, active slide, and content
updateSlider();

// Add event listeners for buttons
rightButton.addEventListener("click",()=> {
    nextSlide();
    updateSlider()
});
leftButton.addEventListener("click",()=> {
    previousSlide();
    updateSlider()
    });

// Auto-slide every 7 seconds
setInterval(nextSlide, 7000);
