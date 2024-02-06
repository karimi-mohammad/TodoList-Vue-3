<template>
  <div class="add-sec">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        v-model="title"
        placeholder="Title of Todo-list"
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Description of Todo-list"
        v-model="description"
      />
    </div>
    <div class="input-group-append">
      <button @click="addTodolist" class="btn btn-success" type="button">Add</button>
    </div>

    <div v-if="!validData" class=" error ">Some inputs are not valid</div>

  </div>
</template>

<script>
export default {
  name: "AddTodolist",
  methods: {
    addTodolist() {
      if (
        this.title == "" ||
        this.description == "" ||
        !this.title ||
        !this.description
      ) {
        this.validData = false;
        return;
      } else {
        this.validData = true;
      }
      const currentDate = new Date();
      const jsonData = {
        title: this.title,
        description: this.description,
        creation_date: currentDate.toISOString().split("T")[0],
      };
      const existingData = localStorage.getItem("todos");
      let todos = {};
      if (existingData) {
        todos = JSON.parse(existingData);
      }
      const keys = Object.keys(todos);
      const maxKey = keys.length > 0 ? Math.max(...keys) : 0;
      const newKey = maxKey + 1;
      todos[newKey] = jsonData;
      localStorage.setItem("todos", JSON.stringify(todos));
      this.$emit("added");
    },
  },
  data() {
    return {
      title: "",
      description: "",
      validData: true,
    };
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
* {
  font-size: 1.15vw !important;
}
@media screen and (max-width: 768px) {
  * {
    font-size: 2.3vw !important;
  }
}
</style>
