export default defineAppConfig({
  pages: ['pages/index/index', 'pages/hot/hot', 'pages/nodes/nodes','pages/thread_detail/thread_detail'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'V2EX',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    list: [
      {
        iconPath: 'resource/latest.png',
        selectedIconPath: 'resource/lastest_on.png',
        pagePath: 'pages/index/index',
        text: '最新',
      },
      {
        iconPath: 'resource/hotest.png',
        selectedIconPath: 'resource/hotest_on.png',
        pagePath: 'pages/hot/hot',
        text: '热门',
      },
      {
        iconPath: 'resource/node.png',
        selectedIconPath: 'resource/node_on.png',
        pagePath: 'pages/nodes/nodes',
        text: '节点',
      },
    ],
    color:'#000',
    selectedColor:'#56abe4',
    backgroundColor:'#fff',
    borderStyle:'white'
  },
});
