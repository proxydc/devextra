<template>
  <div>
    <nav class="navbar navbar-dark bg-info navbar-expand-lg">
      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <button class="nav-link active" aria-current="page" v-on:click="pageCandidats">Candidats</button>
          </li>
          <li class="nav-item" v-if="getUser() == 'admin'">
            <button class="nav-link active" aria-current="page" v-on:click="pageAdmin">Users</button>
          </li>
          <li class="nav-item">
            <button class="nav-link active" aria-current="page" v-on:click="pageConges">Conges</button>
          </li>
          <li class="nav-item">
            <button class="nav-link active" aria-current="page" v-on:click="pageTasks">Tasks</button>
          </li>
          <li class="nav-item">
            <button class="nav-link active" aria-current="page" v-on:click="pageBourses">Bourses</button>
          </li>
          <li class="nav-item">
            <button class="nav-link active" aria-current="page" v-on:click="pageSgbs">SGB</button>
          </li>
          <li class="nav-item">
            <button class="nav-link active" aria-current="page" v-on:click="pageSgbsInt">SGB-Interest</button>
          </li>
          <li class="nav-item dropdown">
            <button class="nav-link active dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false" aria-current="page">Expenses</button>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" v-on:click="pageExpenses">Manage Expense</a>
              <a class="dropdown-item" v-on:click="pageExpenseTypes">Manage Expense Types</a>
              <a class="dropdown-item" v-on:click="pageShops">Manage Shops</a>
              <a class="dropdown-item" v-on:click="pagePerson">Manage Person</a>
              <a class="dropdown-item" v-on:click="pageBanks">Manage Banks</a>
              <a class="dropdown-item" v-on:click="pagePaymentTypes">Manage Payment Types</a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <button class="nav-link active dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false" aria-current="page">Incomes</button>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" v-on:click="pageIncomes">Manage Incomes</a>
              <a class="dropdown-item" v-on:click="pageIncomeTypes">Manage Income Types</a>
              <a class="dropdown-item" v-on:click="pageProviderTypes">Manage Provider Types</a>
            </div>
          </li>
        </ul>
        <div class="nav justify-content-end">
          <a class="nav-link" aria-current="page" href="/">Se déconnecter</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AdminNav',
  methods:
  {
    getUser() {
      //alert("iam in get user");
      return localStorage.getItem('useraccount')
    },
    pageCandidats() {
      this.$router.push({ name: "user" });
    },
    pageAdmin() {
      this.$router.push({ name: "admin" });
    },
    pageConges() {
      this.$router.push({ name: "conges" });
    },
    pageExpenses() {
      this.$router.push({ name: "expenses" });
    },
    pageExpenseTypes() {
      this.$router.push({ name: "expensetypes" });
    },
    pageShops() {
      this.$router.push({ name: "shops" });
    },
    pageBanks() {
      this.$router.push({ name: "banks" });
    },
    pagePerson() {
      this.$router.push({ name: "person" });
    },
    pagePaymentTypes() {
      this.$router.push({ name: "paymenttypes" });
    },
    pageIncomes() {
      this.$router.push({ name: "incomes" });
    },
    pageIncomeTypes() {
      this.$router.push({ name: "incometypes" });
    },
    pageProviderTypes() {
      this.$router.push({ name: "providertypes" });
    },
    pageTasks() {
      this.$router.push({ name: "tasks" });
    },
    pageBourses() {
      this.$router.push({ name: "bourses" });
    },
    pageSgbs() {
      this.$router.push({ name: "sgbs" });
    },
    pageSgbsInt() {
      this.$router.push({ name: "sgbsInt" });
    },
  }
}
</script>