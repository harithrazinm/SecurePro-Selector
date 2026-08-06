/* ==========================================================================
   Sonic System Solution — Interactive layer
   Loads AFTER js/app.js and js/i18n.js. Does not touch language switching
   or any existing logic — only adds new behaviour on top of the existing
   markup (injecting a few small elements where useful).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------------- Navbar: shrink + shadow on scroll ---------------- */
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    const onScroll = () => navbar.classList.toggle("ix-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- Live Malaysia-time badge in nav ---------------- */
  const navActions = document.querySelector(".navbar .d-flex.gap-2");
  if (navActions) {
    const clock = document.createElement("span");
    clock.className = "ix-clock d-none d-md-inline-flex";
    clock.setAttribute("aria-label", "Current time in Malaysia");
    clock.innerHTML = '<span class="ix-dot" aria-hidden="true"></span><span id="ixClockTime">--:--:--</span>';
    navActions.prepend(clock);

    const timeEl = clock.querySelector("#ixClockTime");
    const fmt = new Intl.DateTimeFormat("en-MY", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kuala_Lumpur",
    });
    const tick = () => { timeEl.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------------- Footer: live status badge ---------------- */
  const footerRow = document.querySelector("footer .container");
  if (footerRow) {
    const status = document.createElement("span");
    status.className = "ix-status";
    status.innerHTML = '<span class="ix-dot" aria-hidden="true"></span>System online';
    footerRow.prepend(status);
  }

  /* ---------------- Service cards: viewfinder corners + tilt ---------------- */
  const cards = document.querySelectorAll(".service-card");
  cards.forEach((card) => {
    ["tl", "tr", "bl", "br"].forEach((pos) => {
      const corner = document.createElement("span");
      corner.className = `ix-corner ix-corner-${pos}`;
      corner.setAttribute("aria-hidden", "true");
      card.appendChild(corner);
    });

    if (canHover && !reduceMotion) {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--ry", `${px * 8}deg`);
        card.style.setProperty("--rx", `${py * -8}deg`);
      });
      card.addEventListener("mouseleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    }
  });

  /* ---------------- "7+" stat counts up when in view ---------------- */
  const statEl = document.querySelector(".stat");
  if (statEl && statEl.firstChild) {
    const numNode = statEl.firstChild;
    const target = parseInt((numNode.textContent || "").trim(), 10);

    if (!isNaN(target)) {
      if (reduceMotion) {
        numNode.textContent = String(target);
      } else {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            let current = 0;
            numNode.textContent = "0";
            const step = () => {
              current += 1;
              numNode.textContent = String(current);
              if (current < target) setTimeout(step, 90);
            };
            step();
            obs.disconnect();
          });
        }, { threshold: 0.4 });
        obs.observe(statEl);
      }
    }
  }

  /* ---------------- Scroll reveal ---------------- */
  if (!reduceMotion) {
    const revealTargets = document.querySelectorAll(
      ".service-card, .hero-card, #partners h2, #partners .lead, #brandsCarousel, .ix-marquee"
    );
    revealTargets.forEach((el, i) => {
      el.classList.add("ix-reveal");
      el.style.setProperty("--ix-delay", `${(i % 9) * 60}ms`);
    });

    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ix-visible");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach((el) => revealObs.observe(el));
  }
});