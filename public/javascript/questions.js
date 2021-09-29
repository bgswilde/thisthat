const thisCard = document.getElementId('.top-card');
const thisStat = document.getElementById('this-stat');
const thatCard = document.querySelector('.bottom-card');
const thatStat = document.getElementById('that-stat');

async function getQuestion(event) {
    event.preventDefault();
    
    let id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    id++;
    console.log(id);

    const response = await fetch(`/api/questions/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
  

    if (response.ok) {
        document.location.replace(`/questions/${id}`);
        console.log('next button clicked');
        // id++;
    } else{
        // alert(response.statusText);
        // add new handle bars so it can send user saying they've answered all question
        // document.location.replace('/end');
    }
};

function selectThis() {
    
    thisStat.classList.remove("hidden");
    thisCard.classlist.add("selected");
    recordThisChoice();
    setTimeout(getQuestion(), 4000) 
}

function selectThat() {
    
    thatStat.classList.remove("hidden");
    thatCard.classlist.add("selected");
    recordThatChoice();
    setTimeout(getQuestion(), 4000) 
}


document.querySelector('.next-question').addEventListener('click', getQuestion);
thisCard.addEventListener('click', selectThis);
thatCard.addEventListener('click', selectThat);
/* 

----initial-----


fetch find one question i
index value ++

 
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