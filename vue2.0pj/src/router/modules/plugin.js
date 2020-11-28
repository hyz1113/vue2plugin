export default [
  {
    path: "/plugin/baseForm",
    name: "",
    mate: {},
    component: () => import("@/views/plugin/use_base_form.vue")
  },
  {
    path: "/plugin/baseTable",
    name: "",
    mate: {},
    component: () => import("@/views/plugin/use_base_table.vue")
  },
  {
    path: "/plugin/use_time_progress_bar",
    name: "",
    mate: {},
    component: () => import("@/views/plugin/use_time_progress_bar.vue")
  }
];
