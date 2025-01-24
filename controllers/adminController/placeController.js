const Bus = require('../../models/Bus')
const Place = require('../../models/Place')
const Route = require('../../models/Route')

const getAddPlace = async(req,res)=>{
    try {
        res.render('add-place',{success:false})
    } catch (error) {
        console.log(error);
    }
}
const postAddPlace = async(req,res) => {
    try {
        const { place, city, district } = req.body
        const newPlace = new Place({
            place,
            city,
            district
        })
        await newPlace.save()
        res.render('add-place',{success:true})
    } catch (error) {
        console.log(error);
        
    }
}


module.exports={
    getAddPlace,
    postAddPlace
}