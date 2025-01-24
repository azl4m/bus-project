const Bus = require('../../models/Bus')
const Place = require('../../models/Place')
const Route = require('../../models/Route')

const getAddBus = async(req,res)=>{
    try {
        const routeData = await Route.find()
        res.render("add-bus",{routeData})
    } catch (error) {
        console.log("error in add bus "+error.message)
    }
}

module.exports = {
    getAddBus
}