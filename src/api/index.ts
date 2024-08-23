import express, { Request, Response, NextFunction } from 'express';
import user from './user.api';
import auth from './auth.api';
import product from './product.api';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Likolad server is active')
});

app.use('/auth', auth);
app.use('/user', user);
app.use('/product', product);

export default app;
