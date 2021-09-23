async function loginFormHandler(event) {
    event.preventDefault();

    // add #ID or .CLASS when they're created
    const username = document.querySelector('').value.trim();
    const password = document.querySelector('').value.trim();
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
            // right now if user exists then it will display success
            // document.location.replace('/dashboard');
            console.log('succes');
        }
    }
}

// add #ID or .CLASS when they're created for login button 
document.querySelector('').addEventListener('submit', loginFormHandler);