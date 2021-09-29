// handlebars will handle incrementing 
let id = 1;
// when startingPoint > 21, message to say you've answered everything

async function beginQuestion(event) {
    event.preventDefault();
    
    const beginQuestion = document.querySelector('#begin');
     
    const response = await fetch(`/api/questions/1`, {
        
    })
    if (response.ok) {
        console.log('BEGIN button clicked')
        document.location.replace('/questions')
    } else{
        alert(response.statusText);
    }
}

async function getQuestion(event) {
    event.preventDefault();

    const nextQuestion = document.querySelector('.next-question');
    // const topQuestion = document.querySelector('.top').value().trim();
    // const bottomQuestion = document.querySelector('.bottom').value().trim();

    const response = await fetch(`/api/questions/${id}`, {
        // method: 'GET',
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    });
  

    if (response.ok) {
        console.log('next button clicked')
        
    } else{
        alert(response.statusText);
    }
    id++;
}
// document.querySelector('.next-question').addEventListener('click', getQuestion);
// document.querySelector('#begin').addEventListener('click', beginQuestion);
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