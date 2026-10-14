/**
 * Mrinal Pandey Portfolio - Botpress AI Assistant Integration
 * Official Botpress Webchat v3.7 Loader & UX Controller
 */

(function () {
  const BOTPRESS_INJECT_URL = "https://cdn.botpress.cloud/webchat/v3.7/inject.js";
  const BOTPRESS_CONFIG_URL = "https://files.bpcontent.cloud/2026/10/06/04/20261006043758-TQB32X8L.js";

  // Prevent multiple injections
  if (window.__bp_initialized) return;
  window.__bp_initialized = true;

  function loadScript(src, isDefer = false, callback) {
    if (document.querySelector(`script[src="${src}"]`)) {
      if (callback) callback();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    if (isDefer) {
      script.defer = true;
    } else {
      script.async = true;
    }

    script.onload = () => {
      if (callback) callback();
    };

    script.onerror = (err) => {
      console.warn("[Botpress] Failed to load script:", src, err);
    };

    document.body.appendChild(script);
  }

  function initBotpressWebchat() {
    // 1. Inject Botpress Webchat core runtime
    loadScript(BOTPRESS_INJECT_URL, false, () => {
      // 2. Inject bot-specific configuration with defer
      loadScript(BOTPRESS_CONFIG_URL, true, () => {
        console.log("[Botpress] Mrinal Pandey's AI Assistant initialized successfully.");
      });
    });

    // 3. Attach custom cursor & UI haptics to the Botpress launcher once mounted
    const observer = new MutationObserver(() => {
      const bpButtons = document.querySelectorAll(
        '#bp-web-widget-container, .bpw-widget-btn, button[class*="bp"], div[class*="bpw-widget"]'
      );
      if (bpButtons.length > 0) {
        bpButtons.forEach(btn => {
          btn.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
          btn.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBotpressWebchat);
  } else {
    initBotpressWebchat();
  }
})();
