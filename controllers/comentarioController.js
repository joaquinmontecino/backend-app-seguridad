const ComentarioModel = require('../models/comentarioModel');
const ComentarioDTO = require('../dto/comentarioDTO');

class ComentarioController {

  static async getAllFromIncidente(req, res) {
    try {
      const { id } = req.params;
      const comentarios = await ComentarioModel.getAllComentariosIncidente(id);
      res.status(200).json(comentarios);
    } catch (err) {
      console.error('Error al obtener comentarios: ', err);
      res.status(500).json({ error: 'Error al obtener comentarios' });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const comentario = await ComentarioModel.getComentarioById(id);
      if (!comentario) {
        return res.status(404).json({ error: 'Comentario no encontrado' });
      }
      res.status(200).json(comentario);
    } catch (err) {
      console.error('Error al obtener el comentario: ', err);
      res.status(500).json({ error: 'Error al obtener el comentario' });
    }
  }

  static async post(req, res) {
    try {
      ComentarioDTO.validate(req.body);
      const comentarioData = new ComentarioDTO(req.body);
      const nuevoComentario = await ComentarioModel.createComentario(comentarioData);
      res.status(201).json(nuevoComentario);
    } catch (err) {
      console.error('Error al crear el comentario:', err.message);
      res.status(400).json({ error: err.message });
    }
  }

  static async edit(req, res) {
    const { id } = req.params;
    try {
      const comentarioActual = await ComentarioModel.privateGetComentario(id);
      if (!comentarioActual) {
        return res.status(404).json({ error: 'Comentario no encontrada' });
      }

      const comentarioData = {
        ...comentarioActual,
        ...req.body
      };

      ComentarioDTO.validatePartial(comentarioData);

      const comentarioActualizado = await ComentarioModel.updateComentario(id, comentarioData);
      res.status(200).json(comentarioActualizado);
    } catch (err) {
      console.error('Error al actualizar el comentario:', err.message);
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const result = await ComentarioModel.deleteComentario(id);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error al eliminar el comentario:', err);
      res.status(500).json({ error: 'Error al eliminar el comentario' });
    }
  }
}

module.exports = ComentarioController;