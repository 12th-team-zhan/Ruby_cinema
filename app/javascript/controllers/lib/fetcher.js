export function fetchWithoutParams(path, method) {
  const token = document.querySelector("meta[name='csrf-token']").content;

  return fetch(path, {
    headers: {
      "X-csrf-Token": token,
    },
    method: method,
  }).then((response) => response.json());
}

export function fetchWithParams(path, method, params) {
  const token = document.querySelector("meta[name='csrf-token']").content;

  return fetch(path, {
    headers: {
      "X-csrf-Token": token,
      "Content-Type": "application/json",
    },
    method: method,
    body: JSON.stringify(params),
  }).then((response) => response.json());
}

export function fetchWithParamsAndRedirect(path, method, params) {
  const token = document.querySelector("meta[name='csrf-token']").content;

  return fetch(path, {
    headers: {
      "X-csrf-Token": token,
      "Content-Type": "application/json",
    },
    method: method,
    redirect: "follow",
    body: JSON.stringify(params),
  }).then((resp) => {
    if (resp.redirected) {
      window.location.href = resp.url;
    }
  });
}
