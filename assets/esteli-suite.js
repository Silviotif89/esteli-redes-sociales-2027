/* Guided publishing practice for slide 36, with local state for the demo account. */
const EsteliSuite = (() => {
  const account = 'Estelí Tours';
  const zone = 'America/Managua';
  const channels = {facebook:'Facebook', instagram:'Instagram'};
  const photos = {
    miraflor: {src:'assets/esteli/cascada.webp', alt:'Cascada de Miraflor en Estelí', label:'Cascada de Miraflor'},
    tisey: {src:'assets/esteli/esteli-ciudad.webp', alt:'Vista de Estelí desde El Tisey', label:'Vista desde El Tisey'}
  };
  const presets = {
    crear: {
      label:'Crear publicación',
      title:'Crear',
      heading:'Crear publicación',
      intro:'Elegí en qué perfiles de Estelí Tours saldría el contenido.',
      tip:'Revisá la página y la cuenta de Instagram antes de preparar el texto.'
    },
    preparar: {
      label:'Contenido',
      title:'Preparar',
      heading:'Preparar la publicación',
      intro:'Editá el texto y elegí una foto. La vista previa se actualiza mientras escribís.',
      tip:'Incluí una descripción clara y una forma de consultar fechas o disponibilidad.'
    },
    programar: {
      label:'Programación',
      title:'Programar',
      heading:'Elegir fecha y hora',
      intro:'Elegí cuándo saldría la publicación y confirmá con Programar.',
      tip:'Confirmá la zona horaria y revisá el texto y la foto antes de programar.'
    },
    revisar: {
      label:'Planificador',
      title:'Revisar',
      heading:'Planificador de publicaciones',
      intro:'Revisá el contenido programado y su estado en el planificador.',
      tip:'En una cuenta real, después de publicar podés volver para revisar el rendimiento y las consultas.'
    }
  };
  const symbols = {
    suite:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18m-11 0v11"/>',
    crear:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8m-4-4h8"/>',
    preparar:'<path d="m4 19 5-1 10-10-4-4L5 14l-1 5Zm10-14 4 4M4 20h16"/>',
    programar:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    revisar:'<rect x="4" y="6" width="16" height="14" rx="2"/><path d="M8 4v4m8-4v4M4 10h16m-12 4h3m2 0h3"/>'
  };
  const steps = Object.keys(presets);
  const icon = key => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${symbols[key]}</svg>`;
  const href = key => '#36/' + key;
  const dateFormat = new Intl.DateTimeFormat('en-CA', {timeZone:zone, year:'numeric', month:'2-digit', day:'2-digit'});
  const dateField = date => {
    const parts = Object.fromEntries(dateFormat.formatToParts(date).map(({type,value})=>[type,value]));
    return `${parts.year}-${parts.month}-${parts.day}`;
  };
  const dateLabel = new Intl.DateTimeFormat('es-NI', {timeZone:zone, dateStyle:'full', timeStyle:'short'});
  const weekLabel = new Intl.DateTimeFormat('es-NI', {timeZone:zone, day:'numeric', month:'short', year:'numeric'});
  const dayLabel = new Intl.DateTimeFormat('es-NI', {timeZone:zone, weekday:'long', day:'numeric', month:'long'});
  const weekdays = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  const dayMs = 86400000;
  const draft = {
    channels:['facebook'],
    channelPreview:'facebook',
    copy:'¿Primera vez en Miraflor? Mirá cómo se vive una caminata entre bosque y agua. Escribinos para consultar fechas y qué incluye el recorrido.',
    photo:photos.miraflor,
    photoKey:'miraflor',
    date:dateField(new Date(Date.now() + 86400000)),
    time:'09:00'
  };
  let scheduled = null;
  let plannerNotice = '';

  const navLink = (key, text, primary=false) => `<a class="suite-button${primary?' suite-primary':''}" href="${href(key)}">${text}</a>`;
  const status = () => '<p class="suite-status" role="status" aria-live="polite"></p>';
  const selectedChannels = list => list.map(key => channels[key]).join(' e ');

  function shell(demo, step, content) {
    const item = presets[step];
    demo.innerHTML = `<section class="suite-app" data-step="${step}" aria-label="Simulador de publicación de Meta Business Suite">
      <aside class="suite-rail">
        <div class="suite-brand"><span class="suite-mark">${icon('suite')}</span><div><strong>Panel de publicación</strong><small>Meta Business Suite</small></div></div>
        <div class="suite-account"><span class="suite-avatar" aria-hidden="true">ET</span><div><strong>${account}</strong><small>Cuenta de práctica</small></div></div>
        <nav class="suite-nav" aria-label="Secciones del simulador">
          ${steps.map(key => `<a class="suite-nav-item" href="${href(key)}"${step===key?' aria-current="page"':''}>${icon(key)}<span>${presets[key].label}</span></a>`).join('')}
        </nav>
        <p class="suite-rail-note">Práctica en el navegador</p>
      </aside>
      <div class="suite-workspace">
        <div class="suite-top"><span>Publicaciones</span><span class="suite-badge">Simulación</span></div>
        <div class="suite-main">
          <div class="suite-heading"><span class="suite-step">Paso ${steps.indexOf(step)+1} de ${steps.length}</span><h2>${item.heading}</h2><p>${item.intro}</p></div>
          ${content}
        </div>
      </div>
    </section>`;
    return demo.querySelector('.suite-app');
  }

  function workbench(editor) {
    return `<div class="suite-workbench">
      <div class="suite-editor">${editor}</div>
      <aside class="suite-preview" aria-label="Vista previa de la publicación">
        <div class="suite-preview-head"><strong>Vista previa</strong><div class="suite-preview-switch" role="group" aria-label="Red para la vista previa"></div></div>
        <div class="suite-preview-post">
          <div class="suite-preview-account"><span class="suite-avatar" aria-hidden="true">ET</span><div><strong>${account}</strong><small></small></div></div>
          <p class="suite-preview-copy"></p>
          <figure class="suite-preview-media"><img alt=""><figcaption class="suite-preview-caption"></figcaption></figure>
        </div>
      </aside>
    </div>`;
  }

  function syncPreview(app, entry=draft) {
    const preview = app.querySelector('.suite-preview');
    if (!preview) return;
    const channel = entry.channels.includes(entry.channelPreview) ? entry.channelPreview : entry.channels[0];
    const buttons = preview.querySelector('.suite-preview-switch');
    preview.querySelector('.suite-preview-post').dataset.channel = channel || '';
    buttons.replaceChildren();
    for (const key of entry.channels) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'suite-preview-option';
      button.textContent = channels[key];
      button.setAttribute('aria-pressed', String(channel===key));
      button.addEventListener('click', () => {
        entry.channelPreview = key;
        syncPreview(app,entry);
        buttons.querySelector('[aria-pressed=true]').focus({preventScroll:true});
      });
      buttons.append(button);
    }
    preview.querySelector('.suite-preview-account small').textContent = channel ? channels[channel] + ' · Vista previa' : 'Elegí un destino';
    preview.querySelector('.suite-preview-copy').textContent = entry.copy.trim() || 'El texto de la publicación aparece aquí.';
    const image = preview.querySelector('.suite-preview-media img');
    if (image.getAttribute('src') !== entry.photo.src) image.src = entry.photo.src;
    image.alt = entry.photo.alt;
    const caption = preview.querySelector('.suite-preview-caption');
    if (entry.photo.local) {
      caption.textContent = 'Foto del dispositivo';
    } else {
      caption.innerHTML = 'Foto de Tisey · <a href="assets/esteli/CREDITOS.md" target="_blank" rel="noopener">CC BY-SA 4.0</a>';
    }
  }

  function go(app, key, validate) {
    app.querySelector(`.suite-actions a[href="${href(key)}"]`).addEventListener('click', event => {
      const message = validate();
      if (!message) return;
      event.preventDefault();
      app.querySelector('.suite-status').textContent = message;
    });
  }

  function validateDraft() {
    if (!draft.channels.length) return 'Elegí Facebook o Instagram como destino en Crear publicación.';
    if (!draft.copy.trim()) return 'Agregá el texto de la publicación en Contenido.';
    return '';
  }

  function create(demo) {
    const app = shell(demo, 'crear', workbench(`
      <label class="suite-field"><span>Página</span><select aria-label="Página de Facebook"><option>${account}</option></select></label>
      <fieldset class="suite-fieldset"><legend>Publicar en</legend>
        <div class="suite-channels">${Object.entries(channels).map(([key,label]) => `<label class="suite-channel">
          <input name="channel" type="checkbox" value="${key}"${draft.channels.includes(key)?' checked':''}>
          <span><strong>${label}</strong><small>${key==='facebook'?account:'@estelitours · perfil de ejemplo'}</small></span>
        </label>`).join('')}</div>
      </fieldset>
      ${status()}
      <div class="suite-actions">${navLink('preparar','Continuar',true)}</div>`));
    const checks = [...app.querySelectorAll('input[name=channel]')];
    checks.forEach(check => check.addEventListener('change', () => {
      draft.channels = checks.filter(input=>input.checked).map(input=>input.value);
      app.querySelector('.suite-status').textContent = '';
      syncPreview(app);
    }));
    go(app,'preparar',()=>draft.channels.length?'':'Elegí al menos un destino para continuar.');
    syncPreview(app);
  }

  function prepare(demo) {
    const app = shell(demo, 'preparar', workbench(`
      <label class="suite-field"><span>Texto de la publicación</span><textarea id="suite-copy" rows="4" maxlength="1000" placeholder="Escribí el texto de Estelí Tours"></textarea></label>
      <fieldset class="suite-fieldset"><legend>Foto de la publicación</legend><div class="suite-media-library">
        ${Object.entries(photos).map(([key,photo])=>`<button type="button" class="suite-media-option" data-suite-photo="${key}"
          aria-pressed="${draft.photoKey===key}"><img src="${photo.src}" alt="" loading="lazy"><span>${photo.label}</span></button>`).join('')}
      </div></fieldset>
      <label class="suite-field suite-file"><span>O agregá una foto del dispositivo</span><input type="file" id="suite-file" accept="image/jpeg,image/png,image/webp"></label>
      ${status()}
      <div class="suite-actions">${navLink('crear','Volver')}${navLink('programar','Continuar',true)}</div>`));
    const copy = app.querySelector('#suite-copy');
    const file = app.querySelector('#suite-file');
    const message = app.querySelector('.suite-status');
    const photoButtons = [...app.querySelectorAll('[data-suite-photo]')];
    let loadId = 0;
    copy.value = draft.copy;
    copy.addEventListener('input',()=>{draft.copy=copy.value;message.textContent='';syncPreview(app);});
    const choosePhoto = (photo,key) => {
      draft.photo = photo;
      draft.photoKey = key;
      photoButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.suitePhoto===key)));
      message.textContent = '';
      syncPreview(app);
    };
    photoButtons.forEach(button=>button.addEventListener('click',()=>{
      loadId += 1;
      file.value = '';
      const key = button.dataset.suitePhoto;
      choosePhoto(photos[key],key);
    }));
    file.addEventListener('change',()=>{
      const choice = file.files[0];
      if (!choice) return;
      const id = ++loadId;
      if (!['image/jpeg','image/png','image/webp'].includes(choice.type) || choice.size>12 * 1024 * 1024) {
        message.textContent = 'Elegí una imagen JPG, PNG o WebP de hasta 12 MB.';
        file.value = '';
        return;
      }
      const reader = new FileReader();
      const failure = ()=> {
        if (id!==loadId || !app.isConnected) return;
        message.textContent = 'No se pudo abrir esa imagen. Probá con otra foto.';
        file.value = '';
      };
      reader.addEventListener('error',failure);
      reader.addEventListener('load',()=>{
        const sample = new Image();
        sample.addEventListener('error',failure);
        sample.addEventListener('load',()=>{
          if (id!==loadId || !app.isConnected) return;
          choosePhoto({src:reader.result,alt:'Foto seleccionada para esta práctica',local:true},null);
        });
        sample.src = reader.result;
      });
      reader.readAsDataURL(choice);
    });
    go(app,'programar',validateDraft);
    syncPreview(app);
  }

  function schedule(demo) {
    const app = shell(demo, 'programar', workbench(`
      <form class="suite-schedule-form" novalidate>
        <div class="suite-datetime">
          <label class="suite-field"><span>Fecha</span><input type="date" id="suite-date" required></label>
          <label class="suite-field"><span>Hora</span><input type="time" id="suite-time" required></label>
        </div>
        <p class="suite-zone">Hora de Managua (UTC−6)</p>
        <p class="suite-schedule-destinations"></p>
        ${status()}
        <div class="suite-actions">${navLink('preparar','Volver')}<button type="submit" class="suite-button suite-primary">Programar</button></div>
      </form>`));
    const date = app.querySelector('#suite-date');
    const time = app.querySelector('#suite-time');
    const message = app.querySelector('.suite-status');
    date.min = dateField(new Date());
    date.value = draft.date;
    time.value = draft.time;
    app.querySelector('.suite-schedule-destinations').textContent = draft.channels.length
      ? 'Destinos · ' + selectedChannels(draft.channels)
      : 'Todavía no elegiste un destino.';
    for (const field of [date,time]) {
      field.addEventListener('input', () => {
        draft.date = date.value;
        draft.time = time.value;
        message.textContent = '';
        field.removeAttribute('aria-invalid');
      });
    }
    app.querySelector('form').addEventListener('submit',event=>{
      event.preventDefault();
      const missing = validateDraft();
      if (missing) {
        message.textContent = missing;
        return;
      }
      const target = new Date(`${date.value}T${time.value}:00-06:00`);
      if (!date.value || !time.value || !Number.isFinite(+target) || +target<=Date.now()) {
        message.textContent = 'Elegí una fecha y una hora futuras en Managua.';
        const invalid = date.value && !time.value ? time : date;
        invalid.setAttribute('aria-invalid','true');
        invalid.focus();
        return;
      }
      draft.date = date.value;
      draft.time = time.value;
      scheduled = {...draft,channels:[...draft.channels],target};
      plannerNotice = 'Publicación programada en el simulador.';
      location.hash = href('revisar');
    });
    syncPreview(app);
  }

  function review(demo) {
    const timeline = scheduled ? `<article class="suite-schedule-row">
        <img class="suite-schedule-thumb" alt="">
        <div class="suite-schedule-entry"><strong>Publicación de ${account}</strong><p class="suite-schedule-copy"></p><small class="suite-schedule-channels"></small></div>
        <div class="suite-schedule-meta"><span class="suite-pill">Programada</span><time></time><small>Hora de Managua · práctica</small></div>
      </article>
      <div class="suite-actions">${navLink('preparar','Editar borrador')}<button type="button" class="suite-button" data-suite-remove>Quitar programación</button></div>`
      : `<div class="suite-empty">${icon('revisar')}<strong>Aún no hay publicaciones programadas</strong>
        <p>Programá la publicación de Estelí Tours para ver aquí su estado y fecha.</p>
        ${navLink('programar','Ir a programación',true)}</div>`;
    const app = shell(demo, 'revisar', `<div class="suite-planner">${status()}
      <section class="suite-week" aria-label="Vista semanal del planificador"></section>${timeline}</div>`);
    app.querySelector('.suite-status').textContent = plannerNotice;
    plannerNotice = '';
    calendar(app);
    if (!scheduled) return;
    const image = app.querySelector('.suite-schedule-thumb');
    image.src = scheduled.photo.src;
    image.alt = scheduled.photo.alt;
    app.querySelector('.suite-schedule-copy').textContent = scheduled.copy;
    app.querySelector('.suite-schedule-channels').textContent = selectedChannels(scheduled.channels);
    const time = app.querySelector('.suite-schedule-row time');
    time.dateTime = scheduled.target.toISOString();
    time.textContent = dateLabel.format(scheduled.target);
    app.querySelector('[data-suite-remove]').addEventListener('click', () => {
      scheduled = null;
      plannerNotice = 'La publicación de práctica se retiró del planificador.';
      review(demo);
      demo.querySelector('.suite-empty a').focus();
    });
  }

  function calendar(app) {
    const calendar = app.querySelector('.suite-week');
    const activeDay = scheduled?.date || dateField(new Date());
    const anchor = new Date(activeDay + 'T12:00:00-06:00');
    const monday = new Date(+anchor - ((anchor.getUTCDay()+6)%7)*dayMs);
    let offset = 0;
    calendar.innerHTML = `<div class="suite-week-head">
      <button class="suite-week-button" type="button" data-suite-week="-1" aria-label="Semana anterior">←</button>
      <strong class="suite-week-title" aria-live="polite"></strong>
      <button class="suite-week-button" type="button" data-suite-week="1" aria-label="Semana siguiente">→</button>
    </div><div class="suite-week-days"></div>`;
    const week = calendar.querySelector('.suite-week-days');
    function drawWeek() {
      const start = new Date(+monday + offset*7*dayMs);
      calendar.querySelector('.suite-week-title').textContent = 'Semana del ' + weekLabel.format(start);
      week.innerHTML = weekdays.map((weekday, index) => {
        const date = new Date(+start + index*dayMs);
        const key = dateField(date);
        const day = Number(key.slice(-2));
        const hasPost = scheduled?.date === key;
        return `<div class="suite-week-day${hasPost?' suite-week-day-post':''}">
          <span aria-hidden="true">${weekday}</span><time datetime="${key}" aria-label="${dayLabel.format(date)}">${day}</time>
          ${hasPost?`<button type="button" class="suite-week-post" aria-label="Ver la publicación programada del ${dayLabel.format(date)}"><span aria-hidden="true"></span><small>${scheduled.time}</small></button>`:''}
        </div>`;
      }).join('');
      week.querySelector('.suite-week-post')?.addEventListener('click',()=>{
        const row = app.querySelector('.suite-schedule-row');
        row.tabIndex = -1;
        row.focus();
      });
    }
    calendar.querySelectorAll('[data-suite-week]').forEach(button=>button.addEventListener('click',()=>{
      offset += Number(button.dataset.suiteWeek);
      drawWeek();
    }));
    drawWeek();
  }
  const views = {crear:create,preparar:prepare,programar:schedule,revisar:review};
  const cases = Object.fromEntries(steps.map(key=>[key,{
    title:presets[key].title,intro:presets[key].intro,tip:presets[key].tip,render:views[key]
  }]));
  return {cases};
})();
