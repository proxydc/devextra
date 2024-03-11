<template>
    <div>
      <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
        <strong>{{ error }}</strong>
      </div>
      <h1>Edit Conges</h1>
      <div class="container w-50 p-3 my-1 bg-light border border-info">
        <form class="was-validated" @submit.prevent="updateAccount">
          <div class="register">
            <label for="lblogin">Login Name</label>
            <input type="text" v-model="model.account.login_name" class="form-control" id="lblogin" disabled>
            <label for="lbdisplay">Display Name</label>
            <input type="text" id="lbdisplay" v-model="model.account.display_name" placeholder="Enter Display Name" required
              class="form-control" />
            <label for="lbpassword">Password</label>
            <input type="password" v-model="model.account.pass_word" placeholder="Enter Password" id="lbpassword" required
              class="form-control" />
            <div class="example ex1">
              <h5>Select Role</h5>
              <label class="radio red">
                <input type="radio" v-model="model.account.role_id" value="1" name="group1" />
                <span>Admin</span>
              </label>
              <label class="radio blue">
                <input type="radio" v-model="model.account.role_id" value="2" name="group1" />
                <span>User</span>
              </label>
            </div>
            <button type="submit" class="js-new">Update Account</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import urlacc from "../_helpers/urllist.js";
  import axios from "axios";
  import $ from "jquery";
  export default {
    name: "EditAccount",
    data() {
      return {
        error: '',
        model: {
          account: {
            id: { type: Number, required: true },
            login_name: { type: String, required: true },
            display_name: { type: String, required: true },
            pass_word: { type: String, required: true },
            role_id: { type: Number, required: true },
          }
        }
  
      };
    },
    mounted() {
      document.getElementById("lbdisplay").focus();
      this.getAccountData(this.$route.params.id);
      $(document).keypress(function (e) {
        if (e.which === 13) {
          // enter has been pressed, execute a click on .js-new:
          $(".js-new").first().click();
        }
      });
    },
  
    methods: {
      getAccountData(accountId) {
        const url = urlacc.getEditDelAccUrl(accountId);
        //alert("url: " + url);
        axios.get(url).then(res => {
          console.log(res.data);
          if (res.status == 200)
            this.model.account = res.data[0];
          if (res.status == 203) {
            this.error = res.data;
          }
        }).catch(function (err) {
          if (err.response) {
            this.error = err.response.data.errors;
          }
        });
      },
      async updateAccount() {
        try {
          const url = urlacc.getEditDelAccUrl(this.model.account.id);
          let result = await axios.put(url, {
            display_name: this.model.account.display_name,
            pass_word: this.model.account.pass_word,
            role_id: this.model.account.role_id,
          });
          console.warn(result);
          switch (result.status) {
            case 201:
              this.$router.push({ name: 'admin' })
              break;
            case 202:
            case 203:
            default:
              this.error = result.data;
              break;
          }
        }
        catch (err) {
          this.error = err.errors;
        }
      },
    },
  };
  </script>