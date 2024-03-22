<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <h1>Add Task</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="addTask">
        <div class="register">
          <label for="lbdetails">Task Details</label>
          <input type="text" v-model="model.task.task_details" placeholder="Enter details" id="lbdetails" required
            class="form-control" />          
          <label>Person Name:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.task.person_id">
              <option v-for="(stadc, index) in personlist" :value="stadc.id" :key="index">{{ stadc.firstname }}
              </option>
            </select>
          </div>  
          <label for="lbdate">Action date</label>
          <input type="date" v-model="model.task.actiondate" id="lbdate" class="form-control" required />
          <button type="submit" class="js-new">Add Task</button>
          <br /><br />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urltask from "../_helpers/urllist_Tasks.js";
import $ from "jquery";
export default {
  name: "AddTask",
  data() {
    return {
      error: "",
      warning: "",
      personlist: [],

      model: {
        task: {
          task_details: "",
          person_id: "",
          actiondate: ""
        }
      }

    };
  },
  mounted() {
    this.getPersonList();
    document.getElementById("lbdetails").focus();
  },
  methods: {
    getPersonList() {
      try {
        const url = urltask.getAllPersonUrl();
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
    async addTask() {
      try {
        this.error = "";
        this.warning = "";
        const url = urltask.getaddTaskUrl();
        let result = await axios.post(url, {
          task_details: this.model.task.task_details,
          person_id: this.model.task.person_id,          
          actiondate: this.model.task.actiondate
        });
        console.log(result);
        switch (result.status) {
          case 201:
            localStorage.setItem("user-info", JSON.stringify(result.data))
            this.$router.push({ name: 'tasks' });
            break;
          case 202:
            this.warning = result.data;
            break;
          default:
            this.error = "Database error! Status: " + result.status + " Error: " + result.data;
            break;
        }
      }
      catch (err) {
        this.error = err
      }
    },
  },
};
</script>