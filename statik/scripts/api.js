/**
 * Responsável por:
 *  - capturar o submit do formuláro.
 *  - Realziar a request AJAX.
 *  - Validar o resultado.
 *  - Formatar o resultado da consulta.
 *  - Exibir o resultado da consulta.
 *  - Armazenar os intens pesquisados no histórico.
 */

/**
 * Responssável por capturar o click do botão para apagar a lista de pesquisa.
 */
const button_reset = document.querySelector('.button-reset');
button_reset.addEventListener('click', (event) => {
  document.querySelector('.box-historic .content-result').innerHTML = '';
});

// coleto o formulário
const form = document.querySelector('.form');

// crio uma interceptação do submit do formulário
form.addEventListener("submit", (event) => {

  // bloqueio o submit do form.
  event.preventDefault();


  var person = document.querySelector('.person');

  // caso não seja informado um númro válido
  if(person.value == ''){
    showError();
    exit;
  }

  requestAjax(person.value);

  // libera o form para outro submit
  event.preventDefault = false;
});

/**
 * responsável pela requisição AJAX para coleta de dados.
 */
function requestAjax(people) {

  let url = 'https://swapi.co/api/people/'+people;
  // ES6 Fetch docs
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  fetch(url)
    .then(response => {
        if (response.ok) {
            return Promise.resolve(response);
        }
        else {
          showError();
        }
    })
    .then(response => response.json()) // parse response as JSON
    .then(data => {
      parser(data);
      log(data);
    })
    .catch(function(error) {
        console.log(`Error: ${error.message}`);
    });

}

/**
 * Responsável por realizar o parser dos dados para a view.
 *
 * @param json data
 */
function parser(data) {
  var html = '';

  Object.keys(data).forEach( (key, value) => {

    if( !Array.isArray(data[key]) ){
      html += '<tr>';
        html += '<td>' +key+'</td>';
        html += '<td>' +data[key]+'</td>';
      html += '</tr>';
    }

  });

  document.querySelector('.box-person-data .content-result').innerHTML = html;
}

/**
 * Responsável por armazenar os nomes das personagens pesquisadas.
 *
 * @param json data
 */
function log(data) {

  var line  = '';
      line += '<tr>';
        line += '<td>Name</td>';
        line += '<td>'+data['name']+'</td>';
      line += '</tr>';

  document.querySelector('.box-historic .content-result').innerHTML += line;
}

function showError() {

  var msg = 'Personagem desejado não encontrado.'
  var html = '<tr>';
        html += '<td class="error">' +msg+'</td>';
      html += '</tr>';

  document.querySelector('.box-person-data .content-result').innerHTML = html;
}
