// handlebars will handle incrementing 
// var id = 1;
// when startingPoint > 21, message to say you've answered everything

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

// async function getQuestion(event) {
//     event.preventDefault();

//     let id = 1;

//     const response = await fetch(`/api/questions/${id}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
  

//     if (response.ok) {
//         id++;
//         document.location.replace(`/questions/${id}`);
//         console.log('next button clicked');
//         // id++;
//     } else{
//         alert(response.statusText);
//     }
// };

// document.querySelector('.second-question').addEventListener('click', secondQuestion);

document.querySelector('.next-question').addEventListener('click', getQuestion);
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