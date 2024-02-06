<template>
  <div class="add-sec row">
    <div class="input-group mb-3">
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
        <button @click="addTodo" class="btn btn-success" type="button">Add</button>
      </div>
    </div>

    <div v-if="!validData" class=" error ">Some inputs are not valid</div>
  </div>
</template>
<script>
export default {
  name: "AddTodo",
  methods: {
    addTodo() {
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

      const jsonData = {
        title: this.title,
        description: this.description,
        duedate: this.duedate,
        priority: this.priority,
      };

      const existingData = localStorage.getItem(this.id);
      let todos = [];

      if (existingData) {
        todos = JSON.parse(existingData);
      }

      const maxId = todos.reduce((max, todo) => (todo.id > max ? todo.id : max), 0);
      const newId = maxId + 1;

      jsonData.id = newId;
      todos.push(jsonData);
      localStorage.setItem(this.id, JSON.stringify(todos));
      this.$emit("added");
    },
  },
  data() {
    return {
      title: "",
      description: "",
      duedate: "",
      priority: "",
      validData: true,
    };
  },
  props: {
    id: Number,
  },
};
</script>

<style scoped>
.error{
  color: #c02828;
  font-size:larger !important;
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
