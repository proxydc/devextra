<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <h1>Add Payment Type</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="addPaymentTypes">
        <div class="register">
          <label for="lbpaymenttype">Payment Type Name</label>
          <input type="text" v-model="model.paymenttype.label" placeholder="Enter Login Name" id="lbpaymenttype" required
            class="form-control" />
          <button type="submit" class="js-new">Add Payment Type</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urlexp from "../../_helpers/urllistExp_Income";
import $ from "jquery";
export default {
  name: "AddPaymentTypes",
  data() {
    return {
      error: "",
      warning: "",

      model: {
        paymenttype: {
          label: "",
        }
      }

    };
  },
  mounted() {
    document.getElementById("lbpaymenttype").focus();
  },
  methods: {
    async addPaymentTypes() {
      try {
        this.error = "";
        this.warning = "";
        const url = urlexp.getaddPaymentTypesUrl();
        let result = await axios.post(url, {
          label: this.model.paymenttype.label,        
        });
        console.warn(result);
        switch (result.status) {
          case 201:
            localStorage.setItem("user-info", JSON.stringify(result.data))
            this.$router.push({ name: 'paymenttypes' });
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