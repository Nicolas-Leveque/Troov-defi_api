const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const upload = require('../middleware/multer-config')

const objectCtrl = require('../controllers/object')

router.post('/', auth, upload, objectCtrl.createObject);
router.put('/:id', auth, upload, objectCtrl.modifyObject);
router.delete('/:id', auth, objectCtrl.deleteObject);
router.get('/:id', auth, objectCtrl.getOneObject);
router.get('/', auth, objectCtrl.getAllObjects);

module.exports = router;
