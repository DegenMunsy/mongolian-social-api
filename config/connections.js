const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/Mongolian-social-api',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

  module.exports = mongoose.connections