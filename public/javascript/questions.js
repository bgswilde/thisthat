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
  
    if (response.ok) {
        document.location.replace(`/questions/${id}`);
        console.log('next button clicked');
    } else{
        document.location.replace('/end');
    }
};

function selectThis() {
    thisCard.classList.add("selected");
    thisStat.classList.remove("hidden");
    // recordThisChoice();
    setTimeout(getQuestion(), 3000) 
    
}

function selectThat() {
    
    thatStat.classList.remove("hidden");
    thatCard.classList.add("selected");
    // recordThatChoice();
    setTimeout(getQuestion(), 3000) 
}


async function recordThisChoice(event) {
    event.preventDefault();

    let id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1 
    ]; 

    const response = await fetch(`api/questions/choice`, {
        method: 'PUT',
        body: JSON.stringify({
            question_id: id,
            // how to get user id? can't use req.session.id
            // user_id: 
            choice: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        // send over to next question
        getQuestion();
        console.log('CHOICE SELECTED');
    } else{
        document.location.reload();
    }
};

async function recordThatChoice(event) {
    event.preventDefault();

    let id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1 
    ]; 

    const response = await fetch(`api/questions/choice`, {
        method: 'PUT',
        body: JSON.stringify({
            question_id: id,
            // how to get user id? can't use req.session.id
            // user_id: 
            choice: false
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log('CHOICE SELECTED');
    } else{
        document.location.reload();
    }
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