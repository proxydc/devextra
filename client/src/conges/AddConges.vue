<template>
    <div>
      <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
        <strong>{{ error }}</strong>
      </div>
      <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
        <strong>{{ warning }}</strong>
      </div>
      <h1>Add Conges</h1>
      <div class="container w-50 p-3 my-1 bg-light border border-info">
        <form class="was-validated" @submit.prevent="addConges">
          <div class="register">
            <label for="lbtypeConges">Type Conges:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.conges.type_conges">
              <option v-for="(stadc,index) in TypeCongesList" :value="stadc.value" :key="index">{{ stadc.text }}</option>
            </select>
          </div>
            <label for="lbdatedebut">Date début</label>
            <input type="date" v-model="model.conges.date_debut" id="lbdatedebut" class="form-control" required />
            <label for="lbdatefin">Date fin</label>
            <input type="date" v-model="model.conges.date_fin" id="lbdatefin" class="form-control" required />

            <label for="lbdescription">Description</label>
            <input type="text" v-model="model.conges.descriptions" placeholder="Enter decription" id="lbdescription" class="form-control" />
            <button type="submit" class="js-new">Add Conges</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import urlacc from "../_helpers/urllist.js";
  import $ from "jquery";
  export default {
    name: "AddConges",
    data() {
      return {
        error: "",
        warning: "",
        TypeCongesList: [
        { value: 1, text: "CP" },
        { value: 2, text: "RTT" },
        { value: 3, text: "RTTE" },
        { value: 4, text: "AM" },
      ],
  
        model: {
          conges: {
            date_debut: "",
            date_fin: "",
            type_conges: 1,
            descriptions: "",
          }
        }
  
      };
    },
    mounted() {
    //  document.getElementById("lbdatedebut").focus();
      $(document).keypress(function (e) {
        if (e.which === 13) {
          // enter has been pressed, execute a click on .js-new:
          $(".js-new").first().click();
        }
      });
    },
    methods: {
      async addConges() {
        try {
          this.error = "";
          this.warning = "";
          alert("res: "+ this.model.conges.date_debut);
          const url = urlacc.getAddCongesUrl();
          let result = await axios.post(url, {
            date_debut: this.model.conges.date_debut,
            date_fin: this.model.conges.date_fin,
            type_conges: this.model.conges.type_conges,
            nbjours: 1,
            descriptions: this.model.conges.descriptions,
          });
          console.warn(result);
          switch (result.status) {
            case 201:
              this.$router.push({ name: 'conges' });
              break;
            case 202:
              this.warning = result.data;
              break;
            default:
              this.error = "Database error! Status: " + result.status + " Error: " + result.data;
              break;
          }
        }
        catch (err) {
          this.error = err
        }
      },
    },
  };
  </script>