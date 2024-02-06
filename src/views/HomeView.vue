<template>
  <div class="row justify-content-center">
    <add v-if="showAdd" @added="fetchData"></add>
    <edit v-if="showEdit" @edited="edited" :id="thisItem"></edit>
    <card class="col-lg-10 col-8"
      v-for="(todo, index) in todosData"
      :key="index"
      :title="todo.title"
      :description="todo.description"
      :date="todo.creation_date"
      :id="index"
      @deleted="fetchData"
      @edit="edit"
    ></card>
  </div>
</template>

<script>
import card from "@/components/Home/card.vue";
import add from "@/components/Home/add-todolist.vue";
import edit from "@/components/Home/edit-todolist.vue";

export default {
  name: "HomeView",
  data() {
    return {
      todosData: [],
      thisItem: Number,
      showEdit: false,
      showAdd: true,
    };
  },
  components: {
    card,
    add,
    edit,
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const existingData = localStorage.getItem("todos");
      if (existingData) {
        this.todosData = JSON.parse(existingData);
      }
      this.todosData = JSON.parse(existingData);
    },
    edit(id) {
      this.thisItem = id;
      this.showAdd = false;
      this.showEdit = true;
    },
    edited() {
      this.fetchData();
      this.showAdd = true;
      this.showEdit = false;
    },
  },
};
</script>

<style scoped>
.row {
  margin-right: 0;
  margin-left: 0;
  padding-top: 6%;
}
</style>
