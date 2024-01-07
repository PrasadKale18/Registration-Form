
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserModel1 = require('../model/user.schema');

const generateAuthToken = (user) => {
  const expiresIn = '1h'; 

  return jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn }
  );
};

const app = {

  generateAuthToken,

  emailExists : async (email) => {
    const existingUser = await UserModel1.findOne({ email });
    return !!existingUser;
},
  save: async (username, email, password) => {
    
    const hashedPassword = await bcrypt.hash(password,10);
    return await UserModel1.create({ username, email, password: hashedPassword});
  },

  login: async (email, password) => {
    const user = await UserModel1.findOne({ email });
    
    if (!user) {
      return null; 
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = generateAuthToken(user);
      return { user, token };
  } else {
      return null;
  }
  },

  getAllCollection: async () => {
    return await UserModel1.find();
  },

  getCollection: async (id) => {
    return await UserModel1.findById(id);
  },

  updateCollection: async (id, data) => {
    return await UserModel1.findByIdAndUpdate(id, data, { new: true });
  },

  deleteCollection: async (id) => {
    return await UserModel1.findByIdAndDelete(id);
  }
};

module.exports = app;
