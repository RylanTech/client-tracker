import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { db } from './models';
import { verify } from './controllers/userController';
import userRoutes from './routes/userRoutes'

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// incoming requests
const cors = require('cors');
app.use(cors());

// Routing Middleware
app.use('/api/user/', userRoutes)
app.use('/api/verify', verify);


app.use(( req: Request, res: Response, next: NextFunction ) => {
  res.status(404).send("This is not the URL you are looking for!");
})


// Syncing DB
db.sync().then(() => {
  console.info("Connected to the database!")
});


app.listen(3001);