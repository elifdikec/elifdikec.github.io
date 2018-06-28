// setup routes
var router = new Navigo(null, true)
router.on(function () {
  document.body.className = null
})
.on('music', function () {
  document.body.className = 'music'
})
.on('about', function () {
  document.body.className = 'about'
})
.resolve()

// navigate to root on a second click
var menuItems = document.getElementsByClassName('menu__item')
;[].forEach.call(menuItems, function (menuItem) {
  menuItem.addEventListener('click', function (event) {
    if (event.target.href !== window.location.href) return
    event.preventDefault()
    router.navigate()
  })
})

var audios = document.querySelectorAll('#music tr td:first-child')
var audioFile = null
;[].forEach.call(audios, function (audio) {
  audio.addEventListener('click', function (event) {
    if (event.target.className === 'play') {
      // stop
      event.target.className = null
      if (audioFile && typeof audioFile.pause === 'function') {
        audioFile.pause()
        audioFile.currentTime = 0
      }
    } else {
      ;[].forEach.call(audios, function (audio) {
        audio.className = null
      })
      event.target.className = 'play'
      if (event.target.dataset && event.target.dataset.sample) {
        // stop first
        if (audioFile && typeof audioFile.pause === 'function') {
          audioFile.pause()
          audioFile.currentTime = 0
        }
        // play
        audioFile = new Audio('/samples/' + event.target.dataset.sample)
        audioFile.play()
      }
    }
  })
})
