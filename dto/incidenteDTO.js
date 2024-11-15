class IncidenteDTO{
  constructor({tipo, descripcion}){
    this.tipo = tipo;
    this.descripcion = descripcion;
  }

  static validate(incidenteData){
    const requiredFields = ['tipo', 'hora', 'fecha'];

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

}

module.exports = IncidenteDTO;