(function(){var f,g;f=function(){function a(){}a.prototype.f=function(a){var c,b;c=[];for(b in a)void 0!==a[b]&&a.hasOwnProperty(b)&&c.push(encodeURIComponent(b)+"="+encodeURIComponent(a[b]));return"?"+c.join("&")};a.prototype.a=function(a,c,b){var d;"function"===typeof c&&(b=c,c={});c=this.f(c);d=new XMLHttpRequest;d.onerror=function(){b(!0)};d.onload=function(){var a;try{a=JSON.parse(d.responseText)}catch(c){return b(c)}if("error"===a.status)return b(a.error);b(void 0,a)};d.open("GET","https://mcapi.us"+a+c,!0);d.send()};return a}();g=function(){function a(){}var e;e=new f;a.prototype.c=function(a,b,d){"function"===typeof b&&(d=b,b={});b.ip=a;e.a("/server/status",b,d)};a.prototype.getServerStatus=a.prototype.c;a.prototype.b=function(a,b,d){"function"===typeof b&&(d=b,b={});b.ip=a;e.a("/server/query",b,d)};a.prototype.getServerQuery=a.prototype.b;return a}();window.MinecraftAPI=new g})();

(function() {
    'use strict';
    document.addEventListener("keydown", function(e) {
        if (e.key === "F12") { e.preventDefault(); return false; }
        if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) { e.preventDefault(); return false; }
        if (e.ctrlKey && (e.key === "u" || e.key === "U")) { e.preventDefault(); return false; }
        if (e.ctrlKey && (e.key === "s" || e.key === "S")) { e.preventDefault(); return false; }
        if (e.ctrlKey && (e.key === "p" || e.key === "P")) { e.preventDefault(); return false; }
    });
    document.addEventListener("contextmenu", function(e) { e.preventDefault(); return false; });
    document.addEventListener("selectstart", function(e) { e.preventDefault(); return false; });
    document.addEventListener("dragstart", function(e) { e.preventDefault(); return false; });
    var devToolsCheck = setInterval(function() {
        var threshold = 160;
        if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#fff;font-family:sans-serif;font-size:2rem;">🚫 Dostęp zabroniony</div>';
            clearInterval(devToolsCheck);
        }
    }, 1000);
    (function loop() {
        try { (function() { return false; }).constructor("debugger").call(); } catch(e) {}
        setTimeout(loop, 100);
    })();
    var methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace'];
    methods.forEach(function(method) { console[method] = function() {}; });
})();

