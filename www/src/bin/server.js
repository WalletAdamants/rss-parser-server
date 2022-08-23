const { app } = require('../app');
const { PORT = 4000 } = require('../config/config');
const { connectDatabase } = require('../config/db.connect');

const start = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (e) {
    console.log('Failed to start application with error: ', e.message);
    process.exit(1);
  }
};

start();
