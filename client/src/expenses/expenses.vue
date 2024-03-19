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
      <button type="button" class="btn btn-outline-primary" @click="openAddExpense()">
        Nouveau expense
      </button>
      <label class="btn btn-outline-primary">Total Expenses({{ TotalExp }})</label>
    </div>
    <div class="container p-3 my-2 bg-light border border-primary">
      <div class="row">
        <div class="col">
          <table id="expensetable" class="table table-striped" style="width:100%">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Expense Type</th>
                <th scope="col">Shop Name</th>
                <th scope="col">Person Name</th>
                <th scope="col">Bank Name</th>
                <th scope="col">Payment Type</th>
                <th scope="col">Amount</th>
                <th scope="col">Details</th>
                <th scope="col">Purchase Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(acRow, index) in this.AcRows" :key="index">
                <th scope="row">{{ acRow.id }}</th>
                <td class="text-start">{{ acRow.expense_type_label }}</td>
                <td class="text-start">{{ acRow.shop_label }}</td>
                <td class="text-start">{{ acRow.firstname }}</td>
                <td class="text-start">{{ acRow.bankname }}</td>
                <td class="text-start">{{ acRow.payment_type_label }}</td>
                <td class="text-start">{{ acRow.amount }}</td>
                <td class="text-start">{{ acRow.details }}</td>
                <td class="text-start">{{ acRow.datepurchase }}</td>
                <td class="text-start"><!--:href="'/editConge/' + acRow.id"-->
                  <button class="bi bi-pencil-square btn btn-outline-success mx-1" @click="editExpense(acRow.id)"
                    v-b-tooltip.hover title="Edit the expense!">
                  </button>
                  <button type="button" class="bi bi-trash3 btn btn-outline-danger mx-1" @click="deleteExpense(acRow.id)"
                    v-b-tooltip.hover title="Delete the expense!">
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
import urlexp from "../_helpers/urllistExp_Income.js";
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
        const url = urlexp.getExpensesUrl();
        axios.get(url).then(res => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              res.data.forEach(element => {
                element.datepurchase = new Date(element.datepurchase).toLocaleDateString();
                this.TotalExp += element.amount;
              });
              this.AcRows = res.data;
              $(document).ready(function () { $('#expensetable').DataTable(); });
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
    openAddExpense() {
      this.$router.push({ name: "AddExp" });
    },
    deleteExpense(expenseId) {
      try {
        this.success = "";
        this.warning = "";
        this.error = "";
        if (confirm('Are you sure, you want to delete this expense. Expense Id: ' + expenseId)) {
          const url = urlexp.getdeleteExpensesByIdUrl(expenseId);
          axios.delete(url).then(res => {
            console.log(res.data);
            switch (res.status) {
              case 200:
                this.getExpenses();
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
    editExpense(expenseId) {
      this.$router.push({ path: "/editExpense/" + expenseId });
    },
  },
};
</script>