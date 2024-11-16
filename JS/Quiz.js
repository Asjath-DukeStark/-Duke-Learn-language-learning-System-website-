// Getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".button_end .quit");
const continue_btn = info_box.querySelector(".button_end .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");



// If start Quiz Button Clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // Show the info box
}

// If Exit Button Clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // Hide the info box
}

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // Hide the info box
    quiz_box.classList.add("activeQuiz"); // Show the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let userScore = 10;
let num_ques = 10;
let final_score;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".button_end .restart");
const quit_quiz = result_box.querySelector(".button_end .quit");

restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    que_count = 0;
    que_numb = 1;
    userScore = 10;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(15);
    clearInterval(counterLine);
    startTimerLine(0);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";
}

quit_quiz.onclick = () => {
    window.location.reload();
}

// If Next button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(15);
        clearInterval(counterLine);
        startTimerLine(0);
        next_btn.style.display = "none";
        timeOff.textContent = "Time left";
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions completed");
        showResultBox();
    }
}

// Getting questions and options from array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '';
    for (let option of questions[index].options) {
        option_tag += '<div class="option">' + option + '<span></span></div>';
    }
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let CorrectAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns == CorrectAns) {
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        userScore -= 2;
        console.log(userScore);
        answer.classList.add("incorrect");
        console.log("Answer is Wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        // If answer is incorrect, then automatically select the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == CorrectAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    // Once user selected, disable all options
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function showResultBox() {
    info_box.classList.remove("activeInfo"); // Hide the info box
    quiz_box.classList.remove("activeQuiz"); // Show the quiz box
    result_box.classList.add("activeResult"); // Show the result box
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = '';
    if (userScore > 7) {
        scoreTag = '<span>and congrats!!, you got <p>' + userScore + '</p> out of <p>' + num_ques + '</p></span>';
    } else if (userScore > 5) {
        scoreTag = '<span>and nice, you got <p>' + userScore + '</p> out of <p>' + num_ques + '</p></span>';
    } else {
        scoreTag = '<span>and sorry, you got only <p>' + userScore + '</p> out of <p>' + num_ques + '</p></span>';
    }
    scoreText.innerHTML = scoreTag;
    final_score = userScore;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "time Off";

            let CorrectAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == CorrectAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}


function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ index + '</p>of<p>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}
