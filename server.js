import express from 'express';
import cors from 'cors';
import { getPosts, addPosts } from './database/config.js';


import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.get('/posts', async (req, res) => {

    const rows = await getPosts();
    res.json({
        msg: 'Desde el get',
        rows
    })
})

app.post('/posts', async (req, res) => {

    const { titulo, img, descripcion, likes } = req.body;
    const rows = await addPosts(titulo, img, descripcion, likes);
    res.json({
        titulo,
        img,
        descripcion,
        likes,
        msg: 'Guarde los datos',
        rows
    });


})

app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`);
})