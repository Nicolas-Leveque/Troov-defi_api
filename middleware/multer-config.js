const multer = require('multer');

//Fonction permettant de vérifier si le fichier envoyé est bien une image, renvoie une erreur le cas échéant et renomme le fichier pour éviter les doublons
const filterFiles = (filename) => {
    if (!filename.match(/\.(jpg|jpeg|png)$/)) {
        throw new Error('Merci de choisir un fichier image')
    }
    const name = filename.split(' ').join('_');
    return Date.now() + '.' + name
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = filterFiles(file.originalname)
        callback(null, name)
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000,
    },
}).single('image');

module.exports = upload;
