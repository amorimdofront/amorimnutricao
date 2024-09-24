const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); // Permite todas as origens
const port = 3000;

// Configuração do body-parser para lidar com os dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'amorimdoscodigo',  // Altere para seu usuário do MySQL
  password: 'pega1234',  // Altere para sua senha do MySQL
  database: 'amorimnutricao'
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// Rota para processar os dados enviados pelo formulário
app.post('/processar-dados', (req, res) => {
  console.log('Requisição recebida:', req.body); // Verifique se os dados estão chegando
  const { nome, telefone, peso, altura, idade, objetivo, calorias, genero, exercicio, treino } = req.body;

  // Verifique se todos os campos estão sendo enviados corretamente
  if (!nome || !telefone || !peso || !altura || !idade || !objetivo || !calorias || !genero || !exercicio || !treino) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  // Consulta SQL para inserir dados no banco
  const sql = `INSERT INTO usuarios (nome, telefone, peso, altura, idade, objetivo, calorias, genero, atividade_fisica, treino) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(sql, [nome, telefone, peso, altura, idade, objetivo, calorias, genero, exercicio, treino], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao processar os dados.');
      return;
    }
    console.log('Dados inseridos com sucesso:', result);
    res.send('Dados inseridos com sucesso!');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
