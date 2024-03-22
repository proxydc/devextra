<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <h1>Add SGB</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="addSgb">
        <div class="register">         
          <label>Person Name:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.sgb.person_id">
              <option v-for="(stadc, index) in personlist" :value="stadc.id" :key="index">{{ stadc.firstname }}
              </option>
            </select>
          </div>  
          <label>Bank Name:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.sgb.bank_id">
              <option v-for="(stadc, index) in banklist" :value="stadc.id" :key="index">{{ stadc.bankname }}
              </option>
            </select>
          </div>
          <label>Nominee Name:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.sgb.nominee_id">
              <option v-for="(stadc, index) in personlist" :value="stadc.id" :key="index">{{ stadc.firstname }}
              </option>
            </select>
          </div> 
          <label for="lbamount">Bond Numbers</label>
          <input type="text" v-model="model.sgb.bond_Ids" placeholder="Enter amount" id="lbamount" required
            class="form-control" />
          <label for="lbdetails">Interest Percentage</label>
          <input type="text" v-model="model.sgb.interest_percentage" placeholder="Enter details" id="lbdetails" required
            class="form-control" />
          <label for="lbamount">Units</label>
          <input type="text" v-model="model.sgb.units" placeholder="Enter amount" id="lbamount" required
            class="form-control" />
          <label for="lbdetails">Unit Price</label>
          <input type="text" v-model="model.sgb.unit_price" placeholder="Enter details" id="lbdetails" required
            class="form-control" />
            <label for="lbdetails">Purchased Unit Price</label>
          <input type="text" v-model="model.sgb.purchased_unit_price" placeholder="Enter details" id="lbdetails" required
            class="form-control" />
            <label for="lbdetails">Bond Details</label>
          <input type="text" v-model="model.sgb.bond_details" placeholder="Enter details" id="lbdetails" required
            class="form-control" />
            <label for="lbamount">Amount</label>
          <input type="text" v-model="model.sgb.amount" placeholder="Enter amount" id="lbamount" required
            class="form-control" />         
          <label for="lbdate">Purchased date</label>
          <input type="date" v-model="model.sgb.purchase_date" id="lbdate" class="form-control" required />
          <label for="lbdate">Starting date</label>
          <input type="date" v-model="model.sgb.starting_date" id="lbdate" class="form-control" required />
          <label for="lbdate">Maturity date</label>
          <input type="date" v-model="model.sgb.end_date" id="lbdate" class="form-control" required />       
        
          <button type="submit" class="js-new">Add SGB</button>
          <br /><br />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urlsgb from "../_helpers/urllist_Sgbs.js";
import $ from "jquery";
export default {
  name: "AddSgb",
  data() {
    return {
      error: "",
      warning: "",
      personlist: [],
      banklist: [],

      model: {
        sgb: {
          person_id: "",
          bank_id: "",
          nominee_id: "",
          bond_Ids: "",
          interest_percentage: "",
          units: "",
          unit_price: "",
          purchased_unit_price: "",
          bond_details: "",
          amount: "",
          purchase_date: "",
          starting_date: "",
          end_date: ""
        }
      }

    };
  },
  mounted() {
    this.getPersonList();
    this.getBankList();
    //document.getElementById("lbdetails").focus();
  },
  methods: {
    getPersonList() {
      try {
        const url = urlsgb.getAllPersonUrl();
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
        const url = urlsgb.getAllBanksUrl();
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
    async addSgb() {
      try {
        this.error = "";
        this.warning = "";
        const url = urlsgb.getaddSgbUrl();
        let result = await axios.post(url, {
          person_id: this.model.sgb.person_id,
          bank_id: this.model.sgb.bank_id,
          nominee_id: this.model.sgb.nominee_id,
          bond_Ids: this.model.sgb.bond_Ids,
          interest_percentage: this.model.sgb.interest_percentage,
          units: this.model.sgb.units,
          unit_price: this.model.sgb.unit_price,
          purchased_unit_price: this.model.sgb.purchased_unit_price,
          bond_details: this.model.sgb.bond_details,
          amount: this.model.sgb.amount,
          purchase_date: this.model.sgb.purchase_date,
          starting_date: this.model.sgb.starting_date,
          end_date: this.model.sgb.end_date
        });
        console.log(result);
        switch (result.status) {
          case 201:
            localStorage.setItem("user-info", JSON.stringify(result.data))
            this.$router.push({ name: 'sgbs' });
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