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
      <button type="button" class="btn btn-outline-primary" @click="openAddTask()">
        Nouveau task
      </button>
    </div>
    <div class="container p-3 my-2 bg-light border border-primary">
      <div class="row">
        <div class="col">
          <table id="tasktable" class="table table-striped" style="width:100%">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Task Details</th>
                <th scope="col">Person Name</th>                
                <th scope="col">Recieved Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(acRow, index) in this.AcRows" :key="index">
                <th scope="row">{{ acRow.id }}</th>
                <td class="text-start">{{ acRow.task_details }}</td>
                <td class="text-start">{{ acRow.firstname }}</td>
                <td class="text-start">{{ acRow.actiondate }}</td>
                <td class="text-start"><!--:href="'/editConge/' + acRow.id"-->
                  <button class="bi bi-pencil-square btn btn-outline-success mx-1" @click="editTask(acRow.id)"
                    v-b-tooltip.hover title="Edit the task!">
                  </button>
                  <button type="button" class="bi bi-trash3 btn btn-outline-danger mx-1" @click="deleteTask(acRow.id)"
                    v-b-tooltip.hover title="Delete the task!">
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
import urltask from "../_helpers/urllist_Tasks.js";
import $ from "jquery";
export default {
  name: "tasks",
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
      this.getTasks();
      console.log("data: " + this.AcRows);
    }
    catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    getTasks() {
      try {
        const url = urltask.getTasksUrl();
        axios.get(url).then(res => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              res.data.forEach(element => {
                element.actiondate = new Date(element.actiondate).toLocaleDateString();
              });
              this.AcRows = res.data;
              $(document).ready(function () { $('#tasktable').DataTable(); });
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
    openAddTask() {
      this.$router.push({ name: "AddTask" });
    },
    deleteTask(taskId) {
      try {
        this.success = "";
        this.warning = "";
        this.error = "";
        if (confirm('Are you sure, you want to delete this task. Task Id: ' + taskId)) {
          const url = urltask.getdeleteTaskByIdUrl(taskId);
          axios.delete(url).then(res => {
            console.log(res.data);
            switch (res.status) {
              case 200:
                this.getTasks();
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
    editTask(taskId) {
      this.$router.push({ path: "/editTask/" + taskId });
    },
  },
};
</script>