export default [
  {
    path: "/plugin/baseForm",
    name: "",
    mate: {},
    component: resolve => {require(['@/views/plugin/use_base_form.vue'], resolve)}
  },
  {
    path: "/plugin/baseTable",
    name: "",
    mate: {},
    component: resolve => {require(["@/views/plugin/use_base_table.vue"], resolve)}
  },
  {
    path: "/plugin/use_time_progress_bar",
    name: "",
    mate: {},
    component: resolve => {require(["@/views/plugin/use_time_progress_bar.vue"], resolve)}
  },
  {
    path: "/plugin/use_city_select",
    name: "",
    mate: {},
    component: resolve => {require(["@/views/plugin/use_city_select.vue"], resolve)}
  }
];
