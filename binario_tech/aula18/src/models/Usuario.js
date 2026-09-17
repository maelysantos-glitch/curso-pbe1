const mongoose = require('mongoose');


const logAcessoSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  dispositivo: { type: String, required: true },
  dataAcesso: { type: Date, default: Date.now }
});

const usuarioSchema = new mongoose.Schema({
  nomeCompleto: { type: String, required: true },
  
  
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  
  
  senha: { type: String, required: true },
  
  
  perfilAcesso: {
    type: String,
    enum: ['ADMINISTRADOR', 'OPERADOR', 'CLIENTE'],
    default: 'CLIENTE'
  },
  
 
  historicoAcessos: [logAcessoSchema],
  
 
  status: { 
    type: String, 
    enum: ['ATIVO', 'INATIVO', 'BLOQUEADO'], 
    default: 'ATIVO' 
  }
}, {
  
  timestamps: true 
});

module.exports = mongoose.model('Usuario', usuarioSchema);

