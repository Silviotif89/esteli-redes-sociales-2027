/* Portrait social practice with locally hosted photographs. */
const EsteliVideoSim = (() => {
  const photos = {
    forest: ['bosque.webp','Neblina en los bosques de Miraflor','50% 47%'],
    falls: ['cascada.webp','Cascada de Miraflor','50% 47%'],
    entry: ['miraflor.webp','Entrada a la reserva de Miraflor','56% 47%'],
    tree: ['matapalo.webp','Matapalo en Miraflor','50% 52%']
  };
  const paths = {
    play: '<path d="m9 5 11 7-11 7z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M9 5v14m6-14v14" stroke-width="3"/>',
    replay: '<path d="M5 9a7.5 7.5 0 1 1 1 7m-1-12v5h5"/>',
    heart: '<path d="M12 20 4.5 12.8C.4 8.6 6.1 2.5 10.3 6.5L12 8l1.7-1.5c4.2-4 9.9 2.1 5.8 6.3z"/>',
    save: '<path d="M6 4h12v16l-6-4-6 4z"/>',
    share: '<path d="M5 18v-4c0-3 2-5 6-5h2V5l7 6-7 5v-4h-2c-3 0-5 2-6 6"/>',
    next: '<path d="m9 5 7 7-7 7"/>',
    prev: '<path d="m15 5-7 7 7 7"/>',
    camera: '<rect x="3" y="5" width="18" height="14" rx="4"/><circle cx="12" cy="12" r="3"/><path d="M17 8h.01"/>',
    note: '<path d="M10 16V5l9 2v7m-9 2a3 2.5 0 1 1-6 0 3 2.5 0 0 1 6 0zm9-2a3 2.5 0 1 1-6 0 3 2.5 0 0 1 6 0z"/>',
    message: '<path d="m4 5 16 2-8 13-2-8zM20 7l-10 5"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${paths[name]}</svg>`;
  const photo = key => {
    const [file,alt,position] = photos[key];
    return `<img loading="eager" src="assets/esteli/${file}" alt="${alt}" style="object-position:${position}">`;
  };
  const credit = '<a class="ev-credit" href="assets/esteli/CREDITOS.md" target="_blank" rel="noopener">Foto de Tisey · CC BY-SA 4.0</a>';
  const author = '<span class="ev-avatar" aria-hidden="true">ET</span><span>Estelí Tours</span>';
  const reelShots = [
    {image:'forest',length:4,label:'La llegada',caption:'Así amanece en Miraflor'},
    {image:'tree',length:5,label:'El sendero',caption:'Entre raíces y bosque'},
    {image:'falls',length:6,label:'La cascada',caption:'Guardá esta escapada'}
  ];
  const tikShots = [
    {image:'falls',length:3,label:'Gancho',caption:'¿Primera vez en Miraflor?'},
    {image:'tree',length:7,label:'Consejo útil',caption:'Llevá agua y zapatos con agarre'},
    {image:'entry',length:5,label:'Cierre',caption:'Guardá estos consejos'}
  ];

  function instagram(demo) {
    demo.innerHTML = `<div class="ev-app ev-instagram">
      <div class="ev-top"><span>${icon('camera')} Instagram</span><span>Estelí Tours</span></div>
      <div class="ev-tabs" role="group" aria-label="Formatos de Instagram">
        <button type="button" aria-pressed="true">Reel</button>
        <button type="button" aria-pressed="false">Historia</button>
        <button type="button" aria-pressed="false">Carrusel</button>
      </div>
      <div class="ev-body"></div>
    </div>`;
    const app = demo.querySelector('.ev-app');
    const panel = demo.querySelector('.ev-body');
    const tabs = [...demo.querySelectorAll('.ev-tabs button')];
    const views = [root=>video(root,reelShots,'instagram'),story,carousel];
    let current = -1;
    let dispose;
    function select(index) {
      if (current === index) return;
      dispose?.();
      current = index;
      app.dataset.view = String(index);
      tabs.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
      dispose = views[index](panel);
    }
    tabs.forEach((button,index)=>button.addEventListener('click',()=>select(index)));
    select(0);
  }

  function tiktok(demo) {
    demo.innerHTML = `<div class="ev-app ev-tiktok">
      <div class="ev-top"><span>${icon('note')} TikTok</span><span>En exploración</span></div>
      <div class="ev-body"></div>
    </div>`;
    video(demo.querySelector('.ev-body'),tikShots,'tiktok');
  }

  function video(root,shots,network) {
    const isTikTok = network === 'tiktok';
    const total = shots.reduce((sum,shot)=>sum+shot.length,0);
    const starts = shots.map((_,i)=>shots.slice(0,i).reduce((sum,shot)=>sum+shot.length,0));
    const shownTimes = starts.map((start,i)=>`${start}–${start+shots[i].length} s`);
    root.innerHTML = `<div class="ev-player">
      <div class="ev-stage">
        <div class="ev-video" data-ratio="9:16">
          <div class="ev-media"></div>
          <div class="ev-overlay-top"><span class="ev-byline">${author}</span></div>
          <div class="ev-actions">
            <button type="button" data-react="heart" aria-label="Me gusta" aria-pressed="false">${icon('heart')}</button>
            <button type="button" data-react="save" aria-label="Guardar" aria-pressed="false">${icon('save')}</button>
            <button type="button" data-react="share" aria-label="Ver opciones para compartir" aria-expanded="false">${icon('share')}</button>
          </div>
          <button type="button" class="ev-play" aria-label="Reproducir" title="Reproducir">${icon('play')}</button>
          <div class="ev-overlay-bottom">
            <div class="ev-caption"></div>
            <div class="ev-progress" role="progressbar" aria-label="Progreso de reproducción" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="0"><span></span></div>
            <span class="ev-time"></span>
          </div>
          <div class="ev-share" hidden><strong>Compartir ${isTikTok?'video':'Reel'}</strong><span>Vista de práctica</span></div>
        </div>
      </div>
      <div class="ev-scenes" role="group" aria-label="Tomas del ${isTikTok?'video':'Reel'}">
        ${shownTimes.map(range=>`<button type="button" aria-pressed="false">${range}</button>`).join('')}
      </div>
      <div class="ev-credits-row">${credit}<span>9:16</span></div>
    </div>`;
    const player = root.querySelector('.ev-player');
    const play = root.querySelector('.ev-play');
    const progress = root.querySelector('.ev-progress');
    const progressFill = progress.firstElementChild;
    const time = root.querySelector('.ev-time');
    const caption = root.querySelector('.ev-caption');
    const media = root.querySelector('.ev-media');
    const scenes = [...root.querySelectorAll('.ev-scenes button')];
    let playing = false;
    let elapsed = 0;
    let current = -1;
    let frame = 0;
    let started = 0;
    function paint() {
      const index = starts.findLastIndex(start=>elapsed>=start);
      if (current!==index) {
        current=index;
        const shot=shots[index];
        media.innerHTML=photo(shot.image);
        caption.innerHTML=`<span>${shot.label}</span><strong>${shot.caption}</strong>`;
        scenes.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
      }
      const floor=Math.min(total,Math.floor(elapsed));
      progressFill.style.width=`${elapsed/total*100}%`;
      if (Number(progress.getAttribute('aria-valuenow'))!==floor || !time.textContent) {
        progress.setAttribute('aria-valuenow',String(floor));
        time.textContent=`0:${String(floor).padStart(2,'0')} / 0:${total}`;
      }
    }
    function updatePlay() {
      const name=playing?'Pausar':elapsed>=total?'Repetir':'Reproducir';
      play.innerHTML=icon(playing?'pause':elapsed>=total?'replay':'play');
      play.setAttribute('aria-label',name);
      play.title=name;
      player.classList.toggle('ev-playing',playing);
    }
    function tick(now) {
      if (!player.isConnected || !playing) return;
      elapsed=Math.max(0,Math.min(total,(now-started)/1000));
      paint();
      if (elapsed>=total) {
        playing=false;
        updatePlay();
      } else frame=requestAnimationFrame(tick);
    }
    play.addEventListener('click',()=>{
      if (playing) {
        playing=false;
        cancelAnimationFrame(frame);
      } else {
        if (elapsed>=total) elapsed=0;
        playing=true;
        started=performance.now()-elapsed*1000;
        frame=requestAnimationFrame(tick);
      }
      paint();
      updatePlay();
    });
    scenes.forEach((button,index)=>button.addEventListener('click',()=>{
      elapsed=starts[index];
      if (playing) started=performance.now()-elapsed*1000;
      paint();
      updatePlay();
    }));
    reactions(root);
    paint();
    return ()=>{playing=false;cancelAnimationFrame(frame);};
  }

  function story(root) {
    const steps = [
      {image:'forest',headline:'Una escapada a Miraflor',copy:'¿Qué preferís para tu próxima salida?',poll:true},
      {image:'falls',headline:'Prepará tu próxima salida',copy:'Escribinos por mensaje directo para consultar por la ruta.',poll:false}
    ];
    root.innerHTML = `<div class="ev-story">
      <div class="ev-stage"><div class="ev-video" data-ratio="9:16">
        <div class="ev-media"></div>
        <div class="ev-story-top">
          <div class="ev-story-bars" role="group" aria-label="Páginas de la historia">
            ${steps.map((_,i)=>`<button type="button" aria-label="Historia ${i+1} de ${steps.length}" aria-pressed="false"></button>`).join('')}
          </div>
          <div class="ev-byline">${author}</div>
        </div>
        <div class="ev-story-copy"></div>
      </div></div>
      <div class="ev-story-nav">
        <button type="button" data-story-dir="-1" aria-label="Historia anterior">${icon('prev')}</button><span></span>
        <button type="button" data-story-dir="1" aria-label="Historia siguiente">${icon('next')}</button>
      </div>
      <div class="ev-credits-row">${credit}<span>9:16</span></div>
    </div>`;
    const content=root.querySelector('.ev-story-copy');
    const pages=[...root.querySelectorAll('.ev-story-bars button')];
    const nav=[...root.querySelectorAll('[data-story-dir]')];
    let state=0;
    let vote='';
    function draw(next) {
      state=Math.min(steps.length-1,Math.max(0,next));
      const step=steps[state];
      root.querySelector('.ev-media').innerHTML=photo(step.image);
      root.querySelector('.ev-story-nav span').textContent=`Historia ${state+1} de ${steps.length}`;
      pages.forEach((button,index)=>button.setAttribute('aria-pressed',String(index===state)));
      nav[0].disabled=state===0;
      nav[1].disabled=state===steps.length-1;
      content.innerHTML=`<strong>${step.headline}</strong><p>${step.copy}</p>
        ${step.poll?`<div class="ev-poll" role="group" aria-label="Encuesta de la historia">
          ${['Bosque','Cascada'].map(option=>`<button type="button" aria-pressed="${String(vote===option)}">${option}</button>`).join('')}
        </div><div role="status" class="ev-story-feedback">${vote?'Elegiste '+vote.toLowerCase()+'.':''}</div>`:
        `<button type="button" class="ev-story-reply">${icon('message')} Consultar la ruta</button><div role="status" class="ev-story-feedback"></div>`}`;
      content.querySelectorAll('.ev-poll button').forEach(button=>button.addEventListener('click',()=>{
        vote=button.textContent;
        content.querySelectorAll('.ev-poll button').forEach(option=>option.setAttribute('aria-pressed',String(button===option)));
        content.querySelector('.ev-story-feedback').textContent='Elegiste '+vote.toLowerCase()+'.';
      }));
      content.querySelector('.ev-story-reply')?.addEventListener('click',()=>{
        content.querySelector('.ev-story-feedback').textContent='Mensaje de práctica: Quiero consultar por la ruta.';
      });
    }
    pages.forEach((button,index)=>button.addEventListener('click',()=>draw(index)));
    nav.forEach(button=>button.addEventListener('click',()=>draw(state+Number(button.dataset.storyDir))));
    swipe(root.querySelector('.ev-video'),offset=>draw(state+offset));
    draw(0);
  }

  function carousel(root) {
    const cards = [
      ['forest','Guía para visitar Miraflor','Tres consejos para tu salida.'],
      ['tree','Qué incluye','Caminata guiada y paradas para fotos.'],
      ['falls','Qué llevar','Agua y calzado con agarre. Consultá fechas y cupos.']
    ];
    root.innerHTML = `<div class="ev-carousel">
      <div class="ev-feed-head"><span class="ev-byline">${author}</span><span class="ev-card-number"></span></div>
      <div class="ev-stage"><div class="ev-card" data-ratio="4:5">
        <div class="ev-media"></div>
        <div class="ev-carousel-copy"></div>
        <div class="ev-car-controls"><button type="button" data-car-dir="-1" aria-label="Lámina anterior">${icon('prev')}</button>
          <button type="button" data-car-dir="1" aria-label="Lámina siguiente">${icon('next')}</button></div>
      </div></div>
      <div class="ev-dots" role="group" aria-label="Láminas del carrusel">
        ${cards.map((_,i)=>`<button type="button" aria-label="Lámina ${i+1}" aria-pressed="false"></button>`).join('')}
      </div>
      <div class="ev-feed-actions">
        <button type="button" data-react="heart" aria-label="Me gusta" aria-pressed="false">${icon('heart')}</button>
        <button type="button" data-react="save" aria-label="Guardar" aria-pressed="false">${icon('save')}</button>
        <span>4:5</span>
      </div>
      <div class="ev-credits-row">${credit}</div>
    </div>`;
    const dots=[...root.querySelectorAll('.ev-dots button')];
    const arrows=[...root.querySelectorAll('[data-car-dir]')];
    let index=0;
    function draw(next) {
      index=Math.min(cards.length-1,Math.max(0,next));
      const [image,headline,copy]=cards[index];
      root.querySelector('.ev-media').innerHTML=photo(image);
      root.querySelector('.ev-carousel-copy').innerHTML=`<strong>${headline}</strong><p>${copy}</p>`;
      root.querySelector('.ev-card-number').textContent=`${index+1} / ${cards.length}`;
      dots.forEach((button,i)=>button.setAttribute('aria-pressed',String(index===i)));
      arrows[0].disabled=index===0;
      arrows[1].disabled=index===cards.length-1;
    }
    dots.forEach((button,i)=>button.addEventListener('click',()=>draw(i)));
    arrows.forEach(button=>button.addEventListener('click',()=>draw(index+Number(button.dataset.carDir))));
    swipe(root.querySelector('.ev-card'),offset=>draw(index+offset));
    reactions(root);
    draw(0);
  }

  function swipe(element,advance) {
    let start=null;
    element.addEventListener('pointerdown',event=>{
      start=event.target.closest('button,a')?null:{x:event.clientX,y:event.clientY};
    });
    element.addEventListener('pointercancel',()=>{start=null;});
    element.addEventListener('pointerup',event=>{
      if (!start) return;
      const dx=event.clientX-start.x;
      const dy=event.clientY-start.y;
      start=null;
      if (Math.abs(dx)>30 && Math.abs(dx)>Math.abs(dy)) advance(dx<0?1:-1);
    });
  }

  function reactions(root) {
    root.querySelectorAll('[data-react]').forEach(button=>button.addEventListener('click',()=>{
      if (button.dataset.react==='share') {
        const open=button.getAttribute('aria-expanded')==='true';
        button.setAttribute('aria-expanded',String(!open));
        root.querySelector('.ev-share').hidden=open;
        return;
      }
      button.setAttribute('aria-pressed',String(button.getAttribute('aria-pressed')!=='true'));
    }));
  }
  return {instagram,tiktok};
})();
