<template>
  <div class="atvd">
    <input
      type="text"
      class="form-control form-control-md text-center"
      placeholder="clique aqui para digitar uma nova atividade"
      id="input"
      v-model="atividade"
    />
    <div
      id="botao"
      v-on:click="adicionaValor"
      type="button"
      class="btn btn-outline-success"
    >
      <h3>❯</h3>
    </div>
  </div>
</template>

<script>
import converteData from "../utils/converteData";
import axios from "axios";

export default {
  data() {
    return {
      atividade: "",
    };
  },
  name: "AdicionarAtividade",
  props: {},
  methods: {
    adicionaValor() {
      const dados_da_atividade = {
        nome: this.atividade,
        status: false,
        data_inclusao: converteData.dateToMongodb(),
      };

      axios
        .post("http://localhost:3000/atividade", dados_da_atividade, {
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
  },
};
</script>

<style scoped>
.atvd {
  display: grid;
  grid-template-columns: 6fr 1fr;
  gap: 10px;
  margin-bottom: 28px;
}

#botao {
  padding-top: 12px;
  font-size: x-large;
  font-weight: 900;
  border: 4px solid #352f44;
  color: #faf0e6;
}

#botao:hover {
  background-color: #352f44;
}

#input {
  border: 4px solid #352f44;
  background-color: #b4b4b3;
}

#input:focus {
  background-color: #f0f0f0;
}

/* #botao {
  position: fixed;
  bottom: 15%;
  right: 10%;
} */

/* #input {
  position: fixed;
  bottom: 15%;
  right: 30%;
} */

/* input {
  width: 50vw;
} */
</style>
