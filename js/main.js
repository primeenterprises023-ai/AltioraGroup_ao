/* Altiora Group — comportamento da página (sem dependências) */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Cabeçalho: sombra ao rolar e menu móvel */
  const head = $('.head');
  const burger = $('.burger');
  const nav = $('#menu');
  const onScroll = () => head.classList.toggle('is-scrolled', window.scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setMenu = open => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') { setMenu(false); burger.focus(); }
  });
  matchMedia('(min-width: 900px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  /* Ligação ativa conforme a secção visível */
  const navLinks = new Map($$('.nav-link').map(a => [a.getAttribute('href').slice(1), a]));
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        navLinks.forEach((a, id) => (id === en.target.id ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
    new IntersectionObserver(([en]) => { if (en.isIntersecting) navLinks.forEach(a => a.removeAttribute('aria-current')); }, { threshold: 0.6 })
      .observe($('.hero'));
  }

  /* Serviços: separadores acessíveis (setas, Home e End) */
  const tabs = $$('[role="tab"]');
  const panels = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));
  const selectTab = (i, focus) => {
    tabs.forEach((t, j) => {
      const on = i === j;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      panels[j].hidden = !on;
      panels[j].classList.remove('is-in');
    });
    void panels[i].offsetWidth;
    panels[i].classList.add('is-in');
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(i));
    t.addEventListener('keydown', e => {
      const last = tabs.length - 1;
      const to = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: last }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      selectTab((to + tabs.length) % tabs.length, true);
    });
  });

  /* "Solicitar proposta" e "Conhecer o projeto": levam aos contactos e deixam
     a mensagem já escrita no WhatsApp e no e-mail. Os números e endereços
     vêm das próprias ligações da secção Contactos. */
  const wa = $('#c-wa');
  const mail = $('#c-mail');
  const intent = $('#intent');
  const waBase = wa.href.split('?')[0];
  const mailBase = mail.getAttribute('href').split('?')[0];
  const kinds = {
    proposta: { label: 'Proposta para', subject: 'Pedido de proposta', msg: t => `Olá! Gostaria de solicitar uma proposta para: ${t}.` },
    projeto: { label: 'Projeto', subject: 'Informações sobre projeto', msg: t => `Olá! Gostaria de saber mais sobre o projeto ${t}.` }
  };
  $$('[data-ask]').forEach(a => {
    if (!a.getAttribute('href').startsWith('#')) return;   // projeto com endereço próprio: segue o link
    a.addEventListener('click', () => {
      const kind = kinds[a.dataset.ask];
      if (!kind) return;
      const topic = a.dataset.topic;
      const text = kind.msg(topic);
      wa.href = `${waBase}?text=${encodeURIComponent(text)}`;
      mail.href = `${mailBase}?subject=${encodeURIComponent(`${kind.subject}: ${topic}`)}&body=${encodeURIComponent(text)}`;
      intent.textContent = `${kind.label}: ${topic}. A mensagem segue já escrita no WhatsApp e no e-mail.`;
    });
  });

  /* Passos "Como trabalhamos": sobem quando entram no ecrã */
  const steps = $('.steps');
  if (steps && 'IntersectionObserver' in window && !reduceMotion) {
    steps.classList.add('reveal');
    new IntersectionObserver((es, ob) => {
      if (es.some(en => en.isIntersecting)) { steps.classList.add('in'); ob.disconnect(); }
    }, { threshold: 0.25 }).observe(steps);
  }

  $('#year').textContent = new Date().getFullYear();
})();
