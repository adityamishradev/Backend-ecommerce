const productModels = require('../models/productModel');

async function addProduct (req,res) {
const {title,description,price,category,qty,imgSrc} = req.body
try{
    const product = await productModels.create({title,description,price,category,qty,imgSrc});

res.json({message:'Product added successfully...!',product})
        
    } catch (error) {
        res.json(error.message) }
}

// retrieve all product

async function   getProducts (req,res){
    const products = await productModels.find().sort({createdAt:-1})
    res.json({message:'All products',products})
}
// find by id

async function getProductById(req,res){
    const id =req.params.id;
    let product =await productModels.findById(id)
      if(!product) return res.json({message:'Invalid Id'})
  res.json({ message: "Specific product", product });

}

 async function updateProductById (req, res)  {
    const id = req.params.id;
  let product = await productModels.findByIdAndUpdate(id,req.body,{new:true})
  if(!product) return res.json({message:'Invalid Id'})
  res.json({ message: "Product has been updated", product });
};

async function deleteProductById (req, res) {
    const id = req.params.id;
  let product = await productModels.findByIdAndDelete(id)
  if(!product) return res.json({message:'Invalid Id'})
  res.json({ message: "Product has been deleted", product });
}; 
module.exports={addProduct ,getProducts,getProductById,updateProductById,deleteProductById}
