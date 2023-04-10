import cors from 'cors';
import express from 'express';
import userRoutes from '../routes/Users.routes.js'
import accountRoutes from '../routes/Accounts.routes.js'
import operations from '../routes/Operations.routes.js'
import transfer from '../routes/Transfers.router.js'
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin:true, 
    credentials:true
}))

// app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(transfer, operations, accountRoutes, userRoutes );
export default app;