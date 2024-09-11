document.getElementById('cep-form').addEventListener('submit', function (e) {
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

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            loading.classList.add('hidden');

            if (data.erro) {
                errorMessage.textContent = 'CEP não encontrado. Tente novamente.';
            } else {
                document.getElementById('logradouro').textContent = data.logradouro;
                document.getElementById('bairro').textContent = data.bairro;
                document.getElementById('localidade').textContent = data.localidade;
                document.getElementById('uf').textContent = data.uf;
                result.classList.remove('hidden');
            }
        })
        .catch(() => {
            loading.classList.add('hidden');
            errorMessage.textContent = 'Erro ao buscar o endereço. Tente novamente.';
        });
});
