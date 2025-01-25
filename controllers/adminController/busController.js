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
const postAddBus = async(req,res) => {
    try {
        console.log(req.body);
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = {
    getAddBus,
    postAddBus
}