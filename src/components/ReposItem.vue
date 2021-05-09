<template>
  <div class="repo">
    <a :href="data.html_url" target="_blank" class="repo__link">{{
      data.name
    }}</a>
    <div class="repo__stars">{{ data.stargazers_count }} ⭐</div>
  </div>
</template>

<script>
export default {
  name: "ReposItem",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.repo {
  padding: 10px;
  margin: 0px 0px 20px 0px;
  border-bottom: 1px solid #eddddd;
  font-size: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__link {
    font-size: 16px;
    display: block;
  }

  &__stars {
  }
}
</style>
