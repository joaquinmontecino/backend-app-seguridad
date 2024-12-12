const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { simpleExecute } = require('../config/database');

class UsuarioModel{

  static async getAllUsuarios(){
    const query = `SELECT nombre, correo FROM Usuario`;
    const result = await simpleExecute(query);
    return result;
  }

  static async getUsuarioById(id){
    const query = `SELECT nombre, correo FROM Usuario WHERE id_usuario = $1`;
    const result = await simpleExecute(query, [id]);
    return result[0];
  }

  static async privateGetUsuarioById(id){
    const query = `SELECT * FROM Usuario WHERE id_usuario = $1`;
    const result = await simpleExecute(query, [id]);
    return result[0];
  }

  static async registerUsuario(usuarioData){
    const { nombre, correo, password } = usuarioData;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `
          INSERT INTO Usuario (nombre, correo, password)
          VALUES ($1, $2, $3) RETURNING ID_Usuario`;

    const binds = [nombre, correo, hashedPassword];
    const result = await simpleExecute(query, binds);
    return result[0];
  }

  static async loginUsuario({correo, password}){
    const statement = `SELECT * FROM Usuario WHERE correo = $1`;
    const binds = [correo];

    const result = await simpleExecute(statement, binds);
    const usuario = result[0];
    if (!usuario || !await bcrypt.compare(password, usuario.password)) {
      throw new Error('Correo o contraseña incorrectos');
    }

    const token = jwt.sign(
      { id: usuario.id_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );

    const id_usuario = usuario.id_usuario;
    const nombre = usuario.nombre;
    return { id_usuario, nombre, token };
  }

  static async updateUsuario(id, usuarioData){
    const { nombre, correo, password } = usuarioData;
    const query= `
      UPDATE Usuario
      SET nombre = $1, correo = $2, password = $3
      WHERE id_usuario = $4 RETURNING *
    `;
    const binds = [nombre, correo, password, id];
    const result = await simpleExecute(query, binds);
    return result[0];
  }

  static async deleteUsuario(id){
    const query = `DELETE FROM Usuario WHERE id_usuario = $1`;
    await simpleExecute(query, [id]);
    return { message: 'Usuario eliminado correctamente'};
  }
}

module.exports = UsuarioModel;