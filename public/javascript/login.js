const form1= document.querySelector('#signForm');
const form2 = document.querySelector('#logForm');

async function signUpHandler(event) {
    event.preventDefault();

    // add #ID or .CLASS when they're created
    const username = document.querySelector('#signUsername').value.trim();
    const password = document.querySelector('#exampleInputPassword1').value.trim();
    // if there is a users then do fetch call 
    if(username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        // if promise is successful then
        if(response.ok){
        
            document.location.replace('/dashboard');
            console.log('success');
        } else {
            $('.alert').remove();
            const alert = document.createElement('div')
            const alertText = document.createTextNode('OOPS! Username already taken!')
            alert.classList.add('alert', 'alert-danger')
            alert.appendChild(alertText)
            const element = document.querySelector('.sign')
            element.appendChild(alert)
            form1.reset();
        }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();

    // add #ID or .CLASS when they're created
    const username = document.querySelector('#logUsername').value.trim();
    const password = document.querySelector('#exampleInputPassword2').value.trim();
    // if there is a users then do fetch call 
    if(username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        // if promise is successful then
        if(response.ok){
            
            document.location.replace('/dashboard');
            console.log('success');
        } else {
            $('.alert').remove();
            const alert = document.createElement('div')
            const alertText = document.createTextNode('Username or Password incorrect! Please try again :)')
            alert.classList.add('alert', 'alert-danger')
            alert.appendChild(alertText)
            const element = document.querySelector('.log')
            element.appendChild(alert)
            form2.reset();
        }
    }
}

form1.addEventListener('submit', signUpHandler);
 
form2.addEventListener('submit', loginFormHandler);