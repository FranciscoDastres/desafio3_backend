import 'dotenv/config';
import pg from 'pg';

const pool = new pg.Pool ({
    host: process.env.DB_HOST,// localhost
    user: process.env.DB_USER,// post
    password: process.env.DB_PASWORD, // "1234"
    database: process.env.DB_DATABASE, // collection
    allowExitOnIdle: true,
})

const getPosts = async () => {
    const result = await pool.query("SELECT * from post")
    // console.log(result.rows)
    return result.rows
}

const addPosts = async (titulo, imagen,descripcion,likes) => {
    console.log(imagen)
    const consulta = "INSERT INTO post values (DEFAULT,$1,$2,$3,$4)"
    const values = [titulo, imagen,descripcion,likes]
    const result = await pool.query(consulta, values)
    console.log("post agregado")
    return result
}

pool.query("SELECT NOW()",(err,res) =>{
    res ? console.log('DB-conectado', res.rows[0].now) : console.log({ err });
})
export { addPosts, getPosts, pool };