let generoSelecionado = '';

function selecionarGenero(genero) {
    generoSelecionado = genero;
    document.getElementById('genero').value = generoSelecionado;
}

function enviarDados() {
    
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const genero = document.getElementById('genero').value;
const peso = document.getElementById('peso').value;
const altura = document.getElementById('altura').value;
const idade = document.getElementById('idade').value;
const objetivo = document.getElementById('objetivo').value;
const calorias = document.getElementById('calorias').value;
const nivelAtividade = document.getElementById('exercicio').value;
const localTreino = document.getElementById('treino').value;
const generom = document.getElementById('masculino').value;
const generof = document.getElementById('feminino').value;

 // Remover vírgulas e converter para número
 const pesoFormulado = Number(peso.replace(',', '.'));
 let alturaFormulada = Number(altura.replace(',', '.'));

 // Verificar se a altura está em centímetros e converter para metros
 if (alturaFormulada > 3) { // Alturas maiores que 3 estão provavelmente em centímetros
     alturaFormulada = alturaFormulada / 100;
 }

 // Verificar se a altura e o peso foram convertidos corretamente
 if (!isNaN(pesoFormulado) && !isNaN(alturaFormulada) && alturaFormulada > 0) {
     // Calcula o IMC

     const calculoIMC = pesoFormulado / (alturaFormulada * alturaFormulada);

     // Definir resultado do IMC
     let resultadoimc = '';

     if (calculoIMC < 17) {
         resultadoimc = "Você está muito abaixo do peso";
     } else if (calculoIMC >= 17 && calculoIMC < 18.5) {
         resultadoimc = "Você está abaixo do peso";
     } else if (calculoIMC >= 18.5 && calculoIMC < 25) {
         resultadoimc = "Você está com peso normal";
     } else if (calculoIMC >= 25 && calculoIMC < 30) {
         resultadoimc = "Você está acima do peso";
     } else if (calculoIMC >= 30 && calculoIMC < 35) {
         resultadoimc = "Você está com obesidade grau I";
     } else if (calculoIMC >= 35 && calculoIMC < 40) {
         resultadoimc = "Você está com obesidade grau II";
     } else {
         resultadoimc = "Você está com obesidade grau III (mórbida)";
     }
     const dadosUsuario = {
        nome,
        telefone,
         peso,
         altura,
         idade,
         objetivo,
         calorias,
         nivelAtividade,
         localTreino,
         calculoIMC: calculoIMC.toFixed(2),// Formata o IMC com 2 casas decimais
         resultadoimc,
          genero


     };
    

     const resultado = document.getElementById('resultadocontainer');

     if (peso && altura && idade && objetivo && calorias && nivelAtividade && localTreino && nome && telefone) {
         // Converte o objeto em uma string formatada
         let dadosFormatados = '<h2>Dados do Usuário:</h2>';
         for (const [chave, valor] of Object.entries(dadosUsuario)) {
             dadosFormatados += `<p><strong>${chave.charAt(0).toUpperCase() + chave.slice(1)}:</strong> ${valor}</p>`;
         }

         // Atualiza o conteúdo da div
         resultado.innerHTML = dadosFormatados;
     } else {
         alert("Preencha todos os campos, Por Favor!!");
     }
 } else {
     alert("Verifique se os valores de peso e altura estão corretos!");
 }
}

function formatarAltura(input) {
 let valor = input.value.replace(/[^0-9]/g, ''); // Remove todos os caracteres não numéricos
 if (valor.length === 0) {
     input.value = '';
     return;
 }
}

function limitarEntrada(input) {
 const maxLength = 5; // Ajuste o comprimento máximo se necessário
 let valor = input.value.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
 if (valor.length > maxLength) {
     valor = valor.slice(0, maxLength);
 }

 // Adiciona a vírgula na posição correta
 if (valor.length > 2) {
     valor = valor.slice(0, -2) + ',' + valor.slice(-2);
 }

 // Atualiza o valor do input
 input.value = valor;
}

document.getElementById("montardieta").addEventListener("click", function() {
    window.open("planos.html", "_blank"); // Substitua pela URL da página de destino
});

document.getElementById('formularDados').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio tradicional do formulário e o recarregamento da página

    // Capturando os dados do formulário
    const formData = new FormData(this);

    // Converte os dados do FormData em um objeto JSON
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Envia os dados para o servidor
    fetch('http://localhost:3000/processar-dados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao enviar dados');
      }
      return response.text();
    })
    .then(result => {
      alert(result); // Exibe uma mensagem de sucesso
      document.getElementById('formularDados').reset(); // Limpa o formulário após o envio
    })
    .catch(error => {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao enviar dados.');
    });
});

