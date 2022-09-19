<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item :index="mapIndex.users">Users</el-menu-item>
      <el-menu-item :index="mapIndex.products">Products</el-menu-item>
    </el-menu>
    <page-users v-if="activeIndex === mapIndex.users" />
    <page-products v-if="activeIndex === mapIndex.products" />
  </div>
</template>

<script>
import PageUsers from '@/components/PageUsers'
import PageProducts from '@/components/PageProducts'

const mapIndex = {
  users: 'users',
  products: 'products'
}

export default {
  name: 'app',
  components: {
    PageUsers,
    PageProducts
  },
  data() {
    return {
      activeIndex: mapIndex.users,
    }
  },
  computed: {
    mapIndex() {
      return mapIndex
    }
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
