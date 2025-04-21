// app.js
import express from 'express';
import sequelize from './config/database.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.redirect('/products'));

app.use('/products', productRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Server is running on port 3000'));
});
