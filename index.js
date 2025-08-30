const express = require("express")
const { default: mongoose } = require("mongoose")
const UserRoutes = require('./routes/user')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require("cors");


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}));//join fronted and backend
app.use(cookieParser())
// app.use(cors());

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use('/user', UserRoutes)
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
    console.log("DB CONNECTED SUCCESSFULLY");
}).catch((err) => {
    console.log(err);
})




app.listen(process.env.PORT, () => {
    console.log("surver is running");
})