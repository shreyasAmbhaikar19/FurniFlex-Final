const app = require('./app');

require('dotenv').config({ path: './config/.env'});
const connectDatabase = require('./config/database');

const PORT = process.env.PORT || 3000;

connectDatabase();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});


