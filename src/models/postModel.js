import conectarAoBanco from "../config/dbConfig.js"
import { ObjectId } from 'mongodb'
const connection = await conectarAoBanco(process.env.VARIAVEL)

export async function getTodosPosts(){
    const db = connection.db('imersaoalura')
    const colection = db.collection('posts')
    return colection.find().toArray()
}

export async function getPost(id){
    const db = connection.db('imersaoalura')
    const collection = db.collection('posts')
    return collection.findOne({ _id: ObjectId.createFromHexString(id) })
}

export async function createPost(newPost){
    const db = connection.db('imersaoalura')
    const collection = db.collection('posts')
    return collection.insertOne(newPost)
}

export async function atualizarPost(id, newPost){
    const db = connection.db('imersaoalura')
    const collection = db.collection('posts')
    const objId = ObjectId.createFromHexString(id)
    return collection.updateOne({_id: new ObjectId(objId)}, {$set:newPost})
}