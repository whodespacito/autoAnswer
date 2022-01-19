window.start = function() {
  window.always = setInterval(() => {
    if (document.getElementById("next-btn")) {
      document.getElementById("next-btn").click()
    } else {
      
    }
  },500)
}
window.stop = function() {
  clearInterval(always)
}
