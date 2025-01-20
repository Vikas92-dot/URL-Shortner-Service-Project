const express = require('express');
const URL = require('./models/url')
const cookieParser = require('cookie-parser');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user');

const path = require('path');
const {connectToMongoDB} = require('./connect');
const {restrictToLoggedinUserOnly, checkAuth} = require('./middlewares/auth');
const app = express();
const PORT = 8002;


connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>{
    console.log("MongoDB connected..");
});

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());

app.use('/url',restrictToLoggedinUserOnly, urlRoute);
app.use('/user', userRoute);
app.use("/", checkAuth, staticRoute);

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

app.get('/url/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitHistory:{
                    timestamp: Date.now(),
                },
            }
        }
    );
    res.redirect(entry.redirectURL);
})

app.listen(PORT,(err,data)=>{
    if(err){
        console.log("Server Not Started..");
        throw err;
    }
    console.log(`Server started at PORT ${PORT}`);
})