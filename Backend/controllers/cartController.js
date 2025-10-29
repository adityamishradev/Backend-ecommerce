const cartModel = require("../models/cartModel");

// Add item to cart
async function addItemToCart(req,res){
    try {
        const {userId, productId, title, price, qty, imgSrc} = req.body;
        let cart = await cartModel.findOne({userId: userId});
        if(cart){
            let itemIndex = cart.items.findIndex(item=>item.productId==productId);
            if(itemIndex > -1){
               
                let item = cart.items[itemIndex];
                item.qty += qty;
                cart.items[itemIndex] = item;
            }else{
         
                cart.items.push({productId, title, price, qty, imgSrc});
            }   
            cart = await cart.save();
            return res.status(201).send(cart);
        }
    } catch (error) {
       res.status(500).send("Something went wrong"); 
    }
}
// retrieve cart items
async function getcartItems(req,res){
    const userId = req.params.userId;   
    try {
        let cart = await cartModel.findOne({userId: userId});
        if(cart){
            return res.status(200).send(cart);
        }else{  
            return res.status(404).send("Cart not found");
        }
}
    catch (error) {
        res.status(500).send("Something went wrong");
    }
}
// decreaseProduct
async function decreaseProduct(req,res){
    const{userId, productId} = req.body;
    try {
        let cart = await cartModel.findOne({userId: userId});
        if(cart){
            let itemIndex = cart.items.findIndex(item=>item.productId==productId);
            if(itemIndex > -1){
                let item = cart.items[itemIndex];
                if(item.qty > 1){
                    item.qty -= 1;
                    cart.items[itemIndex] = item;
                }else{
                    cart.items.splice(itemIndex, 1);
                }
                cart = await cart.save();
                return res.status(200).send(cart);
            }   
            else{
                return res.status(404).send("Product not found in cart");
            }
        }else{
            return res.status(404).send("Cart not found");
        }
    } catch (error) {
        res.status(500).send("Something went wrong");
    }

}
// removeProduct
async function removeProduct(req,res){
    const{userId, productId} = req.body;        
    try {
        let cart = await cartModel.findOne({userId: userId});
        if(cart){
            let itemIndex = cart.items.findIndex(item=>item.productId==productId);
            if(itemIndex > -1){
                cart.items.splice(itemIndex, 1);
                cart = await cart.save();
                return res.status(200).send(cart);
            }
            else{
                return res.status(404).send("Product not found in cart");
            }
        }else{
            return res.status(404).send("Cart not found");
        }
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
}   
// delete all product
async function deleteAllProducts(req,res){  
    const userId = req.params.userId;
    try {
        let cart = await cartModel.findOne({userId: userId});
        if(cart){
            cart.items = [];
            cart = await cart.save();
            return res.status(200).send(cart);
        }else{
            return res.status(404).send("Cart not found");
        }

    } catch (error) {
        res.status(500).send("Something went wrong");
    }       
}

module.exports = {addItemToCart,getcartItems,decreaseProduct ,removeProduct,deleteAllProducts};  