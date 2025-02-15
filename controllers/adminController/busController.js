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
  const getEditBusList = async(req,res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = req.query.limit || 10;
      const skip = (page-1) * limit;
      const search = req?.query?.search?.trim() || "";
      console.log(search);
      
      const searchFilter = {
        $and: [
          { isDeleted: false },
          ...(search
            ? [{ busName: { $regex: `.*${search}.*`, $options: "i" } }]
            : []),
        ],
      };
      const totalBus = await Bus.countDocuments(search ? searchFilter :{})
      const allBus = await Bus.find(search ? searchFilter : {})
            .skip(skip)
            .limit(limit);
      const totalPages = Math.ceil(totalBus/limit)
      res.render("edit-buslist",{busData:allBus,
        currentPage:page,
        totalPages:totalPages,
        search:search
      })

    } catch (error) {
      console.log(error);
      
    }
  }
  const getEditBus = async(req,res) => {
    try {
      const bus = await Bus.findById(req.params.id).populate("schedules.routeId"); 
      if (!bus) return res.status(404).json({ error: "Bus not found" });
      res.json(bus);
    } catch (err) {
      res.status(500).json({ error: "Server Error" });
    }
  }
module.exports = {
    getAddBus,
    postAddBus,
    getEditBusList
}