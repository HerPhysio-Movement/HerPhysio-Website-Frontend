(function () {
  try {
    let e = document.getElementById("findDateBtn");
    if (e) e.remove();

    let t = document.createElement("button");
    t.id = "findDateBtn";
    t.innerText = "Looking for OCTOBER, NOVEMBER...";
    Object.assign(t.style, {
      position: "fixed",
      top: "10px",
      right: "10px",
      zIndex: "999999",
      backgroundColor: "#343a40",
      color: "white",
      padding: "12px 18px",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "6px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      cursor: "pointer",
    });
    document.body.appendChild(t);

    const n = () => {
      let e =
        document.querySelector("span.mat-calendar-period-button") ||
        document.querySelector("button.mat-calendar-period-button");
      let r = e ? e.textContent.trim().toLowerCase() : "";
      if (
        "october 2025" !== r &&
        "oct 2025" !== r &&
        "november 2025" !== r &&
        "nov 2025" !== r
      ) {
        t.innerText = "Month changed. Waiting for October or November 2025...";
        return setTimeout(o, 0);
      }

      let a = Array.from(document.querySelectorAll("button.mat-calendar-body-cell.special-date"));
      if (a.length > 0) {
        a[0].click();
        t.innerText = "Date Selected";
        t.style.backgroundColor = "#28a745";
        window.stopRefresh = true;
      } else {
        t.innerText = "Month OK, Waiting for Green Date...";
        setTimeout(n, 0);
      }
    };

    const o = () => {
      let e =
        document.querySelector("span.mat-calendar-period-button") ||
        document.querySelector("button.mat-calendar-period-button");
      if (!e) {
        t.innerText = "Calendar header not found";
        t.style.backgroundColor = "#dc3545";
        return;
      }

      let r = e.textContent.trim().toLowerCase();
      t.innerText = "Looking for OCTOBER, NOVEMBER: " + r;

      if (
        "october 2025" === r ||
        "oct 2025" === r ||
        "november 2025" === r ||
        "nov 2025" === r
      ) {
        n();
      } else {
        setTimeout(o, 0);
      }
    };

    o();
  } catch (e) {
    alert("Error: " + e.message);
  }
})();

