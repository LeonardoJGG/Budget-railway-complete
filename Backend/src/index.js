import { config } from 'dotenv'
import app from './api/api.js';
import { sequelize } from './db/db.js';


async function main() {

    config();
    const PORT = process.env.PORT;

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync()

        app.listen(PORT);
        console.log(`Server is listening on port ${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}

main();