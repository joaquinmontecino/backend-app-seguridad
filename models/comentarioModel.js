const { simpleExecute } = require('../config/database');

class ComentarioModel{

  static async getAllComentariosIncidente(id_incidente){
    const query = `
      SELECT c.*, u.nombre AS usuario_nombre
      FROM Comentario c
      JOIN Usuario u ON c.id_usuario = u.id
      WHERE c.id_incidente = $1
    `;
    const result = await simpleExecute(query, [id_incidente]);

    return result.rows;
  }

  static async getComentarioById(id_comentario){
    const query = `
      SELECT c.*, u.nombre AS usuario_nombre
      FROM Comentario c
      JOIN Usuario u ON c.id_usuario = u.id
      WHERE c.id_comentario = $1
    `;
    const result = await simpleExecute(query, [id_comentario]);
    return result.rows[0];
  }

  static async createComentario(comentarioData){
    const { id_incidente, id_usuario, comentario } = comentarioData;
    const query = `
      INSERT INTO Comentario (id_incidente, id_usuario, comentario)
      VALUES ($1, $2, $3) RETURNING *
    `;
    const binds = [id_incidente, id_usuario, comentario];
    const result = await simpleExecute(query, binds);
    return result.rows[0];
  }

  static async updateComentario(id_comentario, comentarioData){
    const { comentario } = comentarioData;
    const query = `
      UPDATE Comentario
      SET comentario = $1
      WHERE id_comentario = $2 RETURNING *
    `;
    const binds = [comentario, id_comentario];
    const result = await simpleExecute(query, binds);
    return result.rows[0];
  }

  static async deleteComentario(id_comentario){
    const query = 'DELETE FROM Comentario WHERE id_comentario = $1';
    await simpleExecute(query, [id_comentario]);
    return { message: 'Comentario eliminado correctamente' };
  }
}

module.exports = ComentarioModel;