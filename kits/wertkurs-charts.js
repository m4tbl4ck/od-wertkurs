/* ============================================================
   wertkurs — CHART engine (Chart.js v4 brand layer)
   Load order:
     <link  href="https://use.typekit.net/pdd3dqx.css" rel="stylesheet">
     <link  href="../../colors_and_type.css"           rel="stylesheet">
     <link  href="wertkurs-charts.css"                 rel="stylesheet">
     <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
     <script src="wertkurs-charts.js"></script>

   Then build charts AFTER fonts are ready so metrics are correct:
     WK.ready(() => { WK.line(ctx, {...}); });

   Everything is background-agnostic: transparent canvas, mid-grey
   axes/grid that read on white AND deep-black, brand data colours,
   dark tooltip. No surface colour is baked in.
   ============================================================ */
(function (global) {
  "use strict";

  /* ---- brand palette (hex; mirrors colors_and_type.css) ---- */
  var C = {
    mint:   "#8fd9b6",
    ming:   "#d962b7",
    purple: "#9d62d9",
    lotus:  "#f25835",
    makara: "#f2e96d",
    forest: "#1d402f",
    ink:    "#020202",
    grey:   "#808080",
    greyL:  "#b3b3b3",
    white:  "#ffffff"
  };

  /* role + categorical mappings */
  var ROLES = {
    primary:  C.mint,
    positive: C.mint,
    negative: C.lotus,
    baseline: C.greyL
  };
  var CATEGORICAL = [C.mint, C.ming, C.purple, C.lotus, C.makara];

  var STRUCT = {
    ink:       C.grey,
    grid:      "rgba(128,128,128,0.20)",
    gridSoft:  "rgba(128,128,128,0.10)",
    track:     "rgba(128,128,128,0.20)"
  };

  var FONT = '"new-hero", "Inter", "Helvetica Neue", Arial, sans-serif';

  /* ---- hex → rgba ---- */
  function rgba(hex, a) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    var n = parseInt(h, 16);
    return "rgba(" + ((n>>16)&255) + "," + ((n>>8)&255) + "," + (n&255) + "," + a + ")";
  }

  /* ---- vertical gradient fill for area charts ---- */
  function vGradient(chartCtx, area, hex, topA, botA) {
    if (!area) return rgba(hex, topA);
    var g = chartCtx.createLinearGradient(0, area.top, 0, area.bottom);
    g.addColorStop(0, rgba(hex, topA != null ? topA : 0.32));
    g.addColorStop(1, rgba(hex, botA != null ? botA : 0.0));
    return g;
  }

  /* ============================================================
     GLOBAL DEFAULTS — applied once Chart is present
     ============================================================ */
  function applyDefaults() {
    if (!global.Chart) return;
    var Chart = global.Chart;
    Chart.defaults.font.family = FONT;
    Chart.defaults.font.size = 13;
    Chart.defaults.font.weight = 500;
    Chart.defaults.color = STRUCT.ink;
    Chart.defaults.borderColor = STRUCT.grid;
    Chart.defaults.maintainAspectRatio = false;
    Chart.defaults.responsive = true;

    Chart.defaults.animation = { duration: 850, easing: "easeOutQuart" };
    Chart.defaults.animations = Chart.defaults.animations || {};

    Chart.defaults.elements.point.radius = 0;
    Chart.defaults.elements.point.hoverRadius = 6;
    Chart.defaults.elements.point.hitRadius = 14;
    Chart.defaults.elements.point.hoverBorderWidth = 3;
    Chart.defaults.elements.line.tension = 0.35;
    Chart.defaults.elements.line.borderWidth = 3;
    Chart.defaults.elements.line.borderCapStyle = "round";
    Chart.defaults.elements.bar.borderRadius = 6;
    Chart.defaults.elements.bar.borderSkipped = false;

    Chart.defaults.plugins.legend.display = false; // prefer .legend_list HTML
    Chart.defaults.plugins.tooltip = Object.assign(Chart.defaults.plugins.tooltip, {
      enabled: true,
      backgroundColor: C.ink,
      titleColor: C.white,
      bodyColor: "#e6e6e6",
      titleFont: { family: FONT, weight: "700", size: 13 },
      bodyFont:  { family: FONT, weight: "500", size: 13 },
      padding: 12,
      cornerRadius: 8,
      boxWidth: 10,
      boxHeight: 10,
      boxPadding: 6,
      usePointStyle: true,
      caretSize: 6,
      displayColors: true
    });
  }

  /* shared scale builder — clean hairline grid, no chartArea border */
  function axes(opts) {
    opts = opts || {};
    return {
      x: {
        grid: { display: false, drawTicks: false },
        border: { display: false },
        ticks: { color: STRUCT.ink, padding: 8, font: { size: 12.5 }, maxRotation: 0, autoSkipPadding: 16 }
      },
      y: {
        beginAtZero: opts.beginAtZero !== false,
        grid: { color: STRUCT.grid, drawTicks: false },
        border: { display: false, dash: [0] },
        ticks: {
          color: STRUCT.ink, padding: 10, font: { size: 12.5 }, maxTicksLimit: 6,
          callback: opts.yFormat || function (v) { return v; }
        }
      }
    };
  }

  /* ============================================================
     1 · LINE / AREA  — growth over time
     cfg: { labels, series:[{label,data,color,fill,dashed}], yFormat, stacked }
     ============================================================ */
  function line(ctx, cfg) {
    cfg = cfg || {};
    var datasets = (cfg.series || []).map(function (s, i) {
      var col = s.color || CATEGORICAL[i % CATEGORICAL.length];
      return {
        label: s.label || ("Reihe " + (i + 1)),
        data: s.data,
        borderColor: col,
        pointBackgroundColor: col,
        pointBorderColor: "#fff",
        borderDash: s.dashed ? [6, 6] : [],
        borderWidth: s.width || 3,
        fill: s.fill === false ? false : (s.fill || (i === 0 ? "origin" : false)),
        tension: s.tension != null ? s.tension : 0.35,
        backgroundColor: function (c) {
          return vGradient(c.chart.ctx, c.chart.chartArea, col, s.fillTop, s.fillBot);
        }
      };
    });
    return new global.Chart(ctx, {
      type: "line",
      data: { labels: cfg.labels, datasets: datasets },
      options: mergeOpts(cfg, {
        interaction: { mode: "index", intersect: false },
        scales: axes({ yFormat: cfg.yFormat })
      })
    });
  }

  /* ============================================================
     2 · BAR / COLUMN  — comparisons (grouped)
     cfg: { labels, series:[{label,data,color}], horizontal, yFormat }
     ============================================================ */
  function bar(ctx, cfg) {
    cfg = cfg || {};
    var datasets = (cfg.series || []).map(function (s, i) {
      return {
        label: s.label || ("Reihe " + (i + 1)),
        data: s.data,
        backgroundColor: s.color || CATEGORICAL[i % CATEGORICAL.length],
        hoverBackgroundColor: s.hoverColor || s.color || CATEGORICAL[i % CATEGORICAL.length],
        borderRadius: s.radius != null ? s.radius : 6,
        maxBarThickness: s.maxBarThickness || 54
      };
    });
    var sc = axes({ yFormat: cfg.yFormat });
    return new global.Chart(ctx, {
      type: "bar",
      data: { labels: cfg.labels, datasets: datasets },
      options: mergeOpts(cfg, {
        indexAxis: cfg.horizontal ? "y" : "x",
        categoryPercentage: cfg.categoryPercentage || 0.66,
        barPercentage: cfg.barPercentage || 0.9,
        scales: cfg.horizontal
          ? { x: sc.y, y: { grid: { display: false }, border: { display: false }, ticks: sc.x.ticks } }
          : sc
      })
    });
  }

  /* ============================================================
     3 · STACKED BAR — composition over categories
     cfg: { labels, series:[{label,data,color}], yFormat, horizontal }
     ============================================================ */
  function stacked(ctx, cfg) {
    cfg = cfg || {};
    var datasets = (cfg.series || []).map(function (s, i) {
      return {
        label: s.label || ("Reihe " + (i + 1)),
        data: s.data,
        backgroundColor: s.color || CATEGORICAL[i % CATEGORICAL.length],
        borderRadius: s.radius != null ? s.radius : 4,
        borderWidth: cfg.gap === false ? 0 : 2,
        borderColor: "rgba(0,0,0,0)",
        maxBarThickness: s.maxBarThickness || 60
      };
    });
    var sc = axes({ yFormat: cfg.yFormat });
    sc.x.stacked = true; sc.y.stacked = true;
    return new global.Chart(ctx, {
      type: "bar",
      data: { labels: cfg.labels, datasets: datasets },
      options: mergeOpts(cfg, {
        indexAxis: cfg.horizontal ? "y" : "x",
        categoryPercentage: cfg.categoryPercentage || 0.7,
        barPercentage: cfg.barPercentage || 0.92,
        scales: sc
      })
    });
  }

  /* ============================================================
     4 · WATERFALL — cashflow / cost build-up
     cfg: { steps:[{label,value,type}] }  type: 'total' | + / - by sign
     Floating bars: each bar drawn as [base, base+value].
     ============================================================ */
  function waterfall(ctx, cfg) {
    cfg = cfg || {};
    var steps = cfg.steps || [];
    var running = 0, bars = [], colors = [], hover = [];
    steps.forEach(function (st) {
      if (st.type === "total") {
        bars.push([0, st.value]);
        colors.push(st.color || C.purple);
        running = st.value;
      } else {
        var start = running, end = running + st.value;
        bars.push([start, end]);
        colors.push(st.color || (st.value >= 0 ? ROLES.positive : ROLES.negative));
        running = end;
      }
      hover.push(colors[colors.length - 1]);
    });
    return new global.Chart(ctx, {
      type: "bar",
      data: {
        labels: steps.map(function (s) { return s.label; }),
        datasets: [{
          data: bars,
          backgroundColor: colors,
          hoverBackgroundColor: hover,
          borderRadius: 5,
          maxBarThickness: 64
        }]
      },
      options: mergeOpts(cfg, {
        scales: axes({ yFormat: cfg.yFormat }),
        plugins: {
          tooltip: {
            callbacks: {
              label: function (c) {
                var v = c.raw[1] - c.raw[0];
                var f = cfg.yFormat ? cfg.yFormat(Math.abs(v)) : Math.abs(v);
                return (v >= 0 ? "+" : "−") + f;
              }
            }
          }
        }
      })
    });
  }

  /* ============================================================
     5 · DONUT — allocation / portfolio split
     cfg: { labels, data, colors, centerLabel, centerValue, cutout }
     ============================================================ */
  function donut(ctx, cfg) {
    cfg = cfg || {};
    var cols = cfg.colors || CATEGORICAL;
    var chart = new global.Chart(ctx, {
      type: "doughnut",
      data: {
        labels: cfg.labels,
        datasets: [{
          data: cfg.data,
          backgroundColor: cfg.labels.map(function (_, i) { return cols[i % cols.length]; }),
          borderColor: "rgba(0,0,0,0)",
          borderWidth: cfg.gap === false ? 0 : 3,
          hoverOffset: 8,
          spacing: cfg.spacing || 0
        }]
      },
      options: mergeOpts(cfg, {
        cutout: cfg.cutout || "68%",
        plugins: {
          tooltip: {
            callbacks: {
              label: function (c) {
                var total = c.dataset.data.reduce(function (a, b) { return a + b; }, 0);
                var pct = total ? Math.round((c.raw / total) * 100) : 0;
                var f = cfg.valFormat ? cfg.valFormat(c.raw) : c.raw;
                return "  " + c.label + ": " + f + " (" + pct + "%)";
              }
            }
          }
        }
      })
    });
    return chart;
  }

  /* ============================================================
     6 · GAUGE — half-doughnut (coverage %, savings ratio)
     cfg: { value (0..100), color, track }
     Pair with .gauge_center HTML for the number overlay.
     ============================================================ */
  function gauge(ctx, cfg) {
    cfg = cfg || {};
    var v = Math.max(0, Math.min(100, cfg.value || 0));
    var col = cfg.color || ROLES.primary;
    return new global.Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["", ""],
        datasets: [{
          data: [v, 100 - v],
          backgroundColor: [col, cfg.track || STRUCT.track],
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 0,
          borderRadius: 8
        }]
      },
      options: {
        cutout: cfg.cutout || "74%",
        circumference: 180,
        rotation: 270,
        events: [],
        plugins: { tooltip: { enabled: false }, legend: { display: false } },
        animation: { duration: 900, easing: "easeOutQuart" }
      }
    });
  }

  /* ============================================================
     SPARKLINE — tiny line for KPI tiles (no axes, no tooltip)
     ============================================================ */
  function spark(ctx, cfg) {
    cfg = cfg || {};
    var col = cfg.color || ROLES.primary;
    return new global.Chart(ctx, {
      type: "line",
      data: {
        labels: cfg.data.map(function (_, i) { return i; }),
        datasets: [{
          data: cfg.data,
          borderColor: col,
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          backgroundColor: function (c) { return vGradient(c.chart.ctx, c.chart.chartArea, col, 0.28, 0); }
        }]
      },
      options: {
        events: [],
        plugins: { tooltip: { enabled: false }, legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } },
        elements: { point: { radius: 0 } },
        animation: { duration: 900, easing: "easeOutQuart" }
      }
    });
  }

  /* ---- deep-ish merge of caller options over our base options ---- */
  function mergeOpts(cfg, base) {
    var out = Object.assign({}, base, cfg.options || {});
    // merge plugins so caller tooltip callbacks don't wipe ours
    out.plugins = Object.assign({}, base.plugins, (cfg.options && cfg.options.plugins) || {});
    if (base.plugins && base.plugins.tooltip) {
      out.plugins.tooltip = Object.assign({}, base.plugins.tooltip,
        (cfg.options && cfg.options.plugins && cfg.options.plugins.tooltip) || {});
    }
    if (base.scales && !(cfg.options && cfg.options.scales)) out.scales = base.scales;
    return out;
  }

  /* ---- run a callback once webfonts are ready (correct metrics) ---- */
  function ready(fn) {
    var done = false;
    function go() {
      if (done) return;
      done = true;
      applyDefaults();
      fn();
      installSelfHeal();
    }
    if (global.document && global.document.fonts && global.document.fonts.ready) {
      global.document.fonts.ready.then(go);
      setTimeout(go, 1500); // safety: render even if fonts never settle
    } else {
      go();
    }
  }

  /* ---- self-heal blank canvases -------------------------------------
     Chart.js schedules its first paint via requestAnimationFrame. When the
     page is built in a BACKGROUND/hidden tab (common in editor previews and
     when a chart sits far below the fold), rAF is paused, so the entrance
     animation never runs and the canvas stays transparent — and nothing
     redraws it once the tab becomes visible. We detect any blank chart and
     re-render it (with its normal entrance animation) whenever the page
     becomes visible, gains focus, or a chart scrolls into view. Charts that
     already painted are left untouched, so a normal visible load animates as
     usual and is never disturbed.
  -------------------------------------------------------------------- */
  function canvasIsBlank(canvas) {
    try {
      var ctx = canvas.getContext("2d");
      var d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      for (var i = 3; i < d.length; i += 4) { if (d[i] > 8) return false; }
      return true;
    } catch (e) { return false; } // tainted/zero-size → assume fine
  }
  function healBlankCharts() {
    if (!global.Chart || global.document.hidden) return;
    var insts = global.Chart.instances || {};
    Object.keys(insts).forEach(function (k) {
      var ch = insts[k];
      if (!ch || !ch.canvas || !ch.canvas.width) return;
      if (canvasIsBlank(ch.canvas)) {
        // Synchronous paint — does NOT depend on requestAnimationFrame, which
        // editor previews throttle even when visibilityState reads "visible".
        try { ch.resize(); ch.update("none"); ch.draw(); } catch (e) {}
      }
    });
  }
  function installSelfHeal() {
    if (installSelfHeal._done || !global.document) return;
    installSelfHeal._done = true;
    var doc = global.document;
    doc.addEventListener("visibilitychange", function () {
      if (!doc.hidden) global.requestAnimationFrame(healBlankCharts);
    });
    global.addEventListener("pageshow", function () { global.requestAnimationFrame(healBlankCharts); });
    global.addEventListener("focus", function () { global.requestAnimationFrame(healBlankCharts); });
    // catch charts below the fold that finished "animating" while off-screen
    if ("IntersectionObserver" in global) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var ch = global.Chart.getChart(en.target);
            if (ch && canvasIsBlank(en.target)) { try { ch.resize(); ch.update("none"); ch.draw(); } catch (e) {} }
          }
        });
      }, { threshold: 0.05 });
      global.document.querySelectorAll("canvas").forEach(function (c) { io.observe(c); });
    }
    // belt-and-braces: a couple of delayed sweeps after build
    setTimeout(healBlankCharts, 120);
    setTimeout(healBlankCharts, 600);
  }

  /* ---- public API ---- */
  global.WK = {
    colors: C,
    roles: ROLES,
    categorical: CATEGORICAL,
    struct: STRUCT,
    rgba: rgba,
    gradient: vGradient,
    applyDefaults: applyDefaults,
    ready: ready,
    heal: healBlankCharts,
    line: line,
    bar: bar,
    stacked: stacked,
    waterfall: waterfall,
    donut: donut,
    gauge: gauge,
    spark: spark,
    // common German number/currency formatters
    fmt: {
      eur: function (v) { return "€ " + Number(v).toLocaleString("de-DE"); },
      eurK: function (v) { return "€ " + Math.round(v / 1000) + "k"; },
      pct: function (v) { return v + " %"; },
      de:  function (v) { return Number(v).toLocaleString("de-DE"); }
    }
  };
})(window);
