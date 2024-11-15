const UsuarioModel = require('../models/usuarioModel');
const UsuarioDTO = require('../dto/usuarioDTO');

class UsuarioController {

  static async getAll(req, res){
    try {
      const usuarios = await UsuarioModel.getAllUsuarios();
      res.status(200).json(usuarios);
    } catch (err){
      console.error('Error al obtener usuarios: ', err);
      res.status(500).json({ error: 'Error al obtener usuarios'});
    }
  }

  static async getById(req, res){
    const { id } = req.params;
    try {
      const usuario = await UsuarioModel.getUsuarioById(id);
      if (!usuario){
        return res.status(404).json({ error: 'Usuario no encontrado'});
      }
      res.status(200).json(usuario);
    } catch (err) {
      console.error('Error al obtener el usuario: ', err);
      res.status(500).json({ error: 'Error al obtener el usuario' });
    }
  }

  static async register(req, res){
    try {
      UsuarioDTO.validate(req.body);
      const usuarioData = new UsuarioDTO(req.body);

      const result = await UsuarioModel.registerUsuario(usuarioData);
      res.status(201).json(result);
    }
    catch (err){
      console.error('Error al registrar usuario:', err.message);
      res.status(400).json({ error: err.message });
    }
  }

  static async login(req, res){
    try {
      const { correo, contrasena} = req.body;
      const { token, rol} = await UsuarioModel.loginUsuario({ correo, contrasena});
      res.status(200).json({ token, rol});
    }
    catch (err){
      res.status(401).json({ error: err.message });
    }
  }

  static async update(req, res){
    const { id } = req.params;
    try {
      const UsuarioActual = await UsuarioModel.getUsuarioById(id);
      if(!UsuarioActual){
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const usuarioData = {
        ...UsuarioActual,
        ...req.body
      };

      UsuarioDTO.validatePartial(usuarioData);

      const usuarioActualizado = await UsuarioModel.updateUsuario(id, usuarioData);
      res.status(200).json(usuarioActualizado);
    } catch (err) {
      console.error( 'Error al actualizar el usuario: ', err.message);
      res.status(400).json({ error: err.message});
    }
  }

  static async delete(req, res){
    const { id } = req.params;
    try {
      const result = await UsuarioModel.deleteUsuario(id);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error al eliminar el usuario: ', err);
      res.status(500).json({ error: 'Error al eliminar el usuario'});
    }
  }
}

module.exports = UsuarioController;