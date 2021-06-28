
//Aqui estamos conectando/chamando o html ao javascript.
const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');


//Essa função só faz o trabalho de criar um "li".
function criaLi() {
    const li = document.createElement('li');
    return li;
}


//Essa função faz com que o botão "Enter" tenha função, assim como o button para criar "li".
inputTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

//Essa função limpa a barra do input assim que o usuário digitar.
function limpaInput(){
    inputTarefa.value = ''; 
    inputTarefa.focus(); //Esse evento faz o cursos do mouse ficar ativo no input
}

//Criação do button 'apagar'
function criaBotaoApagar (li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button'); //Criamos um button e jogavamos dentro da var
    botaoApagar.innerText = 'Apagar'; //inserimos um texto dentro do button
    botaoApagar.setAttribute('class','apagar'); //add uma class no button
    botaoApagar.setAttribute('title', 'apagar esta tarefa'); //add um title no button
    li.appendChild(botaoApagar); //add o button como elemento filho de <li>
}

//Essa função é a criadora de (li).
function criaTarefa(textoInput) {
    const li = criaLi()
    li.innerText = textoInput; //Criando um li e inserindo o texto do input dentro
    tarefas.appendChild(li); //Adicionando li+texto como elemento filho de "tarefas"
    limpaInput(); //Limpando o input
    criaBotaoApagar(li); 
    salvarTarefas();
}

//Essa função dá ação ao button.
btnTarefa.addEventListener('click', function(){
    if (!inputTarefa.value) return; //Caso o input não tenha valor, retornar!
    criaTarefa(inputTarefa.value);
});

//Apagar tarefa(li)
document.addEventListener('click', function(e){
    const el = e.target; //e.target indica qual elemento está sendo clicado.

    if (el.classList.contains('apagar')) {  //Se o button conter a CLASSE APAGAR..
        el.parentElement.remove();
        salvarTarefas();
    }
});


//Salvar Tarefas
function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li'); 
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', ' ').trim(); //Trocando a palavra com replace. // a função trim, remove o espaço.
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); // JSON.STRINGIFY vai transformar o array em string.. Depois podemos pegar essa string e transformar em array de novo.
    localStorage.setItem('tarefas', tarefasJSON); //localStorage é um lugar no navegador para salvar arquivos. //  setItem para indicar o que eu quero salvar
}

function adicionaTarefasSalvas() { //Add novamente as tarefas e imprimilas na tela.
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas) {  
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas();