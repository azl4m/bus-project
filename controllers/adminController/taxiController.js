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
        console.log(req.body)
        res.send("tqaxi added")
    } catch (error) {
        console.log("error in post add taxi "+error.message)
    }
}

module.exports = {
    getAddTaxi,
    postAddTaxi

}