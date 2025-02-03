const Bus = require('../../models/Bus')
const Place = require('../../models/Place')
const Route = require('../../models/Route')
const placeHelper = require('../../helpers/placeHelper')
const getAddPlace = async(req,res)=>{
    try {
        res.render('add-place')
    } catch (error) {
        console.log(error);
    }
}
const postAddPlace = async(req,res) => {
    try {
        let { place, city, district } = req.body
        place = placeHelper.capitalizeFirstLetter(place)
        city = placeHelper.capitalizeFirstLetter(city)
        district = placeHelper.capitalizeFirstLetter(district)
        const existingPlace = await Place.findOne({
            $and: [
                { place: place },
                { city: city }
              ]
        })
        if(existingPlace){
            console.log(existingPlace);
            return res.status(400).json({message:"Place and City combination already exists"})
        }
        const newPlace = new Place({
            place,
            city,
            district
        })
        await newPlace.save()
        res.status(200).json({message:"Place added succesfully"})
    } catch (error) {
        console.log(error);
       res.status(500).json({message:"Internal Server Error"}) 
    }
}

const getAllPlaces = async(req,res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 5 items per page
        const skip = (page - 1) * limit;
        const search = req.query.search || ""; // Search query
    
        // Filter by search term if provided
        const searchFilter = {
          $and: [
            { isDeleted: false }, // Ensures only non-deleted documents are retrieved
            {
              $or: [
                { place: { $regex: search, $options: "i" } }, // Case-insensitive search
                { city: { $regex: search, $options: "i" } },
                { district: { $regex: search, $options: "i" } },
              ],
            },
          ],
        };
        const totalPlaces = await Place.countDocuments(search ? searchFilter : {});
        const places = await Place.find(search ? searchFilter : {})
          .skip(skip)
          .limit(limit);
    
        const totalPages = Math.ceil(totalPlaces / limit);
    
        res.render("edit-place", {
          places,
          currentPage: page,
          totalPages,
          search,
        });
      } catch (error) {
        res.status(500).send("Error fetching places");
      }
}

// Edit Place
const postEditPlace = async(req, res) => {
    try {
      const { id } = req.params;
      const { place, city, district } = req.body;
  
      await Place.findByIdAndUpdate(id, { place, city, district });
      res.redirect("/admin/edit-place");
    } catch (error) {
      res.status(500).send("Error updating place");
    }
  }

  // Delete Place
const postDeletePlace = async (req, res) => {
    try {
      const { id } = req.params;
  
      await Place.findByIdAndUpdate(id,{isDeleted:true});
      res.redirect("/admin/edit-place");
    } catch (error) {
      res.status(500).send("Error deleting place");
    }
  }

module.exports={
    getAddPlace,
    postAddPlace,
    getAllPlaces,
    postEditPlace,
    postDeletePlace
}