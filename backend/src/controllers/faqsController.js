import faqsModel from '../models/faqs.js'

const faqsController = {};

//Select 
faqsController.getAllFaqs = async (req, res) =>{
    try{
        const faqs = await (faqsModel.find());
        res.status(200).json(faqs)
    } catch(error) {
        console.log("Error" + error)
        res.status(500).json({message: "Error finding faqs"})
    }
};

//Insert
faqsController.insertFaqs = async (req, res) =>{
    const { question, answer, level, isActive } = req.body;
    
    try {
        //Validamos que los campos no tengan vacios
        if(!question || !answer || !level || !isActive){
            return res.status(400).json({message: "Ingrese todos los campos"})
        }

        if(level > 5 ||level < 1){
            return res.status(400).json({message: "Ingrese un valor válido"})
        }

        //Guardar en la base de datos
        const newFaqs = new faqsModel({
                question, answer, level, isActive
        })

        newFaqs.save()

        res.status(200).json({message: "Faq saved"})
        
    } catch (error) {
        console.log("Error" + error)
        res.status(400).json({message: "Error saving"})
    }
}

//Actualizar
faqsController.updateFaqs = async (req, res) =>{
    try {
        const {  question, answer, level, isActive  } = req.body;

        //Validacion
        if (level > 5 || level < 1) {
            return res.status(400).json({ message: "Ingrese un valor"})
        }

        //actualizar los campos en la base de datos
        const updateFaqs = await faqsModel.findByIdAndUpdate(
            req.params.id,
            {question, answer, level, isActive},
            {new: true}
        )

        if (!updateFaqs){
            return res.status(200).json({message: "Faqs updated successfully"})
        }
        
    } catch (error) {
        console.log({message: "Error" + error})
        req.status(400).json({message: "Error updating faqs"})
    }

}

//Delete 
faqsController.deleteFaqs = async (req, res) => {
    try {
        const deleteFaqs = await faqsModel.findByIdAndDelete(
            req.params.id
        )

        if(!deleteFaqs){
            return res.status(400).json({message: "Faqs not found"})
        }

        res.status(200).json({message: "faqs deleted"})

    } catch (error) {
        console.log("error"+error)
        res.status(400).json({message: "error"})
    }
};

export default faqsController;