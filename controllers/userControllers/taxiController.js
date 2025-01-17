

//get taxi search page
const getTaxiPage = async(req,res)=>{
    try {
        return res.render("taxi")
    } catch (error) {
        
    }
}

module.exports={
    getTaxiPage
}