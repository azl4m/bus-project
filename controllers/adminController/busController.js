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
const postAddBus = async (req, res) => {
    try {
      const bus = new Bus({
        busName: req.body?.busName,
        schedules: req.body?.schedules,
      });
      console.log(bus); 
      await bus.save();
      return res.send("succesful");
    } catch (error) {
      console.error(error.message);
    }
  };
module.exports = {
    getAddBus,
    postAddBus
}