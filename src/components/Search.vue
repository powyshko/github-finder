<template>
  <div class="container">
    <input
      type="text"
      v-model="search"
      :placeholder="placeholder"
      class="search"
    />
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      search: this.value,
    };
  },
  watch: {
    search(val) {
      this.$emit("search", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 50px 0px 0px 0px;
}

.search {
  padding: 20px;
  border: 1px solid #eddddd;
  font-size: 16px;
  border-radius: 50px;
}
</style>
