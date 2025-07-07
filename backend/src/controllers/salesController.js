import sales from "../models/sales.js";
import salesModel from "../models/sales.js";

//Array de funciones vacias
const salesControllers = {};

//Select
salesControllers.getAllSales = async (req, res) => {
  try{
    const sales = await salesModel.find();
    res.status(200).json(sales)
  } catch(error) {
    console.log("error"+error)
    res.status(500).json({ message: "Internal server error"})
  }   
};

//Insert
salesControllers.insertSales = async (req, res) => {
    try {
        //Solicitar los datos
        const {product, category, customer, total } = req.body;

        if (total < 0 ) {
            return res.status(400).json({ message: "Insert valid vali"})
        }

        //Guardamos en la base de datos
        const newSales = new salesModel({ product, category, customer, total })
        await newSales.save()

        res.status(200).json({message: "sale saved"})
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({ message: "Internal server error"})
        
    }
};

// =================================
// Ventas que tiene cada categoria
// =================================

salesControllers.getSalesByCategory = async (req, res) => {
    try {
        const resultado = await salesModel.aggregate(
            [
                {
                    $group: {
                        _id: "$category",
                        totalventas: {$sum: "&total"}
                    },
                },
                //ordenar
                {
                    sort: { totalventas: -1 }
                }    
            ]
        )

        res.status(200).json(resultado);

    } catch (error) {
        console.log("error"+error);
        res.status(500).json({message: "Internal server error"})
    }
};

// =================================
// productos más vendidos
// =========================

salesControllers.getMostSelledProducts = async(req, res) =>{
    try {
        const resultado = await salesModel.aggregate(
            [
                {
                    $group: {
                        id_:"$product",
                        totalventas: { $sum: 1}
                    }

                },
                //ordenar
                {
                    $sort: {totalventas: -1}
                },
                //limitar la cantidad de datos a mostrar
                {
                    $limit: 3
                }
            ]
        )

        res.status(200).json(resultado);
    } catch (error) {

        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
        
    }
      
};


// =================================
// Ganancias totales
// =================================
salesControllers.totalEarnings = async(req, res)=>{
    try {
        const resultado = await salesModel.aggregate(
            [
                {
                    $group: {
                        _id: null,
                        gananciasTotales: {$sum: "total"}
                    }
                }
            ]
        )

        res.status(200).json(resultado);
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
        
    }
}

export default salesControllers;