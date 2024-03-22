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
      <button type="button" class="btn btn-outline-primary" @click="openAddIncome()">
        Nouveau income
      </button>
      <label class="btn btn-outline-primary">Total Incomes({{ TotalIncome }})</label>
    </div>
    <div class="container p-3 my-2 bg-light border border-primary">
      <div class="row">
        <div class="col">
          <table id="incometable" class="table table-striped" style="width:100%">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Income Type</th>
                <th scope="col">Provider Name</th>
                <th scope="col">Person Name</th>
                <th scope="col">Bank Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Details</th>
                <th scope="col">Recieved Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(acRow, index) in this.AcRows" :key="index">
                <th scope="row">{{ acRow.id }}</th>
                <td class="text-start">{{ acRow.income_type_label }}</td>
                <td class="text-start">{{ acRow.provider_label }}</td>
                <td class="text-start">{{ acRow.firstname }}</td>
                <td class="text-start">{{ acRow.bankname }}</td>
                <td class="text-start">{{ acRow.amount }}</td>
                <td class="text-start">{{ acRow.details }}</td>
                <td class="text-start">{{ acRow.daterecieved }}</td>
                <td class="text-start"><!--:href="'/editConge/' + acRow.id"-->
                  <button class="bi bi-pencil-square btn btn-outline-success mx-1" @click="editIncome(acRow.id)"
                    v-b-tooltip.hover title="Edit the income!">
                  </button>
                  <button type="button" class="bi bi-trash3 btn btn-outline-danger mx-1" @click="deleteIncome(acRow.id)"
                    v-b-tooltip.hover title="Delete the income!">
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
import urlincome from "../_helpers/urllistExp_Income.js";
import $ from "jquery";
export default {
  name: "incomes",
  components: { Admin_Layout },
  data() {
    return {
      AcRows: [],
      TotalIncome: 0,
      error: "",
      warning: "",
      success: "",
    };
  },
  mounted() {
    try {
      this.getIncomes();
      console.log("data: " + this.AcRows);
    }
    catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    getIncomes() {
      try {
        const url = urlincome.getIncomesUrl();
        axios.get(url).then(res => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              res.data.forEach(element => {
                element.daterecieved = new Date(element.daterecieved).toLocaleDateString();
                this.TotalIncome+= element.amount;
              });
              this.AcRows = res.data;
              $(document).ready(function () { $('#incometable').DataTable(); });
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
    openAddIncome() {
      this.$router.push({ name: "AddIncome" });
    },
    deleteIncome(incomeId) {
      try {
        this.success = "";
        this.warning = "";
        this.error = "";
        if (confirm('Are you sure, you want to delete this income. Income Id: ' + incomeId)) {
          const url = urlincome.getdeleteIncomeByIdUrl(incomeId);
          axios.delete(url).then(res => {
            console.log(res.data);
            switch (res.status) {
              case 200:
                this.getIncomes();
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
    editIncome(incomeId) {
      alert("id"+incomeId);
      this.$router.push({ path: "/editIncome/" + incomeId });
    },
  },
};
</script>