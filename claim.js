let selectedCurrency = '';
let timerInterval;

function selectClaimCurrency(currency) {
    selectedCurrency = currency;
    const modal = document.getElementById('claim-form-modal');
    const gameName = document.getElementById('game-name');
    gameName.textContent = currency;
    modal.style.display = 'flex';

    // Update the agreement name when user types their name
    const fullnameInput = document.getElementById('fullname');
    const agreementName = document.getElementById('agreement-name');
    fullnameInput.addEventListener('input', (e) => {
        agreementName.textContent = e.target.value;
    });
}

function submitClaimForm(event) {
    event.preventDefault();
    const claimModal = document.getElementById('claim-form-modal');
    const verificationModal = document.getElementById('verification-modal');
    claimModal.style.display = 'none';
    verificationModal.style.display = 'flex';
    startVerificationTimer();
}

function startVerificationTimer() {
    let timeLeft = 300; // 5 minutes in seconds
    const timerElement = document.getElementById('timer');
    const progressBar = document.getElementById('timer-progress');
    
    // Add keyboard listener for developer shortcut
    document.addEventListener('keydown', handleKeyPress);

    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Update progress bar
        const progress = ((300 - timeLeft) / 300) * 100;
        progressBar.style.width = `${progress}%`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showSuccessMessage();
        }
    }, 1000);
}

function handleKeyPress(event) {
    if (event.key === 'p' || event.key === 'P') {
        clearInterval(timerInterval);
        showSuccessMessage();
    }
}

function showSuccessMessage() {
    const verificationModal = document.getElementById('verification-modal');
    const successModal = document.getElementById('success-modal');
    const successText = document.getElementById('success-text');
    
    verificationModal.style.display = 'none';
    successText.textContent = `Your ${selectedCurrency} is being generated, please check your email for more instructions.`;
    successModal.style.display = 'flex';
}

function returnHome() {
    window.location.href = 'index.html';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
} 