<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <h1>Edit Pret</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="updatePret">
        <div class="register">
          <label for="lbdetails">Pret Details</label>
          <input type="text" v-model="model.pret.pret_details" placeholder="Enter details" id="lbdetails" required
            class="form-control" />          
          <label>Person Name:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.pret.person_id">
              <option v-for="(stadc, index) in personlist" :value="stadc.id" :key="index">{{ stadc.firstname }}
              </option>
            </select>
          </div>  
          <label for="lbdate">Action date</label>
          <input type="date" v-model="model.pret.actiondate" id="lbdate" class="form-control" required />
          <button type="submit" class="js-new">Update Pret</button>
          <br /><br />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urlpret from "../_helpers/urllist_Prets.js";
export default {
  name: "EditPret",
  data() {
    return {
      error: "",
      warning: "",
      personlist: [],

      model: {
        pret: {
          pret_details: "",
          person_id: "",
          actiondate: ""
        }
      }

    };
  },
  mounted() {
    this.getPersonList();
    this.getPretData(this.$route.params.id) 
    document.getElementById("lbdetails").focus();
  },
  methods: {
    getPersonList() {
      try {
        const url = urlpret.getAllPersonUrl();
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
    getPretData(pretId) {
      const url = urlpret.getPretByIdUrl(pretId);
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            this.model.pret = res.data[0];
            this.model.pret.actiondate = this.getDatePickerDate(this.model.pret.actiondate);
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
    async updatePret() {
      try {
        const url = urlpret.getupdatePretUrl(this.model.pret.id);
        let result = await axios.put(url, {
          pret_details: this.model.pret.pret_details,
          person_id: this.model.pret.person_id,          
          actiondate: this.model.pret.actiondate
        });
        console.log(result);
        switch (result.status) {
          case 201:
            this.$router.push({ name: 'prets' })
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
  },
};
</script>