const express = require('express');
const IncidenteController = require('../controllers/incidenteController');
const router = express.Router();

router.get('/', IncidenteController.getAll);
router.get('/incidente/:id', IncidenteController.getAllIncidentes);
router.get('/:id', IncidenteController.getById);
router.post('/', IncidenteController.create);
router.put('/:id', IncidenteController.edit);
router.delete('/:id', IncidenteController.delete);

module.exports = router;