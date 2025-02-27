const Place = require("../../models/Place");
const Route = require("../../models/Route");
const Bus = require("../../models/Bus");
const BusHelper = require("../../helpers/busHelper");
const busSearch = async (req, res) => {
  try {
    const places = await Place.find();
    res.render("bus", {
      places,
    });
  } catch (error) {
    console.log("error in busSearch " + error.message);
  }
};
const checkBusSearch = async (req, res) => {
  try {
    console.log("inside check bus search");
    console.log(req.body);
    
    const { fromId, toId } = req.body;
    
    const from = await Place.findById(fromId);
    const to = await Place.findById(toId);
    console.log(from);
    console.log(to);

    if (!from || !to) {
      return res
        .status(400)
        .json({ message: "No bus found in this route", sucess: false });
    }
    const fromid = from._id;
    const toid = to._id;

    // Find routes with stops containing both `fromid` and `toid`
    const routes = await Route.find({
      "stops.placeId": { $all: [fromid, toid] },
      $expr: {
        $lt: [
          { $indexOfArray: ["$stops.placeId", fromid] },
          { $indexOfArray: ["$stops.placeId", toid] },
        ],
      },
    });
    console.log(routes);
    
    if (!routes) {
      return res
        .status(400)
        .json({ message: "No bus found in this route", sucess: false });
    }
    // Fetch buses for the found routes
    const buses = await Promise.all(
      routes.map(async (route) => {
        return await Bus.find({
          "schedules.routeId": route._id,
        });
      })
    );
    // Flatten the buses array
    const flatBuses = buses.flat();
    if (!flatBuses.length) {
      return res
        .status(400)
        .json({ message: "No bus found in this route", sucess: false });
    }
    console.log(flatBuses);
    
    return res.status(200).json({ sucess: false });
  } catch (error) {
    console.log("error in check bus search");
    console.log(error);
  }
};
const postSearchBus = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = req.query.limit || 10;
    const skip = (page-1)*limit;
    const { fromId, toId } = req.body;
    const from = await Place.findById(fromId);
    const to = await Place.findById(toId);
    console.log(from);
    console.log(to);

    if (!from || !to) {
      return res.status(200).json({ message: "No bus found in this route" });
    }
    console.log("hello from result bus");
    const fromid = from._id;
    const toid = to._id;

    // Find routes with stops containing both `fromid` and `toid`
    const routes = await Route.find({
      "stops.placeId": { $all: [fromid, toid] },
      $expr: {
        $lt: [
          { $indexOfArray: ["$stops.placeId", fromid] },
          { $indexOfArray: ["$stops.placeId", toid] },
        ],
      },
    });
    if (!routes) {
      return res.redirect("/?emptyMessage=true");
    }
    // Fetch buses for the found routes
    const buses = await Promise.all(
      routes.map(async (route) => {
        return await Bus.find({
          "schedules.routeId": route._id,
        });
      })
    );
    // Flatten the buses array
    const flatBuses = buses.flat();

    // Construct the result
    const result = flatBuses.flatMap((bus) => {
      return bus.schedules
        .filter((schedule) =>
          routes.some((route) => route._id.equals(schedule.routeId))
        )
        .map((schedule) => {
          const route = routes.find((route) =>
            route._id.equals(schedule.routeId)
          );
          const routeName = route.routeName
          if (!route) return null;

          const fromStop = route.stops.find((stop) =>
            stop.placeId.equals(fromid)
          );
          const toStop = route.stops.find((stop) => stop.placeId.equals(toid));
          if (!fromStop || !toStop) return null;

          // Calculate departure and arrival times
          const arrivalTime = BusHelper.calculateArrivalTime(
            schedule.departureTime,
            fromStop.delay // Add delay for `fromStop` only
          );
          const departureTime = BusHelper.calculateArrivalTime(
            schedule.departureTime,
            toStop.delay // Add delay for `toStop` only
          );

          // Calculate duration

          const duration = BusHelper.calculateDuration(
            arrivalTime,
            departureTime
          ).formatted;
          console.log("duration :"+duration);
          

          return {
            busName: bus.busName,
            departureTime,
            arrivalTime,
            duration,
            routeName
          };
        })
        .filter(Boolean); // Remove null entries for schedules without matches
    });
    console.log("hello from result bus above result");
    
    console.log(result);
    return res.render('bus-result',{
      busData:result
    })
  } catch (error) {
    console.log("error in search bus");
    console.log(error);
  }
};
const resultBus = async (req, res) => {
  try {
    res.render("bus-result");
  } catch (error) {
    console.log("error in bus result " + error.message);
  }
};
module.exports = {
  busSearch,
  resultBus,
  postSearchBus,
  checkBusSearch,
};
