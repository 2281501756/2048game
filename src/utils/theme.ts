const changeTheme = function (theme: string) {
  console.log(theme)
  if (theme === 'dark') {
    document.documentElement.style.setProperty('--main-background-color', '#000')
    document.documentElement.style.setProperty('--base-color', '#666')
    document.documentElement.style.setProperty('--map-color', '#141414')
    document.documentElement.style.setProperty('--map-box-color', '#212121')
    document.documentElement.style.setProperty('--background-color-2', '#9538ec')
    document.documentElement.style.setProperty('--font-color-2', '#fff')
    document.documentElement.style.setProperty('--background-color-4', '#fb5607')
    document.documentElement.style.setProperty('--font-color-4', '#fff')
    document.documentElement.style.setProperty('--background-color-8', '#ef233c')
    document.documentElement.style.setProperty('--font-color-8', '#fff')
    document.documentElement.style.setProperty('--background-color-16', '#023e8a')
    document.documentElement.style.setProperty('--font-color-16', '#fff')
    document.documentElement.style.setProperty('--background-color-32', '#ffba08')
    document.documentElement.style.setProperty('--font-color-32', '#fff')
    document.documentElement.style.setProperty('--background-color-64', '#1b4332')
    document.documentElement.style.setProperty('--font-color-64', '#fff')
    document.documentElement.style.setProperty('--background-color-128', '#fdca40')
    document.documentElement.style.setProperty('--font-color-128', '#fff')
    document.documentElement.style.setProperty('--background-color-256', '#1b263b')
    document.documentElement.style.setProperty('--font-color-128', '#fff')
    document.documentElement.style.setProperty('--background-color-512', '#bf0603')
    document.documentElement.style.setProperty('--font-color-128', '#fff')
    document.documentElement.style.setProperty('--background-color-1024', '#3a0ca3')
    document.documentElement.style.setProperty('--font-color-128', '#fff')
    document.documentElement.style.setProperty('--background-color-2048', '#20bf55')
    document.documentElement.style.setProperty('--font-color-128', '#fff')
    document.documentElement.style.setProperty('--background-color-4096', '#f17300')
    document.documentElement.style.setProperty('--font-color-128', '#fff')
    document.documentElement.style.setProperty('--background-color-8192', '#822faf')
    document.documentElement.style.setProperty('--font-color-128', '#fff')
    document.documentElement.style.setProperty(
      '--home-background',
      'url("https://cdn.acwing.com/media/article/image/2022/08/14/67937_f7a4dd161b-mesh-68.png")'
    )
    document.documentElement.style.setProperty('--home-logo-color', '#fff')
    document.documentElement.style.setProperty(
      '--home-button-background',
      'linear-gradient(173deg,#d3cce3,#e9e4f0)'
    )
    document.documentElement.style.setProperty('--home-button-color', '#111')
    document.documentElement.style.setProperty('--home-button-hover-background', '#9538ec')
    document.documentElement.style.setProperty('--home-button-hover-color', '#fff')
  } else {
    document.documentElement.style.setProperty('--main-background-color', '#faf8ef')
    document.documentElement.style.setProperty('--base-color', '#776e65')
    document.documentElement.style.setProperty('--map-color', '#bbada0')
    document.documentElement.style.setProperty('--map-box-color', 'rgba(238, 228, 218, 0.35)')
    document.documentElement.style.setProperty('--background-color-2', '#eee4da')
    document.documentElement.style.setProperty('--font-color-2', '#766e65')
    document.documentElement.style.setProperty('--background-color-4', '#ebe0c8')
    document.documentElement.style.setProperty('--font-color-4', '#766e65')
    document.documentElement.style.setProperty('--background-color-8', '#ecb078')
    document.documentElement.style.setProperty('--font-color-8', '#fff')
    document.documentElement.style.setProperty('--background-color-16', '#ed9461')
    document.documentElement.style.setProperty('--font-color-16', '#fff')
    document.documentElement.style.setProperty('--background-color-32', '#ec7b5c')
    document.documentElement.style.setProperty('--font-color-32', '#fff')
    document.documentElement.style.setProperty('--background-color-64', '#eb5c36')
    document.documentElement.style.setProperty('--font-color-64', '#fff')
    document.documentElement.style.setProperty('--background-color-128', '#f0d86a')
    document.documentElement.style.setProperty('--font-color-128', '#fff')
    document.documentElement.style.setProperty('--background-color-256', '#edd049')
    document.documentElement.style.setProperty('--font-color-128', '#fff')
    document.documentElement.style.setProperty('--background-color-512', '#e1c023')
    document.documentElement.style.setProperty('--font-color-128', '#fff')
    document.documentElement.style.setProperty('--background-color-1024', '#d9b823')
    document.documentElement.style.setProperty('--font-color-128', '#fff')
    document.documentElement.style.setProperty('--background-color-2048', '#d1b123')
    document.documentElement.style.setProperty('--font-color-128', '#fff')
    document.documentElement.style.setProperty('--background-color-4096', '#e03207')
    document.documentElement.style.setProperty('--font-color-128', '#fff')
    document.documentElement.style.setProperty('--background-color-8192', '#e0283e')
    document.documentElement.style.setProperty('--font-color-128', '#fff')
    document.documentElement.style.setProperty(
      '--home-background',
      'URL("https://cdn.acwing.com/media/article/image/2022/08/05/67937_164d6a2414-wallhaven-z8wl1y.png")'
    )
    document.documentElement.style.setProperty('--home-logo-color', '#5f4321')
    document.documentElement.style.setProperty('--home-button-color', '#111')
    document.documentElement.style.setProperty(
      '--home-button-background',
      'linear-gradient(310deg, #fdeb71, #f8d800)'
    )
    document.documentElement.style.setProperty('--home-button-hover-background', '#fac03d')
    document.documentElement.style.setProperty('--home-button-hover-color', '#fff')
  }
}

export default changeTheme
