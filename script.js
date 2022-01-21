window.start = function() {
  if (window.isItOn === false) {
    window.always = setInterval(() => {
      if (document.getElementById("next-btn")) {
        document.getElementById("next-btn").click()
      } else {
        var number = Math.floor(Math.random() * 3);
        var choices = document.querySelectorAll(".choice")
        choices[number].click()
      }
      window.isItOn = true
    },500)
  } else {
    clearInterval(always)
    window.isItOn = false
  }
}
window.stop = function() {
  clearInterval(always)
}
