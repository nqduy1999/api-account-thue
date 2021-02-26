const User = require('../models/user_model');
const UserController = {
    register: async(req, res) => {
        try {
            const {email, password, name} = req.body;
            console.log({email, password, name});
            res.json({
                msg:"Register Test"
            })
        } catch (error) {
            
        }
    }
}
module.exports = UserController