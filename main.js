initializeApp();

function initializeApp() {
    loadInputComponentAndAddEventListeners();
}

function loadInputComponentAndAddEventListeners(){
    fetch('./components/Input.html')
        .then(response => response.text())
        .then(data => {
            setUpInputContainer(data);
            addKeyDownEventListenerToInput();
            addClickEventListenerToSubmitButton();
            addClickEventListenerToDismissButton();
        })
        .catch(error => console.error('Error while fetching Input component:', error));
}

function setUpInputContainer(data) {
    document.getElementById('input-container').innerHTML = data;
}

function addKeyDownEventListenerToInput() {
    const inputField = document.querySelector('.inputField');
    inputField.addEventListener('keydown', () => {
        setHasError(false);
    })
}

function setHasError(hasError) {
    const inputField = document.querySelector('.inputField');
    const errorMessage = document.querySelector('.inputHeaderError');

    if (hasError) {
        inputField.classList.add('error');
        errorMessage.classList.add('error');
    } else {
        inputField.classList.remove('error');
        errorMessage.classList.remove('error');
    }
}

function addClickEventListenerToSubmitButton() {
    const inputField = document.querySelector('.inputField');
    const buttonSubmit = document.getElementById('cardContentFormButton');

    buttonSubmit.addEventListener('click', () => {
        const email = inputField.value;
        const hasValidEmail = isValidEmail(email);

        if (hasValidEmail) {
            handleSubmit(email);
        } else {
            setHasError(true);
        }
    });
}

function handleSubmit(email) {
    const emailSuccess = document.getElementById('cardSuccessContentTextEmail');
    const card = document.getElementById('card');
    const cardSuccess = document.getElementById('cardSuccess');

    emailSuccess.innerHTML = email;
    card.classList.remove('active');
    cardSuccess.classList.add('active');
}

function addClickEventListenerToDismissButton() {
    const buttonDismiss = document.getElementById('cardSuccessButton');

    buttonDismiss.addEventListener('click', () => {
        handleDismiss();
    });
}

function handleDismiss() {
    const inputField = document.querySelector('.inputField');
    const card = document.getElementById('card');
    const cardSuccess = document.getElementById('cardSuccess');

    inputField.value = '';
    card.classList.add('active');
    cardSuccess.classList.remove('active');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}