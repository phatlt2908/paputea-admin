<template>
  <div id="side">
    <aside class="menu">
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li>
          <router-link
            :to="{ name: 'dashboard' }"
            class="router-link-active icon-text"
            active-class="is-active"
          >
            <span class="icon">
              <font-awesome-icon icon="desktop" size="sm" />
            </span>
            <span class="menu-item-label">Dashboard</span>
          </router-link>
        </li>
      </ul>
      <p class="menu-label">Administration</p>
      <ul class="menu-list">
        <li>
          <router-link :to="{ name: 'classList' }">Quản lý lớp</router-link>
          <ul>
            <li>
              <router-link
                :to="{ name: 'classList' }"
                class="router-link-active"
                active-class="is-active"
              >
                <span class="menu-item-label">Lớp gia sư</span>
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'classList' }"
                class="router-link-active"
                active-class="is-active"
              >
                <span class="menu-item-label">Lớp tại trung tâm</span>
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'classList' }"
                class="router-link-active"
                active-class="is-active"
              >
                <span class="menu-item-label">Lớp trực tuyến</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link
            :to="{ name: 'tutorList' }"
            class="router-link-active"
            active-class="is-active"
          >
            <span class="menu-item-label">Quản lý gia sư</span>
          </router-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  name: "BaseSide",
  data() {
    return {};
  },
};
</script>

<style lang="scss" src="@/assets/scss/_side.scss"></style>
