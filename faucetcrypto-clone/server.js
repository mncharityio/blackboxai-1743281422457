const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user data
const users = {
    'user1': { balance: { btc: 0, eth: 0, trx: 0 } },
    'user2': { balance: { btc: 0, eth: 0, trx: 0 } }
};

// Mock faucet endpoint
app.post('/api/claim', (req, res) => {
    const { username, currency } = req.body;
    
    if (!users[username]) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Simulate faucet claim
    const rewards = {
        btc: 50,
        eth: 0.00001,
        trx: 0.1
    };

    users[username].balance[currency] += rewards[currency];
    
    res.json({ 
        success: true,
        reward: rewards[currency],
        newBalance: users[username].balance[currency]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;