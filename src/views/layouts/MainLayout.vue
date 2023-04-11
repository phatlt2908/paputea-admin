<template>
  <body>
    <div>
      <div>
        <base-top></base-top>
      </div>
      <div class="side-bar">
        <base-side></base-side>
      </div>
      <div class="content">
        <section class="section">
          <router-view></router-view>
        </section>
      </div>
    </div>
  </body>
</template>

<script>
import BaseSide from "../components/BaseSide.vue";
import BaseTop from "../components/BaseTop.vue";
export default {
  name: "MainLayout",
  data() {
    return {};
  },
  computed: {
    breadcrumbs: function () {
      return this.$route.meta.breadcrumb;
    },
  },
  components: { BaseSide: BaseSide, BaseTop: BaseTop },
};
</script>

<style lang="scss" scoped>
.side-bar {
  width: 15rem;
  z-index: 40;
  background: #2e323a;
  height: 100vh;
  overflow-y: auto;
  padding: 10px;
  position: -webkit-fixed;
  position: fixed;
  top: 0;
}

.content {
  margin-top: 56px;
  padding-left: 15rem;
  transition: padding-left 0.25s ease-in-out 50ms;
}
</style>
