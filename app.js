const express = require('express');
const sequelize = require('./database');

const User = require('./models/Users');

const app = express();
app.use(express.json());

// create user

app.post('./user', async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
});

app.get('./users', async (req, res ) => {
    const users = await User.findAll();
    res.json(users);
})

// update User
app.put('./users/id', async (req, res) => {
    const [updated] = await User.update(req.body, { where: {id: req.params.id}  });
    if (updated) {
        const updatedUser = await User.findByPk(req.params.id);
        res.json(updatedUser);
    } else {
        res.status(404).json({error: 'User not Found' });
    }
});

// delete User
app.delete('/.users/id', async (req, res) => {
    const deleted = await User.destroy({ where: {id: req.params.id} });
    resizeTo.json({message: 'User deleted' });
})

// sync database and start server
sequelize.sync().then(() => {
    app.listen(3000, ()=> {
        console.log('API is Running on https://localhost/3000');
    });
});