const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const URL = 'https://reqres.in/api/users';

app.get('/api/users',async (req,res) =>{
    try {
            const response = await axios.get(URL)
            const users = response.data.data;
            res.status(200).json(users);
    } catch (error) {
        console.log("Error:", error);
        res.sendStatus(500).json({ message: 'Server Error'});
        
    }
});

app.get('/api/users/:id', async (req, res) => {
    const UserId = parseInt(req.params.id);
    try {
      const response = await axios.get(`https://reqres.in/api/users/${UserId}`);
      const user = response.data.data;
      
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user details:', error.message);
      res.status(404).json({ message: 'User not found' });
    }
  });

app.post('/api/users', async (req, res) => {
    try {
      const addUser = req.body;
      const response = await axios.post(URL,addUser);
      const createdUser = response.data;
      res.status(200).json(createdUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


  app.delete('/api/users/:id', async (req, res) => {
    const userId = parseInt(req.params.id);

    try {
        const Response = await axios.delete(`https://reqres.in/api/users/${userId}`);
        res.status(200).json({ message: 'The user has been removed', id: userId });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message:"Error"})
    }
});
  









app.listen(port, ()=>console.log(`Listening on ${port}`));