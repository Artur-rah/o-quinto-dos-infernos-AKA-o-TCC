// Selecionando os elementos da tela
const form = document.getElementById('form-item');
const containerItens = document.getElementById('container-itens');

// Função para carregar os itens salvos no localStorage (ou array vazio se não tiver nada)
let itens = JSON.parse(localStorage.getItem('achados_perdidos')) || [];

// Funcionalidade 1: Salvar um novo item
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que a página recarregue

    // Pegando os valores digitados
    const novoItem = {
        id: Date.now(), // Gera um ID único baseado na hora
        nome: document.getElementById('nome').value,
        data: document.getElementById('data').value,
        local: document.getElementById('local').value,
        descricao: document.getElementById('descricao').value
    };

    // Adiciona no array e salva no localStorage
    itens.push(novoItem);
    localStorage.setItem('achados_perdidos', JSON.stringify(itens));

    // Limpa o formulário e atualiza a lista na tela
    form.reset();
    renderizarItens();
});

// Funcionalidade 3: Remover (Devolver) um item
function devolverItem(id) {
    // Filtra o array para manter apenas os itens com ID diferente do que foi clicado
    itens = itens.filter(item => item.id !== id);
    
    // Atualiza o banco de dados local
    localStorage.setItem('achados_perdidos', JSON.stringify(itens));
    
    // Atualiza a tela
    renderizarItens();
}

// Funcionalidade 2: Listar os itens na tela
function renderizarItens() {
    containerItens.innerHTML = ''; // Limpa a lista antes de desenhar de novo

    if (itens.length === 0) {
        containerItens.innerHTML = '<p>Nenhum item registrado no momento.</p>';
        return;
    }

    // Percorre o array e cria o HTML para cada item
    itens.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card-item';
        
        // Formata a data de AAAA-MM-DD para DD/MM/AAAA
        const dataFormatada = item.data.split('-').reverse().join('/');

        card.innerHTML = `
            <h3>${item.nome}</h3>
            <p><strong>Encontrado em:</strong> ${dataFormatada}</p>
            <p><strong>Local:</strong> ${item.local}</p>
            <p><strong>Detalhes:</strong> ${item.descricao}</p>
            <button class="btn-devolver" onclick="devolverItem(${item.id})">Devolver ao Dono</button>
        `;
        
        containerItens.appendChild(card);
    });
}

// Quando a página abre, renderiza os itens que já estão salvos
renderizarItens();
