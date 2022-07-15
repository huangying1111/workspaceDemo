'use strict'

const LikeButton = () => {
  const [liked, setLiked] = React.useState(false)
  if (liked) {
    return 'You liked this jsx.'
  }
  return <button onClick={() => setLiked(true)}>Like jsx</button>
}

const domContainer = document.querySelector('#like_button_container_jsx')
ReactDOM.createRoot(domContainer).render(<LikeButton />)
