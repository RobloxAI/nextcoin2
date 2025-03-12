let selectedCurrency = '';
const processingSteps = [
    'Initializing generation process...',
    'Connecting to secure server...',
    'Verifying request...',
    'Preparing currency package...',
    'Running security checks...',
    'Finalizing generation...'
];

function showOptions() {
    const modal = document.getElementById('options-modal');
    modal.style.display = 'flex';
}

function showHelp() {
    const modal = document.getElementById('help-modal');
    modal.style.display = 'flex';
}

function showVerification() {
    const helpModal = document.getElementById('help-modal');
    const verificationModal = document.getElementById('verification-tasks-modal');
    helpModal.style.display = 'none';
    verificationModal.style.display = 'flex';
}

function updateTaskProgress() {
    const checkboxes = document.getElementsByClassName('task-checkbox');
    const completeButton = document.getElementById('complete-tasks-button');
    let checkedCount = 0;
    
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            checkedCount++;
        }
    }
    
    completeButton.disabled = checkedCount < 2;
}

function completeVerification() {
    const verificationModal = document.getElementById('verification-tasks-modal');
    const completeModal = document.getElementById('verification-complete-modal');
    verificationModal.style.display = 'none';
    completeModal.style.display = 'flex';
}

function closeAllModals() {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        modal.style.display = 'none';
    }
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

function selectCurrency(currency) {
    selectedCurrency = currency;
    const scannerModal = document.getElementById('scanner-modal');
    scannerModal.style.display = 'flex';
    
    // Show loading container after a brief delay
    setTimeout(() => {
        const loadingContainer = scannerModal.querySelector('.loading-container');
        loadingContainer.style.display = 'block';
        
        // Animate progress bar
        const progressBar = loadingContainer.querySelector('.progress-bar-fill');
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 100);

        // Update loading text
        const loadingText = loadingContainer.querySelector('.loading-text');
        let dots = '';
        setInterval(() => {
            dots = dots.length >= 3 ? '' : dots + '.';
            loadingText.textContent = 'Initializing scanner' + dots;
        }, 500);
    }, 1000);
    
    // Add space key listener
    document.addEventListener('keydown', handleSpacePress);
}

function handleSpacePress(event) {
    if (event.code === 'Space') {
        document.removeEventListener('keydown', handleSpacePress);
        startScanning();
    }
}

function startScanning() {
    // Simulate scanning for 10 seconds with progress updates
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        const progressBar = document.querySelector('#scanner-modal .progress-bar-fill');
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                const scannerModal = document.getElementById('scanner-modal');
                const amountModal = document.getElementById('amount-modal');
                scannerModal.style.display = 'none';
                
                // Show amount modal with greeting
                const userGreeting = document.getElementById('user-greeting');
                userGreeting.textContent = `Hello Nishil Thaker! Your ${selectedCurrency} is on the way.`;
                
                // Update exchange rate randomly
                const exchangeRate = document.getElementById('exchange-rate');
                exchangeRate.textContent = (0.95 + Math.random() * 0.1).toFixed(2);
                
                amountModal.style.display = 'flex';
            }, 1000);
        }
    }, 1000);
}

function generateCurrency() {
    const amountInput = document.getElementById('currency-amount');
    const amount = parseInt(amountInput.value);
    
    if (isNaN(amount) || amount <= 0 || amount > 100000) {
        alert('Please enter a valid amount between 1 and 100,000');
        return;
    }
    
    const amountModal = document.getElementById('amount-modal');
    const processingModal = document.getElementById('processing-modal');
    amountModal.style.display = 'none';
    processingModal.style.display = 'flex';
    
    // Show processing steps
    let currentStep = 0;
    const processingStatus = document.getElementById('processing-status');
    const progressBar = document.querySelector('#processing-modal .progress-bar-fill');
    
    const processInterval = setInterval(() => {
        if (currentStep < processingSteps.length) {
            processingStatus.textContent = processingSteps[currentStep];
            progressBar.style.width = `${(currentStep + 1) * (100 / processingSteps.length)}%`;
            currentStep++;
        } else {
            clearInterval(processInterval);
            showSuccessMessage(amount);
        }
    }, 1500);
}

function showSuccessMessage(amount) {
    const processingModal = document.getElementById('processing-modal');
    const successModal = document.getElementById('success-modal');
    processingModal.style.display = 'none';
    
    // Generate random transaction ID
    const transactionId = 'TXN' + Date.now().toString(36).toUpperCase();
    document.getElementById('transaction-id').textContent = transactionId;
    
    const successMessage = document.getElementById('success-message');
    successMessage.textContent = `Your ${amount} ${selectedCurrency} will be delivered to your email, nishilthaker@gmail.com within the next 3-5 minutes.`;
    successModal.style.display = 'flex';
    
    // Reset after 5 seconds and redirect to home
    setTimeout(() => {
        successModal.style.display = 'none';
        window.location.href = 'index.html';
    }, 5000);
} 