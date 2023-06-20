import createServer from "./utils/server"
import { connectDB } from './config/db';
const PORT = process.env.PORT || 3000;

// connect to the database
connectDB();

// create the Express app
const app = createServer()

// start the server
app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
});