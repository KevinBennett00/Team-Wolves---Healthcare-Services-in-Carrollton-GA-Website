(function () {
  const form = document.getElementById("provider-search-form");
  const list = document.getElementById("provider-results");
  const noResults = document.getElementById("provider-no-results");
  const status = document.getElementById("provider-search-status");
  if (!form || !list) return;

  const cards = list.querySelectorAll(".provider-card");
  const total = cards.length;
  const inputSpecialty = document.getElementById("filter-specialty");
  const inputInsurance = document.getElementById("filter-insurance");
  const inputLocation = document.getElementById("filter-location");
  const clearBtn = document.getElementById("clear-provider-filters");

  function fold(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
  }

  function hasMatch(text, query) {
    if (!query || !String(query).trim()) return true;
    const t = fold(text);
    const q = fold(query);
    if (!q) return true;
    return t.includes(q);
  }

  function filter() {
    const qSpec = inputSpecialty ? inputSpecialty.value : "";
    const qIns = inputInsurance ? inputInsurance.value : "";
    const qLoc = inputLocation ? inputLocation.value : "";
    let visible = 0;

    cards.forEach((card) => {
      const spec = card.dataset.specialty || "";
      const ins = card.dataset.insurance || "";
      const loc = card.dataset.location || "";
      const show =
        hasMatch(spec, qSpec) && hasMatch(ins, qIns) && hasMatch(loc, qLoc);
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (noResults) {
      noResults.hidden = visible > 0;
    }

    if (status) {
      if (total === 0) {
        status.textContent = "No sample providers on this page.";
      } else if (visible === 0) {
        status.textContent =
          "No providers match the current filters. Try clearing a field or using different words.";
      } else if (visible === total) {
        status.textContent = `Showing all ${total} sample provider${total === 1 ? "" : "s"}.`;
      } else {
        status.textContent = `Showing ${visible} of ${total} sample providers that match your filters.`;
      }
    }
  }

  function currentPageName() {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf("/") + 1) || "providers.html";
  }

  function syncUrl() {
    const p = new URLSearchParams();
    if (inputSpecialty && inputSpecialty.value.trim()) {
      p.set("specialty", inputSpecialty.value.trim());
    }
    if (inputInsurance && inputInsurance.value.trim()) {
      p.set("insurance", inputInsurance.value.trim());
    }
    if (inputLocation && inputLocation.value.trim()) {
      p.set("location", inputLocation.value.trim());
    }
    const q = p.toString();
    const file = currentPageName();
    history.replaceState(null, "", q ? `${file}?${q}` : file);
  }

  function readUrlAndFilter() {
    const p = new URLSearchParams(window.location.search);
    if (inputSpecialty) inputSpecialty.value = p.get("specialty") || "";
    if (inputInsurance) inputInsurance.value = p.get("insurance") || "";
    if (inputLocation) {
      const loc = p.get("location");
      if (loc !== null) inputLocation.value = loc;
    }
    filter();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    syncUrl();
    filter();
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      if (inputSpecialty) inputSpecialty.value = "";
      if (inputInsurance) inputInsurance.value = "";
      if (inputLocation) inputLocation.value = "Carrollton, GA";
      history.replaceState(null, "", currentPageName());
      filter();
    });
  }

  readUrlAndFilter();
})();
