<template>
  <div v-if="atividades.length > 0" id="conteudo">
    <div
      v-for="atividade in atividades"
      :key="atividade._id"
      style="background-color: #352f44"
      id="card"
    >
      <div @click="openModal(atividade._id)">
        <p class="card-text">{{ atividade.nome }}</p>
      </div>
      <DetalhesAtividadeModal :ref="'modal_' + atividade._id">
        <div id="container">
          <ul>
            <li>
              <p>ATIVIDADE:</p>
              <span>{{ atividade.nome }}</span>
            </li>
            <li>
              <p>STATUS DA ATIVIDADE:</p>
              <span>{{ formatarStatus(atividade.status) }}</span>
            </li>
            <li>
              <p>ATIVIDADE CADASTRADA EM:</p>
              <span>{{ formatarData(atividade.data_inclusao) }}</span>
            </li>
            <li>
              <p>ATIVIDADE ENCERRADA EM:</p>
              <span> {{ formatarData(atividade.data_finalizacao) }}</span>
            </li>
          </ul>
          <div>
            <p>Título:</p>
            <input
              v-model="novo_nome"
              placeholder="Pressione para alterar"
              class="input-edit"
            />

            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                v-model="concluido"
                :checked="atividade.status"
              />
              <label class="form-check-label" for="flexSwitchCheckChecked"
                >Acione para marcar como concluído</label
              >
            </div>
          </div>
        </div>
        <div id="container-2">
          <div class="botoes">
            <button
              v-on:click="editarAtividade(atividade._id)"
              type="button"
              class="btn btn-outline-success"
            >
              Salvar
            </button>
          </div>
          <div class="botoes">
            <button
              v-on:click="deletarAtividade(atividade._id)"
              type="button"
              class="btn btn-outline-danger"
            >
              Apagar
            </button>
          </div>
        </div>
      </DetalhesAtividadeModal>
    </div>
  </div>
  <div v-else>
    <p>Nenhuma atividade encontrada.</p>
  </div>
</template>

<script>
import converteData from "../utils/converteData";
import DetalhesAtividadeModal from "./DetalhesAtividadeModal.vue";
import axios from "axios";

export default {
  components: {
    DetalhesAtividadeModal,
  },
  props: ["atividades"],
  data() {
    return {
      novo_nome: "",
      novo_status: "",
    };
  },
  methods: {
    formatarData(data) {
      return converteData.convertedToJs(data);
    },
    formatarStatus(estado) {
      if (estado === false) {
        return "Atividade Em Progresso";
      } else {
        return "Atividade Concluída";
      }
    },
    openModal(id) {
      this.novo_nome = this.atividades.find((a) => a._id === id).nome;
      this.$refs["modal_" + id][0].openModal();
    },
    editarAtividade(id) {
      let nova_atividade;

      if (this.concluido === true) {
        nova_atividade = {
          _id: id,
          nome: this.novo_nome,
          status: true,
          data_finalizacao: converteData.dateToMongodb(),
        };
      } else {
        nova_atividade = {
          _id: id,
          nome: this.novo_nome,
          status: false,
          data_finalizacao: "",
        };
      }

      axios
        .put(`http://localhost:3000/update/${id}`, nova_atividade, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deletarAtividade(id) {
      axios
        .delete(`http://localhost:3000/delete/${id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
ul li {
  list-style: none;
  margin: 8px;
  padding: 0px;
}

#conteudo {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4px;
}

#card {
  padding: 18px;
  /* flex-basis: calc(33.33% - 10px);
  max-width: calc(33.33% - 10px);*/
  margin: 4px;
  border-radius: 8px;
  color: #faf0e6;
  font-size: 1.2rem;
}

.input-edit {
  width: 300px;
  padding: 8px;
  margin: 4px 0 160px 0;
  border-radius: 5px;
}

#card:hover {
  color: #b9b4c7;
}

#container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

#container p {
  font-weight: 900;
  margin-bottom: 0px;
}

#container-2 {
  display: flex;
  justify-content: right;
}

.botoes {
  padding: 0.5vw;
}
</style>
