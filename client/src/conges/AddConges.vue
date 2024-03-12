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
              <option v-for="(stadc, index) in TypeCongesList" :value="stadc.value" :key="index">{{ stadc.text }}
              </option>
            </select>
          </div>
          <label for="lbdatedebut">Date début</label>
          <input type="date" v-model="model.conges.date_debut" id="lbdatedebut" class="form-control" required />
          <label for="lbdatefin">Date fin</label>
          <input type="date" v-model="model.conges.date_fin" id="lbdatefin" class="form-control" required />
          <button class="bi bi-copy btn btn-outline-success btn-sm mx-1"
            @click="getNbjours(model.conges.date_debut, model.conges.date_fin)" v-b-tooltip.hover
            title="Copy the URL"></button>
          <label for="lbnbjours">Nb. jours</label>
          <input type="text" v-model="model.conges.nbjours" id="lbnbjours" class="form-control" required />

          <label for="lbdescription">Description</label>
          <input type="text" v-model="model.conges.descriptions" placeholder="Enter decription" id="lbdescription"
            class="form-control" />
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
          nbjours: 0,
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
        alert("res: " + this.model.conges.date_debut);
        const url = urlacc.getAddCongesUrl();
        let result = await axios.post(url, {
          date_debut: this.model.conges.date_debut,
          date_fin: this.model.conges.date_fin,
          type_conges: this.model.conges.type_conges,
          nbjours: this.model.conges.nbjours,//this.getNbjours(this.model.conges.date_debut, this.model.conges.date_fin),
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
    getNbjours(dtdebut, dtfin) {
      if (dtdebut == dtfin) this.model.conges.nbjours = 1;
      else {
        this.model.conges.nbjours = this.calcBusinessDays(dtdebut, dtfin);
      }
    },
    calcBusinessDays(dDate1, dDate2) {         // input given as Date objects

      var iWeeks, iDateDiff, iAdjust = 0;
      dDate1 = new Date(dDate1);
      dDate2 = new Date(dDate2);
      if (dDate2 < dDate1) return -1;                 // error code if dates transposed

      var iWeekday1 = dDate1.getDay();                // day of week
      var iWeekday2 = dDate2.getDay();

      iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1;   // change Sunday from 0 to 7
      iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;

      if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1;  // adjustment if both days on weekend

      iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1;    // only count weekdays
      iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;

      // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
      iWeeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000)

      if (iWeekday1 <= iWeekday2) {
        iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
      } else {
        iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
      }

      iDateDiff -= iAdjust                            // take into account both days on weekend

      return (iDateDiff + 1);                         // add 1 because dates are inclusive

    }
  },

};
</script>