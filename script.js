document.getElementById('cep-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const cep = document.getElementById('cep').value.trim();
    const errorMessage = document.getElementById('error-message');
    const result = document.getElementById('result');
    const loading = document.getElementById('loading');

    result.classList.add('hidden');
    errorMessage.textContent = '';

    if (!cep || !/^\d{5}-?\d{3}$/.test(cep)) {
        errorMessage.textContent = 'Por favor, insira um CEP válido.';
        return;
    }

    loading.classList.remove('hidden');

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/?nocache=${new Date().getTime()}`);

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();

        await delay(1500);

        loading.classList.add('hidden');

        if (data.erro) {
            errorMessage.textContent = 'CEP não encontrado. Tente novamente.';
        } else {
            document.getElementById('logradouro').textContent = data.logradouro;
            document.getElementById('bairro').textContent = data.bairro;
            document.getElementById('localidade').textContent = data.localidade;
            document.getElementById('uf').textContent = data.uf;
            document.getElementById('regiao').textContent = data.regiao;

            result.classList.remove('hidden');
        }
    } catch (error) {
        loading.classList.add('hidden');
        errorMessage.textContent = 'Erro ao buscar o endereço. Tente novamente.';
        console.error('Erro:', error);
    }
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
