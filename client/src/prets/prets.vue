<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <div v-if="success != ''" class="alert alert-success alert-dismissible fade show">
      <strong>{{ success }}</strong>
    </div>
    <div class="d-flex gap-2 py-3">
      <button type="button" class="btn btn-outline-primary" @click="openAddPret()">
        Nouveau pret
      </button>
    </div>
    <div class="container p-3 my-2 bg-light border border-primary">
      <div class="row">
        <div class="col">
          <table id="prettable" class="table table-striped" style="width:100%">
            <thead>
              <tr>
                <th scope="col">Id</th>                
                <th scope="col">Person Name</th>  
                <th scope="col">Bank Name</th>
                <th scope="col">Pret Amount</th>
                <th scope="col">Mensuality</th>
                <th scope="col">NB.Mois</th>
                <th scope="col">Pret Details</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(acRow, index) in this.AcRows" :key="index">
                <th scope="row">{{ acRow.id }}</th>
                <td class="text-start">{{ acRow.firstname }}</td>
                <td class="text-start">{{ acRow.bankname }}</td>
                <td class="text-start">{{ acRow.pret_amount }}</td>
                <td class="text-start">{{ acRow.mensuel_amount }}</td>
                <td class="text-start">{{ acRow.nb_mois }}</td>
                <td class="text-start">{{ acRow.pret_details }}</td>
                <td class="text-start">{{ acRow.starting_date }}</td>
                <td class="text-start">{{ acRow.end_date }}</td>
                <td class="text-start"><!--:href="'/editConge/' + acRow.id" person_id, bank_id, pret_amount, mensuel_amount, nb_mois, pret_details,starting_date, end_date-->
                  <button class="bi bi-pencil-square btn btn-outline-success mx-1" @click="editPret(acRow.id)"
                    v-b-tooltip.hover title="Edit the pret!">
                  </button>
                  <button type="button" class="bi bi-trash3 btn btn-outline-danger mx-1" @click="deletePret(acRow.id)"
                    v-b-tooltip.hover title="Delete the pret!">
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Admin_Layout from "../admin/admin_Layout.vue";
import urlpret from "../_helpers/urllist_Prets.js";
import $ from "jquery";
export default {
  name: "prets",
  components: { Admin_Layout },
  data() {
    return {
      AcRows: [],
      error: "",
      warning: "",
      success: "",
    };
  },
  mounted() {
    try {
      this.getPrets();
      console.log("data: " + this.AcRows);
    }
    catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    getPrets() {
      try {
        const url = urlpret.getPretsUrl();
        axios.get(url).then(res => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              res.data.forEach(element => {
                element.starting_date = new Date(element.starting_date).toLocaleDateString();
                element.end_date = new Date(element.end_date).toLocaleDateString();
              });
              this.AcRows = res.data;
              $(document).ready(function () { $('#prettable').DataTable(); });
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
    openAddPret() {
      this.$router.push({ name: "AddPret" });
    },
    deletePret(pretId) {
      try {
        this.success = "";
        this.warning = "";
        this.error = "";
        if (confirm('Are you sure, you want to delete this pret. Pret Id: ' + pretId)) {
          const url = urlpret.getdeletePretByIdUrl(pretId);
          axios.delete(url).then(res => {
            console.log(res.data);
            switch (res.status) {
              case 200:
                this.getPrets();
                this.success = res.data;
                break;
              case 202:
                this.warning = res.data;
                break;
              default:
                this.error = "Database error! Status: " + result.status + " Error: " + result.data;
                break;
            }
          }).catch(function (err) {
            if (err.response) {
              this.error = err.response;
            }
          });
        }
      }
      catch (err) {
        this.error = err;
      }
    },
    editPret(pretId) {
      this.$router.push({ path: "/editPret/" + pretId });
    },
  },
};
</script>