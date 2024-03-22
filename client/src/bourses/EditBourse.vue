<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <h1>Edit Task</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="updateTask">
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
          <button type="submit" class="js-new">Update Task</button>
          <br /><br />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urltask from "../_helpers/urllist_Tasks.js";
export default {
  name: "EditTask",
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
    this.getTaskData(this.$route.params.id) 
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
    getTaskData(taskId) {
      const url = urltask.getTaskByIdUrl(taskId);
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            this.model.task = res.data[0];
            this.model.task.actiondate = this.getDatePickerDate(this.model.task.actiondate);
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
    async updateTask() {
      try {
        const url = urltask.getupdateTaskUrl(this.model.task.id);
        let result = await axios.put(url, {
          task_details: this.model.task.task_details,
          person_id: this.model.task.person_id,          
          actiondate: this.model.task.actiondate
        });
        console.log(result);
        switch (result.status) {
          case 201:
            this.$router.push({ name: 'tasks' })
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