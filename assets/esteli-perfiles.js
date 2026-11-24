/* Two practice profiles for the same tour operator. */
const EsteliPerfiles = (() => {
  const paths = {
    business: '<rect x="3" y="4" width="18" height="16" rx="4"/><circle cx="12" cy="10" r="2"/><path d="M8 16c.5-2.2 2-3 4-3s3.5.8 4 3"/>',
    pin: '<path d="M19 10c0 5-7 10-7 10s-7-5-7-10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
    chat: '<path d="M19 12a7 7 0 0 1-7 7H8l-4 1 1-4a7 7 0 1 1 14-4Z"/><path d="M9 12h1m2 0h1m2 0h1"/>',
    info: '<circle cx="12" cy="12" r="8"/><path d="M12 11v5m0-8v.1"/>',
    photo: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m4 17 5-5 3 3 3-4 5 5"/><circle cx="16" cy="8" r="1"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
  const credit = '<a class="etp-credit" href="assets/esteli/CREDITOS.md" target="_blank" rel="noopener">Foto de Tisey · CC BY-SA 4.0</a>';
  const cases = {
    a: {
      title: 'Perfil A',
      intro: 'Imaginá que querés escaparte a Miraflor el fin de semana y acabás de encontrar este perfil. ¿Qué podés saber antes de escribir?',
      tip: 'Una foto borrosa y una descripción general dejan dudas sobre dónde operás, qué ofrecés y cómo te pueden contactar.',
      render: demo => build(demo, false)
    },
    b: {
      title: 'Perfil B',
      intro: 'Entrá a este perfil como visitante. Revisá la información y probá el botón de WhatsApp para dar el siguiente paso.',
      tip: 'Una imagen clara, una descripción concreta y un canal de contacto fácil de encontrar reducen las dudas que frenan una consulta.',
      render: demo => build(demo, true)
    }
  };

  function figure(filename, alt, extra = '') {
    return `<figure class="etp-photo ${extra}"><img src="assets/esteli/${filename}" alt="${alt}">${credit}</figure>`;
  }

  function facts(complete) {
    const rows = [
      ['pin', 'Ubicación', complete ? 'Estelí, Nicaragua' : 'Sin ubicación publicada'],
      ['clock', 'Horario', complete ? 'Lun. a sáb. · 8:00 a. m.–5:00 p. m. (ejemplo)' : 'Sin horario publicado'],
      ['chat', 'Contacto', complete ? 'Consultas y reservas por WhatsApp' : 'Sin canal de contacto publicado'],
      ['info', 'Tarifa', complete ? 'Consultá el total y lo que incluye para tu grupo' : 'Sin tarifa ni instrucciones para cotizar']
    ];
    return `<dl class="etp-details">${rows.map(([key,label,value])=>`<div>
      <dt>${icon(key)}${label}</dt><dd>${value}</dd></div>`).join('')}</dl>`;
  }

  function publication(complete) {
    return `<div class="etp-publication">
      <div class="etp-post-author"><span class="etp-mini-avatar" aria-hidden="true">ET</span>
        <div><strong>Estelí Tours</strong><small>Publicación de ejemplo</small></div></div>
      <p>${complete ? 'Caminata guiada en Miraflor con paradas para fotos. Consultá la duración, la tarifa y los cupos para tu grupo.' : '¡Hay tours! Preguntá por más información.'}</p>
      ${figure('cascada.webp', complete ? 'Cascada de Miraflor' : 'Foto borrosa de una cascada', complete ? '' : 'etp-blurred')}
    </div>`;
  }

  function build(demo, complete) {
    demo.innerHTML = `<section class="etp-app" data-profile="${complete ? 'b':'a'}" aria-label="Perfil comercial de ejemplo de Estelí Tours">
      <div class="etp-top">${icon('business')}<strong>Perfil comercial</strong><span>Simulación</span></div>
      <div class="etp-scroll">
        ${figure('esteli-ciudad.webp', complete ? 'Vista de Estelí desde El Tisey' : 'Foto borrosa de Estelí', complete ? 'etp-cover' : 'etp-cover etp-blurred')}
        <div class="etp-profile">
          <span class="etp-avatar" aria-hidden="true">${complete ? 'ET' : icon('photo')}</span>
          <h2>Estelí Tours</h2>
          <p class="etp-category">${complete ? 'Operador turístico · Estelí, Nicaragua' : 'Tours y viajes'}</p>
          <p class="etp-bio">${complete ? 'Caminatas guiadas por Miraflor y salidas a El Tisey. Planeá tu recorrido con nosotros.' : 'Publicamos salidas. Más información pronto.'}</p>
          ${complete
            ? `<p class="etp-hours">${icon('clock')}<span>Lun. a sáb. · 8:00 a. m.–5:00 p. m. <small>Horario de ejemplo</small></span></p>
               <a class="etp-contact" href="#11/whatsapp">${icon('chat')}Consultar por WhatsApp</a>`
            : ''}
        </div>
        <div class="etp-tabs" role="group" aria-label="Secciones del perfil">
          <button type="button" data-etp-tab="info" aria-pressed="true">Información</button>
          <button type="button" data-etp-tab="posts" aria-pressed="false">Publicaciones</button>
        </div>
        <div class="etp-panel" aria-live="polite">${facts(complete)}</div>
      </div>
    </section>`;
    const buttons = [...demo.querySelectorAll('[data-etp-tab]')];
    const panel = demo.querySelector('.etp-panel');
    buttons.forEach(button => button.addEventListener('click', () => {
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      panel.innerHTML = button.dataset.etpTab === 'info' ? facts(complete) : publication(complete);
    }));
  }

  return {cases};
})();
