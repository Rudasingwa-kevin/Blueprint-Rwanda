(function (window) {
  function getStoredUser() {
    try {
      return JSON.parse(localStorage.getItem("bp_user") || "null");
    } catch (_) {
      return null;
    }
  }

  function requireAuth(redirectTo) {
    const user = getStoredUser();
    if (!user) {
      const target = redirectTo || window.location.pathname.split("/").pop() || "index.html";
      window.location.href = "verification.html?redirect=" + encodeURIComponent(target);
      return false;
    }

    return true;
  }

  function requireRole(role, redirectTo) {
    const user = getStoredUser();
    if (!user || user.role !== role) {
      window.location.href = redirectTo || "verification.html";
      return false;
    }

    return true;
  }

  window.BP_AUTH = {
    getStoredUser: getStoredUser,
    requireAuth: requireAuth,
    requireRole: requireRole
  };
})(window);
