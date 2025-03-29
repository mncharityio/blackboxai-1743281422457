// Faucet claim functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize faucets
    const faucets = [
        { id: 'btc', name: 'Bitcoin', reward: 50, unit: 'satoshi' },
        { id: 'eth', name: 'Ethereum', reward: 0.00001, unit: 'ETH' },
        { id: 'trx', name: 'Tron', reward: 0.1, unit: 'TRX' }
    ];

    // Check if faucet was recently claimed
    faucets.forEach(faucet => {
        const lastClaim = localStorage.getItem(`${faucet.id}-last-claim`);
        const claimBtn = document.getElementById(`${faucet.id}-claim`);
        const timerEl = document.getElementById(`${faucet.id}-timer`);
        const timeEl = document.getElementById(`${faucet.id}-time`);

        if (lastClaim) {
            const now = new Date().getTime();
            const nextClaimTime = parseInt(lastClaim) + (5 * 60 * 1000); // 5 minutes
            
            if (now < nextClaimTime) {
                // Timer is still active
                claimBtn.disabled = true;
                claimBtn.classList.add('opacity-50', 'cursor-not-allowed');
                timerEl.classList.remove('hidden');
                startTimer(faucet.id, nextClaimTime - now);
            }
        }

        // Add click event for claim button
        claimBtn.addEventListener('click', () => {
            claimFaucet(faucet);
        });
    });

    // Function to claim faucet
    function claimFaucet(faucet) {
        const claimBtn = document.getElementById(`${faucet.id}-claim`);
        const timerEl = document.getElementById(`${faucet.id}-timer`);
        
        // Disable button and show timer
        claimBtn.disabled = true;
        claimBtn.classList.add('opacity-50', 'cursor-not-allowed');
        timerEl.classList.remove('hidden');
        
        // Store claim time
        const claimTime = new Date().getTime();
        localStorage.setItem(`${faucet.id}-last-claim`, claimTime);
        
        // Start 5 minute timer
        startTimer(faucet.id, 5 * 60 * 1000);
        
        // Show success message
        alert(`You claimed ${faucet.reward} ${faucet.unit} of ${faucet.name}!`);
    }

    // Timer function
    function startTimer(faucetId, duration) {
        const timerEl = document.getElementById(`${faucetId}-timer`);
        const timeEl = document.getElementById(`${faucetId}-time`);
        const claimBtn = document.getElementById(`${faucetId}-claim`);
        
        let timer = duration;
        const interval = setInterval(function() {
            const minutes = Math.floor(timer / 60);
            let seconds = Math.floor(timer % 60);
            
            seconds = seconds < 10 ? "0" + seconds : seconds;
            timeEl.textContent = `${minutes}:${seconds}`;
            
            if (--timer < 0) {
                clearInterval(interval);
                claimBtn.disabled = false;
                claimBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                timerEl.classList.add('hidden');
                localStorage.removeItem(`${faucetId}-last-claim`);
            }
        }, 1000);
    }
});