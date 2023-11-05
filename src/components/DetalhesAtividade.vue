<template>
    <div>
      <h1>Detalhes da Atividade {{ id }}</h1>
      <button @click="mostrarModal">Mostrar Detalhes</button>
      <DetalhesAtividadeModal v-if="modalVisivel" @fechar="fecharModal" />
    </div>
  </template>
  
  <script>
  import DetalhesAtividadeModal from './DetalhesAtividadeModal.vue';
  
  export default {
    props: ['id'],
    components: {
      DetalhesAtividadeModal
    },
    data() {
      return {
        modalVisivel: false
      };
    },
    methods: {
      mostrarModal() {
        this.modalVisivel = true;
      },
      fecharModal() {
        this.modalVisivel = false;
      }
    }
  }
  </script>
  