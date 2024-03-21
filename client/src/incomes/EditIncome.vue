<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <h1>Edit Income</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="updateIncome">
        <div class="register">
          <label>Type Incomes:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.income.income_type_id">
              <option v-for="(stadc, index) in incometypelist" :value="stadc.id" :key="index">{{ stadc.label }}
              </option>
            </select>
          </div>
          <label>Provider Name:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.income.provider_id">
              <option v-for="(stadc, index) in shoplist" :value="stadc.id" :key="index">{{ stadc.label }}
              </option>
            </select>
          </div>
          <label>Person Name:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.income.person_id">
              <option v-for="(stadc, index) in personlist" :value="stadc.id" :key="index">{{ stadc.firstname }}
              </option>
            </select>
          </div>
          <label>Bank Name:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.income.credited_bank_id">
              <option v-for="(stadc, index) in banklist" :value="stadc.id" :key="index">{{ stadc.bankname }}
              </option>
            </select>
          </div>
          <label for="lbamount">Amount</label>
          <input type="text" v-model="model.income.amount" placeholder="Enter amount" id="lbamount" required
            class="form-control" />
          <label for="lbdetails">Details</label>
          <input type="text" v-model="model.income.details" placeholder="Enter details" id="lbdetails" required
            class="form-control" />
          <label for="lbdate">Recieved date</label>
          <input type="date" v-model="model.income.daterecieved" id="lbdate" class="form-control" required />
          <button type="submit" class="js-new">Edit Income</button>
          <br /><br />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urlincome from "../_helpers/urllistExp_Income.js";
export default {
  name: "EditIncome",
  data() {
    return {
      error: "",
      warning: "",
      incometypelist: [],
      banklist: [],
      providerlist: [],
      personlist: [],

      model: {
        income: {
          income_type_id: 1,
          provider_id: 1,
          person_id: 1,
          credited_bank_id: 1,
          amount: 0,
          details: "",
          daterecieved: ""
        }
      }

    };
  },
  mounted() {
    this.getIncomeTypeList();
    this.getProviderList();
    this.getPersonList();
    this.getBankList();
    this.getIncomeData();
    document.getElementById("lbamount").focus();
  },
  methods: {
    getIncomeTypeList() {
      try {
        const url = urlincome.getAllIncomeTypesUrl();
        axios.get(url).then(res => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              this.incometypelist = res.data;
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
    getProviderList() {
      try {
        const url = urlincome.getAllProviderTypesUrl();
        axios.get(url).then(res => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              this.shoplist = res.data;
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
        const url = urlincome.getAllBanksUrl();
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
        const url = urlincome.getAllPersonUrl();
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
    getIncomeData(incomeId) {
      const url = urlincome.getIncomeByIdUrl(incomeId);
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            this.model.income = res.data[0];
            this.model.income.daterecieved = this.getDatePickerDate(this.model.income.daterecieved);
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
    async updateIncome() {
      try {
        const url = urlincome.getupdateIncomeUrl(this.model.income.id);
        let result = await axios.put(url, {
          income_type_id: this.model.income.income_type_id,
          provider_id: this.model.income.provider_id,
          person_id: this.model.income.person_id,
          credited_bank_id: this.model.income.credited_bank_id,
          amount: this.model.income.amount,
          details: this.model.income.details,
          daterecieved: this.model.income.daterecieved
        });
        console.log(result);
        switch (result.status) {
          case 201:
            this.$router.push({ name: 'incomes' })
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