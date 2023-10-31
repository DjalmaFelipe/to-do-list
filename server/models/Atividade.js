const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const atividadeSchema = new Schema({
    nome: String,
    status: Boolean,
    data_inclusao: Date,
    data_finalizacao: Date
    
  });
  
  const Atividade = mongoose.model('Atividade', atividadeSchema);
  
  module.exports = Atividade;