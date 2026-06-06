// CMAI local content manager
(function() {
  var DRAFT_KEY = "cmai_admin_content_draft";
  var PREVIEW_KEYS = {
    events: "cmai_preview_events",
    reviews: "cmai_preview_reviews"
  };

  var state = {
    events: [],
    reviews: []
  };
  var dirty = false;

  function clone(value) {
    return JSON.parse(JSON.stringify(value || []));
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function normalizeText(value) {
    return String(value || "").trim();
  }

  function normalizeEvent(event) {
    var cta = event && event.cta ? event.cta : {};
    var cleaned = {
      title: normalizeText(event && event.title) || "New event",
      date: normalizeText(event && event.date) || "TBD",
      time: normalizeText(event && event.time),
      location: normalizeText(event && event.location) || "CMAI Karate",
      description: normalizeText(event && event.description)
    };
    var label = normalizeText(cta.label);
    var url = normalizeText(cta.url);
    if (label || url) {
      cleaned.cta = {
        label: label || "Details",
        url: url
      };
    }
    return cleaned;
  }

  function normalizeReview(review) {
    return {
      name: normalizeText(review && review.name) || "Student",
      date: normalizeText(review && review.date) || today(),
      text: normalizeText(review && review.text)
    };
  }

  function cleanState() {
    return {
      events: state.events.map(normalizeEvent),
      reviews: state.reviews.map(normalizeReview)
    };
  }

  function fetchJson(path, fallback) {
    if (/^https?:$/.test(location.protocol)) {
      return fetch(path, { cache: "no-cache" })
        .then(function(response) {
          return response.ok ? response.json() : fallback;
        })
        .catch(function() {
          return fallback;
        });
    }
    return Promise.resolve(fallback);
  }

  function loadSiteData() {
    return Promise.all([
      fetchJson("data/events.json", CMAI_DATA.events || []),
      fetchJson("data/reviews.json", CMAI_DATA.reviews || [])
    ]).then(function(results) {
      return {
        events: clone(results[0]).map(normalizeEvent),
        reviews: clone(results[1]).map(normalizeReview)
      };
    });
  }

  function loadDraft() {
    try {
      var raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed.events) || !Array.isArray(parsed.reviews)) return null;
      return {
        events: parsed.events.map(normalizeEvent),
        reviews: parsed.reviews.map(normalizeReview),
        updatedAt: parsed.updatedAt || ""
      };
    } catch (error) {
      return null;
    }
  }

  function setStatus(message) {
    var status = document.getElementById("adminStatus");
    if (status) status.textContent = message;
  }

  function setDirty(message) {
    dirty = true;
    setStatus(message || "Unsaved draft changes.");
    renderOutputs();
    renderPreviews();
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function field(labelText, value, onInput, options) {
    var opts = options || {};
    var wrap = el("label", "admin-field");
    if (opts.multiline) wrap.classList.add("admin-field-wide");
    var label = el("span", null, labelText);
    var input = opts.multiline ? document.createElement("textarea") : document.createElement("input");
    input.value = value || "";
    input.spellcheck = opts.spellcheck !== false;
    if (opts.type) input.type = opts.type;
    if (opts.placeholder) input.placeholder = opts.placeholder;
    input.addEventListener("input", function() {
      onInput(input.value);
      setDirty();
    });
    wrap.append(label, input);
    return wrap;
  }

  function swap(items, from, to) {
    if (to < 0 || to >= items.length) return;
    var item = items[from];
    items[from] = items[to];
    items[to] = item;
    dirty = true;
    renderEditors();
    renderOutputs();
    renderPreviews();
    setStatus("Order updated.");
  }

  function removeItem(items, index, label) {
    items.splice(index, 1);
    dirty = true;
    renderEditors();
    renderOutputs();
    renderPreviews();
    setStatus(label + " removed.");
  }

  function itemActions(items, index, label) {
    var actions = el("div", "admin-item-actions");
    var up = el("button", "btn light small", "Up");
    var down = el("button", "btn light small", "Down");
    var remove = el("button", "btn alt small", "Remove");
    up.setAttribute("data-icon", "arrow-up");
    down.setAttribute("data-icon", "arrow-down");
    remove.setAttribute("data-icon", "trash");
    [up, down, remove].forEach(function(button) {
      button.type = "button";
    });
    up.disabled = index === 0;
    down.disabled = index === items.length - 1;
    up.addEventListener("click", function() {
      swap(items, index, index - 1);
    });
    down.addEventListener("click", function() {
      swap(items, index, index + 1);
    });
    remove.addEventListener("click", function() {
      removeItem(items, index, label);
    });
    actions.append(up, down, remove);
    return actions;
  }

  function renderEventEditor(event, index) {
    var card = el("article", "admin-item");
    var title = el("div", "admin-item-title", "Event " + (index + 1));
    var fields = el("div", "admin-fields");
    fields.append(
      field("Title", event.title, function(value) { event.title = value; }),
      field("Date", event.date, function(value) { event.date = value; }, { placeholder: "YYYY-MM-DD or TBD" }),
      field("Time", event.time, function(value) { event.time = value; }, { placeholder: "6:00p or TBD" }),
      field("Location", event.location, function(value) { event.location = value; }),
      field("Description", event.description, function(value) { event.description = value; }, { multiline: true }),
      field("Button label", event.cta && event.cta.label, function(value) {
        event.cta = event.cta || {};
        event.cta.label = value;
      }),
      field("Button URL", event.cta && event.cta.url, function(value) {
        event.cta = event.cta || {};
        event.cta.url = value;
      }, { spellcheck: false })
    );
    card.append(title, fields, itemActions(state.events, index, "Event"));
    return card;
  }

  function renderReviewEditor(review, index) {
    var card = el("article", "admin-item");
    var title = el("div", "admin-item-title", "Comment " + (index + 1));
    var fields = el("div", "admin-fields");
    fields.append(
      field("Name", review.name, function(value) { review.name = value; }),
      field("Date", review.date, function(value) { review.date = value; }, { placeholder: "YYYY-MM-DD" }),
      field("Comment", review.text, function(value) { review.text = value; }, { multiline: true })
    );
    card.append(title, fields, itemActions(state.reviews, index, "Comment"));
    return card;
  }

  function renderEditors() {
    var eventList = document.getElementById("eventEditorList");
    var reviewList = document.getElementById("reviewEditorList");
    var eventCount = document.getElementById("eventCount");
    var reviewCount = document.getElementById("reviewCount");
    if (eventCount) eventCount.textContent = state.events.length + " posted";
    if (reviewCount) reviewCount.textContent = state.reviews.length + " posted";
    if (eventList) {
      eventList.innerHTML = "";
      state.events.forEach(function(event, index) {
        eventList.appendChild(renderEventEditor(event, index));
      });
    }
    if (reviewList) {
      reviewList.innerHTML = "";
      state.reviews.forEach(function(review, index) {
        reviewList.appendChild(renderReviewEditor(review, index));
      });
    }
    if (typeof decorateIcons === "function") decorateIcons(document);
  }

  function renderOutputs() {
    var cleaned = cleanState();
    var eventsOutput = document.getElementById("eventsJsonOutput");
    var reviewsOutput = document.getElementById("reviewsJsonOutput");
    if (eventsOutput) eventsOutput.value = JSON.stringify(cleaned.events, null, 2);
    if (reviewsOutput) reviewsOutput.value = JSON.stringify(cleaned.reviews, null, 2);
  }

  function renderPreviews() {
    var cleaned = cleanState();
    renderEvents(cleaned.events, "adminEventsPreview");
    renderReviews(cleaned.reviews, "adminReviewsPreview");
  }

  function renderAll() {
    renderEditors();
    renderOutputs();
    renderPreviews();
  }

  function saveDraft() {
    var cleaned = cleanState();
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        events: cleaned.events,
        reviews: cleaned.reviews,
        updatedAt: new Date().toISOString()
      }));
      dirty = false;
      setStatus("Draft saved in this browser.");
    } catch (error) {
      setStatus("Draft could not be saved in this browser.");
    }
  }

  function previewDraft() {
    var cleaned = cleanState();
    try {
      localStorage.setItem(PREVIEW_KEYS.events, JSON.stringify(cleaned.events));
      localStorage.setItem(PREVIEW_KEYS.reviews, JSON.stringify(cleaned.reviews));
      saveDraft();
      setStatus("Draft preview is active for this browser.");
    } catch (error) {
      setStatus("Draft preview could not be enabled.");
    }
  }

  function clearDraft() {
    try {
      localStorage.removeItem(DRAFT_KEY);
      localStorage.removeItem(PREVIEW_KEYS.events);
      localStorage.removeItem(PREVIEW_KEYS.reviews);
    } catch (error) {}
    loadSiteData().then(function(siteData) {
      state = siteData;
      dirty = false;
      renderAll();
      setStatus("Local draft cleared. Current site data loaded.");
    });
  }

  function downloadJson(fileName, value) {
    var blob = new Blob([JSON.stringify(value, null, 2) + "\n"], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function wireActions() {
    var addEvent = document.getElementById("addEventBtn");
    var addReview = document.getElementById("addReviewBtn");
    var save = document.getElementById("saveDraftBtn");
    var preview = document.getElementById("previewDraftBtn");
    var clear = document.getElementById("clearDraftBtn");
    var reload = document.getElementById("loadCurrentBtn");
    var downloadEvents = document.getElementById("downloadEventsBtn");
    var downloadReviews = document.getElementById("downloadReviewsBtn");

    if (addEvent) addEvent.addEventListener("click", function() {
      state.events.push(normalizeEvent({ title: "New event", date: "TBD", time: "TBD", location: "CMAI Karate" }));
      dirty = true;
      renderAll();
      setStatus("Event added.");
    });
    if (addReview) addReview.addEventListener("click", function() {
      state.reviews.push(normalizeReview({ name: "Student", date: today(), text: "" }));
      dirty = true;
      renderAll();
      setStatus("Comment added.");
    });
    if (save) save.addEventListener("click", saveDraft);
    if (preview) preview.addEventListener("click", previewDraft);
    if (clear) clear.addEventListener("click", clearDraft);
    if (reload) reload.addEventListener("click", function() {
      loadSiteData().then(function(siteData) {
        state = siteData;
        dirty = false;
        renderAll();
        setStatus("Current site data loaded.");
      });
    });
    if (downloadEvents) downloadEvents.addEventListener("click", function() {
      downloadJson("events.json", cleanState().events);
      setStatus("events.json generated.");
    });
    if (downloadReviews) downloadReviews.addEventListener("click", function() {
      downloadJson("reviews.json", cleanState().reviews);
      setStatus("reviews.json generated.");
    });
  }

  function init() {
    if (!document.getElementById("adminApp")) return;
    wireActions();
    var draft = loadDraft();
    if (draft) {
      state = {
        events: draft.events,
        reviews: draft.reviews
      };
      renderAll();
      setStatus(draft.updatedAt ? "Saved draft loaded." : "Draft loaded.");
      return;
    }
    loadSiteData().then(function(siteData) {
      state = siteData;
      renderAll();
      setStatus("Current site data loaded.");
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
