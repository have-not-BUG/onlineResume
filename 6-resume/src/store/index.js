import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
            state: {

                selected: 'profile',
                resume: {
                    config: [
                        { field: 'profile', icon: 'id' },
                        { field: 'workHistory', icon: 'work' },
                        { field: 'education', icon: 'book' },
                        { field: 'projects', icon: 'heart' },
                        { field: 'awards', icon: 'cup' },
                        { field: 'contacts', icon: 'phone' }
                    ],
                    profile: {
                        name: '李某人',
                        city: '南昌',
                        title: '前端开发工程师',
                      birthday:'1991-11-21'

                    },
                    'workHistory': [
                        { company: '腾购科技有限公司', content: `公司总部设在XXXX区，先后在北京、上海成立分公司。专注于移动XXX领域，主打产品XXXXX，它将资讯、报纸、杂志、图片、微信等众多内容，按照用户意愿聚合到一起，实现深度个性化 定制我的主要工作如下:
                        1.既定产品需求;
                        2.修复 bug `},
                      { company: '饿了么科技有限公司', content: `公司总部设在XXXX区，先后在北京、上海成立分公司。专注于移动XXX领域，主打产品XXXXX，它将资讯、报纸、杂志、图片、微信等众多内容，按照用户意愿聚合到一起，实现深度个性化 定制我的主要工作如下:
                      1.既定产品需求;
                      2.修复 bug `},

                    ],
                    education: [
                        { school: '南昌大学', content: '本科' },
                        { school: '南昌大学', content: '研究生' },
                    ],
                    projects: [
                        { name: 'project A', content: '项目A描述' },
                        { name: 'project B', content: '项目B描述' },
                    ],
                    awards: [
                        { name: 'awards A', content: '奖项A说明' },
                        { name: 'awards B', content: '奖项B说明' },
                    ],
                    contacts: [
                        { contact: 'phone', content: '1388888888' },
                        { contact: 'qq', content: '666666' },
                    ],

                }
            },


    mutations:{

  switchTab(state,payload){
    state.selected = payload
     }
    }
})
