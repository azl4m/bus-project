const Bus = require('../../models/Bus')
const Place = require('../../models/Place')
const Route = require('../../models/Route')

const getAddRoute = async(req,res) => {
    try {
        const places = await Place.find()
        res.render('add-route',{placeData:places})
    } catch (error) {
        console.log(error);
    }
}

const postAddRoute = async (req, res) => {
    try {
        console.log(req.body);

        const stops = req.body?.stops || [];
        const placeIds = stops.map(stop => stop.placeId);

        const uniquePlaceIds = new Set(placeIds);
        if (placeIds.length !== uniquePlaceIds.size) {
            return res.status(400).json({ message: "Duplicate placeId detected in stops array" });
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


module.exports={
    getAddRoute,
    postAddRoute
}