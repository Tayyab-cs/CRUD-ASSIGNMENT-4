const User = require('../database/models/userSchema');

const createUser = async (req, res) => {

    const {name, email, password} = req.body;
    const userData = new User({
        name,
        email,
        password
    });

    try {
        const savedData = await userData.save();
        res.status(200).send(savedData);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

const updateUserData = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const updatedUserData = await User.findByIdAndUpdate({_id: id}, updatedData, options);

        console.log(updatedUserData);
        
        res.send(updatedUserData);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
    
}

module.exports = {
    createUser,
    updateUserData
}

