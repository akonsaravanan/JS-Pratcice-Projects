const nav = document.querySelectorAll("li");

nav.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target;
    console.log(target);
    console.log(target.tagName);

    if (target.tagName === "A") {
      const goTo = target.getAttribute("href").replace("#", "");
      document.getElementById(`${goTo}`).scrollIntoView({ behavior: "smooth" });
    }
  });
});
