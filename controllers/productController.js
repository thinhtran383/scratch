
import Product from '../models/product.js';
import { Op } from 'sequelize';

export const index = async (req, res) => {
    const search = req.query.search?.trim() || '';
    let where = {};

    if (search) {
        const orClauses = [
            { name:    { [Op.iLike]: `%${search}%` } },
            { code:    { [Op.iLike]: `%${search}%` } },
            { category:{ [Op.iLike]: `%${search}%` } }
        ];
        if (!isNaN(search)) {
            orClauses.push({ quantity: parseInt(search, 10) });
        }
        where = { [Op.or]: orClauses };
    }

    const products = await Product.findAll({ where,  order: [['code', 'DESC']] });

    if (req.xhr) {
        return res.render('product/_productTable', { products });
    }

    res.render('product/index', { products, search });
};


export const create = async (req, res) => {
    const { name, code, quantity, category, price } = req.body;

    try {
        await Product.create({ name, code, quantity, category, price });
        if (req.headers['content-type'] === 'application/json') {
            return res.json({ success: true });
        }

        res.redirect('/products');
    } catch (err) {
        console.error('Error creating product:', err);
        if (req.headers['content-type'] === 'application/json') {
            return res.json({ success: false, error: err.message });
        }

        res.redirect('/products');
    }
};


export const update = async (req, res) => {
    const id = req.params.id;
    const { name, code, quantity, category, price } = req.body;

    await Product.update(
        { name, code, quantity, category, price },
        { where: { id } }
    );

    if (req.headers['content-type'] === 'application/json') {
        return res.json({ success: true });
    }

    res.redirect('/products');
};
export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    await Product.destroy({ where: { id } });
    res.redirect('/products');
};
