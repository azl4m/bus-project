const Bus = require("../../models/Bus");
const Place = require("../../models/Place");
const Route = require("../../models/Route");

const getAddBus = async (req, res) => {
  try {
    const routeData = await Route.find();
    res.render("add-bus", { routeData });
  } catch (error) {
    console.log("error in add bus " + error.message);
  }
};
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
const getEditBusList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
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
    const totalBus = await Bus.countDocuments(search ? searchFilter : {});
    const allBus = await Bus.find(search ? searchFilter : {})
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalBus / limit);
    res.render("edit-buslist", {
      busData: allBus,
      currentPage: page,
      totalPages: totalPages,
      search: search,
    });
  } catch (error) {
    console.log(error);
  }
};
const getEditBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.query.id).populate(
      "schedules.routeId",
      "routeName"
    );

    if (!bus) return res.status(404).json({ error: "Bus not found" });

    const availableRoutes = await Route.find(); // Fetch all routes

    res.render("edit-bus", { bus, availableRoutes }); // Render an EJS/HTML page
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
const postEditBus = async (req, res) => {
  try {
    const busId = "679605227f503d6d4f5a87e7"; 
    const updateData = req.body
    const updatedBus = await Bus.findByIdAndUpdate(
      busId,
      {
        $set: { busName: updateData.busName }, 
        $set: { schedules: updateData.schedules  }, 
      },
      { new: true, upsert: true }
    );
    res.redirect("/admin/edit-buslist")
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAddBus,
  postAddBus,
  getEditBusList,
  getEditBus,
  postEditBus,
};
