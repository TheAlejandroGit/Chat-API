const usersControllers = require('./users.controllers');

const getAllUsers = (req, res) => {
  usersControllers
    .getAllUsers()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  usersControllers
    .getUserById(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};

const registerUser = (req, res) =>{
    const {firstName, lastName, email, password, profilePicture, phone, birthday, gender, country} = req.body

    if (
        firstName &&
        lastName &&
        email &&
        password &&
        phone && 
        birthday
    ) {
        usersControllers.createUser({firstName, lastName, email, password, profilePicture, phone, birthday, gender, country})
            .then(data => {
                res.status(201).json({message: `User created succesfully`})
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }else{
        res.status(400).json({ message: 'All fields must be completed', 
        fields: {
            firstName: 'string',
            lastName: 'string',
            email: 'example@example.com',
            password:'string',
            phone: '+52 321234312',
            birthday: 'YYYY/MM/DD'

        }})
    }
}

const patchUser = (req, res) => {
    const id = req.params.id
    const {first_name, last_name, phone, profilePicture, birthday, gender, country, status} = req.body

    usersControllers.updateUser(id, {first_name, last_name, phone, profilePicture, birthday, gender, country, status})
        .then((data)=>{
            if(data){
                res.status(200).json({Message: `User with ID: ${id} has been updated succesfully`})
            }else{
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch((err)=>{
            res.status(400).json({message: err.message})
        })
    }
    
    
    const deleteUser = (req, res) =>{
        const id = req.params.id
        usersControllers.deleteUser(id)
        .then(response => {
            if(response){
                res.status(204).json()
            }else{
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err=>{
            res.status(404).json({message: err.message})
        })
}


//? My user services

const getMyUser = (req, res) => {
    const id = req.user.id
    usersControllers.getUserById(id)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json({message: err.message})
        })
}

const updateMyUser = (req, res) => {
    const id = req.user.id 
    const { firstName, lastName, phone, profilePicture, birthday, gender, country } = req.body

    usersControllers.updateUser(id, {firstName, lastName, phone, profilePicture, birthday, gender, country } )
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        res.status(400).json({message: err.message})
    })
}

const deleteMyUser = (req, res) =>{
    const id = req.user.id
    usersControllers.updateUser(id, {status: 'inactive'})
    .then((response) => {
        res.status(200).json({message: 'Your user was deleted succesfully!'})
    })
    .catch(err=>{
        res.status(400).json({message: err.message})
    })
}


module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    patchUser,
    deleteUser,
    getMyUser,
    updateMyUser,
    deleteMyUser
}