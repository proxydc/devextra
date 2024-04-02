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
      <button type="button" class="btn btn-outline-primary" @click="openAddSgb()">
        Nouveau Sgb
      </button>
    </div>
    <div class="container p-3 my-2 bg-light border border-primary">
      <div class="row">
        <div class="col">
          <table id="sgbtable" class="table table-striped" style="width:100%">
            <thead>
              <tr>
             <!--   <th scope="col">Id</th>  -->             
                <th scope="col">Person Name</th>
                <th scope="col">Bank Name</th>  
                <th scope="col">Nominee Name</th> 
                <th scope="col">Guardian Name</th> 
               <!-- <th scope="col">Investor Id</th> 
                <th scope="col">Bond Numbers</th>   
                <th scope="col">Interest</th>   -->
                <th scope="col">Units</th>  
                <th scope="col">Unit Price</th> 
               <!-- <th scope="col">Purchased Unit Price</th> 
                <th scope="col">Bond Details</th>
                <th scope="col">Amount</th>    -->       
                <th scope="col">Purchased Date</th>
                <th scope="col">Starting Date</th>
                <th scope="col">Maturity Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(acRow, index) in this.AcRows" :key="index">
              <!--  <th scope="row">{{ acRow.id }}</th>-->
                <td class="text-start">{{ acRow.firstname }}</td>
                <td class="text-start">{{ acRow.bankname }}</td>
                <td class="text-start">{{ acRow.nomineename }}</td>
                <td class="text-start">{{ acRow.guardianname }}</td>
               <!-- <td class="text-start">{{ acRow.investor_id }}</td>
               <td class="text-start">{{ acRow.bond_ids }}</td>
                <td class="text-start">{{ acRow.interest_percentage }}</td>-->
                <td class="text-start">{{ acRow.units }}</td>
                <td class="text-start">{{ acRow.unit_price }}</td>
                <!--<td class="text-start">{{ acRow.purchased_unit_price }}</td>
                <td class="text-start">{{ acRow.bond_details }}</td>
                <td class="text-start">{{ acRow.amount }}</td>-->
                <td class="text-start">{{ acRow.purchase_date }}</td>
                <td class="text-start">{{ acRow.starting_date }}</td>
                <td class="text-start">{{ acRow.end_date }}</td>
                <td class="text-start">
                  <button class="bi bi-pencil-square btn btn-outline-success mx-1" @click="editSgb(acRow.id)"
                    v-b-tooltip.hover title="Edit the sgb!">
                  </button>
                  <button type="button" class="bi bi-trash3 btn btn-outline-danger mx-1" @click="deleteSgb(acRow.id)"
                    v-b-tooltip.hover title="Delete the sgb!">
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
import urlsgb from "../_helpers/urllist_Sgbs.js";
import $ from "jquery";
export default {
  name: "sgbs",
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
      this.getSgbs();
      console.log("data: " + this.AcRows);
    }
    catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    getSgbs() {
      try {
        const url = urlsgb.getSgbsUrl();
        axios.get(url).then(res => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              res.data.forEach(element => {
                element.purchase_date = new Date(element.purchase_date).toLocaleDateString();
                element.starting_date = new Date(element.starting_date).toLocaleDateString();
                element.end_date = new Date(element.end_date).toLocaleDateString();
              });
              this.AcRows = res.data;
              $(document).ready(function () { $('#sgbtable').DataTable(); });
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
    openAddSgb() {
      this.$router.push({ name: "AddSgb" });
    },
    deleteSgb(sgbId) {
      try {
        this.success = "";
        this.warning = "";
        this.error = "";
        if (confirm('Are you sure, you want to delete this sgb. Sgb Id: ' + sgbId)) {
          const url = urlsgb.getdeleteSgbByIdUrl(sgbId);
          axios.delete(url).then(res => {
            console.log(res.data);
            switch (res.status) {
              case 200:
                this.getSgbs();
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
    editSgb(sgbId) {
      this.$router.push({ path: "/editSgb/" + sgbId });
    },
  },
};
</script>