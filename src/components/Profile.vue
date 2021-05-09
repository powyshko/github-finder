<template>
  <div v-if="profile" class="profile__body">
    <div class="profile__img">
      <img :src="profile.avatar_url" :alt="profile.login" />
    </div>
    <div class="profile__content">
      <h2 class="profile__title">{{ profile.login }}</h2>
      <a :href="profile.html_url" target="_blank" class="profile__url">
        {{ profile.html_url }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: {
    profile: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  &__body {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &__img {
    margin: 0px 20px 0px 0px;

    img {
      width: 200px;
    }
  }

  &__content {
    font-size: 18px;
    color: #5d5d5d;
  }

  &__title {
    font-size: 32px;
    text-transform: uppercase;
    margin: 0px 0px 20px 0px;
    color: #513434;
  }
}
</style>
