<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <h1>Add Pret</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="addPret">
        <div class="register">
          <label>Person Name:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.pret.person_id">
              <option v-for="(stadc, index) in personlist" :value="stadc.id" :key="index">{{ stadc.firstname }}
              </option>
            </select>
          </div>  
          <label>Bank Name:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.pret.bank_id">
              <option v-for="(stadc, index) in banklist" :value="stadc.id" :key="index">{{ stadc.bankname }}
              </option>
            </select>
          </div>  
          <label for="lbdetails">Pret Amount</label>
          <input type="text" v-model="model.pret.pret_amount" placeholder="Enter details" id="lbdetails" required
            class="form-control" />  
          <label for="lbdetails">Mensuel</label>
          <input type="text" v-model="model.pret.mensuel_amount" placeholder="Enter details" id="lbdetails" required
            class="form-control" />          
            <label for="lbdetails">Nb.Mois</label>
          <input type="text" v-model="model.pret.nb_mois" placeholder="Enter details" id="lbdetails" required
            class="form-control" />
            <label for="lbdetails">Interest</label>
          <input type="text" v-model="model.pret.interest" placeholder="Enter details" id="lbdetails" required
            class="form-control" />    
            <label for="lbdetails">Pret Details</label>
          <input type="text" v-model="model.pret.pret_details" placeholder="Enter details" id="lbdetails" required
            class="form-control" />  
          <label for="lbdate1">Starting date</label>
          <input type="date" v-model="model.pret.starting_date" id="lbdate1" class="form-control" required />
          <label for="lbdate2">End date</label>
          <input type="date" v-model="model.pret.end_date" id="lbdate2" class="form-control" required />
          <button type="submit" class="js-new">Add Pret</button>
          <br /><br />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urlpret from "../_helpers/urllist_Prets.js";
import $ from "jquery";
export default {
  name: "AddPret",
  data() {
    return {
      error: "",
      warning: "",
      personlist: [],
      banklist: [],

      model: {
        pret: {
          pret_details: "",
          person_id: "",
          actiondate: ""
        }
      }

    };
  },
  mounted() {
    this.getPersonList();
    this.getBankList();
    document.getElementById("lbdetails").focus();
  },
  methods: {
    getPersonList() {
      try {
        const url = urlpret.getAllPersonUrl();
        axios.get(url).then(res => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              this.personlist = res.data;
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
    getBankList() {
      try {
        const url = urlpret.getAllBankUrl();
        axios.get(url).then(res => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              this.banklist = res.data;
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
    async addPret() {
      try {
        this.error = "";
        this.warning = "";
        const url = urlpret.getaddPretUrl();
        let result = await axios.post(url, {        
          person_id: this.model.pret.person_id,   
          bank_id: this.model.pret.bank_id,  
          pret_amount: this.model.pret.pret_amount,  
          mensuel_amount: this.model.pret.mensuel_amount,  
          nb_mois: this.model.pret.nb_mois,  
          interest: this.model.pret.interest,  
          pret_details: this.model.pret.pret_details,       
          starting_date: this.model.pret.starting_date,
          end_date: this.model.pret.end_date
        });
        console.log(result);
        switch (result.status) {
          case 201:
            localStorage.setItem("user-info", JSON.stringify(result.data))
            this.$router.push({ name: 'prets' });
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