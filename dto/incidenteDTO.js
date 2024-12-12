class IncidenteDTO{
  constructor({id_usuario, tipo, hora, fecha, descripcion, latitude, longitude}){
    this.id_usuario = id_usuario;
    this.tipo = tipo;
    this.descripcion = descripcion;
    this.hora = hora || new Date().toLocaleTimeString('es-CL', {hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'});
    this.fecha = fecha || new Date().toLocaleDateString('es-CL', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('-').reverse().join('-');
    this.latitude = latitude;
    this.longitude = longitude;
  }

  //id_usuario, tipo, hora, fecha, descripcion, latitude, longitude

  static validate(incidenteData){
    const requiredFields = ['tipo'];

    for (let field of requiredFields) {
      if (!incidenteData[field]) {
        throw new Error(`El campo ${field} es requerido.`);
      }
    }

    // TODO: Validar tipos

    return true;
  }

  static validatePartial(incidenteData){
    // TODO: Validar tipos

    return true;
  }

  static getCurrentTime() {
    return new Date().toLocaleTimeString('es-CL', {hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'});
  }

  static getCurrentDate() {
    return new Date().toISOString().split('T')[0];
  }

}

module.exports = IncidenteDTO;