//Acessa o objeto "Documento" que representa a pagina html

//Seleciona o elemento com o id indicado do forumalario

document
  .getElementById("formulario-registro")

  //Adiciona o ouvinte de evento (submit) para capturar o envio do formulario
  .addEventListener("submit", function (event) {
    //Previne o comportamento padrao do formulario, ou seja, impede que ele seja enviado e recarregue a pagona
    event.preventDefault();

    //Captura os valores dos campos do formularios
    const name = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

    //Requisição HTTP para o endpoint de cadastro de usuario
    fetch("http://localhost:5000/api/v1/user", {
      //Realiza uma chamada http para o servidor(a rota definida)
      method: "POST",
      headers: {
        //A requisição será em formato json
        "Content-Type": "application/json",
      },
      //Transforma os dados do formulario de uma string json para serem enviados no corpo da req
      body: JSON.stringify({ name, cpf, email, password }),
    })
      .then((response) => {
        //Tratamento da resposta do servidor / API
        if (response.ok) {
          //verifica se a resposta foi bem sucedida (status 2xx(duzentos e alguma coisa))
          return response.json();
        }
        //Convertendo o erro em formato JSON
        return response.json().then((err) => {
          //Mensagem retornada do servidor acessada pela chave "error"
          throw new Error(err.error);
        });
      }) //Fechamento da then(response)
      .then((data) => {
        //executa a resposta de sucesso - retorna ao usuario final

        //Exibe um alerta para o usuario final (front) com o nome que acabou de ser cadastrado
        //alert("Usuário cadastrado com sucesso!");
        alert(data.message);
        //Exibe o log no terminal
        console.log("Usuario criado: ", data.user);

        //Reseta os campos do formulario após o sucesso do cadastro
        document.getElementById("formulario-registro").reset(); 
      })
      .catch((error) => {
        //Captura qualquer erro que ocorra durante o processo de requisição / resposta

        //Exibe alerta (front) com o erro processado
        alert("Erro no cadastro " + error.message);
        console.error("Erro:", error.message);
      });
  });
