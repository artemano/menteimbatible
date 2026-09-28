(function () {
  "use strict";

  /* ---- Checkout de Hotmart ----
     Los botones llevan directo a la página de pago del curso ($47 USD).
     El link también está escrito en el HTML, así que funciona aunque este script no cargue. */
  var CHECKOUT_URL = "https://pay.hotmart.com/F107381026O";

  document.querySelectorAll("[data-checkout]").forEach(function (a) {
    a.setAttribute("href", CHECKOUT_URL);
  });

  /* ---- mobile nav toggle (igual al sitio del libro) ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- scroll reveal (igual al sitio del libro) ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- barra fija de compra en móvil: aparece después del hero, se oculta en la oferta ---- */
  var sticky = document.getElementById("stickyCta");
  var hero = document.getElementById("top");
  var offer = document.getElementById("oferta");
  if (sticky && hero && offer && "IntersectionObserver" in window) {
    var heroVisible = true, offerVisible = false;
    var update = function () { sticky.classList.toggle("show", !heroVisible && !offerVisible); };
    new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(function (e) { offerVisible = e[0].isIntersecting; update(); }).observe(offer);
  }
})();

/* VSL: el botón de la portada reproduce el video y activa los controles */
(function () {
  var frame = document.querySelector(".video-frame");
  if (!frame) return;
  var video = frame.querySelector("video"), btn = frame.querySelector(".video-play");
  if (!video || !btn) return;
  btn.addEventListener("click", function () {
    frame.classList.add("playing");
    video.controls = true;
    var p = video.play();
    if (p && p.catch) p.catch(function () { /* el usuario puede usar los controles */ });
  });
  video.addEventListener("play", function () { frame.classList.add("playing"); video.controls = true; });
})();
