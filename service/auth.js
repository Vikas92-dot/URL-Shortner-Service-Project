//const sessionIdToUserMap = new Map(); //it is a hashmap
const jwt = require("jsonwebtoken");
const secret = "Vikas@mathe$26";

// function setUser(id, user){
//     sessionIdToUserMap.set(id, user);
// }
// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }
function setUser(user){
    return jwt.sign({
        _id: user.id,
        email: user.email,
    }, secret);
}
function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token, secret);
    }
    catch(error){
        return null;
    }
}

module.exports ={
    setUser,
    getUser,
}