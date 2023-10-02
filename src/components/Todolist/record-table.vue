<template>
  <tr>
    <td>{{ title }}</td>
    <td>{{ description }}</td>
    <td>{{ dueDate }}</td>
    <td>{{ priority }}</td>
    <td class="actions row">
      <button type="button" @click="editItem" class="btn btn-warning">Edit</button>
      <button type="button" @click="deleteItem" class="btn btn-danger">Delete</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "record-table",
  props: {
    title: String,
    description: String,
    dueDate: String,
    priority: String,
    listId: Number,
    id: Number,
  },
  methods: {
    editItem() {
      this.$emit("edit", this.id);
    },
    deleteItem() {
      const existingData = localStorage.getItem(this.listId);
      let todos = [];
      if (existingData) {
        todos = JSON.parse(existingData);
      }
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === this.id) {
          todos.splice(i, 1);
          break;
        }
      }
      localStorage.setItem(this.listId, JSON.stringify(todos));
      this.$emit("deleted");
    },
  },
};
</script>

<style scoped>
.actions {
  border-left: 2px solid black;
  align-content: space-evenly;
}
button {
  width: min-content;
  margin-right: 1%;
  color: white;
}
</style>
