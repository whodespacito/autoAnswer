window.start = function() {
  if (!window.always) {
    window.always = setInterval(() => {
      if (document.getElementById("next-btn")) {
        document.getElementById("next-btn").click()
      } else {
        var 
      }
    },500)
  } else {
    clearInterval(always)
  }
}
window.stop = function() {
  clearInterval(always)
}
