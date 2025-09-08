'use strict';

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const header = document.querySelector("[data-header]");
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const menus = document.querySelectorAll("[data-menu]");
const subMenus = document.querySelectorAll("[data-sub-menu]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const menuIcon = document.querySelector("[data-menu-icon]");
const arrows = document.querySelectorAll("[data-arrow]");
const body = document.body;

const toggleNav = function () {
  navbar.classList.toggle("active");
  menuIcon.classList.toggle("active");
  body.classList.toggle("nav-active");
  if (navbar.classList.contains("active")) {
    subMenus.forEach(sub => sub.classList.remove("active"));
    arrows.forEach(arrow => arrow.classList.remove("active"));
  }
};


const toggleSubmenu = function (event) {
  event.preventDefault();

  const targetSubmenu = event.currentTarget.nextElementSibling;
  const arrowIcons = this.querySelectorAll("[data-arrow]");
  if (!targetSubmenu) return;

  subMenus.forEach(sub => {
    if (sub !== targetSubmenu) sub.classList.remove("active");
  });
  arrows.forEach(a => a.classList.remove("active"));

  targetSubmenu.classList.toggle("active");
  arrowIcons.forEach(icon => icon.classList.toggle("active"));
};


document.addEventListener("click", function (event) {
  const isClickInside = navbar.contains(event.target) || menuIcon.contains(event.target);
  if (!isClickInside && navbar.classList.contains("active")) {
    navbar.classList.remove("active");
    menuIcon.classList.remove("active");
    body.classList.remove("nav-active");
    subMenus.forEach(sub => sub.classList.remove("active"));
    arrows.forEach(arrow => arrow.classList.remove("active"));
  }
});


addEventOnElements(navTogglers, "click", toggleNav);

const closeAllMenus = function () {
  navbar.classList.remove("active");
  menuIcon.classList.remove("active");
  body.classList.remove("nav-active");

  subMenus.forEach(sub => sub.classList.remove("active"));
  arrows.forEach(arrow => arrow.classList.remove("active"));
};

addEventOnElements(navLinks, "click", function () {
  closeAllMenus();
});

addEventOnElements(menus, "click", toggleSubmenu);

window.addEventListener("scroll", function(){
  const scrollY = window.scrollY;
  if(scrollY > 50){
    header.classList.add("active")
  }else{
    header.classList.remove("active")
  }
})