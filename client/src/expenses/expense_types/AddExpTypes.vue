<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <h1>Add Expense Type</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="addExpTypes">
        <div class="register">
          <label for="lbexptype">Expense Type Name</label>
          <input type="text" v-model="model.exptype.label" placeholder="Enter Login Name" id="lbexptype" required
            class="form-control" />
          <button type="submit" class="js-new">Add Expense Type</button>
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
  name: "AddExpTypes",
  data() {
    return {
      error: "",
      warning: "",

      model: {
        exptype: {
          label: "",
        }
      }

    };
  },
  mounted() {
    document.getElementById("lbexptype").focus();
    $(document).keypress(function (e) {
      if (e.which === 13) {
        // enter has been pressed, execute a click on .js-new:
        $(".js-new").first().click();
      }
    });
  },
  methods: {
    async addExpTypes() {
      try {
        this.error = "";
        this.warning = "";
        const url = urlexp.getaddExpenseTypesUrl();
        let result = await axios.post(url, {
          label: this.model.exptype.label,        
        });
        console.warn(result);
        switch (result.status) {
          case 201:
            localStorage.setItem("user-info", JSON.stringify(result.data))
            this.$router.push({ name: 'expensetypes' });
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