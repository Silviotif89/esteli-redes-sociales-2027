/* Teaching examples have their own hash routes, outside the numbered deck. */
const EsteliInteractivos = (() => {
  const groups = {
    11: {
      cases: EsteliRedes.cases,
      label: 'Redes sociales',
      portrait: true,
      invite: 'Elegí una red para ver un ejemplo de Estelí Tours.'
    },
    13: {
      cases: EsteliPerfiles.cases,
      label: 'Perfiles de negocio',
      portrait: true,
      invite: 'Abrí los dos y fijate qué información encuentra el visitante.'
    },
    36: {
      cases: EsteliSuite.cases,
      label: 'Meta Business Suite',
      workspace: 'suite'
    },
    39: {
      cases: EsteliWhatsApp.cases,
      label: 'WhatsApp Business',
      invite: 'Elegí un tema para ver cómo lo haría Estelí Tours.'
    },
    45: {
      cases: EsteliObjetivos.cases,
      label: 'Administrador de anuncios',
      workspace: 'objectives',
      invite: 'Elegí un objetivo para abrir una configuración de ejemplo.'
    }
  };
  const marker = `<div class="interactive-marker"><span class="interactive-badge">
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M10 2c0 4.4 2.7 7 7 7-4.3 0-7 2.7-7 7 0-4.3-2.7-7-7-7 4.3 0 7-2.6 7-7Z"/>
      <path d="M18 12c0 2.9 1.8 4.5 4.5 4.5-2.7 0-4.5 1.7-4.5 4.5 0-2.8-1.7-4.5-4.5-4.5 2.8 0 4.5-1.6 4.5-4.5Z"/>
    </svg>Interactivo</span></div>`;
  let active = null;
  const route = ({number, slug}) => `#${number}/${slug}`;
  function fromHash(hash) {
    const match = /^#(\d+)\/([a-z]+)$/.exec(hash);
    if (!match) return null;
    const number = Number(match[1]);
    const slug = match[2];
    const group = groups[number];
    return group && Object.hasOwn(group.cases,slug) ? {number,slug} : null;
  }

  function decorate(slide, number) {
    const group = groups[number];
    if (!group) return;
    slide.querySelector('.stage-heading').insertAdjacentHTML('afterbegin',marker);
    if (group.workspace === 'suite') {
      decorateWorkspace(slide,number,group);
      return;
    }
    const subtitle = slide.querySelector('.subtitle');
    subtitle.append(' ',group.invite);
    if (group.workspace === 'objectives') {
      slide.querySelector('.foot').innerHTML = `<a href="${EsteliObjetivos.metaGuide}" target="_blank" rel="noopener">Guía oficial de objetivos de Meta</a> · Las opciones pueden variar según la cuenta y la configuración.`;
    }
    const entries = Object.entries(group.cases);
    slide.querySelectorAll('.tile').forEach((tile,index) => {
      const [slug, lesson] = entries[index];
      const link = document.createElement('a');
      link.className = 'tile wa-case-link';
      link.href = route({number,slug});
      link.dataset.waCase = slug;
      link.append(...tile.childNodes);
      const description = link.querySelector('p');
      description.id = 'wa-description-' + slug;
      link.setAttribute('aria-describedby',description.id);
      link.setAttribute('aria-label','Ver ejemplo de ' + lesson.title);
      link.insertAdjacentHTML('beforeend','<span class="wa-case-cta" aria-hidden="true">Ver ejemplo <b>↗</b></span>');
      tile.replaceWith(link);
    });
  }

  function decorateWorkspace(slide, number, group) {
    const content = slide.querySelector('.content');
    const foot = slide.querySelector('.foot');
    foot.innerHTML = '<a href="https://eventsmanager.facebook.com/business/learn/lessons/introduction-meta-business-suite" target="_blank" rel="noopener">Guía oficial de Meta</a> · Las opciones pueden variar según la cuenta y el dispositivo.';
    const topics = Object.entries(group.cases);
    const list = document.createElement('nav');
    list.className = 'suite-launch-steps';
    list.setAttribute('aria-label','Pasos del simulador');
    content.querySelectorAll('.tile').forEach((tile,index)=>{
      const [slug] = topics[index];
      const name = tile.querySelector('h2');
      const description = tile.querySelector('p');
      const link = document.createElement('a');
      link.href = route({number,slug});
      link.dataset.waCase = slug;
      link.setAttribute('aria-label','Simular paso: ' + name.textContent);
      link.innerHTML = `<span class="suite-launch-step-number" aria-hidden="true">${index+1}</span><span></span><span class="suite-launch-arrow" aria-hidden="true">↗</span>`;
      link.children[1].append(name,description);
      list.append(link);
    });
    content.innerHTML = `<div class="suite-launch">
      <div class="suite-launch-intro">
        <svg class="suite-launch-art" viewBox="0 0 230 210" aria-hidden="true" fill="none">
          <rect x="24" y="38" width="170" height="117" rx="15" stroke="currentColor" stroke-width="4"/>
          <path d="M24 68h170M69 68v87M41 54h2m10 0h2m10 0h2M41 85h16m-16 16h16m-16 16h16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
          <rect x="81" y="81" width="101" height="43" rx="8" stroke="currentColor" stroke-width="4"/>
          <path d="m88 116 19-18 12 12 18-16 19 22m-75 21h61" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="183" cy="155" r="30" fill="#ffd77d" stroke="#241d42" stroke-width="4"/>
          <path d="m172 155 8 8 15-17" stroke="#241d42" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p class="suite-launch-brand">Estelí Tours · cuenta de ejemplo</p>
        <h2>Del borrador al planificador</h2>
        <p>Mostrá el proceso completo o abrí directamente un paso.</p>
        <a class="suite-launch-cta" href="${route({number,slug:topics[0][0]})}">Abrir simulador <span aria-hidden="true">→</span></a>
      </div>
    </div>`;
    content.firstElementChild.append(list);
  }

  function present(example, slide) {
    const view = document.getElementById('wa-example');
    const previous = active;
    active = example;
    view.hidden = !example;
    slide.hidden = Boolean(example);
    document.body.classList.toggle('wa-example-open',Boolean(example));
    view.classList.toggle('social-view',Boolean(example && groups[example.number].portrait));
    const workspace = example && groups[example.number].workspace;
    view.classList.toggle('suite-view',workspace === 'suite');
    view.classList.toggle('objectives-view',workspace === 'objectives');
    if (!example) {
      if (previous) {
        view.replaceChildren();
        slide.querySelector(`[data-wa-case="${previous.slug}"]`)?.focus({preventScroll:true});
      }
      return;
    }
    const {number,slug} = example;
    const group = groups[number];
    const item = group.cases[slug];
    view.dataset.exampleSlide = number;
    view.dataset.example = slug;
    if (group.workspace) {
      const routeHead = workspace === 'suite' ? 'suite-route-head' : 'objectives-route-head';
      view.innerHTML = `<div class="wa-page-head ${routeHead}">
        <a id="wa-back" class="wa-back" href="#${number}">← Volver a la diapositiva ${number}</a>
        <h1 id="wa-example-title" tabindex="-1">${group.label} · ${item.title}</h1>
        <span class="wa-practice">Simulador de capacitación</span>
      </div>
      <div id="wa-demo" class="wa-device-content suite-route-app"></div>`;
      item.render(view.querySelector('#wa-demo'));
      document.getElementById('notes').classList.remove('open');
      view.querySelector('h1').focus({preventScroll:true});
      return;
    }
    const device = group.portrait
      ? '<div class="social-phone-area"><div class="social-phone"><div class="wa-device-content" id="wa-demo"></div></div></div>'
      : `<div class="wa-device">
        <div class="wa-device-head"><span class="wa-avatar" aria-hidden="true">ET</span><div><strong>Estelí Tours</strong><small>${group.label} · simulación</small></div></div>
        <div class="wa-device-content" id="wa-demo"></div>
      </div>`;
    view.innerHTML = `<div class="wa-page-head">
      <a id="wa-back" class="wa-back" href="#${number}">← Volver a la diapositiva ${number}</a>
      <span class="wa-practice">${group.portrait?'Simulador':'Ejemplo'} de capacitación</span>
    </div>
    <div class="wa-example-body">
      <div class="wa-explain">
        <p class="wa-business">Tour Operadora Estelí Tours</p>
        <h1 id="wa-example-title" tabindex="-1">${item.title}</h1>
        <p class="wa-intro">${item.intro}</p>
        <div class="wa-tip"><strong>Aplicalo a tu negocio</strong><p>${item.tip}</p></div>
      </div>
      ${device}
    </div>
    <nav class="wa-example-nav" aria-label="Ejemplos de Estelí Tours">${Object.entries(group.cases).map(([id,topic]) =>
      `<a href="${route({number,slug:id})}"${id===slug?' aria-current="page"':''}>${topic.title}</a>`).join('')}</nav>`;
    item.render(view.querySelector('#wa-demo'));
    document.getElementById('notes').classList.remove('open');
    view.querySelector('h1').focus({preventScroll:true});
  }
  function close() {
    if (active) location.hash = '#' + active.number;
  }
  return {route,fromHash,decorate,present,isOpen:()=>Boolean(active),close};
})();
