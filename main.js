fetch('./components/Input.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('input-container').innerHTML = data;

        const inputField = document.querySelector('.inputField');
        const errorMessage = document.querySelector('.inputHeaderError');
        inputField.addEventListener('keydown', () => {
            inputField.classList.remove('error');
            errorMessage.classList.remove('error');
        })

        const emailSuccess = document.getElementById('cardSuccessContentTextEmail');
        const card = document.getElementById('card');
        const cardSuccess = document.getElementById('cardSuccess');
        const buttonSubmit = document.getElementById('cardContentFormButton');
        buttonSubmit.addEventListener('click', () => {
            const email = inputField.value;
            const isValid = isValidEmail(email);
            if (isValid) {
                emailSuccess.innerHTML = email;
                card.classList.remove('active');
                cardSuccess.classList.add('active');
            } else {
                inputField.classList.add('error');
                errorMessage.classList.add('error');
            }
        });

        const buttonDismiss = document.getElementById('cardSuccessButton');
        buttonDismiss.addEventListener('click', () => {
            inputField.value = '';
            card.classList.add('active');
            cardSuccess.classList.remove('active');
        });
    })
    .catch(error => console.error('Fehler beim Laden der HTML-Komponente:', error));

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}