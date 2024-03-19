<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <h1>Add Expense</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="addExp">
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
            <select name="name" class="selectpicker show-tick" v-model="model.exp.payment_type_id">
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
          <input type="date" v-model="model.exp.datepurchase" id="lbdate" class="form-control"
            required />
          <button type="submit" class="js-new">Add Expense</button>
          <br /><br />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urlexp from "../_helpers/urllistExp_Income.js";
import $ from "jquery";
export default {
  name: "AddExp",
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
          expense_type_id: 1,
          shop_id: 1,
          person_id: 1,
          bank_id: 1,
          payment_type_id: 1,
          amount: 0,
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
    $(document).keypress(function (e) {
      if (e.which === 13) {
        // enter has been pressed, execute a click on .js-new:
        $(".js-new").first().click();
      }
    });
  },
  methods: {
    getExpenseTypeList()
    {
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
    getShopList()
    {
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
    getBankList()
    {
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
    getPersonList()
    {
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
    getPaymentTypeList()
    {
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
    async addExp() {
      try {
        this.error = "";
        this.warning = "";
        const url = urlexp.getaddExpensesUrl();
        //alert(localStorage.getItem("manager_id"));
        let result = await axios.post(url, {
          expense_type_id: this.model.exp.expense_type_id,
          shop_id: this.model.exp.shop_id,
          person_id: this.model.exp.person_id,
          bank_id: this.model.exp.bank_id,
          payment_id: this.model.exp.payment_type_id,
          amount: this.model.exp.amount,
          details: this.model.exp.details,
          datepurchase: this.model.exp.datepurchase
        });
        console.log(result);
        switch (result.status) {
          case 201:
            localStorage.setItem("user-info", JSON.stringify(result.data))
            this.$router.push({ name: 'expenses' });
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