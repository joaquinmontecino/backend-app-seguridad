class ComentarioDTO {
  constructor({ id_incidente, id_usuario, comentario }) {
    this.id_incidente = id_incidente;
    this.id_usuario = id_usuario;
    this.comentario = comentario;
  }

  static validate(usuarioData) {
    const requiredFields = ['id_incidente', 'id_usuario', 'comentario'];

    for (let field of requiredFields) {
      if (!usuarioData[field]) {
        throw new Error(`El campo ${field} es requerido.`);
      }
    }

    return true;
  }

  static validatePartial(usuarioData) {

    const requiredFields = ['comentario'];

    for (let field of requiredFields) {
      if (!usuarioData[field]) {
        throw new Error(`El campo ${field} es requerido.`);
      }
    }

    return true;
  }
}

module.exports = ComentarioDTO;
