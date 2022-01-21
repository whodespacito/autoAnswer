window.start = function() {
  window.always = setInterval(() => {
    if (document.getElementById("next-btn")) {
      document.getElementById("next-btn").click()
    } else {
      var number = Math.floor(Math.random() * 3);
      var choices = document.querySelectorAll(".choice")
      choices[number].click()
    }
  },30000)
}
window.stop = function() {
  clearInterval(always)
}
