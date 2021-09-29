const message = document.getElementById('confirm-message');
const form = document.getElementById('create-form')

async function newQuestionHandler(event) {
    event.preventDefault();
  
    const this_true = document.querySelector('#this-input').value;
    const that_false = document.querySelector('#that-input').value;
  
    if (this_true && that_false) {
        const response = await fetch('/api/questions', {
        method: 'post',
        body: JSON.stringify({
            this_true,
            that_false
        }),
        headers: {
            'Content-Type': 'application/json'
        }
        });
    
        if (response.ok) {
            form.reset();
            confirmationMessage();
        } else {
            alert(response.statusText);
        }
    }
}

function confirmationMessage() {
    message.classList.remove("hidden");
    setTimeout(function() {
        message.classList.add("hidden")
    }, 4000)
}

// function selectThis() {
//     choiceFunction()
//     message.classList.remove("hidden");
//     selectedCard.classlist.add("selected"):
//     setTimeout(getQuestion(), 4000) 
// }

// function selectThat() {
//     choiceFunction()
//     message.classList.remove("hidden");
//     selectedCard.classlist.add("selected"):
//     setTimeout(getQuestion(), 4000) 
// }
  
form.addEventListener('submit', newQuestionHandler);
  