const nav = document.querySelector(".nav");
const navLogo = document.querySelector(".nav-logo");
const itemA = document.querySelectorAll(".item-a");
const navbarHeight = nav.getBoundingClientRect().height;

document.documentElement.style.setProperty("--change-color", "white");

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    nav.classList.add("navbar--white");
    navLogo.classList.add("navbar--white");
    for (var i = 0; i < itemA.length; i++) {
      var item = itemA.item(i);
      item.classList.add("navbar--white");
    }
    document.documentElement.style.setProperty("--change-color", "#F45866");
  } else {
    nav.classList.remove("navbar--white");
    navLogo.classList.remove("navbar--white");
    for (var i = 0; i < itemA.length; i++) {
      var item = itemA.item(i);
      item.classList.remove("navbar--white");
    }
    document.documentElement.style.setProperty("--change-color", "white");
  }
});
