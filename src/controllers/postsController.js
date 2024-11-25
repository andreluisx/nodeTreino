import { getTodosPosts, getPost, createPost, atualizarPost } from "../models/postModel.js"
import fs from 'fs'
import gerarDescricaoComGemini from "../services/geminiService.js"

export async function allPosts (req, res) {
    const posts = await getTodosPosts()
    res.status(200).json(posts)
}

export async function addNewPost (req, res) {
    const newPost = req.body;
    try{
        const postCriado = await createPost(newPost)
        res.status(200).json(postCriado)
    }catch(e){
        console.error(e.message)
        res.status(500).json({"Erro" : "algo deu errado!"})
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            nome: req.body.nome
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        nome: ""
    };

    try {
        const postCriado = await createPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function Post(req, res) {
    try {
        const { id } = req.params
        const post = await getPost(id)
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }
        
        res.status(200).json(post)
        
    } catch (error) {
        res.status(400).json({ message: 'Invalid post ID', error: error.message })
    }
}

