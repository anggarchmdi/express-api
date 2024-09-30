const express = require('express');
const sequelize = require('./database');
const User = require('./models/Users');

const app = express();
app.use(express.json());

// Rute untuk root
app.get('/', (req, res) => {
    res.send('API is running!');
});

// Rute untuk membuat user
app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rute untuk mendapatkan semua users
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rute untuk mengupdate user
app.put('/users/:id', async (req, res) => {
    try {
        const [updated] = await User.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rute untuk menghapus user
app.delete('/users/:id', async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Sync database and start server
sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('API is running on https://localhost:3000');
    });
});
