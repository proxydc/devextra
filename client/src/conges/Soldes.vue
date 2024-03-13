<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
  </div>
  <h1>Solde Conges</h1>
  <div class="container w-50 p-3 my-1 bg-light border border-info">
    <div class="row dc-section">
      <div class="col">
        <label for="lbtypeConges" class="form-control">CP Annee Encours</label>
        <label id="lbtypeConges" class="form-control">{{ model.soldes.cpanneeencours }}</label>
        <label for="lbtypeConges" class="form-control">CP Annee Precedent</label>
        <label id="lbtypeConges" class="form-control">{{ model.soldes.cpanneeprecedent }}</label>
        <label for="lbtypeConges" class="form-control">CP Pris</label>
        <label id="lbtypeConges" class="form-control">{{ model.soldes.cppris }}</label>
        <label for="lbtypeConges" class="form-control">CP Restant</label>
        <label id="lbtypeConges" class="form-control">{{ model.soldes.cprestant }}</label>
        <label for="lbtypeConges" class="form-control">RTT Total</label>
        <label id="lbtypeConges" class="form-control">{{ model.soldes.rtttotal }}</label>
        <label for="lbtypeConges" class="form-control">RTT Pris</label>
        <label id="lbtypeConges" class="form-control">{{ model.soldes.rttpris }}</label>
      </div>
      <div class="col">

        <label for="lbtypeConges" class="form-control">RTT Restant</label>
        <label id="lbtypeConges" class="form-control">{{ model.soldes.rttrestant }}</label>
        <label for="lbtypeConges" class="form-control">RTTE Total</label>
        <label id="lbtypeConges" class="form-control">{{ model.soldes.rttetotal }}</label>
        <label for="lbtypeConges" class="form-control">RTTE Pris</label>
        <label id="lbtypeConges" class="form-control">{{ model.soldes.rttepris }}</label>
        <label for="lbtypeConges" class="form-control">RTTE Restant</label>
        <label id="lbtypeConges" class="form-control">{{ model.soldes.rtterestant }}</label>
        <label for="lbtypeConges" class="form-control">Date Derniere Modification</label>
        <label id="lbtypeConges" class="form-control">{{ model.soldes.datederniermodification }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urlacc from "../_helpers/urllist.js";
import $ from "jquery";
export default {
  name: "Soldes",
  data() {
    return {
      error: "",
      warning: "",
      cpcomp: 0,
      rttcomp: 0,
      rttecomp: 0,
      model: {
        soldes: {
          cpanneeencours: 0,
          cpanneeprecedent: 0,
          cppris: 0,
          cprestant: 0,
          rtttotal: 0,
          rttpris: 0,
          rttrestant: 0,
          rttetotal: 0,
          rttepris: 0,
          rtterestant: 0,
          datederniermodification: "",
        }
      }

    };
  },
  mounted() {
    this.getConges();
  },
  methods: {
    getSoldes() {
      const url = urlacc.getSoldesUrl();
      //alert("url: " + url);
      //alert("date2: "+ new Date().toLocaleDateString());
      axios.get(url).then(res => {
        console.log(res.data);
        if (res.status == 200) {
          this.model.soldes = res.data[0];
          this.model.soldes.datederniermodification = new Date(this.model.soldes.datederniermodification).toLocaleDateString();
          let currentdate = new Date().toLocaleDateString();
          // console.log("date!:"+ (this.model.soldes.datederniermodification).toLocaleDateString() + "date2: "+ new Date().toLocaleDateString());
          if (this.model.soldes.datederniermodification != this.currentdate || this.model.soldes.cppris != this.cpcomp || this.model.soldes.rttpris != this.rttcomp || this.model.soldes.rttepris != this.rttecomp) {
            this.model.soldes.cppris = this.cpcomp;
            this.model.soldes.cprestant = this.model.soldes.cpanneeprecedent - this.cpcomp;
            if (this.model.soldes.cprestant < 0) {
              this.model.soldes.cprestant = this.model.soldes.cprestant + this.model.soldes.cpanneeencours;
            }
            else {
              this.model.soldes.cprestant += this.model.soldes.cpanneeencours;
            }

            this.model.soldes.rttpris = this.rttcomp;
            this.model.soldes.rttrestant = this.model.soldes.rtttotal - this.rttcomp;

            this.model.soldes.rttepris = this.rttecomp;
            this.model.soldes.rtterestant = this.model.soldes.rttetotal - this.rttecomp;

            if (this.model.soldes.datederniermodification != currentdate && new Date().getDate() == 1) {
              this.model.soldes.cpanneeencours += 2.083;
              if (new Date().getMonth() == 6) {
                this.model.soldes.cpanneeencours += 2;
                this.model.soldes.cpanneeprecedent += this.model.soldes.cpanneeencours;
                this.model.soldes.cpanneeencours = 0;
              }
            }

            this.updateSoldes();
          }
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
    async updateSoldes() {
      try {
        const url = urlacc.updateSoldesUrl(this.model.soldes.id);
        let result = await axios.put(url, {
          cpanneeencours: this.model.soldes.cpanneeencours,
          cpanneeprecedent: this.model.soldes.cpanneeprecedent,
          cppris: this.model.soldes.cppris,
          cprestant: this.model.soldes.cprestant,
          rtttotal: this.model.soldes.rtttotal,
          rttpris: this.model.soldes.rttpris,
          rttrestant: this.model.soldes.rttrestant,
          rttetotal: this.model.soldes.rttetotal,
          rttepris: this.model.soldes.rttepris,
          rtterestant: this.model.soldes.rtterestant
        });
        console.warn(result);
      }
      catch (err) {
        this.error = err.errors;
      }
    },
    getConges() {
      try {
        const url = urlacc.getCongesUrl();
        axios.get(url).then(res => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              //convert date here new Date(results.rows[0].date_debut).toLocaleDateString())
              res.data.forEach(element => {
                element.date_debut = new Date(element.date_debut).toLocaleDateString();
                element.date_fin = new Date(element.date_fin).toLocaleDateString();
                if (element.type_conges == 1) {
                  this.cpcomp += element.nbjours;
                }
                if (element.type_conges == 2) {
                  this.rttcomp += element.nbjours;
                }
                if (element.type_conges == 3) {
                  this.rttecomp += element.nbjours;
                }
              });
              this.getSoldes();
              break;
            default:
              this.error = "Database error! Status: " + res.status + " Error: " + res.data;
              break;
          }
        });
      }
      catch (err) {
        this.error = err;
      }
    },
  },

};
</script>