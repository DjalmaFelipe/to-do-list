const express = require('express');
const connectToDb = require('./database/db.js');
const Atividade = require('./models/Atividade.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.send();
});

connectToDb();


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send("bem vindo a API - todolist");
} )

app.get('/all', async (req, res) => {
try {
  const atividades = await Atividade.find({});
  res.json(atividades);
} catch (error) {
  console.error('Erro ao obter os dados:', error);
  res.status(500).json({ message: 'Erro interno do servidor' });
}
})

app.post('/atividade', async (req, res) => {
  const { nome, status, data_inclusao } = req.body;

  try {
    const atividade = new Atividade({
      nome,
      status,
      data_inclusao
    });

    await atividade.save();
  } catch(error){
    console.error('erro ao obter dados:', error);
    res.status(500).json({message: 'erro interno do servidor'});
  }
})

app.put('/update/:id', async (req, res) => {
  const atividadeId = req.params.id;
  const { nome, status, data_finalizacao } = req.body;

  try {
    const atividade = await Atividade.findByIdAndUpdate(atividadeId, {
      nome,
      status,
      data_finalizacao
    }, { new: true });

    if (!atividade) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    res.json({ message: 'Atividade atualizada com sucesso', atividade });
  } catch (error) {
    console.error('Erro ao atualizar a atividade:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.delete('/delete/:id', async (req, res) => {
  const atividadeId = req.params.id;

  try {
    const result = await Atividade.deleteOne({ _id: atividadeId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    res.json({ message: 'Atividade deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar a atividade:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});