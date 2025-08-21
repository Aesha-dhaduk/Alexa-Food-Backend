const express = require("express")
const { default: mongoose } = require("mongoose")
const UserRoutes = require('./routes/user')
require('dotenv').config()





const app = express()
app.use(express.json())


app.use('/user', UserRoutes)
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
    console.log("DB CONNECTED SUCCESSFULLY");
}).catch((err) => {
    console.log(err);
})




app.listen(process.env.PORT, () => {
    console.log("surver is running");
})