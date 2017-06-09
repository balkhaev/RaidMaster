export default function timer(fn, seconds, cb) {
  let currentSeconds = 1

  setInterval(() => {
    if (currentSeconds === seconds) {
      currentSeconds = 1
      fn()
    } else {
      currentSeconds++
    }
  }, 1000)
}
