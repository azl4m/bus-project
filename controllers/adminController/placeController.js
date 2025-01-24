const Bus = require('../../models/Bus')
const Place = require('../../models/Place')
const Route = require('../../models/Route')
const placeHelper = require('../../helpers/placeHelper')
const getAddPlace = async(req,res)=>{
    try {
        res.render('add-place')
    } catch (error) {
        console.log(error);
    }
}
const postAddPlace = async(req,res) => {
    try {
        let { place, city, district } = req.body
        place = placeHelper.capitalizeFirstLetter(place)
        city = placeHelper.capitalizeFirstLetter(city)
        district = placeHelper.capitalizeFirstLetter(district)
        const existingPlace = await Place.findOne({
            $and: [
                { place: place },
                { city: city }
              ]
        })
        if(existingPlace){
            console.log(existingPlace);
            return res.status(400).json({message:"Place and City combination already exists"})
        }
        const newPlace = new Place({
            place,
            city,
            district
        })
        await newPlace.save()
        res.status(200).json({message:"Place added succesfully"})
    } catch (error) {
        console.log(error);
       res.status(500).json({message:"Internal Server Error"}) 
    }
}


module.exports={
    getAddPlace,
    postAddPlace
}