<template>
    <div>
        <input type="text" class="form-control form-control-md text-center"
            placeholder="informe uma atividade e pressione nova atividade para a inserir a lista" id="input"
            v-model="atividade">
        <div id="botao" v-on:click="adicionaValor" type="button" class="btn btn-outline-success">Nova Atividade</div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            atividade: ''
        };
    },
    name: "AdicionarAtividade",
    props: {
    },
    methods: {
        adicionaValor() {

            const dados_da_atividade = {
                nome: this.atividade,
                status: false,
                data_inclusao: '2023-10-29T17:37:23.649Z'
            }

            axios.post('http://localhost:3000/atividade', dados_da_atividade,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });



        }
    }
}
</script>

<style scoped>
#botao {
    position: fixed;
    bottom: 15%;
    right: 10%;
}

#input {
    position: fixed;
    bottom: 15%;
    right: 30%;
}

input {
    width: 50vw;
}
</style>