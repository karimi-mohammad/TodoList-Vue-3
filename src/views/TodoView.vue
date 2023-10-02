<template>
  <div class="row justify-content-center">
    <addTodo :id="id" v-if="showAdd" @added="fetchData">{{ id }}</addTodo>
    <editTodo :id="thisItem" v-if="showEdit" :listId="id" @edited="edited"></editTodo>
    <label for="filters">Filters:</label>
    <div class="filters row" id="filters">
      Priority:
      <select v-model="filters.priority" @change="filterTable">
        <option value="">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      Due Date:
      <input type="date" v-model="filters.dueDate" @change="filterTable" />
    </div>
    <p>To sort items click on headers in table</p>
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col" @click="sortData('title')">Title</th>
          <th scope="col" @click="sortData('description')">Description</th>
          <th scope="col" @click="sortData('duedate')">Due Date</th>
          <th scope="col" @click="sortData()">Priority</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <recordTable
          v-for="(item, index) in filteredData"
          :key="index"
          :id="item.id"
          :title="item.title"
          :description="item.description"
          :dueDate="item.duedate"
          :priority="item.priority"
          :listId="id"
          @deleted="fetchData"
          @edit="edit"
        ></recordTable>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
th:hover {
  cursor: pointer;
}
.thead-dark * {
  background-color: black;
  color: white;
}
label {
  color: black;
}
.filters {
  padding-bottom: 0.5%;
  padding-top: 0.5%;
  margin-bottom: 2%;
  border-radius: 10px;
  background-color: #c9d8e1;
  border: solid 2px black;
  width: 20%;
}
</style>

<script>
import recordTable from "@/components/Todolist/record-table.vue";
import addTodo from "@/components/Todolist/add-todo.vue";
import editTodo from "@/components/Todolist/edit-todo.vue";

export default {
  name: "TodoView",
  created() {
    const id = this.$route.params.id;
    this.id = id;
  },
  components: {
    recordTable,
    addTodo,
    editTodo,
  },
  computed: {},
  beforeMount() {},
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const existingData = localStorage.getItem(this.id);
      if (existingData) {
        this.data = JSON.parse(existingData);
      } else this.data = [];

      this.filterTable();
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
    sortData(key) {
      this.filteredData.sort((a, b) => {
        if (key) {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
        } else {
          if (a.priority < b.priority) return -1;
          if (a.priority > b.priority) return 1;
        }
        return 0;
      });
      this.filteredData.push("a");
      this.filteredData.splice(-1);
    },
    filterTable() {
      this.filteredData = this.data.filter((item) => {
        let passPriority = true;
        let passDueDate = true;
        if (this.filters.priority && item.priority !== this.filters.priority) {
          passPriority = false;
        }
        if (this.filters.dueDate && item.duedate !== this.filters.dueDate) {
          passDueDate = false;
        }
        return passPriority && passDueDate;
      });
      this.sortData();
    },
    //
  },
  data() {
    return {
      filters: {
        priority: "",
        dueDate: "",
      },
      filteredData: [],
      data: {},
      id: Number,
      thisItem: Number,
      showAdd: true,
      showEdit: false,
    };
  },
};
</script>
