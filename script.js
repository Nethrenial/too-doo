const app = Vue.createApp({
  data() {
    return {
      tasks: [],
      text: "",
      ifClickedTask: false,
      clickedIndex: 0,
      reminder: "",
    };
  },
  methods: {
    addTask() {
      if (this.text === "") {
        return;
      } else {
        this.tasks.push(this.text);
        let newTask = JSON.stringify(this.tasks);
        window.localStorage.setItem("tasks", newTask);
        this.text = "";
      }
    },
    clickedTask(index) {
      this.ifClickedTask = !this.ifClickedTask;
      this.clickedIndex = index;
    },
    deleteTask() {
      let tasks = JSON.parse(window.localStorage.getItem("tasks"));
      tasks.splice(this.clickedIndex, 1);
      window.localStorage.setItem("tasks", JSON.stringify(tasks));
      this.tasks.splice(this.clickedIndex, 1);
      this.ifClickedTask = !this.ifClickedTask;
    },
  },
  created() {
    this.tasks = JSON.parse(window.localStorage.getItem("tasks"));
    if (this.tasks.length === 0) {
      this.reminder = "Congratulations! You don't have any tasks left.";
    } else if (this.tasks.length === 1) {
      this.reminder = "You have only one task to complete!";
    } else {
      this.reminder = `You have ${this.tasks.length} tasks to complete`;
    }
  },
  beforeUpdate() {
    if (this.tasks.length === 0) {
      this.reminder = "Congratulations! You don't have any tasks left.";
    } else if (this.tasks.length === 1) {
      this.reminder = "You have only one task to complete!";
    } else {
      this.reminder = `You have ${this.tasks.length} tasks to complete`;
    }
  },
});

app.mount("#app");
