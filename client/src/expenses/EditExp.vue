<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <h1>Edit Expense</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="updateExp">
        <div class="register">
          <label>Type Expenses:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.exp.expense_type_id">
              <option v-for="(stadc, index) in expensetypelist" :value="stadc.id" :key="index">{{ stadc.label }}
              </option>
            </select>
          </div>
          <label>Shop Name:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.exp.shop_id">
              <option v-for="(stadc, index) in shoplist" :value="stadc.id" :key="index">{{ stadc.label }}
              </option>
            </select>
          </div>
          <label>Person Name:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.exp.person_id">
              <option v-for="(stadc, index) in personlist" :value="stadc.id" :key="index">{{ stadc.firstname }}
              </option>
            </select>
          </div>
          <label>Bank Name:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.exp.bank_id">
              <option v-for="(stadc, index) in banklist" :value="stadc.id" :key="index">{{ stadc.bankname }}
              </option>
            </select>
          </div>
          <label>Payment Type:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.exp.payment_id">
              <option v-for="(stadc, index) in paymenttypelist" :value="stadc.id" :key="index">{{ stadc.label }}
              </option>
            </select>
          </div>
          <label for="lbamount">Amount</label>
          <input type="text" v-model="model.exp.amount" placeholder="Enter amount" id="lbamount" required
            class="form-control" />
          <label for="lbdetails">Details</label>
          <input type="text" v-model="model.exp.details" placeholder="Enter details" id="lbdetails" required
            class="form-control" />
          <label for="lbdate">Purchase date</label>
          <input type="date" v-model="model.exp.datepurchase" id="lbdate" class="form-control" required />
          <button type="submit" class="js-new">Edit Expense</button>
          <br /><br />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urlexp from "../_helpers/urllistExp_Income.js";
export default {
  name: "EditExp",
  data() {
    return {
      error: "",
      warning: "",
      expensetypelist: [],
      banklist: [],
      shoplist: [],
      personlist: [],
      paymenttypelist: [],

      model: {
        exp: {
          expense_type_id: "",
          shop_id: "",
          person_id: "",
          bank_id: "",
          payment_id: "",
          amount: "",
          details: "",
          datepurchase: ""
        }
      }

    };
  },
  mounted() {
    this.getExpenseTypeList();
    this.getShopList();
    this.getPersonList();
    this.getBankList();
    this.getPaymentTypeList();
    document.getElementById("lbamount").focus();
    this.getExpData(this.$route.params.id);
  },

  methods: {
    getExpData(expId) {
      const url = urlexp.getExpensesByIdUrl(expId);
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            this.model.exp = res.data[0];
            this.model.exp.datepurchase = this.getDatePickerDate(this.model.exp.datepurchase);
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
    async updateExp() {
      try {
        const url = urlexp.getupdateExpensesUrl(this.model.exp.id);
        let result = await axios.put(url, {
          expense_type_id: this.model.exp.expense_type_id,
          shop_id: this.model.exp.shop_id,
          person_id: this.model.exp.person_id,
          bank_id: this.model.exp.bank_id,
          payment_id: this.model.exp.payment_id,
          amount: this.model.exp.amount,
          details: this.model.exp.details,
          datepurchase: this.model.exp.datepurchase
        });
        console.log(result);
        switch (result.status) {
          case 201:
            this.$router.push({ name: 'expenses' })
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
    getExpenseTypeList() {
      try {
        const url = urlexp.getAllTypeExpensesUrl();
        axios.get(url).then(res => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              this.expensetypelist = res.data;
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
    getShopList() {
      try {
        const url = urlexp.getAllShopsUrl();
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
        const url = urlexp.getAllBanksUrl();
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
        const url = urlexp.getAllPersonUrl();
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
    getPaymentTypeList() {
      try {
        const url = urlexp.getAllPaymentTypesUrl();
        axios.get(url).then(res => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              this.paymenttypelist = res.data;
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