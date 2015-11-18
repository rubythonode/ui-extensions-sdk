export default function createWindow (channel) {
  let observer = new MutationObserver(() => updateHeight())
  let oldHeight = null

  return {startAutoResizer, stopAutoResizer, updateHeight}

  function startAutoResizer () {
    observer.observe(window.document.body, {
      attributes: true, childList: true,
      subtree: true, characterData: true
    })
  }

  function stopAutoResizer () {
    observer.disconnect()
  }

  function updateHeight (height) {
    if (height == null) {
      height = window.document.body.scrollHeight
    }

    if (height !== oldHeight) {
      channel.send('setHeight', height)
    }
  }
}