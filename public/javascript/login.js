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
        }
    }
}

document.querySelector('#signBtn').addEventListener('click', signUpHandler);
 
document.querySelector('#loginBtn').addEventListener('click', loginFormHandler);