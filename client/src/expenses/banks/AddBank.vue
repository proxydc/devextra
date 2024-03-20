<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <h1>Add Bank</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="addBank">
        <div class="register">
          <label for="lbbank">Bank Name</label>
          <input type="text" v-model="model.bank.bankname" placeholder="Enter Login Name" id="lbbank" required
            class="form-control" />
          <button type="submit" class="js-new">Add Bank</button>
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
  name: "AddBank",
  data() {
    return {
      error: "",
      warning: "",

      model: {
        bank: {
          bankname: "",
        }
      }

    };
  },
  mounted() {
    document.getElementById("lbbank").focus();
    $(document).keypress(function (e) {
      if (e.which === 13) {
        // enter has been pressed, execute a click on .js-new:
        $(".js-new").first().click();
      }
    });
  },
  methods: {
    async addBank() {
      try {
        this.error = "";
        this.warning = "";
        const url = urlexp.getaddBankUrl();
        let result = await axios.post(url, {
          bankname: this.model.bank.bankname,        
        });
        console.warn(result);
        switch (result.status) {
          case 201:
            localStorage.setItem("user-info", JSON.stringify(result.data))
            this.$router.push({ name: 'banks' });
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