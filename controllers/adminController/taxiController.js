const { json } = require('express')
const Taxi = require('../../models/taxi')
const Place = require('../../models/Place')

const getAddTaxi =async (req,res)=>{
    try {
        const places = await Place.find()
        
        res.render("add-taxi",{places})
    } catch (error) {
        console.log("error in get add taxi "+error.message)
    }
}

const postAddTaxi = async (req,res)=>{
    try {
        const {name,type,placeId,phone} = req.body
        const oldTaxi = await Taxi.findOne({phone:phone})

        if(oldTaxi){
            return res.status(400).json({message:"the phone number allredy exist"})
        }
        const taxi = new Taxi({
            name:name,
            placeId:placeId,
            phone:phone,
            type:type
        })
        await taxi.save()
        return res.status(200).json({message:"taxi added"})
    } catch (error) {
        console.log("error in post add taxi "+error.message)
        return res(400).json({message:"error in add taxi"})
    }
}

module.exports = {
    getAddTaxi,
    postAddTaxi

}