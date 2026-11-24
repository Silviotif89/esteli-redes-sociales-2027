/* Visual teaching aids. The slide data remains the source of every step and example. */
const EsteliDiagrams = (() => {
  const iconPaths = {
    eye:'<path d="M2 12s3.4-6 10-6 10 6 10 6-3.4 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
    search:'<circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4 4"/>',
    message:'<path d="M20 11a7 7 0 0 1-7 7H5l1.7-3A7 7 0 1 1 20 11Z"/><path d="M9 11h7m-7 3h4"/>',
    ticket:'<path d="M4 6h16v4a2 2 0 1 0 0 4v4H4v-4a2 2 0 1 0 0-4V6Z"/><path d="M14 7v2m0 2v2m0 2v2"/>',
    star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',
    camera:'<rect x="4" y="7" width="16" height="12" rx="2"/><circle cx="12" cy="13" r="3"/><path d="m8 7 1-2h6l1 2"/>',
    pen:'<path d="m5 19 4-.9L20 7l-3-3L6 15l-1 4Zm10-13 3 3"/>',
    chart:'<path d="M4 4v16h16M8 15l4-4 3 2 5-6"/>',
    flag:'<path d="M5 21V4m0 1h14l-3 4 3 4H5"/>',
    play:'<path d="m8 5 11 7-11 7V5Z"/>',
    arrow:'<path d="M4 12h15m-6-6 6 6-6 6"/>',
    check:'<path d="m5 12 4 4 10-10"/>'
  };
  const palette = ['#f9c95f','#ad9bff','#7cdcec','#ff877d','#f8abdf','#c9e77d','#ace6f2'];
  const icon = (name, extra='') => `<svg class="di-icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;
  const entities = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};
  const safe = text => String(text).replace(/[&<>"']/g, char => entities[char]);
  const tone = i => `--di-tone:${palette[i]}`;

  function activate(surface, initial, render = () => {}) {
    const triggers = [...surface.querySelectorAll('[data-di-step]')];
    function select(index) {
      triggers.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
      surface.style.setProperty('--di-active', palette[index]);
      render(index);
    }
    triggers.forEach((button, i) => button.addEventListener('click', () => select(i)));
    select(initial);
  }

  function journey(content, items) {
    const names = ['eye','search','message','ticket','star'];
    const points = [[100,151],[303,92],[501,131],[699,78],[898,105]];
    const distance = [0,24,50,75,100];
    content.innerHTML = `<div class="di-journey">
      <svg class="di-trail" viewBox="0 0 1000 228" preserveAspectRatio="none" role="img" aria-label="Sendero ilustrado entre las cinco etapas de la reserva">
        <path fill="#32235e" d="M0 87Q60 47 127 65t123-18q58-37 123 10t113 21q73-61 137-33t129-2q68-32 121-12T1000 36V228H0Z"/>
        <path fill="#4d367d" d="M0 130Q45 87 98 108t121-18q67-30 122 10t104 25q53-26 94-37t95 16q54 24 109 1t122 15q67 24 135-3V228H0Z"/>
        <path fill="#6a508d" d="M0 196q67-69 142-31t143-6q60-37 127 14t139 2q70-44 149 6t139-17q66-62 161 1V228H0Z"/>
        <g fill="none" stroke="#d7bedf" stroke-width="1.3" opacity=".28">
          <path d="M0 68Q80 19 142 47t128-12q61-37 105-6t119 20q73-58 134-30t124-1q73-33 119-15T1000 8"/>
          <path d="M0 101q54-43 118-23t126-12q65-37 122 5t117 20q82-59 139-28t139-5q55-20 101-11t138 11"/>
          <path d="M0 214q72-62 140-35t140 0q68-40 134 10t141 4q73-45 149 4t135-10q68-54 161-3"/>
          <path d="M0 225q75-52 141-28t143-1q63-38 125 11t153-1q76-39 144 7t121-4q83-58 173-6"/>
        </g>
        <path class="di-trail-route" d="M100 151C149 147 234 134 303 92S423 100 501 131 622 62 699 78 821 118 898 105" pathLength="100"/>
        <path class="di-trail-route di-trail-progress" d="M100 151C149 147 234 134 303 92S423 100 501 131 622 62 699 78 821 118 898 105" pathLength="100"/>
        ${points.map(([x,y],i)=>`<g class="di-point" data-di-point="${i}" style="${tone(i)}" transform="translate(${x} ${y})"><circle class="di-point-halo" r="25"/><circle class="di-point-fill" r="17"/><text y="6" text-anchor="middle">${i+1}</text></g>`).join('')}
        <path fill="none" stroke="#fff6ea" stroke-width="2" opacity=".8" d="M942 39v23m-12-11h24m-20-8 16 16m0-16-16 16"/>
      </svg>
      <ol class="di-trail-steps">
        ${items.map(([number,title,description],i)=>`<li style="${tone(i)}"><button data-di-step type="button" aria-pressed="false"><span class="di-trail-icon">${icon(names[i])}</span><span><strong>${safe(title)}</strong><small>${safe(description)}</small></span></button></li>`).join('')}
      </ol>
    </div>`;
    const surface = content.firstElementChild;
    activate(surface, 0, i => {
      surface.style.setProperty('--di-distance', distance[i]);
      surface.querySelectorAll('[data-di-point]').forEach((point,j)=>point.classList.toggle('is-marked', j===i));
    });
  }

  function aida(content, items) {
    content.innerHTML = `<div class="di-aida">
      <ol class="di-aida-sequence">
        ${items.map(([letter,title],i)=>`<li style="${tone(i)}"><button data-di-step type="button" aria-pressed="false"><b>${safe(letter)}</b><strong>${safe(title)}</strong>${icon('arrow')}</button></li>`).join('')}
      </ol>
      <article class="di-aida-message" aria-label="Ejemplo de publicación para una finca turística">
        <header><span class="di-aida-avatar">${icon('camera')}</span><span><b>Finca turística</b><small>Ejemplo de publicación</small></span></header>
        <div class="di-aida-copy">
          ${items.map((item,i)=>`<p data-di-copy style="${tone(i)}">${safe(item[2])}</p>`).join('')}
        </div>
      </article>
    </div>`;
    const surface = content.firstElementChild;
    activate(surface,0,i=>surface.querySelectorAll('[data-di-copy]').forEach((line,j)=>line.classList.toggle('is-current', i===j)));
  }

  function pas(content, items) {
    const icons = ['message','search','check'];
    content.innerHTML = `<div class="di-pas">
      <svg class="di-pas-wave" viewBox="0 0 1000 115" preserveAspectRatio="none" aria-hidden="true">
        <path d="M20 103C180 102 214 84 320 84S430 22 524 22s114 69 201 69 128-15 255-25" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="8 7"/>
        <path d="m965 59 16 7-13 11" fill="none" stroke="currentColor" stroke-width="2"/>
      </svg>
      <ol class="di-pas-sequence">
        ${items.map(([letter,title,description],i)=>`<li style="${tone(i)}"><button data-di-step type="button" aria-pressed="false"><span class="di-pas-label"><b>${safe(letter)}</b><strong>${safe(title)}</strong>${icon(icons[i])}</span><span class="di-pas-message">${safe(description)}</span></button></li>`).join('')}
      </ol>
    </div>`;
    activate(content.firstElementChild, 0);
  }

  const sampleWeek = [
    'Mostrá cómo se prepara el desayuno de tu hospedaje.',
    'Respondé con el horario, la ubicación y las formas de reserva.',
    'Compartí qué conviene llevar a una caminata.',
    'Grabá la llegada, un detalle y el momento favorito de tu experiencia.',
    'Publicá el plan del fin de semana con horario y contacto.',
    'Mostrá el ambiente de la cafetería antes de abrir.',
    'Anotá qué publicó tu negocio y qué consultas recibió.'
  ];
  function calendar(content) {
    const original = [...content.querySelectorAll('.calendar .tile')];
    const days = original.map(tile=>[
      tile.querySelector('button,.num').textContent,
      tile.querySelector('h2').textContent,
      tile.querySelector('p').textContent
    ]);
    const foot = content.querySelector('.foot');
    const graphics = ['camera','message','pen','play','ticket','eye','chart'];
    content.innerHTML = `<div class="di-calendar">
      <div class="calendar" role="group" aria-label="Plan de contenido de siete días">
        ${days.map(([day, title, detail],i)=>`<button class="di-day" style="${tone(i)}" data-di-step type="button" aria-label="${safe(day)} · ${safe(title)} · ${safe(detail)}" aria-pressed="false"><span>${safe(day)}</span>${icon(graphics[i])}<strong>${safe(title)}</strong><small>${safe(detail)}</small></button>`).join('')}
      </div>
      <div class="di-day-detail" aria-live="polite"><span class="di-day-icon" aria-hidden="true"></span><div><b></b><p></p></div></div>
    </div>`;
    if (foot) content.append(foot);
    const surface = content.firstElementChild;
    const detail = surface.querySelector('.di-day-detail');
    activate(surface,0,i=>{
      detail.querySelector('.di-day-icon').innerHTML = icon(graphics[i]);
      detail.querySelector('b').textContent = days[i][0] + ' · ' + days[i][2];
      detail.querySelector('p').textContent = sampleWeek[i];
    });
  }

  function service(content, items) {
    const examples = [
      '¿En qué fecha quieren venir y cuántas personas son?',
      'Confirmé la disponibilidad. Te paso el precio total y qué incluye.',
      'Ya registré tu reserva. Te comparto la confirmación por este canal.',
      'Te mando las indicaciones para llegar. ¿Qué tal estuvo tu visita?'
    ];
    content.innerHTML = `<div class="di-service">
      <div class="di-service-talk" aria-live="polite">
        <span>${icon('message')} Ejemplo de respuesta</span>
        <p></p>
      </div>
      <ol class="di-service-sequence">
        ${items.map(([number,title,description],i)=>`<li style="${tone(i)}"><button type="button" data-di-step aria-pressed="false"><b>${safe(number)}</b><span><strong>${safe(title)}</strong><small>${safe(description)}</small></span></button></li>`).join('')}
      </ol>
    </div>`;
    const surface = content.firstElementChild;
    activate(surface,0,i=>{surface.querySelector('.di-service-talk p').textContent=examples[i]});
  }

  function hierarchy(content, items) {
    const layers = [
      {x:14,y:6,w:320,h:256,iconX:278,iconY:34,name:'flag'},
      {x:40,y:63,w:266,h:172,iconX:247,iconY:89,name:'eye'},
      {x:68,y:121,w:210,h:91,iconX:66,iconY:56,name:'camera'}
    ];
    content.innerHTML = `<div class="di-hierarchy">
      <svg class="di-stack" viewBox="0 0 348 272" role="img" aria-label="El anuncio está dentro del conjunto de anuncios, que a su vez está dentro de la campaña">
        ${layers.map(({x,y,w,h,iconX,iconY,name},i)=>`<g data-di-layer="${i}" class="di-layer" style="${tone(i)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16"/><text x="${x+15}" y="${y+29}">${i+1}</text>${i<2?`<svg x="${iconX}" y="${iconY-11}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name]}</svg>`:`<path d="m${x+iconX} ${y+iconY} 15-11 13 8 15-15 22 18 21-24 34 24" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="${x+125}" cy="${y+29}" r="6" fill="currentColor"/>`}</g>`).join('')}
      </svg>
      <ol class="di-hierarchy-steps">
        ${items.map(([number,title,description],i)=>`<li style="${tone(i)}"><button data-di-step type="button" aria-pressed="false"><b>${safe(number)}</b><span><strong>${safe(title)}</strong><small>${safe(description)}</small></span>${icon('arrow')}</button></li>`).join('')}
      </ol>
    </div>`;
    const surface = content.firstElementChild;
    activate(surface,0,i=>surface.querySelectorAll('[data-di-layer]').forEach((layer,j)=>layer.classList.toggle('is-current',i===j)));
  }

  function roadmap(content, items) {
    const icons = ['pen','camera','play','flag'];
    content.innerHTML = `<div class="di-roadmap">
      <svg class="di-road-line" viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 157C126 157 169 131 277 116S437 89 532 75 689 55 787 35 930 16 1000 11" pathLength="100" class="di-road-track"/>
        <path d="M0 157C126 157 169 131 277 116S437 89 532 75 689 55 787 35 930 16 1000 11" pathLength="100" class="di-road-track di-road-progress"/>
      </svg>
      <ol class="di-road-stages">
        ${items.map(([,title,description],i)=>`<li style="${tone(i)}"><button data-di-step type="button" aria-pressed="false"><span class="di-road-icon">${icon(icons[i])}</span><span class="di-road-week">Semana ${i+1}</span><strong>${safe(title)}</strong><small>${safe(description)}</small></button></li>`).join('')}
      </ol>
    </div>`;
    const surface = content.firstElementChild;
    activate(surface,0,i=>surface.style.setProperty('--di-distance', (i+1)*25));
  }

  const treatments = {
    10:['journey',journey], 19:['aida',aida], 20:['pas',pas],
    35:['calendar',calendar], 41:['service',service],
    46:['hierarchy',hierarchy], 56:['roadmap',roadmap]
  };

  function enhance(el, slide, index) {
    const treatment = treatments[index+1];
    if (!treatment) return;
    const [name, render] = treatment;
    el.classList.add('di-slide', 'di-slide-'+name);
    render(el.querySelector('.content'),slide.items);
  }
  return {enhance};
})();
