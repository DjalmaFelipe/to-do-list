<template>
  <h1 class="display-1"> TO DO LIST </h1>
  <br>
    <TesteGet></TesteGet>
    <AdicionarAtividade></AdicionarAtividade>
</template>

<script>

import TesteGet from './components/TesteGet.vue';
import AdicionarAtividade from './components/AdicionarAtividade.vue';

export default {
  name: 'App',
  components: {
    TesteGet,
    AdicionarAtividade
  }, data(){
    return {
    
    }
  }
}
</script>

<style>
h1 {
  text-align: center;
}
body {
  background-color: black;
}
</style>
