(function () {
  "use strict";

  /* ---- mobile nav toggle ---- */
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

  /* ---- scroll reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---- estructura del libro: tabs de partes ---- */
  var partTabs = document.querySelectorAll(".part-tab");
  var chapterLists = document.querySelectorAll(".chapter-list");
  var partFigure = document.getElementById("partFigure");

  var partImages = {
    "1": { src: "images/neuronas.jpg", alt: "Cómo se instala un patrón mental, capa a capa" },
    "2": { src: "images/respiracion.jpg", alt: "La respiración 4-6: inhala, sostén, exhala" },
    "3": { src: "images/mantras.jpg", alt: "La repetición que instala el nuevo camino" }
  };

  partTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var part = tab.getAttribute("data-part");

      partTabs.forEach(function (t) {
        t.classList.toggle("active", t === tab);
      });

      chapterLists.forEach(function (list) {
        list.classList.toggle("active", list.getAttribute("data-part") === part);
      });

      if (partFigure && partImages[part]) {
        partFigure.style.opacity = "0";
        window.setTimeout(function () {
          partFigure.src = partImages[part].src;
          partFigure.alt = partImages[part].alt;
          partFigure.style.opacity = "1";
        }, 150);
      }
    });
  });

  if (partFigure) {
    partFigure.style.transition = "opacity 0.2s ease";
  }
})();


/* =========================================================
   Venta del libro: checkout de Hotmart + barra fija en móvil
   ========================================================= */
(function () {
  "use strict";

  /* Checkout del libro en Hotmart (prelanzamiento $14 con offDiscount=PRELANZAMIENTO; normal $29)
     con el order bump del sistema (+$23).
     checkoutMode=10: página de pago completa de Hotmart (el widget se carga al final de index.html). */
  var BOOK_CHECKOUT = "https://pay.hotmart.com/L107795089A?checkoutMode=10&offDiscount=PRELANZAMIENTO";

  document.querySelectorAll("[data-checkout]").forEach(function (a) {
    a.setAttribute("href", BOOK_CHECKOUT);
  });

  var sticky = document.getElementById("stickyCta");
  var hero = document.getElementById("inicio");
  var offer = document.getElementById("comprar");
  if (sticky && hero && offer && "IntersectionObserver" in window) {
    var heroVisible = true, offerVisible = false;
    var update = function () { sticky.classList.toggle("show", !heroVisible && !offerVisible); };
    new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(function (e) { offerVisible = e[0].isIntersecting; update(); }).observe(offer);
  }
})();
