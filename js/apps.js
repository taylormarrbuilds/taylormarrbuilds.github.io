(function () {
  var DATA_URL = "/data/apps.json";

  function isIsoDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value || "");
  }

  function formatDate(iso) {
    var parts = iso.split("-");
    var date = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    });
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function sortApps(apps) {
    return apps.slice().sort(function (a, b) {
      var ad = isIsoDate(a.date) ? a.date : "0000-00-00";
      var bd = isIsoDate(b.date) ? b.date : "0000-00-00";
      if (ad !== bd) return ad < bd ? 1 : -1;
      return String(a.name || "").localeCompare(String(b.name || ""));
    });
  }

  function renderList(apps) {
    var list = document.getElementById("app-list");
    if (!list) return;
    clear(list);
    list.removeAttribute("aria-busy");
    hideStatus();
    if (!apps.length) {
      list.appendChild(el("p", "empty", "No apps yet."));
      return;
    }
    apps.forEach(function (app) {
      var article = el("article", "app-card");
      var header = el("header", "app-card-header");
      header.appendChild(el("h2", null, app.name || "Untitled app"));
      var time = document.createElement("time");
      if (isIsoDate(app.date)) {
        time.dateTime = app.date;
        time.textContent = formatDate(app.date);
      } else {
        time.textContent = app.date || "Date missing";
      }
      header.appendChild(time);
      article.appendChild(header);

      article.appendChild(el("p", "description", app.description || "Description missing."));

      var learned = el("p", "learned");
      learned.appendChild(el("strong", null, "What I learned. "));
      learned.appendChild(document.createTextNode(app.learned || "DRAFT — Taylor, add what you learned."));
      article.appendChild(learned);

      var links = el("p", "card-links");
      if (app.live) {
        var live = el("a", null, "Live");
        live.href = app.live;
        links.appendChild(live);
      }
      if (app.code) {
        var code = el("a", null, "Code");
        code.href = app.code;
        if (/^https?:\/\//.test(app.code)) {
          code.target = "_blank";
          code.rel = "noopener noreferrer";
          code.appendChild(el("span", "visually-hidden", " (opens in a new tab)"));
        }
        links.appendChild(code);
      }
      article.appendChild(links);
      list.appendChild(article);
    });
  }

  function renderLatest(apps) {
    var slot = document.getElementById("latest");
    if (!slot || !apps.length) return;
    var app = apps[0];
    clear(slot);
    slot.appendChild(document.createTextNode("Latest app: "));
    if (app.live) {
      var link = el("a", null, app.name || "Untitled app");
      link.href = app.live;
      slot.appendChild(link);
    } else {
      slot.appendChild(document.createTextNode(app.name || "Untitled app"));
    }
    if (app.date) {
      slot.appendChild(document.createTextNode(" · " + (isIsoDate(app.date) ? formatDate(app.date) : app.date)));
    }
    slot.hidden = false;
  }

  function hideStatus() {
    var status = document.getElementById("app-status");
    if (status) status.hidden = true;
  }

  function showError() {
    var list = document.getElementById("app-list");
    hideStatus();
    if (!list) return;
    clear(list);
    list.removeAttribute("aria-busy");
    list.appendChild(el("p", "error", "Could not load the app list from data/apps.json."));
  }

  if (!document.getElementById("app-list") && !document.getElementById("latest")) return;

  fetch(DATA_URL)
    .then(function (res) {
      if (!res.ok) throw new Error("status " + res.status);
      return res.json();
    })
    .then(function (data) {
      if (!Array.isArray(data)) throw new Error("expected an array");
      var apps = sortApps(data.filter(function (app) { return app && typeof app === "object"; }));
      renderList(apps);
      renderLatest(apps);
    })
    .catch(showError);
})();
