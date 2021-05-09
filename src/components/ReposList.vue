<template>
  <div v-if="repos" class="repos">
    <h2 class="repos__title">Repos:</h2>
    <div class="repos__sort">
      Sort: <span @click="sort('name')">Name</span>
      <span @click="sort('stargazers_count')">Stars</span>
    </div>
    <transition-group name="list">
      <ReposItem v-for="repo in repos" :key="repo.id" :data="repo" />
    </transition-group>
    <button
      :disabled="disabled"
      :class="{ disableBtn: disabled }"
      class="repos__load btn"
      @click="$emit('load')"
    >
      Load More
    </button>
  </div>
</template>

<script>
import ReposItem from "./ReposItem";

export default {
  name: "ReposList",
  components: { ReposItem },
  props: {
    repos: {
      type: Array,
      default: () => {
        [];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    sort(val) {
      this.$emit("sortRepos", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.repos {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 16px;
  color: #5d5d5d;

  &__title {
    font-size: 32px;
    text-transform: uppercase;
    margin: 0px 0px 20px 0px;
    color: #513434;
  }

  &__sort {
    margin: 10px 0px 10px 0px;

    span {
      margin: 0px 5px 0px 0px;
      cursor: pointer;
    }
  }
}

.disableBtn {
  opacity: 0.7;
  cursor: not-allowed;
}

.repos__load {
  margin-bottom: 20px;
}

/* Animation */
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
