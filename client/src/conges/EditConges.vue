<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <h1>Edit Conges</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="editConges">
        <div class="register">
          <label for="lbtypeConges">Type Conges:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.conges.type_conges">
              <option v-for="(stadc, index) in TypeCongesList" :value="stadc.value" :key="index">{{ stadc.text }}
              </option>
            </select>
          </div>
          <label for="lbdatedebut">Date début</label>
          <input type="date" v-model="model.conges.date_debut" id="lbdatedebut" class="form-control" required
            @blur="getNbjours(model.conges.date_debut, model.conges.date_fin)" />
          <label for="lbdatefin">Date fin</label>
          <input type="date" v-model="model.conges.date_fin" id="lbdatefin" class="form-control" required
            @blur="getNbjours(model.conges.date_debut, model.conges.date_fin)" />
          <label for="lbnbjours">Nb. jours</label>
          <input type="text" v-model="model.conges.nbjours" id="lbnbjours" class="form-control"
            @blur="getNbjours(model.conges.date_debut, model.conges.date_fin)" required />

          <label for="lbdescription">Description</label>
          <input type="text" v-model="model.conges.descriptions" placeholder="Enter decription" id="lbdescription"
            class="form-control" />
          <button type="submit" class="js-new">Edit Conges</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import urlconges from "../_helpers/urllist.js";
import axios from "axios";
import $ from "jquery";
export default {
  name: "EditConges",
  data() {
    return {
      error: '',
      warning: "",
      TypeCongesList: [
        { value: 1, text: "CP" },
        { value: 2, text: "RTT" },
        { value: 3, text: "RTTE" },
        { value: 4, text: "AM" },
        { value: 5, text: "JF" },
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
    this.getCongesData(this.$route.params.id);
    
    $(document).keypress(function (e) {
      if (e.which === 13) {
        // enter has been pressed, execute a click on .js-new:
        $(".js-new").first().click();
        e.preventDefault();
      }
    });
  },

  methods: {
    getCongesData(congesId) {
      const url = urlconges.getEditDelCongesUrl(congesId);
      //alert("url: " + url);
      axios.get(url).then(res => {
        console.log(res.data);
        if (res.status == 200)
        {  this.model.conges = res.data[0];
          this.model.conges.date_debut = this.getDatePickerDate(this.model.conges.date_debut);
          this.model.conges.date_fin = this.getDatePickerDate(this.model.conges.date_fin);
          //alert("date: "+ this.model.conges.date_debut);
        }
        if (res.status == 203) {
          this.error = res.data;
        }
      }).catch(function (err) {
        if (err.response) {
          this.error = err.response.data.errors;
        }
      });
    },
    getDatePickerDate(dt) {
      var d = new Date(dt);
      //alert((d.getFullYear() + '-' + ('0' + (d.getMonth()+1)).slice(-2) +'-' +('0' + (d.getDate())).slice(-2)));
     return (d.getFullYear() + '-' + ('0' + (d.getMonth()+1)).slice(-2) +'-' +('0' + (d.getDate())).slice(-2));
    },  
    getNbjours(dtdebut, dtfin) {
      if (dtdebut != null && dtdebut != "" && dtfin != null && dtfin != "")
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

    },
    async editConges() {
      try {
        const url = urlconges.getEditDelCongesUrl(this.model.conges.id);
        let result = await axios.put(url, {
          date_debut: this.model.conges.date_debut,
          date_fin: this.model.conges.date_fin,
          type_conges: this.model.conges.type_conges,
          nbjours: this.model.conges.nbjours,
          descriptions: this.model.conges.descriptions,
        });
        console.log(result);
        switch (result.status) {
          case 201:
            this.$router.push({ name: 'conges' })
            break;
          case 202:
          case 203:
          default:
            this.error = result.data;
            break;
        }
      } catch (err) {
        this.error = err.errors;
      }
    },
  },
};
</script>