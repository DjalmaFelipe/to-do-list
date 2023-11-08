const converteData = {
  dateJs() {
    const dataAtual = new Date();

    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1;
    const dia = dataAtual.getDate();
    const hora = dataAtual.getHours();
    const minuto = dataAtual.getMinutes();
    const segundo = dataAtual.getSeconds();

    const dataFormatada = `${ano}-${mes < 10 ? "0" + mes : mes}-${
      dia < 10 ? "0" + dia : dia
    } às ${hora}:${minuto}:${segundo}`;

    return dataFormatada;
  },

  convertedToJs(dataMongodb) {
    if (
      dataMongodb === undefined ||
      dataMongodb === "" ||
      dataMongodb === null
    ) {
      return "Data ainda não foi definida";
    } else {
      const ano = dataMongodb.substring(0, 4);
      const mes = dataMongodb.substring(5, 7);
      const dia = dataMongodb.substring(8, 10);
      const hora = dataMongodb.substring(11, 13);
      const minuto = dataMongodb.substring(14, 16);
      const segundo = dataMongodb.substring(17, 19);

      return (
        dia +
        "-" +
        mes +
        "-" +
        ano +
        " às " +
        hora +
        ":" +
        minuto +
        ":" +
        segundo
      );
    }
  },

  dateToMongodb() {
    const dataAtual = new Date();
    dataAtual.setHours(dataAtual.getHours() - 3);
    return dataAtual.toISOString();

    //const datejs = this.dateJs();

    // '"2023-11-05 às 15:11:49"'  - esse é o formato que o datejs() está passando;

    /* const ano = datejs.substring(0, 4);
    const mes = datejs.substring(5, 7);
    const dia = datejs.substring(8, 10);
    var hora = datejs.substring(14, 16);
    var minuto = datejs.substring(17, 19);
    var segundo;

    // tratamento de erro para segundos com apenas um digito
    if (datejs.substring(20, 22) < 10) {
      segundo = "0" + datejs.substring(20, 22);
    } else {
      segundo = datejs.substring(20, 22);
    }

    return (
      ano +
      "-" +
      mes +
      "-" +
      dia +
      "T" +
      hora +
      ":" +
      minuto +
      ":" +
      segundo +
      ".000Z"
    );*/
  },
};

export default converteData;
