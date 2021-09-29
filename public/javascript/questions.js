// handlebars will handle incrementing 



let startingPoint = 0;
// when startingPoint > 21, message to say you've answered everything

async function getQuestion(event) {
    event.preventDefault();

    const topQuestion = document.querySelector('.top').value().trim();
    const bottomQuestion = document.querySelector('.bottom').value().trim();

    const response = await fetch('/api/', {
        method: 'POST',
        body: JSON.stringify({
            topQuestion,
            bottomQuestion
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log('response was successful')
        // document.location.replace()
    } else{
        alert(response.statusText);
    }
}
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