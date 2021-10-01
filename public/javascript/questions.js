const thisCard = document.getElementById('this-card');
const thisStat = document.getElementById('this-stat');
const thatCard = document.getElementById('that-card');
const thatStat = document.getElementById('that-stat');

// gets question one by one
async function getQuestion(event) {
    event.preventDefault();
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

    console.log(response);
  
    if (response.ok) {
        document.location.replace(`/questions/${id}`);
        console.log('Getting next question');
    } else{
        document.location.replace('/end');
    }
};

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
        // send over to next question
        // getQuestion(event);
        console.log('CHOICE SELECTED');
    } else{
        // setTimeout(function(){document.location.reload()}, 5000)
        // document.location.reload();

        // commented out line above because if they select the oppsite choice from their 
        // previous answer it will just keep on reloading the same question over and over
        setTimeout(function(){getQuestion(event)},5000)
    }
};

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
        console.log('CHOICE SELECTED');
    } else{
        // setTimeout(function(){document.location.reload()}, 5000)
        // document.location.reload();

        // commented out line above because if they select the oppsite choice from their 
        // previous answer it will just keep on reloading the same question over and over
        setTimeout(function(){getQuestion(event)},5000)
    }
}

function selectThis(event) {
    thisCard.classList.add("selected");
    thisStat.classList.remove("hidden");
    recordThisChoice(event);
    setTimeout(function(){getQuestion(event)},5000)
    // setTimeout(getQuestion(event), 2500) 
}

function selectThat(event) {
    thatStat.classList.remove("hidden");
    thatCard.classList.add("selected");
    recordThatChoice(event);
    setTimeout(function(){getQuestion(event)},5000)
    // setTimeout(getQuestion(event), 2500) 
}

// document.querySelector('').addEventListener('click', recordChoice);
document.querySelector('.next-question').addEventListener('click', getQuestion);
thisCard.addEventListener('click', selectThis);
thatCard.addEventListener('click', selectThat);
/*  
----next action-----

event listener for each option
when they select their option,
create the choice 
selected style gets added class="selected"
percentage stat hidden class removed, id "top-stat" or "bottom-stat"
next button hidden class removed

----final action-----

event listener on next button
when they select next
hidden classes applied again
back to initial function
*/