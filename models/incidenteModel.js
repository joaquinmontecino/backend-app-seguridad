const { simpleExecute } = require('../config/database');

class IncidenteModel {

  static async getAllIncidentes() {
    const query = `
      SELECT i.*, u.latitude, u.longitude
      FROM Incidente i
      JOIN Ubicacion_Incidente u ON i.id_incidente = u.id_incidente
    `;
    const result = await simpleExecute(query);
    return result.rows;
  }

  static async getAll(){
    const query = `
      SELECT i.id_incidente, u.latitude, u.longitude
      FROM Incidente i
      JOIN Ubicacion_Incidente u ON i.id_incidente = u.id_incidente
    `;
    const result = await simpleExecute(query);
    return result.rows;
  }

  static async getIncidenteById(id) {
    const query = `
      SELECT i.*, u.latitude, u.longitude
      FROM Incidente i
      JOIN Ubicacion_Incidente u ON i.id_incidente = u.id_incidente
      WHERE i.id_incidente = $1
    `;
    const result = await simpleExecute(query, [id]);
    return result.rows[0];
  }

  static async createIncidente(incidenteData) {
    const { id_usuario, tipo, hora, fecha, descripcion, latitude, longitude } = incidenteData;
    const queryIncidente = `
      INSERT INTO Incidente (id_usuario, tipo, hora, fecha, descripcion)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const bindsIncidente = [id_usuario, tipo, hora, fecha, descripcion];
    const incidenteResult = await simpleExecute(queryIncidente, bindsIncidente);

    const id_incidente = incidenteResult.rows[0].id_incidente;

    const queryUbicacion = `
      INSERT INTO UBICACION_INCIDENTE (id_incidente, latitude, longitude)
      VALUES ($1, $2, $3) RETURNING *
    `;
    const bindsUbicacion = [id_incidente, latitude, longitude];
    const ubicacionResult = await simpleExecute(queryUbicacion, bindsUbicacion);

    return {
      incidente: incidenteResult.rows[0],
      ubicacion: ubicacionResult.rows[0]
    };

  }

  static async updateIncidente(id, incidenteData) {
    const { tipo, hora, fecha, descripcion } = incidenteData;
    const query = `
      UPDATE Incidente
      SET tipo = $1, hora = $2, fecha = $3, descripcion = $4
      WHERE id_incidente = $5 RETURNING *
    `;
    const binds = [tipo, hora, fecha, descripcion, id];
    const result = await simpleExecute(query, binds);
    return result[0];
  }

  static async deleteIncidente(id) {

    const queryUbicacion = 'DELETE FROM Ubicacion WHERE id_incidente = $1';
    await simpleExecute(queryUbicacion, [id]);

    const queryIncidente = 'DELETE FROM Incidente WHERE id_incidente = $1';
    await simpleExecute(queryIncidente, [id]);
    return { message: 'Incidente eliminado correctamente' };
  }
}

module.exports = IncidenteModel;