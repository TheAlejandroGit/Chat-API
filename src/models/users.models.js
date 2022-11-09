const {DataTypes} = require('sequelize')

const db = require('../utils/database')

const Users = db.define('users', {
    id : {
        primaryKey: true, 
        type: DataTypes.UUID,
        allowNull: false
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
    }, 
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    profilePicture:{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'profile_picture',
        validate: {
            isUrl: true
        }
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    birthday:{
        type: DataTypes.STRING,
        allowNull: false
    },
    gender:{
        type: DataTypes.STRING,
    },
    country:{
        type: DataTypes.STRING,
    }
})

module.exports = Users