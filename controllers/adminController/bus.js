const addBus = async(req,res)=>{
    try {
        res.render("add-bus")
    } catch (error) {
        console.log("error in add bus "+error.message)
    }
}

module.exports = {
    addBus
}