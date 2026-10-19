/*
 * Applies the "coming soon" state to any store button whose platform has no
 * real link yet in assets/stores.js. Must run after stores.js and after the
 * store button markup, so put the two script tags at the end of <body>.
 *
 * Each store link is a plain <a data-store="ios|android" class="store-btn">
 * wrapping a badge image. When STORE_LINKS[platform] is falsy (e.g. ios:
 * null), the button loses its href and its badge image is replaced with a
 * "Coming soon" label so no visitor can reach a dummy store URL.
 */
(function () {
  if (typeof STORE_LINKS === "undefined") return;

  Object.keys(STORE_LINKS).forEach(function (platform) {
    if (STORE_LINKS[platform]) return;

    var label = platform === "ios" ? "App Store" : "Google Play";
    var buttons = document.querySelectorAll('[data-store="' + platform + '"]');

    buttons.forEach(function (el) {
      el.classList.add("coming-soon");
      el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true");
      el.setAttribute("tabindex", "-1");
      el.innerHTML = '<span class="coming-soon-label">Coming soon to the ' + label + "</span>";
    });
  });
})();
