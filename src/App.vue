<template>
  <div class="init">
    <img src="./assets/TO DO LIST.svg" alt="" />
    <span style="color: #faf0e6">(◕‿◕)</span>
    <br />
    <AdicionarAtividade></AdicionarAtividade>
    <ManipulaAtividade :atividades="atividades"></ManipulaAtividade>
  </div>
</template>

<script>
import ManipulaAtividade from "./components/ManipulaAtividade.vue";
import AdicionarAtividade from "./components/AdicionarAtividade.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    ManipulaAtividade,
    AdicionarAtividade,
  },
  data() {
    return {
      atividades: [],
    };
  },
  created() {
    this.atualizarAtividades();
  },
  mounted() {
    this.obterAtividades();
  },
  methods: {
    obterAtividades() {
      axios
        .get("http://localhost:3000/all")
        .then((response) => {
          this.atividades = response.data;
        })
        .catch((error) => {
          console.error("Erro ao localizar os dados na API: " + error);
        });
    },
    atualizarAtividades() {
      setInterval(() => {
        this.obterAtividades();
      }, 2000); //tempo para atualizar as atividades;
    },
  },
};
</script>

<style>
img {
  width: 15%;
  margin-bottom: 40px;
}

.init {
  width: 1200px;
  margin: 16px auto;
}

h1 {
  text-align: center;
}

body {
  background-color: #5c5470;
}
</style>
