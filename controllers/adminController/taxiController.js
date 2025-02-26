const { json } = require('express')
const Taxi = require('../../models/taxi')
const Place = require('../../models/Place')

const getAddTaxi = async (req, res) => {
    try {
        const places = await Place.find()

        res.render("add-taxi", { places })
    } catch (error) {
        console.log("error in get add taxi " + error.message)
    }
}

const postAddTaxi = async (req, res) => {
    try {
        const { name, type, placeId, phone } = req.body
        const oldTaxi = await Taxi.findOne({ phone: phone })

        if (oldTaxi) {
            return res.status(400).json({ message: "the phone number allredy exist" })
        }
        const taxi = new Taxi({
            name: name,
            placeId: placeId,
            phone: phone,
            type: type
        })
        await taxi.save()
        return res.status(200).json({ message: "taxi added" })
    } catch (error) {
        console.log("error in post add taxi " + error.message)
        return res(400).json({ message: "error in add taxi" })
    }
}

const taxiList = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const search = req?.query?.search?.trim() || "";
        const filter = req?.query?.filter;
        const placeId = req?.query?.placeId
        const query = {
            name: { $regex: `.*${search}.*`, $options: "i" },
        }
        if (filter) {
            console.log("has fillter")
            query.type = filter
        }
        if (placeId) {
            console.log("has palce id")
            query.placeId = placeId
        }

        const totalTaxi = await Taxi.find(query).countDocuments();
        const taxiData = await Taxi.find(query).populate("placeId", { place: 1 }).skip(skip).limit(limit)
            ;
        const totalPages = Math.floor(totalTaxi / limit)
        const allTaxi = await Taxi.find({}, { _id: 0, name: 1, type: 1 })

        const place = await Place.find()
        res.render("taxilist", {
            taxiData,
            place,
            totalPages,
            currentPage: page,
        })
    } catch (error) {
        console.log("error in taxi list " + error.message)
    }
}
const getEditTaxi = async (req, res) => {
    try {
        const id = req?.query?.id

        const taxi = await Taxi.findById(id).populate("placeId", { place: 1 })
        const places = await Place.find()
        res.render("edit-taxi", { taxi, places })
    } catch (error) {
        console.log("error in get edit taxi " + error.mesage)
    }
}

const postEditTaxi = async (req, res) => {
    try {

        const { name, type, placeId, phone, id } = req.body
        const currentTaxi = await Taxi.findById(id)
        if (currentTaxi.phone !== phone) {
            const oldTaxi = await Taxi.findOne({ phone: phone })

            if (oldTaxi) {
                return res.status(400).json({ message: "the phone number allredy exist" })
            }
        }

        await Taxi.findByIdAndUpdate(id,
            {
                $set: {
                    name: name,
                    phone: phone,
                    type: type,
                    placeId: placeId
                }
            })
        res.redirect("/admin/taxi")
    } catch (error) {
        console.log("error in post edit taxi " + error.message)
        return res(400).json({ message: "error in add taxi" })
    }
}

module.exports = {
    getAddTaxi,
    postAddTaxi,
    taxiList,
    getEditTaxi,
    postEditTaxi
}