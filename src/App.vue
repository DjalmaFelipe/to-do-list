<template>
  <h1 class="display-1"> TO DO LIST </h1>
  <br>
  <ManipulaAtividade :atividades="atividades"></ManipulaAtividade>
  <AdicionarAtividade></AdicionarAtividade>
</template>

<script>

import ManipulaAtividade from './components/ManipulaAtividade.vue'
import AdicionarAtividade from './components/AdicionarAtividade.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    ManipulaAtividade,
    AdicionarAtividade
  }, data() {
    return {
      atividades: []
    }
  }
  ,
  created() {
    this.atualizarAtividades();
  },
  mounted() {
    this.obterAtividades();
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
    },
    atualizarAtividades() {
      setInterval(() => {
        this.obterAtividades();
      }, 5000); //tempo para atualizar as atividades;
    }
  }
};

</script>

<style>
h1 {
  text-align: center;
}

body {
  background-color: black;
}
</style>
