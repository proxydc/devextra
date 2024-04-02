<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <h1>Edit SGB</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="updateSgb">
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
          <label>Guardian Name:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.sgb.guardian_id">
              <option v-for="(stadc, index) in personlist" :value="stadc.id" :key="index">{{ stadc.firstname }}
              </option>
            </select>
          </div> 
          <label for="lbinvestor">Investor Id</label>
          <input type="text" v-model="model.sgb.investor_id" placeholder="Enter Investor Id" id="lbinvestor" required
            class="form-control" />
          <label for="lbbonds">Bond Numbers</label>
          <input type="text" v-model="model.sgb.bond_ids" placeholder="Enter Bond Numbers" id="lbbonds" required
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
        
          <button type="submit" class="js-new">Edit SGB</button>
          <br /><br />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urlsgb from "../_helpers/urllist_Sgbs.js";
export default {
  name: "EditSgb",
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
          guardian_id: "",
          investor_id: "",
          bond_ids: "",
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
    this.getSgbData(this.$route.params.id) 
   // document.getElementById("lbdetails").focus();
  },
  methods: {
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
    getSgbData(sgbId) {
      const url = urlsgb.getSgbByIdUrl(sgbId);
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            this.model.sgb = res.data[0];
            this.model.sgb.starting_date = this.getDatePickerDate(this.model.sgb.starting_date);
            this.model.sgb.end_date = this.getDatePickerDate(this.model.sgb.end_date);
            this.model.sgb.purchase_date = this.getDatePickerDate(this.model.sgb.purchase_date);
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
     return (d.getFullYear() + '-' + ('0' + (d.getMonth()+1)).slice(-2) +'-' +('0' + (d.getDate())).slice(-2));
    }, 
    async updateSgb() {
      try {
        const url = urlsgb.getupdateSgbUrl(this.model.sgb.id);
        let result = await axios.put(url, {
          person_id: this.model.sgb.person_id,
          bank_id: this.model.sgb.bank_id,
          nominee_id: this.model.sgb.nominee_id,
          guardian_id: this.model.sgb.guardian_id,
          investor_id: this.model.sgb.investor_id,
          bond_ids: this.model.sgb.bond_ids,
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
            this.$router.push({ name: 'sgbs' })
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