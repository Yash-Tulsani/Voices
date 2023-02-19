require("dotenv").config();
const express=require('express')
const router=require('./routes')
const database=require('./database')
const cors=require('cors');

const corsOptions={
    credentials: true, 
    origin:["http://localhost:3000"]
}

const app=express()
const PORT=process.env.PORT || 5500

app.use(express.json())
app.use(express.urlencoded())
app.use(cors(corsOptions))
app.use(router);


app.get('/',(req,res)=>{
    res.send("welcome")
})

app.listen(PORT,(err)=>{
    console.log(`Server running on port ${PORT}`)
})