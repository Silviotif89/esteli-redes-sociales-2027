/* Teaching examples have their own hash routes, outside the numbered deck. */
const EsteliInteractivos = (() => {
  const groups = {
    11: {
      cases: EsteliRedes.cases,
      label: 'Redes sociales',
      invite: 'Elegí una red para ver un ejemplo de Estelí Tours.'
    },
    39: {
      cases: EsteliWhatsApp.cases,
      label: 'WhatsApp Business',
      invite: 'Elegí un tema para ver cómo lo haría Estelí Tours.'
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
    const subtitle = slide.querySelector('.subtitle');
    subtitle.append(' ',group.invite);
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

  function present(example, slide) {
    const view = document.getElementById('wa-example');
    const previous = active;
    active = example;
    view.hidden = !example;
    slide.hidden = Boolean(example);
    document.body.classList.toggle('wa-example-open',Boolean(example));
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
    view.innerHTML = `<div class="wa-page-head">
      <a id="wa-back" class="wa-back" href="#${number}">← Volver a la diapositiva ${number}</a>
      <span class="wa-practice">Ejemplo de capacitación</span>
    </div>
    <div class="wa-example-body">
      <div class="wa-explain">
        <p class="wa-business">Tour Operadora Estelí Tours</p>
        <h1 id="wa-example-title" tabindex="-1">${item.title}</h1>
        <p class="wa-intro">${item.intro}</p>
        <div class="wa-tip"><strong>Aplicalo a tu negocio</strong><p>${item.tip}</p></div>
      </div>
      <div class="wa-device">
        <div class="wa-device-head"><span class="wa-avatar" aria-hidden="true">ET</span><div><strong>Estelí Tours</strong><small>${item.deviceLabel || group.label} · simulación</small></div></div>
        <div class="wa-device-content" id="wa-demo"></div>
      </div>
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
