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
          <li class="nav-item dropdown">
            <button class="nav-link active dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false" aria-current="page" v-on:click="pageExpenses">Expenses</button>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" v-on:click="pageExpenseTypes">Manage Expense Types</a>
              <a class="dropdown-item" href="#">Manage Shops</a>
              <a class="dropdown-item" href="#">Manage Person</a>
              <a class="dropdown-item" href="#">Manage Banks</a>
              <a class="dropdown-item" href="#">Manage Payment Types</a>
            </div>
          </li>
        </ul>
        <div class="nav justify-content-end">
          <a class="nav-link" aria-current="page" href="/">Se déconnecter</a>
        </div>
      </div>
    </nav>
    <!--<div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
        aria-expanded="false">
        Dropdown button
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div>-->
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
  }
}
</script>