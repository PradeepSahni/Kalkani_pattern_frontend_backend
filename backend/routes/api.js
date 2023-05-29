const express = require('express')
const Router = express.Router()
const UserController = require('../controllers/UserController')
const initApiRoutes = (app)=>{
    Router.get('/getUsers',UserController.getUsers);
    Router.post('/updateUser',UserController.updateUser);
    Router.get('/pattern/:num',UserController.pattern)
    return app.use('/api',Router)
}

module.exports = initApiRoutes