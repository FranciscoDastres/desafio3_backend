import express from 'express';
import cors from 'cors';
import { getPosts, addPosts } from './database/config.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/posts', async (req, res) => {
    const rows = await getPosts();
    // res.json({
    //     msg: 'Desde el get',
    //     rows
    // })
    res.json(rows)
})

app.post('/posts', async (req, res) => {
    const { titulo, url, descripcion, likes } = req.body;
    console.log(req.body)
    const rows = await addPosts(titulo, url, descripcion, likes);
    res.send("Post agregado con éxito")
})

app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`);
})