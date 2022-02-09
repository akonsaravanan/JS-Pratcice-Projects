(function () {
  const screen = document.querySelector(".screen");
  const btns = document.querySelectorAll(".btn");
  const btnEqual = document.querySelector(".btn-equal");
  const btnClear = document.querySelector(".btn-clear");

  btns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      let input = e.target.dataset.num;
      if (screen.value !== "Please Enter a value") {
        screen.value += input;
      } else {
        screen.value = "";
        screen.value += input;
      }
    });

    btnEqual.addEventListener("click", function (e) {
      if (screen.value !== "" && screen.value !== "Please Enter a value") {
        let result = eval(screen.value);
        screen.value = result;
      } else if (screen.value === "Please Enter a value") {
        screen.value = "";
      } else {
        screen.style.color = "red";
        screen.value = "Please Enter a value";
      }
    });

    btnClear.addEventListener("click", function () {
      screen.value = "";
    });
  });
})();
