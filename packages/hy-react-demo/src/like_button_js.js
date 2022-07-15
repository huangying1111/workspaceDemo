'use strict'
const { createElement } = React
const LikeButtonJS = () => {
  const [liked, setLiked] = React.useState(false)
  if (liked) {
    return 'You liked this js.'
  }
  return createElement('button', { onClick: () => setLiked(true) }, 'Like js')
}

const domContainerJS = document.querySelector('#like_button_container_js')
ReactDOM.createRoot(domContainerJS).render(createElement(LikeButtonJS))
