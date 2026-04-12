(function (window) {
  window.BP_CONFIG = Object.freeze({
    API_BASE_URL: window.BP_API_BASE_URL || "/api/v1",
    CSRF_COOKIE_URL: window.BP_CSRF_COOKIE_URL || "/sanctum/csrf-cookie",
    FRONTEND_ROLE_STORAGE_KEY: "bp_role",
    FRONTEND_USER_STORAGE_KEY: "bp_user"
  });
})(window);

