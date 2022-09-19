<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      :rules="rules"
    >
      <el-form-item label="First name" prop="firstName">
        <el-input v-model="form.firstName" />
      </el-form-item>
      <el-form-item label="Last name" prop="lastName">
        <el-input v-model="form.lastName" />
      </el-form-item>
      <el-form-item label="Phone" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button
        @click="$emit('close', { userUpdated: false })"
      >
        Cancel
      </el-button>
      <el-button
        type="primary"
        :disabled="disabled"
        @click="handleSubmit"
      >
        Confirm
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
      form: {
        firstName: null,
        lastName: null,
        phone: null,
        email: null
      },
      rules: {
        firstName: { required: true, message: 'Please input first name', trigger: 'change' },
        lastName: { required: true, message: 'Please input last name', trigger: 'change' },
        email: { required: true, type: 'email', message: 'Please input correct email', trigger: 'change' },
        phone: { required: true, message: 'Please input phone', trigger: 'change' },
      },
      disabled: true
    }
  },
  methods: {
    async handleSubmit() {
      try {
        await this.axios.put(`/users/${this.userId}`, )
        this.$message.success('Success');
        this.$emit('close', { userUpdated: true })
      } catch (e) {
        console.error(e)
        this.$message.error('User edit error');
      }
    }
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.$refs['form'].validate(valid => {
          this.disabled = !valid
        })
      }
    }
  },
  async mounted() {
    try {
      const { data: {
        firstName,
        lastName,
        phone,
        email
      }} = await this.axios.get(`/users/${this.userId}`)
      this.form.firstName = firstName
      this.form.lastName = lastName
      this.form.phone = phone
      this.form.email = email
    } catch (e) {
      console.error(e)
      this.$message.error('Error loading user');
    }
  }
}
</script>

<style lang="css" scoped>
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
</style>