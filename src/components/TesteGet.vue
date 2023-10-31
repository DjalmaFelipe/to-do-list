<template>
    <div v-if="atividades.length > 0" id="conteudo">
        <div v-for="atividade in atividades" :key="atividade._id" class="card text-bg-dark mb-3" id="card">
            <p class="card-text">{{ atividade.nome }}</p>
        </div>
    </div>
    <div v-else>
        <p>Nenhuma atividade encontrada.</p>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            atividades: []
        };
    }, created() {
        this.atualizarAtividades();
    },
    mounted() {
        this.obterAtividades(); // Chama a função para obter as atividades quando o componente é montado
    },
    methods: {
        obterAtividades() {
            axios.get('http://localhost:3000/all')
                .then((response) => {
                    this.atividades = response.data;
                })
                .catch((error) => {
                    console.error('Erro ao localizar os dados na API: ' + error);
                });
        }, atualizarAtividades() {
            setInterval(() => {
                this.obterAtividades();
            }, 5000);
        }
    }
};
</script>

<style scoped>
#conteudo {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
}

#card {
    padding: 1%;
    flex: 1;
    flex-basis: calc(33.33% - 10px);
    max-width: calc(33.33% - 10px);
    margin: 5px;
}
</style>
  