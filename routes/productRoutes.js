import express from 'express';
import { index, create, update, deleteProduct } from '../controllers/productController.js';
import Product from "../models/product.js";

const router = express.Router();

router.get('/', index);
router.get('/edit/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    res.render('product/edit', { product });
});
router.post('/create', create);
router.post('/update/:id', update);
router.get('/delete/:id', deleteProduct);

export default router;
