const express = require('express');
const ComentarioController = require('../controllers/comentarioController');
const router = express.Router();

router.get('/incidente/:id', ComentarioController.getAllFromIncidente);
router.get('/:id', ComentarioController.getById);
router.post('/', ComentarioController.post);
router.put('/:id', ComentarioController.edit);
router.delete('/:id', ComentarioController.delete);

module.exports = router;