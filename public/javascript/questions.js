const thisCard = document.getElementById('this-card');
const thisStat = document.getElementById('this-stat');
const thatCard = document.getElementById('that-card');
const thatStat = document.getElementById('that-stat');

// gets question one by one
async function getQuestion() {
    // event.preventDefault();
    // gets the last section of url, the id of the question
    let id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    id++;

    const response = await fetch(`/api/questions/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
  
    if (response.ok) {
        document.location.replace(`/questions/${id}`);
        console.log('next button clicked');
    } else{
        document.location.replace('/end');
    }
};

// records true for top option
async function recordThisChoice(event) {
    event.preventDefault();

    let id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1 
    ]; 

    const response = await fetch(`/api/questions/choice`, {
        method: 'POST',
        body: JSON.stringify({
            question_id: id,
            choice: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log('choice selected');
    } else{       
        // document.location.reload();
        console.log('question already previously answered');
    }
};

// records flase for bottom option
async function recordThatChoice(event) {
    event.preventDefault();

    let id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1 
    ]; 

    const response = await fetch(`/api/questions/choice`, {
        method: 'POST',
        body: JSON.stringify({
            question_id: id,
            choice: false
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log('choice selected');
    } else{
        // document.location.reload();
        console.log('question already previously answered');
    }
}

function selectThis(event) {
    thisCard.classList.add("selected");
    thisStat.classList.remove("hidden");
    recordThisChoice(event);
    setTimeout(function(){getQuestion()}, 2500);
}

function selectThat(event) {
    thatStat.classList.remove("hidden");
    thatCard.classList.add("selected");
    recordThatChoice(event);
    setTimeout(function(){getQuestion()}, 2500);
}

// document.querySelector('.next-question').addEventListener('click', getQuestion);
thisCard.addEventListener('click', selectThis);
thatCard.addEventListener('click', selectThat);