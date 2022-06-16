function renderRego() {
    // clear main HTML
    const main = document.getElementById('main')
    main.innerHTML = ""

    main.appendChild(`
        <form id="log-in-form">
                <section id="errors"></section>
                <fieldset>
                    <label for="">Email: </label><br>
                    <input type="text" name="email">
                </fieldset>
                <fieldset>
                    <label for="">Password: </label><br>
                    <input type="password" name="password">
                </fieldset>
                <button>Log in</button>
    `)
}