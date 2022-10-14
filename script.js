let loop;
function start() {
  loop = setInterval( async () => {
    if (document.getElementById("next-btn")) {
      document.querySelector(".answer").click();
      document.getElementById("next-btn").click();
    }
    var random = Math.floor(Math.random() * 3);
    document.querySelectorAll(".choice")[random].click();
  }, 30000);
}
