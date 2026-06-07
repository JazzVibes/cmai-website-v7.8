// CMAI static-site feature switches.
// Set any feature to false to hide that update without removing the code.
window.CMAI_SITE_CONFIG = window.CMAI_SITE_CONFIG || {};
window.CMAI_SITE_CONFIG.features = Object.assign({
  titleCaseSectionHeadings: true,
  heroHistoryControls: true,
  scheduleCompactRows: true,
  scheduleRevisionDate: true,
  scheduleCopyButton: true,
  scheduleClosedDayRows: true,
  scheduleRepeatDayLabels: true,
  newsletterSignup: false
}, window.CMAI_SITE_CONFIG.features || {});
