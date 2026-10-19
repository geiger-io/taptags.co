/*
 * Single source of truth for store links.
 * /get, /ios and /android all read from this file. Update links here only.
 *
 * The noscript fallback links on /ios and /android duplicate these URLs as
 * plain hrefs for visitors with JavaScript disabled. If you change a URL
 * here, update the matching noscript href in ios/index.html and
 * android/index.html too.
 */
var STORE_LINKS = {
  // PLACEHOLDER: the App Store listing does not exist yet. Replace with the
  // real App Store URL (e.g. https://apps.apple.com/app/idXXXXXXXXXX) once
  // App Store Connect assigns the app its ID.
  ios: "https://apps.apple.com/app/id0000000000",
  android: "https://play.google.com/store/apps/details?id=com.taptags.app"
};
