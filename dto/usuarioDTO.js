class UsuarioDTO {
  constructor({ nombre, correo, password }) {
    this.nombre = nombre;
    this.correo = correo;
    this.password = password;
  }

  static validate(usuarioData) {
    const requiredFields = ['nombre', 'correo', 'password'];

    for (let field of requiredFields) {
      if (!usuarioData[field]) {
        throw new Error(`El campo ${field} es requerido.`);
      }
    }

    // Validación de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuarioData.correo)) {
      throw new Error('El correo debe tener un formato válido.');
    }

    return true;
  }

  static validatePartial(usuarioData) {

    if (usuarioData.correo) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(usuarioData.correo)) {
        throw new Error('El correo debe tener un formato válido.');
      }
    }

    return true;
  }
}

module.exports = UsuarioDTO;
