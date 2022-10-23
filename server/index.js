const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const  router  = require('./routes/UserRoute');
const cookieParser = require('cookie-parser')
require('dotenv').config()


const PORT = process.env.PORT || 5000

app.use(cookieParser())
app.use(express.json())
app.use(cors({credentials: true, origin:"http://localhost:3000"}));
app.use("/api", router);

mongoose.connect(process.env.MONGO_URI,
     { useNewUrlParser: true,
       useUnifiedTopology: true },
       () => {console.log('server demarer')}
       );


app.listen(PORT , () => {console.log(`server demarer sur http://localhost:${PORT}`)})
