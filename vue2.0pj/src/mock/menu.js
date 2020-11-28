export default {
    data() {
        return {
            menuList: [{
                name: '基础组件使用',
                url: '/plugin',
                id: '1',
                child: [{
                    name: '基础表单',
                    url: 'baseForm',
                    id: '1-1'
                },
                {
                    name: '基础表格',
                    url: 'baseTable',
                    id: '1-2'
                },
                {
                    name: '时间进度条',
                    url: 'use_time_progress_bar',
                    id: '1-3'
                },
                {
                    name: '城市选择',
                    url: 'use_city_select',
                    id: '1-4'
                }]
            }]
        }
    },
    methods: {}
}