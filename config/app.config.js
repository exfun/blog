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
      title: '归档',
      route: 'archive'
    },
    {
      title: '子菜单',
      // href: 'https://www.github.com/lanten'\
      children: [
        { title: 'test1', route: 'test1' },
        { title: 'submenu', route: 'submenu' },
        { title: 'submenu2', route: 'submenu2' },
      ]
    },
    {
      title: '关于',
      route: 'about'
    }
  ]
}