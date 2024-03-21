<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <h1>Add Income Type</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="addIncomeTypes">
        <div class="register">
          <label for="lbincometype">Income Type Name</label>
          <input type="text" v-model="model.incometype.label" placeholder="Enter Login Name" id="lbincometype" required
            class="form-control" />
          <button type="submit" class="js-new">Add Income Type</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urlincome from "../../_helpers/urllistExp_Income";
import $ from "jquery";
export default {
  name: "AddIncomeTypes",
  data() {
    return {
      error: "",
      warning: "",

      model: {
        incometype: {
          label: "",
        }
      }

    };
  },
  mounted() {
    document.getElementById("lbincometype").focus();
  },
  methods: {
    async addIncomeTypes() {
      try {
        this.error = "";
        this.warning = "";
        const url = urlincome.getaddIncomeTypesUrl();
        let result = await axios.post(url, {
          label: this.model.incometype.label,        
        });
        console.warn(result);
        switch (result.status) {
          case 201:
            localStorage.setItem("user-info", JSON.stringify(result.data))
            this.$router.push({ name: 'incometypes' });
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