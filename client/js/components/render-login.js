export function renderLogin() {
    // clear main HTML
    const main = document.getElementById('main')
    main.innerHTML = ""

    const results = document.getElementById('results')
    results.innerHTML = ""

    const formContainer = document.createElement('div')
    formContainer.innerHTML = `
<div class="container-fluid bg-dark text-white px-5 py-5">
    <div class="row">
        <div class="col-md-6 py-5 gx-5 px-5 offset-md-3">
            <h1>Welcome to GitConnect;</h1>
            <form action="/" id="login-form" method="POST">
                <div class="form-group mb-4">
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email">
                </div>             
                <div class="form-group mb-4">
                    <label for="password">Password:</label>
                    <input type="password" class="form-control" id="password" name="password" placeholder="Enter your Password">
                </div>
                <input type="submit" class="btn btn-lg btn-outline-light align-self-center" value="Submit">
            </form>
        </div>
    </div>
</div>

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