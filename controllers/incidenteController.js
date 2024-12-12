const IncidenteModel = require('../models/incidenteModel');
const IncidenteDTO = require('../dto/incidenteDTO');

class IncidenteController {


  static async getAll(req, res) {
    try {
      const incidentes = await IncidenteModel.getAllIncidentes();
      res.status(200).json(incidentes);
    } catch (err) {
      console.error('Error al obtener los incidentes básicos: ', err);
      res.status(500).json({ error: 'Error al obtener los incidentes' });
    }
  }


  static async getAllIncidentes(req, res) {
    try {
      const incidentes = await IncidenteModel.getAllIncidentes();
      res.status(200).json(incidentes);

    } catch (err) {
      console.error('Error al obtener los incidentes: ', err);
      res.status(500).json({ error: 'Error al obtener los incidentes' });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const incidente = await IncidenteModel.getIncidenteById(id);
      if (!incidente) {
        return res.status(404).json({ error: 'Incidente no encontrado' });
      }
      res.status(200).json(incidente);
    } catch (err) {
      console.error('Error al obtener el incidente: ', err);
      res.status(500).json({ error: 'Error al obtener el incidente' });
    }
  }

  static async create(req, res) {
    try {
      IncidenteDTO.validate(req.body);
      const incidenteData = new IncidenteDTO(req.body);

      const nuevoIncidente = await IncidenteModel.createIncidente(incidenteData);
      res.status(201).json(nuevoIncidente);
    } catch (err) {
      console.error('Error al crear el incidente:', err.message);
      res.status(400).json({ error: err.message });
    }
  }

  static async edit(req, res) {
    const { id } = req.params;
    try {
      const incidenteActual = await IncidenteModel.privateGetIncidenteById(id);
      if (!incidenteActual) {
        return res.status(404).json({ error: 'Incidente no encontrada' });
      }

      const incidenteData = {
        ...incidenteActual,
        ...req.body
      };

      IncidenteDTO.validatePartial(incidenteData);

      const incidenteActualizado = await IncidenteModel.updateIncidente(id, incidenteData);
      res.status(200).json(incidenteActualizado);
    } catch (err) {
      console.error('Error al actualizar el incidente:', err.message);
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const result = await IncidenteModel.deleteIncidente(id);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error al eliminar el incidente:', err);
      res.status(500).json({ error: 'Error al eliminar el incidente' });
    }
  }
}

module.exports = IncidenteController;