<template>
  <div>
    <!-- error -->
    <Message v-if="error" />

    <!-- Search -->
    <Search
      @search="search = $event"
      :value="search"
      placeholder="Repos name"
    />

    <!-- Button -->
    <button @click="getProfile" class="btn">Search!</button>

    <div class="profile">
      <!-- Preloader -->
      <Preloader
        style="margin: 0 auto; display: block;"
        v-if="loading"
        :width="90"
        :height="90"
      />

      <!-- content -->
      <div class="profile__row">
        <div class="profile__info profile-block">
          <Profile :profile="profile" />
        </div>
        <div class="profile__repos profile-block">
          <ReposList
            @load="loadRepos"
            @sortRepos="sortRepos"
            :repos="sortReposField"
            :disabled="loadReposFilter"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
import Profile from "@/components/Profile";
import ReposList from "@/components/ReposList";
import Message from "@/components/Message";
import Preloader from "@/components/UI/Preloader";
import loadMore from "@/assets/js/loadMore.js";
import axios from "axios";

export default {
  name: "Home",
  components: { Search, Profile, ReposList, Preloader, Message },
  data() {
    return {
      search: "",
      profile: null,
      repos: null,
      reposMain: null,
      url: "https://api.github.com",
      loading: false,
      error: "",
      sortField: "name",
      sortOrder: "asc",
    };
  },
  computed: {
    sortReposField() {
      if (this.reposMain !== null) {
        return this.reposMain.sort((a, b) => {
          let mod = 1;
          if (this.sortOrder === "desc") mod = -1;
          if (a[this.sortField] < b[this.sortField]) return -1 * mod;
          if (a[this.sortField] > b[this.sortField]) return 1 * mod;
          return 0;
        });
      }
    },
    loadReposFilter() {
      if (this.reposMain !== null) {
        let reposFilter = this.repos.filter((el) => !el.main);
        return !Boolean(reposFilter.length > 0);
      }
    },
  },
  methods: {
    getProfile() {
      this.loading = true;
      this.profile = null;
      this.repos = null;
      this.reposMain = null;
      this.error = "";
      axios
        .all([
          axios.get(`${this.url}/users/${this.search}`),
          axios.get(`${this.url}/users/${this.search}/repos`),
        ])
        .then(
          axios.spread((profile, repos) => {
            this.profile = profile.data;
            this.repos = repos.data;
            this.repos.map((el, index) => {
              el.main = index <= 2 ? true : false;
            });
            this.reposMain = this.repos.filter((el) => el.main);
          })
        )
        .catch((err) => {
          this.error = err;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    sortRepos(val) {
      if (this.sortField === val) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      }
      this.sortField = val;
    },
    loadRepos() {
      let loadRepos = this.repos.filter((el) => !el.main);
      this.reposMain = [...this.reposMain, ...loadMore(loadRepos, 3)];
    },
  },
};
</script>

<style lang="scss">
.btn {
  display: block;
  text-align: center;
  margin: 20px auto 0;
  padding: 10px 30px 10px 30px;
  background: #513434;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  border-radius: 25px;
}

.profile {
  margin: 50px 0px 0px 0px;

  &__row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__info {
  }

  &__repos {
  }
}

.profile-block {
  width: 48%;
}
</style>
