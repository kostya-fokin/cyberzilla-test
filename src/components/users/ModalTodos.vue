<template>
  <div>
    <div class="todos">
      <div
        v-for="todo in todos"
        :key="`todo_${todo.id}`"
      >
        <el-checkbox
          v-model="todo.completed"
          @change="handleChange({ id: todo.id, completed: $event })"
        >
          {{ todo.todo }}
        </el-checkbox>
      </div>
    </div>
    <div class="dialog-footer">
      <el-button
        @click="$emit('close')"
      >
        Close
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      todos: null
    }
  },
  methods: {
    async changeTodo() {

    },
    async handleChange({ id, completed }) {
      try {
        await this.axios.put(`/todos/${id}`, {
          completed
        })
        this.$message.success('Success');
      } catch (e) {
        console.error(e)
        this.$message.error('Todo change error');
      }
    },
  },
  async mounted() {
    try {
      const { data: { todos }} = await this.axios.get(`/users/${this.userId}/todos`)
      this.todos = todos
    } catch (e) {
      console.error(e)
      this.$message.error('Error loading user\'s todos');
    }
  }
}
</script>

<style lang="css" scoped>
.todos {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>