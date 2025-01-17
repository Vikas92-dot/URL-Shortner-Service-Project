const User = require("../models/user");

async function handleUserSignup(req,res){
    const {name, email, password } = req.body; //Extracts name, email, and password from the req.body (form data sent from the frontend).
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}
async function handleUserLogin(req,res){
    const {email, password } = req.body;
    const user = await User.findOne({email, password});
    if(!user){
        return res.render("login",{
            error: "Invalid Username or Password",
        })
    }
    return res.redirect("/");
}

module.exports ={
    handleUserSignup,
    handleUserLogin,
}