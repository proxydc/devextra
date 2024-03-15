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
      <button type="button" class="btn btn-outline-primary" @click="openAddConges()">
        Nouveau expense
      </button>
      <label class="btn btn-outline-primary">Total Expenses({{ TotalExp }})</label>
    </div>
    <div class="container p-3 my-2 bg-light border border-primary">
      <div class="row">
        <div class="col">
          <table id="congestable" class="table table-striped" style="width:100%">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Date de début</th>
                <th scope="col">Date de fin</th>
                <th scope="col">Type</th>
                <th scope="col">Nb.jours</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(acRow, index) in this.AcRows" :key="index">
                <th scope="row">{{ acRow.id }}</th>
                <td class="text-start">{{ acRow.date_debut }}</td>
                <td class="text-start">{{ acRow.date_fin }}</td>
                <td class="text-start">{{ acRow.type_conges }}</td>
                <td class="text-start">{{ acRow.nbjours }}</td>
                <td class="text-start">{{ acRow.descriptions }}</td>
                <td class="text-start"><!--:href="'/editConge/' + acRow.id"-->
                  <button class="bi bi-pencil-square btn btn-outline-success mx-1" @click="editConge(acRow.id)"
                    v-b-tooltip.hover title="Edit the conge!">
                  </button>
                  <button type="button" class="bi bi-trash3 btn btn-outline-danger mx-1" @click="deleteConge(acRow.id)"
                    v-b-tooltip.hover title="Delete the conge!">
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
import urlacc from "../_helpers/urllist.js";
import $ from "jquery";
export default {
  name: "expenses",
  components: { Admin_Layout },
  data() {
    return {
      AcRows: [],
      TotalExp: 0,
      error: "",
      warning: "",
      success: "",
    };
  },
  mounted() {
    try {
      this.getExpenses();
      console.log("data: " + this.AcRows);
    }
    catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    getExpenses() {
      try {
        const url = urlacc.getCongesUrl();
        axios.get(url).then(res => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              //convert date here new Date(results.rows[0].date_debut).toLocaleDateString())
              this.AM = 0;
              res.data.forEach(element => {
                if (element.type_conges == 4 && this.DateBelowOneYear(element.date_debut)) {
                  this.AM += element.nbjours;
                }
                element.date_debut = new Date(element.date_debut).toLocaleDateString();
                element.date_fin = new Date(element.date_fin).toLocaleDateString();

              });
              this.AM = 90 - this.AM;
              this.AcRows = res.data;
              $(document).ready(function () { $('#congestable').DataTable(); });
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
    DateBelowOneYear(dt) {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      //alert(new Date(year, month, day));
      let c = new Date(year - 1, month, day).getTime();
      let indt = new Date(dt).getTime();
      //alert("c: " + c + " dt: " + indt);
      if (indt > c) { return true; }
      return false;
    },
    openAddConges() {
      this.$router.push({ name: "AddConges" });
    },
    openSoldes() {
      this.$router.push({ name: "Soldes" });
    },
    deleteConge(congesId) {
      try {
        this.success = "";
        this.warning = "";
        this.error = "";
        if (confirm('Are you sure, you want to delete this conges. Conges Id: ' + congesId)) {
          const url = urlacc.getEditDelCongesUrl(congesId);
          axios.delete(url).then(res => {
            console.log(res.data);
            switch (res.status) {
              case 200:
                this.getConges();
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
    editConge(congeId) {
      this.$router.push({ path: "/editConges/" + congeId });
    },
  },
};
</script>