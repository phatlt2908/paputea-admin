<template>
  <class-list :title="'Danh sách đăng ký tìm kiếm gia sư'" :isOnline="false" />
</template>

<script>
import ClassList from "../components/ClassList.vue";

export default {
  components: { ClassList },
  name: "NormalClassList",
};
</script>
