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

// play audios
var audios = document.querySelectorAll('#music tr td:first-child')
var audioFile = null
const play = function (element) {
  if (!element.dataset || !element.dataset.sample) return
  // stop first
  stop(element)
  ;[].forEach.call(audios, function (audio) {
    audio.className = null
  })
  // play
  element.className = 'play'
  audioFile = new Audio('/samples/' + element.dataset.sample)
  audioFile.onended = stop.bind(null, element)
  audioFile.play()
}
const stop = function (element) {
  if (element) element.className = null
  if (!audioFile || typeof audioFile.pause !== 'function') return
  audioFile.pause()
  audioFile.currentTime = 0
}
;[].forEach.call(audios, function (audio) {
  audio.addEventListener('click', function (event) {
    if (event.target.className === 'play') {
      stop(event.target)
    } else {
      play(event.target)
    }
  })
})
