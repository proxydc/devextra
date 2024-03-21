<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <h1>Add Provider Type</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="addProviderTypes">
        <div class="register">
          <label for="lbprovidertype">Provider Type Name</label>
          <input type="text" v-model="model.providertype.label" placeholder="Enter Login Name" id="lbprovidertype" required
            class="form-control" />
          <button type="submit" class="js-new">Add Provider Type</button>
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
  name: "AddProviderTypes",
  data() {
    return {
      error: "",
      warning: "",

      model: {
        providertype: {
          label: "",
        }
      }

    };
  },
  mounted() {
    document.getElementById("lbprovidertype").focus();
  },
  methods: {
    async addProviderTypes() {
      try {
        this.error = "";
        this.warning = "";
        const url = urlincome.getaddProviderTypesUrl();
        let result = await axios.post(url, {
          label: this.model.providertype.label,        
        });
        console.warn(result);
        switch (result.status) {
          case 201:
            localStorage.setItem("user-info", JSON.stringify(result.data))
            this.$router.push({ name: 'providertypes' });
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