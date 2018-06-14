module.exports = {
  title: 'LANTEN',
  // subTitle: '行到水穷处，坐看云起时',
  subTitle: 'lanten\'s blog',
  index: '/',
  // favicon: require('../src/images/favicon.ico'),

  menus: [
    {
      title: '首页',
      route: '/'
    },
    {
      title: '列表',
      route: '/list'
    },
    {
      title: '其它',
      children: [
        { title: '一排子菜单', route: 'test1' },
        { title: 'github', href: 'https://www.github.com/lanten' },
        { title: '归档', route: 'submenu2' },
        {
          title: '关于', route: 'submenu2', children: [
            { title: '一排子菜单', route: 'test1' },
            { title: '一排子菜单', route: 'test1' },
            { title: '一排子菜单', route: 'test1' },
          ]
        },
        {
          title: 'submenu-lv2', route: 'submenu2', children: [
            { title: 'er排子菜单', route: 'test1' },
            { title: 'er排子菜单', route: 'test1' },
            {
              title: 'submenu-lv2', route: 'test1', children: [
                { title: '没想到吧?', route: 'test1' },
                { title: '如果屏幕无限宽', route: 'test1' },
                { title: '理论上可以', route: 'test1' },
                { title: '无限递归', route: 'test1' },
              ]
            },
          ]
        },
        {
          title: 'submenu', route: 'submenu2', children: [
            { title: 'san排子菜单', route: 'test1' },
            { title: 'san排子菜单', route: 'test1' },
            { title: 'san排子菜单', route: 'test1' },
          ]
        },
      ]
    },
  ]
}