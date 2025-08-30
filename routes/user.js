const express = require('express')
const { adduser, alluser, singleuser, updateuser, deleteuser, login } = require('../controllers/user')
const { auth } = require('../middleware/user')
//sdsdsd
//sdsdsd
const route = express.Router()


route.post('/register' ,auth, adduser)
route.post('/login' , login)


route.get('/' ,alluser)
route.get('/:id',singleuser)
route.put('/:id',updateuser)
route.delete('/:id',deleteuser)


module.exports = route