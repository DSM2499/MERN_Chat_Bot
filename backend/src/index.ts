import app from './app.js';
import { connectToDatabase } from './db/connection.js';


//connections and listeners
const PORT = process.env.PORT || 3000;
connectToDatabase().
    then(() => {
        app.listen(PORT, () => console.log('Server open and connected to Database: port 3000'));
    }).catch((error) => console.log(error));
