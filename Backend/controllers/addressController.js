const AddressModel = require("../models/AddressModel");
// add address
async function addAddress(req,res){
    try {
        const {userId, street, city, state, zipCode, country} = req.body;
        const newAddress = await AddressModel.create({
            userId,
            street, 
            city,
            state,
            zipCode,
            country
        });
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
}
// user shipping addresses
async function getUserAddresses(req,res){
    const userId = req.params.userId;
    try {
        const addresses = await AddressModel.find({userId: userId});
        res.status(200).json(addresses);
    } catch (error) {   
        res.status(500).send("Something went wrong");
    }   
}
module.exports = {
    addAddress,
    getUserAddresses
};