const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to Database!'))
 .catch((err) => console.error('Connection error:', err));

  module.exports=mongoose;