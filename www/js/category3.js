const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let rockwoodScore = 0;
let categoryCounter = 0;
let availableQuestions = [];
let progressCounter = 0;

let questions = [
    {
        category: "Delirium",
        question: "Does the person present with an actue confusional state?", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Delirium",
        question: "Is the cause of delirium clear?", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Delirium",
        question: "Does the current confusional state impact on the persons ability to function and maintain safety at home?", 
        choice1: "Yes",
        choice2: "No",
    
        },
    ];

// Constants
const ANSWER_PROGRESSION = 33.3;
const MAX_QUESTIONS = 3;

startQuestionaireCategory = () => {
    questionCounter = 0;
    progressCounter = 0;
    availableQuestions = [... questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //localStorage.setItem('mostRecentAction', action);

        localStorage.setItem('mostRecentScore', score);

        // go to actions page
        // return window.location.assign("/plan.html");
        return("Category Complete");
    }
    
    questionCounter++;
    progressText.innerText = `Category 3/5`;
    // Update the progress bar
    progressBarFull.style.width = `Category Progress ${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // Get a question from the avaliable questions at random
    // const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    // Get the first question from the array
    const questionIndex = [0];
    currentQuestion = availableQuestions[questionIndex];
    
    // Populate the question text with the text of the currentQuestion
    question.innerText = currentQuestion.question;

    // get the number property from the data set and map suing the choice property and number
        choices.forEach(choice => {
            const number = choice.dataset["number"];
            choice.innerText = currentQuestion["choice" + number];
        });

    // remove the selected question from available questions
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
    };

    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if(!acceptingAnswers) return;

            // Accounts for a delay
            acceptingAnswers = false;
            const selectedChoice = e.target;

            // answer is the number from the dataset of the clicked choice
            const selectedAnswer =  selectedChoice.dataset["number"];
            console.log(selectedAnswer);

            selectedChoice.parentElement.classList.add("selected");

            setTimeout(() => {
            selectedChoice.parentElement.classList.remove("selected");
            getNewQuestion();
            }, 1000);

        });
});

startQuestionaireCategory();