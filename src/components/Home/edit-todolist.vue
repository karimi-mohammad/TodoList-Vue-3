<template>
  <div class="edit-sec">
    <div class="input-group mb-3">
      <input type="text" class="form-control" v-model="title" :placeholder="title" />
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        :placeholder="description"
        v-model="description"
      />
    </div>
    <div class="input-group-append">
      <button @click="editTodolist" class="btn btn-warning" type="button">Edit</button>
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
        !this.description
      ) {
        this.validData = false;
        return;
      } else {
        this.validData = true;
      }

      const existingData = localStorage.getItem("todos");
      let todos = {};
      if (existingData) {
        todos = JSON.parse(existingData);
      }
      const NewjsonData = {
        title: this.title,
        description: this.description,
        creation_date: this.creation_date,
      };
      todos[this.id] = Object.assign({}, todos[this.id], NewjsonData);
      localStorage.setItem("todos", JSON.stringify(todos));
      this.$emit("edited");
    },
  },
  data() {
    return {
      title: "",
      description: "",
      creation_date: String,
      validData: true,
    };
  },
  props: {
    id: -5,
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        const existingData = localStorage.getItem("todos");
        let todos = {};
        if (existingData) {
          todos = JSON.parse(existingData);
        }
        this.title = todos[this.id]["title"];
        this.description = todos[this.id]["description"];
        this.creation_date = todos[this.id]["creation_date"];
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
.edit-sec {
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
