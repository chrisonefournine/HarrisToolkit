// import { QuestionCategories } from "questionCategories.js";

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const questionaire = document.getElementById('questionaire');

let currentQuestion = {};
let acceptingAnswers = false;
let rockwoodScore = 0;
let categoryCounter = 0;
let availableQuestions = [];
let progressCounter = 0;
let planActions = [];
let action1;
let action2;

// const categories = new QuestionCategories;

// fetch questions and the start questionaire.
let questions = [];
fetch("./js/questions.json")
    .then( res => {
        return res.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions;
        startQuestionaire();
    })
    .catch(err => {
        console.error(err);
    });

// Constants
const ANSWER_PROGRESSION = 3.3;
const MAX_QUESTIONS = 29

startQuestionaire = () => {
    questionCounter = 0;
    progressCounter = 0;
    planActions = [];
    availableQuestions = [... questions];
    getNewQuestion();
    questionaire.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('listOfActions', JSON.stringify(planActions));
        console.log(planActions);

        // go to actions page
        return window.location.assign("./plan.html");
    }
    
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / (MAX_QUESTIONS+1)) * 100}%`;

    // Get a question from the avaliable questions at random
    // const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    // Get the first question from the array
    const questionIndex = [0];
    currentQuestion = availableQuestions[questionIndex];
    
    // Populate the question text with the text of the currentQuestion
    question.innerText = currentQuestion.question;

    //capture the actions
    action1 = currentQuestion.action1;
    action2 = currentQuestion.action2;

    // get the number property from the data set and map using the choice property and number
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

            // push action to an array "planActions" if its not empty or undefined
            if (selectedAnswer === '1' && action2 !== undefined || null) {
                planActions.push(action1)
            } else if (selectedAnswer === '2' && action2 !== undefined || null) {
                planActions.push(action2);
            }
            console.log(planActions)

            selectedChoice.parentElement.classList.add("selected");

            setTimeout(() => {
            selectedChoice.parentElement.classList.remove("selected");
            getNewQuestion();
            }, 1000);

        });
});
