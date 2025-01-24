const Bus = require('../../models/Bus')
const Place = require('../../models/Place')
const Route = require('../../models/Route')

const getAddPlace = async(req,res)=>{
    try {
        res.render('add-place')
    } catch (error) {
        console.log(error);
    }
}



module.exports={
    getAddPlace,
    postAddPlace
}