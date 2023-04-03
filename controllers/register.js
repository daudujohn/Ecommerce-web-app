const {User} = require('../models/user');

class UserController{
    static async addUser(userInput) {
        
        const user = new User(userInput)
        await user.save()
        return user
    }
}

module.exports = UserController;