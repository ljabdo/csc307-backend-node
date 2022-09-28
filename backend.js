const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(cors());
app.use(express.json());


//DELETE a user by given ID
app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = deleteUser(id);

    if (result === undefined || result.length == 0)
        res.status(404).send('Could not delete user');
    else {
        res.status(200).end();
    }
});

function deleteUser(id){
    return users['users_list'] = users['users_list'].filter( (user) => user['id'] !== id);
}


//POST new user to list of users
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user){
    users['users_list'].push(user);
}

//GET response to find user by name
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    //GET by name & job
    if (name != undefined && job != undefined){
        let result = findUserByNameJob(name, job);
        result = {users_list: result};
        res.send(result);
    }

    //GET by name
    else if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByNameJob = (name, job) => { 
    return users['users_list'].filter( (user) => user['name'] === name).filter((user) => user['job'] === job); 
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

//GET response to find user by id
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

//GET to return all users
app.get('/users', (req, res) => {
    res.send(users);
});

//HELPER FUNCTIONS
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});