<template>
  <div>
    <el-table
      :data="users"
      style="width: 100%">
      <el-table-column
        label="Name"
        width="240"
      >
        <template slot-scope="scope">
          {{ scope.row.firstName }} {{ scope.row.lastName }}
        </template>
      </el-table-column>
      <el-table-column
        prop="email"
        label="email"
        width="240"
      />
      <el-table-column
        prop="phone"
        label="phone"
        width="240"
      />
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            @click="handleEdit(scope.row.id)"
          >
            Edit
          </el-button>
          <el-button
            size="mini"
            @click="handleTodos(scope.row.id)"
          >
            Todos
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      layout="prev, pager, next"
      :total="total"
      background
      @current-change="handlePageChange"
    />
    <el-dialog
      title="Edit"
      :visible.sync="editDialogVisible"
      width="30%"
    >
      <modal-edit
        :userId="currentUserId"
        :key="currentUserId"
        @close="handleEditClose($event)"
      />
    </el-dialog>
    <el-dialog
      title="Todos"
      :visible.sync="todosDialogVisible"
      width="30%"
    >
      <modal-todos
        :userId="currentUserId"
        :key="currentUserId"
        @close="todosDialogVisible = false"
      />
    </el-dialog>

  </div>
</template>

<script>
import ModalEdit from '@/components/users/ModalEdit'
import ModalTodos from '@/components/users/ModalTodos'

export default {
  components: {
    ModalEdit,
    ModalTodos
  },
  data() {
    return {
      users: null,
      page: 1,
      limit: 10,
      total: null,
      editDialogVisible: false,
      todosDialogVisible: false,
      currentUserId: null
    };
  },
  computed: {
    skip() {
      return (this.page - 1) * this.limit
    }
  },
  methods: {
    handlePageChange(page) {
      this.page = page
    },
    async getUsers() {
      try {
        const { data: { users, total } } = await this.axios.get(`/users?limit=${this.limit}&skip=${this.skip}`)
        this.users = users
        this.total = total
      } catch (e) {
        console.error(e)
        this.$message.error('Error loading user list');
      }
    },
    handleEdit(userId) {
      this.currentUserId = userId
      this.editDialogVisible = true
    },
    handleTodos(userId) {
      this.currentUserId = userId
      this.todosDialogVisible = true
    },
    handleEditClose({ userUpdated }) {
      this.editDialogVisible = false
      if (userUpdated) this.getUsers()
    }
  },
  watch: {
    skip() {
      this.getUsers()
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>

<style lang="css" scoped>
  .pagination {
    display: flex;
    margin-top: 15px;
  }
</style>