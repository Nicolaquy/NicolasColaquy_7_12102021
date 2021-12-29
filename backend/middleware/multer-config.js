const multer = require('multer');
const path = require('path');

const MINES_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png',
    'image/gif' : 'gif'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MINES_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension)
    }
})
module.exports = multer({ storage: storage,
    limits: { fieldSize: 10 * 1024 * 1024 },
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.gif') {
            return callback(new Error('Le format du fichier est invalide'))
        }
        callback(null, true)
    }
}).single('image');