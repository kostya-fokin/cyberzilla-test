<template>
  <div v-if="product">
    <img class="image" :src="product.images[0]" :alt="product.title">
    <el-descriptions :column="2" border>
      <el-descriptions-item label="Title">{{ product.title }}</el-descriptions-item>
      <el-descriptions-item label="Brand">{{ product.brand }}</el-descriptions-item>
      <el-descriptions-item label="Price">${{ product.price }}</el-descriptions-item>
      <el-descriptions-item label="Discount">{{ product.discountPercentage }}%</el-descriptions-item>
      <el-descriptions-item label="In stock">{{ product.stock }}</el-descriptions-item>
      <el-descriptions-item label="Rating">{{ product.rating }}</el-descriptions-item>
      <el-descriptions-item label="Description" :span="2">{{ product.description }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  props: {
    productId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      product: null
    }
  },
  async mounted() {
    try {
      const { data } = await this.axios.get(`/products/${this.productId}`)
      this.product = data
    } catch (e) {
      console.error(e)
      this.$message.error('Error loading product');
    }
  }
}
</script>

<style lang="css" scoped>
  .image {
    width: 60%;
  }
</style>