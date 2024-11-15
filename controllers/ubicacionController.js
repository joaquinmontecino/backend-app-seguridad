const UbicacionModel = require('../models/ubicacionModel');

class UbicacionController {

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const ubicacion = await UbicacionModel.getUbicacionById(id);
      if (!ubicacion) {
        return res.status(404).json({ error: 'Ubicacion no encontrada' });
      }
      res.status(200).json(ubicacion);
    } catch (err) {
      console.error('Error al obtener la ubicacion: ', err);
      res.status(500).json({ error: 'Error al obtener la ubicacion' });
    }
  }

  static async post(req, res) {
    try {
      const nuevaUbicacion = await UbicacionModel.createUbicacion(req.body);
      res.status(201).json(nuevaUbicacion);
    } catch (err) {
      console.error('Error al crear la ubicacion:', err.message);
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const result = await UbicacionModel.deleteUbicacion(id);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error al eliminar la ubicacion:', err);
      res.status(500).json({ error: 'Error al eliminar la ubicacion' });
    }
  }
}

module.exports = UbicacionController;