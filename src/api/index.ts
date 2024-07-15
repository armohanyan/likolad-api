import express, { Request, Response, NextFunction } from 'express';
import user from './user.api';
import auth from './auth.api';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Likolad server is active')
});

app.use('/auth', auth);
app.use('/user', user);

export default app;
