import express from 'express';
import cors from 'cors';
import { getPosts, addPosts, modificarPost, borrarPost } from './database/config.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/posts', async (req, res) => {
    const rows = await getPosts();
    console.log("desde get")
    res.json(rows)
})

app.post('/posts', async (req, res) => {
    const { titulo, url, descripcion, likes } = req.body;
    console.log(req.body)
    const rows = await addPosts(titulo, url, descripcion, likes);
    res.send("Post agregado con éxito")
})

// app.put('/posts/:id', async (req, res) => {
//     const { id } = req.params
//     const { titulo, imagen, descripcion } = req.body
//     await modificarPost(titulo, imagen, descripcion, id)
//     res.send("post actualizado con éxito")
// })
app.put('/posts/like/:id', async (req, res) => {
    const { id } = req.params
    await modificarPost(id)
    res.send("post actualizado con éxito")
})

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params
    await borrarPost(id)
    res.send("post borrado con éxito")
})
app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`);
})