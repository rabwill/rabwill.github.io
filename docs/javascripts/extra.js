(function () {
  function initTerminal() {
    var el = document.getElementById("rw-trace");
    if (!el) return;

    var lines = [
      { t: "muted", text: "$ mcp connect rabiawilliams.com" },
      { t: "muted", text: "" },
      { t: "key", text: "\u2192 initialize" },
      { t: "muted", text: '  {"protocolVersion":"2025-06-18","clientInfo":{"name":"visitor"}}' },
      { t: "ok", text: "\u2190 200  connection established" },
      { t: "muted", text: "" },
      { t: "key", text: "\u2192 tools/list" },
      { t: "ok", text: "\u2190 4 tools available" },
      { t: "str", text: "  - agents            building autonomous & multi-agent systems" },
      { t: "str", text: "  - copilot_extensions  shipping Copilot extensions" },
      { t: "str", text: "  - claude_and_mcp     Claude apps + Model Context Protocol servers" },
      { t: "str", text: "  - prompting          prompting techniques that hold up in production" }
    ];

    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function render(finalState) {
      el.innerHTML = "";
      lines.forEach(function (line) {
        var div = document.createElement("div");
        div.className = "rw-tok-" + line.t;
        div.textContent = line.text || "\u00A0";
        el.appendChild(div);
      });
      if (!finalState) {
        var cursor = document.createElement("span");
        cursor.className = "rw-cursor";
        el.appendChild(cursor);
      }
    }

    if (reduceMotion) {
      render(true);
      return;
    }

    el.innerHTML = "";
    var lineIndex = 0;
    var charIndex = 0;
    var currentDiv = null;

    function step() {
      if (lineIndex >= lines.length) {
        var cursor = document.createElement("span");
        cursor.className = "rw-cursor";
        el.appendChild(cursor);
        return;
      }
      var line = lines[lineIndex];
      if (charIndex === 0) {
        currentDiv = document.createElement("div");
        currentDiv.className = "rw-tok-" + line.t;
        el.appendChild(currentDiv);
      }
      var text = line.text || "";
      charIndex++;
      currentDiv.textContent = text.slice(0, charIndex) || "\u00A0";
      if (charIndex >= text.length) {
        lineIndex++;
        charIndex = 0;
        setTimeout(step, text === "" ? 60 : 90);
      } else {
        setTimeout(step, 10);
      }
    }
    step();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTerminal);
  } else {
    initTerminal();
  }
})();
