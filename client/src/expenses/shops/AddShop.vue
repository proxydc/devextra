<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <h1>Add Shop</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="addShop">
        <div class="register">
          <label for="lbshop">Shop Name</label>
          <input type="text" v-model="model.shop.label" placeholder="Enter Shop Name" id="lbshop" required
            class="form-control" />
          <button type="submit" class="js-new">Add Shop</button>
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
  name: "AddShop",
  data() {
    return {
      error: "",
      warning: "",

      model: {
        shop: {
          label: "",
        }
      }

    };
  },
  mounted() {
    document.getElementById("lbshop").focus();
    $(document).keypress(function (e) {
      if (e.which === 13) {
        // enter has been pressed, execute a click on .js-new:
        $(".js-new").first().click();
        e.preventDefault();
      }
    });
  },
  methods: {
    async addShop() {
      try {
        this.error = "";
        this.warning = "";
        const url = urlexp.getaddShopUrl();
        let result = await axios.post(url, {
          label: this.model.shop.label,        
        });
        console.warn(result);
        switch (result.status) {
          case 201:
            localStorage.setItem("user-info", JSON.stringify(result.data))
            this.$router.push({ name: 'shops' });
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