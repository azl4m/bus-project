const Bus = require('../../models/Bus')
const Place = require('../../models/Place')
const Route = require('../../models/Route')

const getAddRoute = async(req,res) => {
    try {
        const places = await Place.find()
        res.render('add-route',{placeData:places})
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getAddRoute
}