export function renderLogin() {
    // clear main HTML
    const main = document.getElementById('main')
    main.innerHTML = ""

    const results = document.getElementById('results')
    results.innerHTML = ""

    const formContainer = document.createElement('div')
    formContainer.innerHTML = `
        <form id="login-form">
                <fieldset>
                    <label for="">Email: </label><br>
                    <input type="text" name="email">
                </fieldset>
                <fieldset>
                    <label for="">Password: </label><br>
                    <input type="password" name="password">
                </fieldset>
                <button>Login</button>
    `
    main.appendChild(formContainer)
    


let form = document.getElementById('login-form')
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form)

        // needs to be coded later but will do just for now
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        axios.post('/api/session/login', data)
        .then((response) => {
            window.location = '/';
        })
        .catch(err => {
            console.log(err);
            console.log(err.response.data)
            console.log('error');
        })
    })

}