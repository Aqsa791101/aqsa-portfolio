/* =========================================================
   Aqsa Javaid — Portfolio scripts
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Project data (real websites) ---------- */
  var projects = [
    {
      name: "Cheap Server Licenses",
      url: "https://cheapserverlicenses.com",
      image: "images/cheapserverlicenses.png",
      category: "Hosting Website",
      tags: ["Hosting", "eCommerce", "Elementor Pro"],
      desc: "A modern licensing and server platform where users can buy, manage and activate genuine server licenses instantly with a clean, conversion-focused design."
    },
    {
      name: "Virtual Ibex",
      url: "https://virtualibex.com",
      image: "images/virtualibex.png",
      category: "Business Website",
      tags: ["Business", "Agency", "Responsive"],
      desc: "A digital marketing and web development agency website in Lahore with strong lead-generation sections and a professional corporate identity."
    },
    {
      name: "Mecrex",
      url: "https://mecrex.com",
      image: "images/mecrex.png",
      category: "eCommerce Website",
      tags: ["eCommerce", "Products", "WooCommerce"],
      desc: "An industrial safety products store showcasing mechanics gloves and gear with a bold hero slider and structured product catalog."
    },
    {
      name: "WebOrion",
      url: "https://weborion.ca",
      image: "images/weborion.png",
      category: "Corporate Website",
      tags: ["Corporate", "Agency", "Lead Gen"],
      desc: "Canada's low-cost web design agency website featuring a striking dark hero, integrated quote form and clear service packages."
    },
    {
      name: "WebHoster PK",
      url: "https://webhoster.pk",
      image: "images/webhoster.png",
      category: "Hosting Website",
      tags: ["Hosting", "Business", "Responsive"],
      desc: "A fast, promotion-driven web hosting website for the Pakistani market with pricing highlights, offers and trust-building elements."
    },
    {
      name: "Seven Seas",
      url: "https://sevenseas-me.com",
      image: "images/sevenseas.png",
      category: "Corporate Website",
      tags: ["Corporate", "Workforce", "Enquiry"],
      desc: "An overseas manpower and workforce solutions company site connecting Pakistani talent with UAE and GCC markets through a premium corporate layout."
    },
    {
      name: "Polisportiva NIR",
      url: "https://polisportivanir.it",
      image: "images/polisportivanir.png",
      category: "Business Website",
      tags: ["Sports", "Fitness", "Responsive"],
      desc: "An Italian sports and martial arts club website with karate, fitness and body-building programs presented in an energetic, image-led design."
    },
    {
      name: "JFK Animal Rescue",
      url: "https://jfkanimalrescueandshelter.com",
      image: "images/jfkanimalrescue.png",
      category: "NGO Website",
      tags: ["Non-profit", "Donations", "Cause"],
      desc: "A heartfelt non-profit website for an animal rescue and shelter, with donation calls-to-action, rescue stories and multi-language support."
    },
    {
      name: "Galaxy Forwarders",
      url: "https://galaxyforwarders.com",
      image: "images/galaxyforwarders.png",
      category: "Logistics Website",
      tags: ["Logistics", "Corporate", "Tracking"],
      desc: "An international logistics and relocation company website with shipment tracking, service breakdowns and 43+ years of expertise on display."
    },
    {
      name: "MJA Architects",
      url: "https://mjaarchitect.com",
      image: "images/mjaarchitect.png",
      category: "Architecture Website",
      tags: ["Architecture", "Portfolio", "Gallery"],
      desc: "A refined architecture studio portfolio highlighting high-end corporate and institutional projects through immersive imagery and selected works."
    },
    {
      name: "EZ Source Hub",
      url: "https://ezsourcehub.com",
      image: "images/ezsourcehub.png",
      category: "Business Website",
      tags: ["B2B", "Corporate", "Network"],
      desc: "A specialized global knowledge and sourcing platform with a bold dark hero, animated stats and a data-driven B2B positioning."
    },
    {
      name: "Sehr Couture",
      url: "https://sehrcouture.com",
      image: "images/sehrcouture.png",
      category: "Fashion Website",
      tags: ["Fashion", "eCommerce", "Luxury"],
      desc: "A luxury bridal and couture fashion store with editorial photography, filterable collections and an elegant premium shopping experience."
    }
  ];

  /* ---------- Render project cards ---------- */
  function renderProjects() {
    var grid = document.getElementById("projectsGrid");
    if (!grid) return;
    var arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';
    var html = "";
    projects.forEach(function (p) {
      var tags = p.tags.map(function (t) { return "<span>" + t + "</span>"; }).join("");
      html +=
        '<article class="project-card reveal">' +
          '<div class="project-thumb">' +
            '<div class="project-cat-dot"><span>' + p.category + '</span></div>' +
            '<img src="' + p.image + '" alt="Homepage preview of ' + p.name + ' website" loading="lazy" />' +
            '<div class="project-overlay">' +
              '<a class="project-visit" href="' + p.url + '" target="_blank" rel="noopener noreferrer">Visit Website ' + arrow + '</a>' +
            '</div>' +
          '</div>' +
          '<div class="project-body">' +
            '<h3 class="project-title">' + p.name + '</h3>' +
            '<div class="project-tags">' + tags + '</div>' +
            '<p class="project-desc">' + p.desc + '</p>' +
            '<a class="project-link" href="' + p.url + '" target="_blank" rel="noopener noreferrer">Visit Website ' + arrow + '</a>' +
          '</div>' +
        '</article>';
    });
    grid.innerHTML = html;
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var nums = document.querySelectorAll(".stat-number");
    if (!("IntersectionObserver" in window)) {
      nums.forEach(animateCounter);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      var ans = item.querySelector(".faq-a");
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("active");
        items.forEach(function (other) {
          other.classList.remove("active");
          other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-a").style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("active");
          btn.setAttribute("aria-expanded", "true");
          ans.style.maxHeight = ans.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- Header scroll + mobile nav ---------- */
  function initHeaderNav() {
    var header = document.getElementById("siteHeader");
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("primaryNav");

    window.addEventListener("scroll", function () {
      if (window.scrollY > 30) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }, { passive: true });

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("open");
          toggle.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    var status = document.getElementById("formStatus");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var name = document.getElementById("name").value.trim();
      status.textContent = "Thanks, " + (name || "there") + "! Your message is ready — I'll get back to you soon.";
      form.reset();
      setTimeout(function () { status.textContent = ""; }, 6000);
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderProjects();
    initReveal();
    initCounters();
    initFaq();
    initHeaderNav();
    initContactForm();
  });
})();
