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
        category: "Continence",
        question: "Does the persons current continence management meet their needs?", 
        choice1: "Yes",
        choice2: "No",
    
        },

        {
        category: "Continence",
        question: "Does the current continence situation impact on the persons ability to function, maintain safety and dignity at home?", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Mobility",
        question: "Has the person has a recent change in their ability to walk or transfer?", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Mobility",
        question: "Does the current ability to walk or transfer impact on the persons abilty to function or manitain safety at home?", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Instabilty",
        question: "Does the person have a history of falls or express a fear of falling?", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Instabilty",
        question: "Does the person have any of the following? Admitted due to a fall, a history of falls in hospital or they express a fear of falling whilst an inpatient.", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Instabilty",
        question: "Does the current risk of falling impact on the persons abilty to function or maintain safety at home", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Self Care",
        question: "Has the person had a recent change in their ability to wash and dress or prepare food and drink?", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Self Care",
        question: "Does the current ability to wash and dress or prepare food and drink impact on the persons abilty to function or maintain safety at home?", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Support",
        question: "Does the person feel they have adequate support in place to meet their needs? This includes: Formal Care support, Family and informal support, Shopping services and support with domestic tasks.", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Support",
        question: "Does the current support situation impact on the persons ability to function or maintain safety at home?", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Medication",
        question: "Has the person had a recent medication review as well as having a plan at home that works to help them take their medication?", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Medication",
        question: "Is the person on five or more medications?", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Medication",
        question: "Has the person identified a difficulty with how they are ableto be concordant with their medication pescription at home? This includes: Difficulty remembering to take tablets, difficulty getting to a pharmacy and difficulty opening bottles.", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Physical Welbeing",
        question: "Does the person show signs of frailty syndromes? Including: Unintentional weight loss, increased weakness, slower walking speed, reduces levels of activity and exhaustion", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Physical Welbeing",
        question: "Does the current situation of increasing frailty impact on the persons abiltity to function or maintain safety at home?", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Psychological Welbeing",
        question: "Does the person or relative express concerns relating to the persons mental welbeing? This can include: Social isolation, depression and mental health conditions", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Psychological Welbeing",
        question: "Does the persons current mental welbeing impact on their ability to function or maintain safety at home?", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Communication and Sensory Systems",
        question: "Does the person have an impairment which impacts on their ability to see, hear or communicate thier needs?", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Communication and Sensory Systems",
        question: "Does the current sensory and communication situation impact on the persons ability to function or maintain safety at home or whilst in hospital?", 
        choice1: "Yes",
        choice2: "No",
    
        },

    {
        category: "Other",
        question: "Is the person experiencing any other issue that would impact on their ability to function or maintain safety at home? This could include: Poorly controlled pain, uncontrolled co-morbidities or environmental issues such insufficient heating or safeguarding concerns", 
        additionalInformation:"",
        choice1: "Yes",
        choice2: "No",
    
        },
    ];

// Constants
const ANSWER_PROGRESSION = 3.3;
const MAX_QUESTIONS = 29

startQuestionaire = () => {
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
        return window.location.assign("/plan.html");
    }
    
    questionCounter++;
    progressText.innerText = `Category ${questionCounter}/${MAX_QUESTIONS}`;
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

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

startQuestionaire();