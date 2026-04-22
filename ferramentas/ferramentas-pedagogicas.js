const botoesFerramentas = document.querySelectorAll('[data-ferramenta]');

botoesFerramentas.forEach(botao => {
  botao.addEventListener('click', () => {
    const ferramenta = botao.dataset.ferramenta;

    switch(ferramenta){
      case 'notas':
        alert('Abrir Calculadora de Notas');
        break;

      case 'atividades':
        alert('Abrir Gerador de Atividades');
        break;

      case 'sorteio':
        alert('Abrir Sorteador de Alunos');
        break;

      default:
        console.log('Ferramenta ainda não implementada.');
    }
  });
});