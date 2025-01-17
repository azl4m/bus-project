const busSearch = async(req,res)=>{
    try {
        res.render("bus")
    } catch (error) {
        console.log("error in busSearch "+error.message)
    }
}

module.exports={
    busSearch
}