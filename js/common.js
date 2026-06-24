/* === XSYonline 公共脚本 === */

// 全局懒加载
(function() {
  document.querySelectorAll('img').forEach(function(img) {
    img.setAttribute('loading', 'lazy');
  });
})();

// 粒子跟随鼠标
(function() {
  document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.85) {
      var p = document.createElement('div');
      p.className = 'particle';
      var s = Math.random() * 8 + 4;
      var c = ['#E91E8C', '#F06292', '#F48FB1', '#FFB6C1', '#C2185B'];
      p.style.cssText = 'left:' + e.clientX + 'px;top:' + e.clientY + 'px;width:' + s + 'px;height:' + s + 'px;background:' + c[Math.floor(Math.random() * c.length)];
      document.body.appendChild(p);
      setTimeout(function() { p.remove(); }, 1000);
    }
  });
})();

// 点击爱心
(function() {
  document.addEventListener('click', function(e) {
    var h = document.createElement('div');
    h.className = 'floating-heart';
    h.textContent = ['💖', '💗', '💓', '💕', '🩷', '🌸', '✨'][Math.floor(Math.random() * 7)];
    h.style.left = e.clientX + 'px';
    h.style.top = e.clientY + 'px';
    document.body.appendChild(h);
    setTimeout(function() { h.remove(); }, 2000);
  });
})();

// 滚动渐显
function initScrollReveal(selector, delay) {
  var els = document.querySelectorAll(selector);
  if (!els.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        if (delay) {
          setTimeout(function() { entry.target.classList.add('visible'); }, i * delay);
        } else {
          entry.target.classList.add('visible');
        }
      }
    });
  }, { threshold: 0.1 });
  els.forEach(function(el) { observer.observe(el); });
}

// 主题切换
function initThemeToggle() {
  var nav = document.querySelector('nav');
  if (!nav) return;

  var btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', '切换深色模式');

  var saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    btn.textContent = '🌙';
    btn.setAttribute('aria-label', '切换浅色模式');
  } else {
    btn.textContent = '☀️';
    btn.setAttribute('aria-label', '切换深色模式');
  }

  btn.addEventListener('click', function() {
    if (document.documentElement.hasAttribute('data-theme')) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      btn.textContent = '☀️';
      btn.setAttribute('aria-label', '切换深色模式');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      btn.textContent = '🌙';
      btn.setAttribute('aria-label', '切换浅色模式');
    }
  });

  nav.appendChild(btn);
}

// 回到顶部
function initBackToTop() {
  if (document.querySelector('.back-to-top')) return;
  var btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.textContent = '↑';
  btn.setAttribute('aria-label', '回到顶部');
  btn.title = '回到顶部';
  document.body.appendChild(btn);
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
}

// 自动初始化
document.addEventListener('DOMContentLoaded', function() {
  // 注入跳过链接
  if (!document.querySelector('.skip-link')) {
    var skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = '#main-content';
    skip.textContent = '跳到主内容';
    document.body.insertBefore(skip, document.body.firstChild);
  }
  // 给主要内容区加 id
  var pageContainer = document.querySelector('.page-container');
  if (pageContainer && !pageContainer.id) {
    pageContainer.id = 'main-content';
  }
  initThemeToggle();
  initBackToTop();
});
