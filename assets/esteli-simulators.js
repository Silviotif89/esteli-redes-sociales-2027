/* Ad, conversation and results workspaces retain the underlying lesson controls. */
const EsteliSimulators = (() => {
  const html = (tag, className, content='') => {
    const elem = document.createElement(tag);
    elem.className = className;
    elem.innerHTML = content;
    return elem;
  };
  const glyphs = {
    chat:'<path d="M19 12a7 7 0 0 1-7 7H9l-4 2 1-4a7 7 0 0 1-2-5 7 7 0 0 1 7-7h1a7 7 0 0 1 7 7Z"/><path d="M9 12h1m2 0h1m2 0h1"/>',
    chart:'<path d="M4 4v16h16M7 15l4-5 4 3 5-6M16 7h4v4"/>',
    ad:'<path d="m4 11 13-5v12L4 14v-3Zm3 4 1 5h3l-1-4M20 10h2m-2-4 1-1m-1 13 1 1"/>',
    arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${glyphs[name]}</svg>`;

  function conversation(content) {
    const messages = html('div','sim-thread');
    messages.append(content.querySelector('.bubble'), content.querySelector('.outgoing'));
    const phone = html('section','sim-chat-device');
    phone.setAttribute('aria-label','Conversación de práctica de WhatsApp Business');
    const header = content.querySelector('.chat-heading');
    header.querySelector('small').textContent='WhatsApp Business · práctica';
    phone.append(header,messages);
    phone.append(html('div','sim-message-entry','Mensaje al visitante <span aria-hidden="true">↗</span>'));

    const responses = html('section','sim-responses',`<h2>${icon('chat')} Elegí una respuesta</h2>`);
    const choices = content.querySelector('.choices');
    choices.querySelectorAll('button').forEach((btn,index)=>{
      btn.insertAdjacentHTML('afterbegin',`<span class="sim-answer-id" aria-hidden="true">${'ABC'[index]}</span>`);
      btn.setAttribute('aria-pressed','false');
      btn.addEventListener('click',()=>choices.querySelectorAll('button').forEach(other=>{
        other.setAttribute('aria-pressed',String(other===btn));
      }));
    });
    choices.addEventListener('click',event=>{
      const btn=event.target.closest('button[data-chat]');
      if (!btn) return;
      const outgoing=messages.querySelector('.outgoing');
      // Existing renderer writes the caption; remove the decorative response letter.
      outgoing.textContent=btn.lastChild.textContent;
    });
    responses.append(choices,content.querySelector('#feedback'));
    content.replaceChildren(phone,responses);
  }

  function campaign(content) {
    const [controls,summary] = content.querySelectorAll('.flex > .panel');
    controls.classList.add('sim-setup');
    controls.prepend(html('h2','sim-panel-title',`${icon('ad')} Configurá tu campaña`));

    const mock = summary.querySelector('.mock-ad');
    const creative = mock.querySelector('#mockCreative');
    const media = html('figure','sim-ad-media','<img alt="Cascada de Miraflor"><figcaption>Miraflor · Tisey · <a href="assets/esteli/CREDITOS.md" target="_blank" rel="noopener">CC BY-SA 4.0</a></figcaption>');
    creative.before(media);
    const cfg = [
      ['cascada','Cascada de Miraflor','Reel vertical'],
      ['esteli-ciudad','Estelí desde El Tisey','Foto con oferta'],
      ['bosque','Neblina en Estelí','Carrusel']
    ];
    const sync = () => {
      const [source,alt,label] = cfg[content.querySelector('#adCreative').selectedIndex];
      const image = media.querySelector('img');
      image.src = `assets/esteli/${source}.webp`;
      image.alt = alt;
      media.dataset.creative = label;
      media.querySelector('figcaption').firstChild.textContent = `${alt} · Tisey · `;
    };
    content.querySelector('#adCreative').addEventListener('input',sync);
    sync();
    const results = html('div','sim-campaign-outcome');
    results.append(summary.querySelector('h3'),summary.querySelector('.metric'),summary.querySelector('#adSummary'),summary.querySelector('.small'));
    summary.classList.add('sim-ad-console');
    summary.replaceChildren(mock,results);
  }

  function metrics(content) {
    const [controls,results] = content.querySelectorAll('.flex > .panel');
    controls.classList.add('sim-setup','sim-analytics-input');
    controls.prepend(html('h2','sim-panel-title',`${icon('chart')} Datos de práctica`));
    const board = html('div','sim-results-board');
    const resultGrid = results.querySelector('.resultgrid');
    const measurements = html('div','sim-measurements',`<div><span>Consultas / reservas</span>
      <strong><output id="simLeadCount"></output> <span aria-hidden="true">/</span> <output id="simSalesCount"></output></strong>
      <div class="sim-quantity" aria-hidden="true"><span></span></div></div>`);
    board.append(measurements,resultGrid,results.querySelector('p'));
    results.append(board);
    results.classList.add('sim-dash');
    const update = () => {
      const count = id=>Math.max(0,Number(content.querySelector(id).value)||0);
      const leads = count('#leads');
      const sales = count('#sales');
      measurements.querySelector('#simLeadCount').textContent=leads.toLocaleString('es-NI');
      measurements.querySelector('#simSalesCount').textContent=sales.toLocaleString('es-NI');
      measurements.querySelector('.sim-quantity span').style.width = `${Math.min(100,(leads?sales/leads:0)*100)}%`;
    };
    content.addEventListener('input',update);
    update();
  }

  function enhance(el,slide,index) {
    if (index===39) conversation(el.querySelector('.content'));
    if (index===48) campaign(el.querySelector('.content'));
    if (index===52) metrics(el.querySelector('.content'));
  }
  return {enhance};
})();
