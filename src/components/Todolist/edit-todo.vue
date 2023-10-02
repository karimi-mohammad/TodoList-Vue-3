<template>
  <div class="add-sec">
    <div class="input-group mb-3 row">
      <div>
        <input
          type="text"
          class="form-control"
          v-model="title"
          placeholder="Title of Todo-list"
        />
      </div>
      <div>
        <input
          type="text"
          class="form-control"
          placeholder="Description of Todo-list"
          v-model="description"
        />
      </div>
      <div>
        DueDate:
        <input type="date" id="dueDate" v-model="duedate" />
      </div>
      <div>
        Priority:
        <select v-model="priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div class="input-group-append">
        <button @click="editTodolist" class="btn btn-warning" type="button">Edit</button>
      </div>
    </div>

    <div v-if="!validData" class="error">Some inputs are not valid</div>
  </div>
</template>
<script>
export default {
  name: "editTodolist",
  methods: {
    editTodolist() {
      if (
        this.title == "" ||
        this.description == "" ||
        !this.title ||
        !this.description ||
        this.duedate == "" ||
        this.priority == "" ||
        !this.duedate ||
        !this.priority
      ) {
        this.validData = false;
        return;
      } else {
        this.validData = true;
      }

      const existingData = localStorage.getItem(this.listId);
      let todos = {};
      if (existingData) {
        todos = JSON.parse(existingData);
      }
      const NewjsonData = {
        title: this.title,
        description: this.description,
        duedate: this.duedate,
        priority: this.priority,
        id: this.id,
      };
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === this.id) {
          todos[i] = NewjsonData;
          break;
        }
      }

      localStorage.setItem(this.listId, JSON.stringify(todos));
      this.$emit("edited");
    },
  },
  data() {
    return {
      item: [],
      title: "",
      description: "",
      duedate: "",
      priority: "",
      validData: true,
    };
  },
  props: {
    id: Number,
    listId: Number,
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        const existingData = localStorage.getItem(this.listId);
        let todos = [];
        if (existingData) {
          todos = JSON.parse(existingData);
        }
        for (let i = 0; i < todos.length; i++) {
          if (todos[i].id === this.id) {
            this.item = todos[i];
            break;
          }
        }
        this.title = this.item["title"];
        this.description = this.item["description"];
        this.duedate = this.item["duedate"];
        this.priority = this.item["priority"];
      },
    },
  },
};
</script>
<style scoped>
.error {
  color: #c02828;
  font-size: larger !important;
}
.add-sec {
  width: 50%;
  --bs-border-color: #969696;
}
button {
  margin-top: 1rem;
  margin-bottom: 3rem;
  width: 71%;
}
.input-group > div {
  margin-top: 2%;
}
* {
  font-size: 1.15vw !important;
}
@media screen and (max-width: 768px) {
  * {
    font-size: 2.3vw !important;
  }
}
</style>
