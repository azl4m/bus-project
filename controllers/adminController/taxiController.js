const getAddTaxi = (req,res)=>{
    try {
        res.render("add-taxi")
    } catch (error) {
        console.log("error in get add taxi "+error.message)
    }
}

module.exports = {
    getAddTaxi
}