
async function consultarFrete() {
    const inputCep = document.getElementById('cep-input');
    const msgStatus = document.getElementById('mensagem-status');
    const boxResultado = document.getElementById('resultado-frete');

   
    const cepLimpo = inputCep.value.replace(/\D/g, '');

   
    msgStatus.textContent = '';
    msgStatus.className = 'status-msg';
    boxResultado.style.display = 'none';


    if (cepLimpo.length !== 8) {
        msgStatus.textContent = 'Por favor, digite um CEP válido com 8 dígitos.';
        msgStatus.classList.add('erro');
        return;
    }

    msgStatus.textContent = 'Buscando CEP... Aguarde.';
    msgStatus.classList.add('carregando');

    try {
      
        const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

        if (!resposta.ok) {
            throw new Error('Falha na conexão com o serviço de CEP.');
        }

        const dados = await resposta.json();

        
        if (dados.erro) {
            throw new Error('CEP não encontrado em nossa base de dados.');
        }

      
        document.getElementById('info-endereco').textContent = `${dados.logradouro}, ${dados.bairro}`;
        document.getElementById('info-cidade').textContent = `${dados.localidade} - ${dados.uf}`;

        msgStatus.textContent = '';
        boxResultado.style.display = 'block'; 
    } catch (erro) {
       
        msgStatus.textContent = `Ops! ${erro.message || 'Não foi possível consultar o frete no momento.'}`;
        msgStatus.className = 'status-msg erro';
        boxResultado.style.display = 'none';
    }
}