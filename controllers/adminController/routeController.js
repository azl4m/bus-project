const Bus = require("../../models/Bus");
const Place = require("../../models/Place");
const Route = require("../../models/Route");

const getAddRoute = async (req, res) => {
  try {
    const places = await Place.find().sort({ place: 1 });
    res.render("add-route", { placeData: places });
  } catch (error) {
    console.log(error);
  }
};

const postAddRoute = async (req, res) => {
  try {
    console.log(req.body);
    const stops = req.body?.stops || [];
    const placeIds = stops.map((stop) => stop.placeId);
    const uniquePlaceIds = new Set(placeIds);
    if (placeIds.length !== uniquePlaceIds.size) {
      return res
        .status(400)
        .json({ message: "Duplicate placeId detected in stops array" });
    }

    const route = new Route({
      routeName: req.body?.routeName,
      stops: stops,
    });

    await route.save();
    res.status(200).json({ message: "Route Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
const getAllRoutes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    const search = req?.query?.search?.trim() || "";
    const searchFilter = {
      $and: [
        { isDeleted: false },
        ...(search
          ? [{ routeName: { $regex: `.*${search}.*`, $options: "i" } }]
          : []),
      ],
    };



    const totalRoutes = await Route.countDocuments(search ? searchFilter : {});
    const routes = await Route.find(search ? searchFilter : {})
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalRoutes / limit);

    res.render("routes", {
      routeData: routes,
      currentPage: page,
      totalPages,
      search,
    });
  } catch (error) {
    console.log(error);
  }
};

const getEditRoute = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const route = await Route.findById(id).populate("stops.placeId").exec();
    console.log(route);
    res.render("edit-route", { route });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAddRoute,
  postAddRoute,
  getAllRoutes,
  getEditRoute,
};
