import express from "express"
import Note from "../models/noteModel.js"
const router = express.Router()

//OBTENER TODAS LAS NOTAS
router.get("/",async(req,res)=>{
     try{
        const notes = await Note.find()
        res.status(200).json(notes)
    }catch(error){
        console.error("error al obtener las notas",error)
        res.status(500).json({error: "internal server error"})
    }
})

//OBTENER UNA NOTA POR ID
router.get("/:id",async (req,res)=>{
   try{
    const id = req.params.id
    const note = await Note.findById(id)
    if(!note)return res.status(404).json({error:"nota no encontrada"})
    
    res.status(200).json(note)    
   }catch(error){
    console.log("error al intentar obtener una nota por id: ",error)
    res.status(500).json({error: "internal server error"})
   }
})

//CREAR UNA NUEVA NOTA
router.post("/" ,async (req,res)=>{
    try{
        const {title, description} = req.body
        const note = new Note({title,description})

        const savedNote = await note.save()
        if(savedNote){
            res.status(201).json({mensaje : "nota creada correctamente",note: savedNote})
        }
        
    }catch(error){
        console.error("error al crear la nota",error)
        res.status(500).json({error: "internal server error"})
    }
})

//ELIMINAR UNA NOTA
router.delete("/:id",async (req,res)=>{
    
    try{
        const id = req.params.id
        const deletedNote = await Note.findByIdAndDelete(id)
        if(!deletedNote)return res.status(404).json({error: "nota no eliminada"})
        
        res.status(200).json({message : "nota eliminada correctamente"})
    }catch(error){
        console.error("error al eliminar una nota: ",error)
        res.status(500).json({error:"internal server error"})
    }
})

//EDITAR UNA NOTA
router.put("/:id",async (req,res) =>{
    try{
        const id = req.params.id
        const {title,description} = req.body
        const updatedNote = await Note.findByIdAndUpdate(id,{title,description},{new:true})
        if(!updatedNote) return res.status(404).json({error: "nota no actualizada correctamente"})

        res.status(200).json({message: "nota actualizada correctamente",note:updatedNote})
    }catch(error){
        console.error("error al editar una nota: ",error)
        res.status(500).json({error:"internal ser error"})
    }
})

export default router