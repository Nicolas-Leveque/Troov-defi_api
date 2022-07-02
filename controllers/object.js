const fs = require('fs');
const Object = require('../models/objects');

exports.createObject = async (req, res) => {
    try {
        const object = new Object({
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        });
        await object.save()
        res.status(201).send({ message: 'Object created' });
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.modifyObject =async (req, res) => {
    try {
        const newObject = req.file
            ? {
                ...req.body,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            }
            : { ...req.body }
        if ( newObject.imageUrl ) {
            const object = await Object.findOne({ _id: req.params.id })
            const filename = object.imageUrl.split('/images/')[1]
            fs.unlinkSync(`images/${filename}`)
        }
        const object = await Object.updateOne(
            { _id: req.params.id},
        { ...newObject, _id: req.params.id}
        )
        if (!object) {
            res.status(404).send()
        }
        res.status(200).json({ message: "Objet modifié" });
    } catch (e) {
        res.status(500).send(e)
    }
};

exports.deleteObject = async (req, res ) =>{
    try {
        const object = await Object.findOne({ _id: req.params.id })
        const filename = object.imageUrl.split('/images/')[1]
        fs.unlinkSync(`images/${filename}`)
        await Object.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: 'Objet supprimé' })
    } catch (e) {
        res.status(500).send(e)
    }
};

exports.getOneObject = async (req, res ) => {
    try {
        const object = await Object.findById(req.params.id)
        if (!object) {
            res.status(404).send()
        }
        res.send(object)
    } catch (e) {
        res.status(500).send(e)
    }
};

exports.getAllObjects = async (req, res) => {
    try {
        const object = await Object.find()
        res.send(object)
    } catch (e) {
        res.status(500).send(e
        )
    }
};
