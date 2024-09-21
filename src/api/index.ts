import express, { Request, Response, NextFunction } from 'express';
import user from './user.api';
import auth from './auth.api';
import product from './product.api';
import category from './category.api';
import testimonial from './testimonial.api';
import order from './order.api';
import contact from './contact.api';
import statics from './statics.api';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Likolad server is active')
});

app.use('/auth', auth);
app.use('/user', user);
app.use('/product', product);
app.use('/category', category);
app.use('/testimonial', testimonial);
app.use('/order', order);
app.use('/contact', contact);
app.use('/statics', statics);

export default app;
