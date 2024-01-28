const burger = document.querySelector(".burger_icon")
const closeX = document.querySelector(".fa-x")
const ul = document.querySelector("ul")
const container = document.querySelector(".cards")
const qna_div = document.querySelector(".qna_div")
const haha =document.querySelector("header")

        const swiper = new Swiper('.swiper', {
            direction: 'horizontal',
            autoplay: true,
            loop: true,

            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });

burger.addEventListener("click", function () {
    burger.style.display = "none";
    closeX.style.display = "block";
    ul.style.display = "flex"
})

closeX.addEventListener("click", function () {
    closeX.style.display = "none";
    burger.style.display = "flex";
    ul.style.display = "none";
})

const func = async () => {
    const response = await fetch("data.json");
    const data = await response.json();
    const courses = data.courses;
    const questions = data.questions;
    for (let i = 0; i < courses.length; i++) {
        const card =
            `
            <div class="card">
                <img src="${courses[i].photo}" alt="">
                <div class="card_details">
                    <p class="title">${courses[i].name}</p>
                    <p class="register">${courses[i].deadline}</p>
                    <p class="course_details"><i class="fa-solid fa-arrow-right"></i> კურსის დეტალები</p>
                </div>
            </div>
        `
        container.innerHTML += card
    }
    for (let i = 0; i < questions.length; i++) {
        const div =
            `
        <div class="qna">
            <div class="question_div">
                <p class="question">${questions[i].question}</p>
                <svg class="down_arrow" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#F4F4F4"><path class="arrowDown" d="M8.14644661,10.1464466 C8.34170876,9.95118446 8.65829124,9.95118446 8.85355339,10.1464466 L12.4989857,13.7981758 L16.1502401,10.1464466 C16.3455022,9.95118446 16.6620847,9.95118446 16.8573469,10.1464466 C17.052609,10.3417088 17.052609,10.6582912 16.8573469,10.8535534 L12.4989857,15.2123894 L8.14644661,10.8535534 C7.95118446,10.6582912 7.95118446,10.3417088 8.14644661,10.1464466 Z"></path></svg>
            </div>
            <p class="answer">${questions[i].answer}</p>
        </div>
        `
        qna_div.innerHTML += div
    }

    let questionsArr = document.querySelectorAll(".question_div")
    let arrowsArr = document.querySelectorAll(".down_arrow");
    let answersArr = document.querySelectorAll(".answer");
    let previousElement;

    for (let i = 0; i < questionsArr.length; i++) {
        questionsArr[i].addEventListener("click", function() {
            answersArr.forEach((answer) => {
                answer.style.display = "none"
            })
            arrowsArr.forEach((arrow) => {
                arrow.classList.remove("rotate")
            })
            if (previousElement !== answersArr[i]) {
                answersArr[i].style.display = "block";
                arrowsArr[i].classList.add("rotate");
                previousElement = answersArr[i]
            } else {
                answersArr[i].style.display = "none";
                arrowsArr[i].classList.remove("rotate");
                previousElement = undefined
            }
        })
    }
}

func();