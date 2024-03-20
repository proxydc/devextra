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
      <button type="button" class="btn btn-outline-primary" @click="openAddPerson()">
        Nouveau person
      </button>
    </div>
    <div class="container p-3 my-2 bg-light border border-primary">
      <div class="row">
        <div class="col">
          <table id="admintable" class="table table-striped" style="width:100%">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(acRow, index) in this.AcRows" :key="index">
                <th scope="row">{{ acRow.id }}</th>
                <td class="text-start">{{ acRow.familyname }}</td>
                <td class="text-start">{{ acRow.firstname }}</td>
                <td class="text-start">
                  <button type="button" class="bi bi-trash3 btn btn-outline-danger mx-1" @click="deletePerson(acRow.id)" v-b-tooltip.hover title="Delete the person!">
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
import Admin_Layout from "../../admin/admin_Layout.vue";
import urlexp from "../../_helpers/urllistExp_Income";
import $ from "jquery";
export default {
  name: "person",
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
      this.getPerson();
      console.log("data: " + this.AcRows);
    }
    catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    getPerson() {
      try {
        const url = urlexp.getAllPersonUrl();
        axios.get(url).then(res => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              this.AcRows = res.data;
              $(document).ready(function () { $('#admintable').DataTable(); });
              break;
            default:
              this.error = "Database error! Status: " + result.status + " Error: " + result.data;
              break;
          }
        });
      }
      catch (err) {
        this.error = err;
      }
    },
    openAddPerson() {
      this.$router.push({ name: "AddPerson" });
    },
    deletePerson(personid) {
      try {
        this.success = "";
        this.warning = "";
        this.error = "";
        if (confirm('Are you sure, you want to delete this person. Person Id: ' + personid)) {
          const url = urlexp.getdeletePersonByIdUrl(personid);
          axios.delete(url).then(res => {
            console.log(res.data);
            switch (res.status) {
              case 200:
                this.getPerson();
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
  },
};
</script>
  