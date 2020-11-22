<template>
  <div class="home">
    <el-container>
      <el-aside width="250px">
        <el-menu
          default-active="1" 
          :default-openeds="defaultOpenid"
          mode="inline"
          v-model="menuList"
          style="height: '100%';borderRight: 0"
        >
          <el-submenu v-for="item in menuList" :key="item.id" :index="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
               @click="goto(im.url)"
                v-for="im in item.child"
                :key="im.id"
                :index="im.id"
                >{{ im.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main> <router-view/></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import menu from "@/mock/menu";
export default {
  name: "Home",
  mixins: [menu],
  components: {},
  data() {
    return {
      mavList1: {},
      defaultOpenid: ['1-1']
    };
  },
  mounted() {
    console.log(this.menuList);
  },
  methods: {
    goto (path) {
      this.$router.replace(path)
    }
  }
};
</script>
<style></style>
