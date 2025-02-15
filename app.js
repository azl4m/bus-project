const express = require("express")
const app = express()
const env = require('dotenv').config()
const path = require("path")
const userRoute = require('./routes/userRoutes')
const adminRoutes = require("./routes/adminRoutes")
const nocache = require("nocache")
const db = require('./config/db')

db()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(nocache())

app.set("view engine","ejs")
app.set("views",[path.join(__dirname,"views/user"),path.join(__dirname,"views/admin")])
app.use(express.static(path.join(__dirname,"public")))

const port = process.env.PORT

app.listen(port,()=> console.log("server running "+port))

app.use('/',userRoute)
app.use('/admin'
,adminRoutes)




