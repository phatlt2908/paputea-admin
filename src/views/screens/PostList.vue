<template>
  <div id="classList">
    <h1>Danh sách bài viết</h1>
    <div class="content">
      <div class="select">
        <select v-model="categorySelected">
          <option :value="null">--- Chọn danh mục ---</option>
          <option
            v-for="category in categoryList"
            :key="category.code"
            :value="category.code"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <table class="table is-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Danh mục</th>
            <th>Tên bài viết</th>
            <th>Tiêu đề</th>
            <th>Ngày tạo</th>
            <th>Ngày chỉnh sửa</th>
            <th>Lượt xem</th>
            <th>Lượt tải</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(classItem, index) in classList" :key="classItem.classCode">
            <th>{{ index + 1 }}</th>
            <td>{{ classItem.categoryName }}</td>
            <td>
              {{ classItem.className }}
            </td>
            <td>{{ classItem.title }}</td>
            <td>
              {{ formatDate(classItem.createdDate) }}
            </td>
            <td>
              {{ formatDate(classItem.updatedDate) }}
            </td>
            <td>{{ classItem.readNum }}</td>
            <td>{{ classItem.downloadNum }}</td>
            <td>
              <a @click="deleteClass()"><font-awesome-icon icon="trash" /></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import classApi from "../../services/classApi";

export default {
  name: "ClassList",
  data() {
    return {
      categoryList: [],
      categorySelected: null,
      classList: [],
    };
  },
  created() {
    this.getCategoryPulldown();
    this.getClassList();
  },
  methods: {
    getCategoryPulldown() {
      classApi
        .getCategoryPulldown()
        .then((res) => {
          this.categoryList = res.data.categoryList;
        })
        .catch((err) => {
          console.error("Load category pulldown failed ", err);
          this.$swal({
            icon: "error",
            title: "Không load được danh sách category :(",
            timer: 3000,
            showConfirmButton: true,
            type: "error",
          });
        });
    },
    getClassList() {
      classApi
        .getClassList({
          categoryCode: this.categorySelected,
        })
        .then((res) => {
          this.classList = res.data;
        })
        .catch((err) => {
          console.error("Load class list failed ", err);
          this.$swal({
            icon: "error",
            title: "Không load được danh sách bài viết :(",
            timer: 3000,
            showConfirmButton: true,
            type: "error",
          });
        });
    },
    formatDate(date) {
      return new Date(date).toISOString().split("T")[0];
    },
    classPost() {
      this.$swal({
        icon: "warning",
        title: "Chắc chắn xóa bài viết?",
        showDenyButton: true,
        denyButtonText: "Xóa",
        showCancelButton: true,
        cancelButtonText: "Quay xe",
        showConfirmButton: false,
        type: "warning",
      }).then((result) => {
        if (result.isDenied) {
          this.$swal({
            icon: "error",
            title: "Tính năng đang phát triển, Vui lòng thử lại sau!",
            timer: 3000,
            showConfirmButton: true,
            type: "error",
          });
        }
      });
    },
  },
  watch: {
    categorySelected() {
      this.getClassList();
    },
  },
};
</script>
