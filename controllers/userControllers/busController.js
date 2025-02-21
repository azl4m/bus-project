const busSearch = async(req,res)=>{
    try {
        res.render("bus")
    } catch (error) {
        console.log("error in busSearch "+error.message)
    }
}
const resultBus = async(req,res)=>{
    try {
        res.render("bus-result")
    } catch (error) {
        console.log("error in bus result "+error.message)
    }
}
module.exports={
    busSearch,
    resultBus
}