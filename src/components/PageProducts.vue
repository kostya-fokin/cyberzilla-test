<template>
  <div>
    <el-table
      :data="products"
      style="width: 100%"
      @row-click="handleRowClick"
    >
      <el-table-column
        label="Brand"
        prop="brand"
        width="240"
      />
      <el-table-column
        prop="title"
        label="Title"
        width="240"
      />
      <el-table-column
        prop="price"
        label="Price"
        width="240"
      />
       <el-table-column
        label="Category"
       >
        <template slot-scope="scope">
          <el-tag>{{ scope.row.category }}</el-tag>
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
      :title="modalTitle"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <modal-product
        :productId="currentProductId"
        :key="currentProductId"
        @close="dialogVisible = false"
      />
    </el-dialog>

  </div>
</template>

<script>
import ModalProduct from '@/components/products/ModalProduct'

export default {
  components: {
    ModalProduct,
  },
  data() {
    return {
      products: null,
      page: 1,
      limit: 10,
      total: null,
      dialogVisible: false,
      currentProductId: null,
      modalTitle: null
    };
  },
  computed: {
    skip() {
      return (this.page - 1) * this.limit
    },
  },
  methods: {
    handlePageChange(page) {
      this.page = page
    },
    async getProducts() {
      try {
        const { data: { products, total } } = await this.axios.get(`/products?limit=${this.limit}&skip=${this.skip}`)
        this.products = products
        this.total = total
      } catch (e) {
        console.error(e)
        this.$message.error('Error loading user list');
      }
    },
    handleRowClick(row) {
      this.currentProductId = row.id
      this.modalTitle = row.title
      this.dialogVisible = true
    }
  },
  watch: {
    skip() {
      this.getProducts()
    }
  },
  mounted() {
    this.getProducts()
  }
}
</script>

<style lang="css" scoped>
  .pagination {
    display: flex;
    margin-top: 15px;
  }
</style>