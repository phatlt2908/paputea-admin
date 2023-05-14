<template>
  <div id="pagination">
    <div v-if="totalPage > 1">
      <nav
        class="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <a
          v-show="currentPage > 1"
          class="pagination-previous"
          @click="changePage(currentPage - 1)"
          >Trước</a
        >
        <a
          v-show="currentPage < totalPage"
          class="pagination-next"
          @click="changePage(currentPage + 1)"
          >Trang sau</a
        >
        <ul class="pagination-list">
          <li v-if="currentPage >= 3">
            <a class="pagination-link" @click="changePage(1)">1</a>
          </li>
          <li v-if="currentPage >= 4">
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li v-if="currentPage >= 2">
            <a class="pagination-link" @click="changePage(currentPage - 1)">{{
              currentPage - 1
            }}</a>
          </li>
          <li>
            <a
              class="pagination-link is-current"
              aria-label="Page 46"
              aria-current="page"
              @click="changePage(currentPage)"
              >{{ currentPage }}</a
            >
          </li>
          <li v-if="currentPage <= totalPage - 1">
            <a class="pagination-link" @click="changePage(currentPage + 1)">{{
              currentPage + 1
            }}</a>
          </li>
          <li v-if="currentPage <= totalPage - 3">
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li v-if="currentPage <= totalPage - 2">
            <a class="pagination-link" @click="changePage(totalPage)">{{
              totalPage
            }}</a>
          </li>
        </ul>
      </nav>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  name: "BasePagination",
  props: {
    totalPage: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>
