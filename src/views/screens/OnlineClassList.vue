<template>
  <class-list :title="'Danh sách đăng ký học trực tuyến'" :isOnline="true" />
</template>

<script>
import ClassList from "../components/ClassList.vue";

export default {
  components: { ClassList },
  name: "OnlineClassList",
};
</script>