document.addEventListener("DOMContentLoaded", function() {
    var a = document.getElementById("bg-music"),
        b = document.getElementById("play-pause-btn"),
        c = b ? b.querySelector("i") : null,
        d = document.getElementById("volume-slider"),
        e = document.getElementById("enter-screen"),
        f = document.getElementById("hamburger"),
        g = document.getElementById("nav-menu"),
        h = document.getElementById("mute-btn"),
        j = h ? h.querySelector("i") : null,
        k = document.getElementById("music-time-display"),
        l = document.getElementById("cookie-banner"),
        m = document.getElementById("accept-cookies");

    if (a) { a.volume = 0.225; }
    if (d) { d.value = 0.225; }

    var isMobile = window.innerWidth < 768;
    var canvas = document.getElementById("particles");
    if (canvas) {
        var ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var particles = [];
        var pCount = isMobile ? 30 : 70;
        function Particle() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        Particle.prototype.update = function() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        };
        Particle.prototype.draw = function() {
            ctx.fillStyle = "rgba(255,255,255," + this.opacity + ")";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        };
        for (var i = 0; i < pCount; i++) particles.push(new Particle());
        var connDist = isMobile ? 80 : 120;
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                for (var z = i + 1; z < particles.length; z++) {
                    var dx = particles[i].x - particles[z].x,
                        dy = particles[i].y - particles[z].y,
                        dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < connDist) {
                        ctx.strokeStyle = "rgba(121,40,202," + (1 - dist / connDist) * 0.12 + ")";
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[z].x, particles[z].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
        window.addEventListener("resize", function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            isMobile = window.innerWidth < 768;
        });
    }

    if (e) {
        e.addEventListener("click", function() {
            if (a) {
                a.play().then(function() {
                    if (c) c.className = "fa-solid fa-pause";
                }).catch(function() {});
            }
            e.classList.add("hide");
            setTimeout(function() { e.style.display = "none"; }, 1000);
        });
    }

    if (f && g) {
        f.addEventListener("click", function() {
            f.classList.toggle("active");
            g.classList.toggle("active");
        });
        g.querySelectorAll("a").forEach(function(x) {
            x.addEventListener("click", function() {
                f.classList.remove("active");
                g.classList.remove("active");
            });
        });
    }

    function formatTime(s) {
        if (isNaN(s)) return "0:00";
        var mn = Math.floor(s / 60),
            sc = Math.floor(s % 60);
        return mn + ":" + (sc < 10 ? "0" : "") + sc;
    }

    if (a && k) {
        a.addEventListener("timeupdate", function() {
            k.textContent = formatTime(a.currentTime) + " / " + formatTime(a.duration);
        });
    }

    if (b && a && c) {
        b.addEventListener("click", function() {
            if (a.paused) {
                a.play();
                c.className = "fa-solid fa-pause";
            } else {
                a.pause();
                c.className = "fa-solid fa-play";
            }
        });
    }

    if (h && a && j && d) {
        h.addEventListener("click", function() {
            a.muted = !a.muted;
            if (a.muted) {
                j.className = "fa-solid fa-volume-xmark";
                d.value = 0;
            } else {
                j.className = "fa-solid fa-volume-high";
                d.value = a.volume;
            }
        });
    }

    if (d && a && j) {
        d.addEventListener("input", function(ev) {
            var v = ev.target.value;
            a.volume = v;
            a.muted = false;
            if (v == 0) j.className = "fa-solid fa-volume-xmark";
            else if (v < 0.5) j.className = "fa-solid fa-volume-low";
            else j.className = "fa-solid fa-volume-high";
        });
    }

    if (l && m) {
        if (localStorage.getItem("cookiesAccepted") === "true") {
            l.style.display = "none";
        }
        m.addEventListener("click", function() {
            l.style.display = "none";
            localStorage.setItem("cookiesAccepted", "true");
        });
    }

    window.addEventListener("scroll", function() {
        var navbar = document.querySelector(".navbar");
        if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    var animEls = document.querySelectorAll(".animate-in");
    setTimeout(function() {
        animEls.forEach(function(el) { el.classList.add("visible"); });
    }, 300);

    var scrollEls = document.querySelectorAll(".server-banner");
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    scrollEls.forEach(function(el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "opacity .6s, transform .6s";
        observer.observe(el);
    });

    var statNums = document.querySelectorAll(".stat-number");
    var statObs = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var target = parseInt(entry.target.getAttribute("data-target"));
                if (target === 0) {
                    entry.target.textContent = "0";
                    statObs.unobserve(entry.target);
                    return;
                }
                var count = 0, speed = Math.max(1, Math.ceil(target / 50));
                var timer = setInterval(function() {
                    count += speed;
                    if (count >= target) { count = target; clearInterval(timer); }
                    entry.target.textContent = count;
                }, 30);
                statObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(function(el) { statObs.observe(el); });

    async function fetchWPCraftStatus() {
        try {
            const response = await fetch('https://api.mcsrvstat.us/2/51.68.232.171:25565');
            const data = await response.json();
            const countEl = document.getElementById("player-count");
            if (countEl) {
                if (data.online) {
                    countEl.innerHTML = data.players.online;
                    countEl.style.color = "#ffd700";
                } else {
                    countEl.innerHTML = "Offline";
                    countEl.style.color = "#ff4444";
                }
            }
        } catch (error) {
            const countEl = document.getElementById("player-count");
            if (countEl) {
                countEl.innerHTML = "Błąd";
                countEl.style.color = "#ff4444";
            }
        }
    }
    fetchWPCraftStatus();

    async function fetchPartnerPlayers() {
        try {
            const response = await fetch('https://api.mcsrvstat.us/2/skihub.pl');
            const data = await response.json();
            const displayElement = document.getElementById('players-skihub');
            if (data.online && displayElement) {
                displayElement.innerHTML = 'Graj razem z <span class="count-gold">' + data.players.online + '</span> graczami';
            } else if (displayElement) {
                displayElement.innerHTML = 'Serwer Offline';
                displayElement.style.color = "#ff4444";
            }
        } catch (error) {
            var el = document.getElementById('players-skihub');
            if (el) {
                el.innerHTML = 'Błąd połączenia';
                el.style.color = "#ff4444";
            }
        }
    }
    fetchPartnerPlayers();
});