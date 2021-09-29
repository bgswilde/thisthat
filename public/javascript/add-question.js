const message = document.getElementById('confirm-message');
const form = document.getElementById('create-form')

async function newQuestionHandler(event) {
    event.preventDefault();
  
    const this_true = document.querySelector('input[name="this-text"]').value;
    const that_false = document.querySelector('input[name="that-text"]').value;
  
    const response = await fetch(`/api/questions`, {
      method: 'POST',
      body: JSON.stringify({
        this_true,
        that_false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/create-thisthat');
      confirmationMessage();
    } else {
      alert(response.statusText);
    }
}

function confirmationMessage() {
    form.reset
    message.classList.remove("hidden");
    setTimeout(function() {
        message.classList.add("hidden")
    }, 6000)
}

  
form.addEventListener('submit', newQuestionHandler);
  