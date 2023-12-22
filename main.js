class Tarefa {
    
    constructor() {

        this.id = 1;
        this.arrayTarefas = [];
        this.editId = null;
        this.tarefaInput = document.getElementById('tarefa');
        this.prioridadeInput = document.getElementById('prioridade');
        this.prazoInput = document.getElementById('prazo');
        this.statusInput = document.getElementById('status'); 
        this.form = document.getElementById('form');
        this.tabela = document.getElementById('tabela');
        this.tbody = document.getElementById('tbody');

    }

    salvar() {

        let tarefa = this.lerDados();

        if (this.validaCampos(tarefa)) {

            if (this.editId == null) {
                this.adicionar(tarefa);
            } else {
                this.atualizar(this.editId, tarefa);
            }

        }

        this.listaTabela();
        this.cancelar();
    }

    listaTabela() {

        this.tbody.innerHTML = '';

        for (let i = 0; i < this.arrayTarefas.length; i++) {
            this.adicionarTarefaNaTabela(this.arrayTarefas[i]);
        }

    }

    adicionarTarefaNaTabela(tarefa) {

        let tr = this.tbody.insertRow();

        let td_id = tr.insertCell();
        let td_tarefa = tr.insertCell();
        let td_prioridade = tr.insertCell();
        let td_prazo = tr.insertCell();
        let td_status = tr.insertCell(); 
        let td_acoes = tr.insertCell();

        td_id.innerText = tarefa.id;
        td_tarefa.innerText = tarefa.txtTarefa;
        td_prioridade.innerText = tarefa.prioridade;
        td_prazo.innerText = tarefa.prazo;
        td_status.innerText = tarefa.status;

        td_id.classList.add('center');

        if (tarefa.status === 'Em andamento') {
            td_status.style.fontWeight = 'bold';
            td_status.style.color = 'rgb(211, 185, 36)';
        } else if (tarefa.status === 'Concluído') {
            td_status.style.fontWeight = 'bold';
            td_status.style.color = 'rgb(13, 167, 64)';
        } else if (tarefa.status === 'Pendente') {
            td_status.style.fontWeight = 'bold';
            td_status.style.color = 'red';
        }

        let imgEdit = document.createElement('img');
        imgEdit.src = 'img/pen-to-square-regular.svg';
        imgEdit.style.marginRight = '5px';
        imgEdit.setAttribute("onclick", `tarefa.abrirEditor(${JSON.stringify(tarefa)})`);
        td_acoes.appendChild(imgEdit);

        let imgDelete = document.createElement('img');
        imgDelete.src = 'img/trash-can-regular.svg';
        imgDelete.style.marginLeft = '5px';
        imgDelete.setAttribute("onclick", `tarefa.deletar(${tarefa.id})`);
        td_acoes.appendChild(imgDelete);

    }

    adicionar(tarefa) {

        this.arrayTarefas.push(tarefa);
        this.id++;

    }

    atualizar(id, tarefa) {

        for (let i = 0; i < this.arrayTarefas.length; i++) {

            if (this.arrayTarefas[i].id === id) {
                this.arrayTarefas[i].txtTarefa = tarefa.txtTarefa;
                this.arrayTarefas[i].prioridade = tarefa.prioridade;
                this.arrayTarefas[i].prazo = tarefa.prazo;
                this.arrayTarefas[i].status = tarefa.status;
            }

        }

    }

    abrirEditor(dados) {

        this.editId = dados.id;

        this.tarefaInput.value = dados.txtTarefa;
        this.prioridadeInput.value = dados.prioridade;
        this.prazoInput.value = dados.prazo;
        this.statusInput.value = dados.status;

        document.getElementById('btnAdicionar').innerText = 'Atualizar';
        toggleForm(); 

    }

    lerDados() {

        let tarefa = {}

        tarefa.id = this.id;
        tarefa.txtTarefa = this.tarefaInput.value;
        tarefa.prioridade = this.prioridadeInput.value;
        tarefa.prazo = this.prazoInput.value;
        tarefa.status = this.statusInput.value;

        return tarefa;

    }

    validaCampos(tarefa) {

        let msg = '';

        if (tarefa.txtTarefa === '') {
            msg += '- Digite a tarefa \n';
        }

        if (tarefa.prioridade === '') {
            msg += '- Informe a prioridade da tarefa \n';
        }

        if (tarefa.prazo === '') {
            msg += '- Informe o prazo da tarefa \n';
        }

        if (msg !== '') {
            alert(msg);
            return false;
        }

        return true;
        
    }

    cancelar() {

        this.tarefaInput.value = '';
        this.prioridadeInput.value = '';
        this.prazoInput.value = '';
        this.statusInput.value = 'Pendente';

        document.getElementById('btnAdicionar').innerText = 'Adicionar';
        this.editId = null;
        toggleForm(); 

    }

    deletar(id) {

        if (confirm('Deseja realmente deletar a tarefa de ID ' + id + '?')) {
            let tbody = document.getElementById('tbody');

            for (let i = 0; i < this.arrayTarefas.length; i++) {
                if (this.arrayTarefas[i].id === id) {
                    this.arrayTarefas.splice(i, 1);
                    tbody.deleteRow(i);

                }
            }
        }
    }
}

function toggleForm() {

    const form = document.getElementById('form');
    const tabela = document.getElementById('tabela');
    form.style.display = form.style.display === 'none' ? 'flex' : 'none';
    tabela.style.display = 'flex';

}

const tarefa = new Tarefa();