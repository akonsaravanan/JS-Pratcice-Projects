let h,
  m,
  s,
  date,
  session = "AM";
let display = document.querySelector("#MyClockDisplay");
const showTime = function () {
  date = new Date();
  h = date.getHours();
  m = date.getMinutes();
  s = date.getSeconds();

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h <= 9 ? "0" + h : h;
  m = m <= 9 ? "0" + m : m;
  s = s <= 9 ? "0" + s : s;

    setTimeout(showTime, 1000);
    display.textContent = h + ":" + m + ":" + s + ":" + session;
};

// showTime();
button = document.querySelector("#clockdisplay");
button.addEventListener("click", function () {
  showTime();
 
});
