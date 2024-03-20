<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <h1>Add Person</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="addPerson">
        <div class="register">
          <label for="lbfam">Nom</label>
          <input type="text" v-model="model.person.familyname" placeholder="Enter Family Name" id="lbfam" required
            class="form-control" />
            <label for="lbfn">Prénom</label>
          <input type="text" v-model="model.person.firstname" placeholder="Enter First Name" id="lbfn" required
            class="form-control" />
          <button type="submit" class="js-new">Add Person</button>
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
  name: "AddPerson",
  data() {
    return {
      error: "",
      warning: "",

      model: {
        person: {
          familyname: "",
          firstname: "",
        }
      }

    };
  },
  mounted() {
    document.getElementById("lbfam").focus();
    $(document).keypress(function (e) {
      if (e.which === 13) {
        // enter has been pressed, execute a click on .js-new:
        $(".js-new").first().click();
      }
    });
  },
  methods: {
    async addPerson() {
      try {
        this.error = "";
        this.warning = "";
        const url = urlexp.getaddPersonUrl();
        let result = await axios.post(url, {
          familyname: this.model.person.familyname, 
          firstname: this.model.person.firstname,           
        });
        console.warn(result);
        switch (result.status) {
          case 201:
            localStorage.setItem("user-info", JSON.stringify(result.data))
            this.$router.push({ name: 'person' });
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