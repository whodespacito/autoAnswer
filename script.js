window.sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
window.start = function() {
  window.always = setInterval(() => {
    if (document.getElementById("next-btn")) {
      document.querySelector(".answer").click()
      await sleep(5000)
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
