(function (window) {
  const config = window.BP_CONFIG || { API_BASE_URL: "/api/v1" };

  async function request(path, options) {
    const response = await fetch(config.API_BASE_URL + path, {
      credentials: "include",
      headers: {
        "Accept": "application/json",
        ...(options && options.body ? { "Content-Type": "application/json" } : {}),
        ...(options && options.headers ? options.headers : {})
      },
      ...options
    });

    let payload = null;
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      payload = await response.json();
    } else if (!response.ok) {
      payload = { message: "Unexpected non-JSON error response" };
    }

    if (!response.ok) {
      const error = new Error((payload && payload.message) || "Request failed");
      error.status = response.status;
      error.payload = payload;
      throw error;
    }

    return payload;
  }

  window.BP_API = {
    get: function (path) {
      return request(path, { method: "GET" });
    },
    post: function (path, body) {
      return request(path, { method: "POST", body: JSON.stringify(body || {}) });
    },
    patch: function (path, body) {
      return request(path, { method: "PATCH", body: JSON.stringify(body || {}) });
    },
    delete: function (path) {
      return request(path, { method: "DELETE" });
    }
  };
})(window);

