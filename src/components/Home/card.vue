<template>
  <div class="card col-11 row">
    <router-link :to="'/Todo/' + id" class="card-body col-5">
      <div class="blockquote mb-0">
        <p>{{ title }}</p>
        <p class="blockquote-footer">
          {{ description }}
        </p>
        <p class="card-text text-muted">{{ date }}</p>
      </div>
    </router-link>
    <div class="col-2 actions row">
      <button type="button" @click="editItem" class="btn btn-outline-warning">
        Edit
      </button>
      <button type="button" @click="deleteItem" class="btn btn-outline-danger">
        Delete
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardHome",
  props: {
    title: String,
    description: String,
    date: Number,
    id: Number,
  },
  methods: {
    deleteItem() {
      const existingData = localStorage.getItem("todos");
      let todos = {};
      if (existingData) {
        todos = JSON.parse(existingData);
      }
      delete todos[this.id];
      localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.removeItem(this.id)
      this.$emit("deleted");
    },
    editItem() {
      this.$emit("edit", this.id);
    },
  },
};
</script>
<style scoped>
.card {
  text-align: left;
  flex-direction: row;
  padding-top: 0% !important;
}
.card:hover {
  cursor: pointer;
}
a {
  text-decoration: none;
  margin-bottom: 1%;
}
.blockquote-footer {
  font-size: 0.765em;
  margin-top: -0.5rem;
}
.text-muted {
  font-size: 0.755em;
  text-align: right;
}
.actions {
  border-left: 2px solid black;
  align-content: space-evenly;
}
</style>
