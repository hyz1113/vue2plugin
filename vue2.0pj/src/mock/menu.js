export default {
    data() {
        return {
            menuList: [{
                name: '基础表单使用',
                url: '/plugin/baseForm',
                id: '1',
                child: [{
                    name: '基础表单',
                    url: '/plugin/baseForm',
                    id: '1-1'
                },
                {
                    name: '基础表格',
                    url: '/plugin/baseTable',
                    id: '1-2'
                }]
            }]
        }
    },
    methods: {}
}