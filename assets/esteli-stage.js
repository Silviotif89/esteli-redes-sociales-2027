/* Compositions specific to each workshop slide. The teaching material lives in index.html. */
const EsteliStage = (() => {
  const treatments = [
    'cover','manifest','participate','businesses','itinerary','chapter','statistic','postcards','dispatch','journey',
    'airwaves','trust','profile','chapter','contrast','senses','quadrants','wheel','aida','pas',
    'headlines','studio','script','hooks','chapter','sequence','viewfinder','shootlist','ratios','reel',
    'remix','toolkit','search','signals','week','workflow','shots','chapter','reception','chat',
    'service','chapter','choice','control-room','objectives','structure','radar','automation','ads','split-ad',
    'chapter','scorecard','analytics','publication','checklist','action','library','finale'
  ];
  const colors = [
    'ink','shell','lilac','yellow','paper','iris','yellow','shell','sky','paper','mint','shell',
    'sky','berry','paper','peach','lilac','yellow','lilac','peach','iris','shell','lavender','paper',
    'night','shell','ink','mint','lilac','ink','peach','shell','sky','yellow','shell','mint',
    'shell','lagoon','mint','shell','lilac','berry','paper','sky','yellow','shell','lilac','mint',
    'shell','peach','iris','sky','shell','peach','yellow','lilac','paper','ink'
  ];
  const authors = {
    'esteli-ciudad':['Estelí desde El Tisey','Esteli_Nicaragua_Skyline_from_Tisey.jpg','Tisey'],
    'esteli-parque':['Parque Central de Estelí','Panorámica,_Parque_Central_de_Estelí.jpg','Pasionyanhelo'],
    miraflor:['Miraflor, Estelí','Miraflor_Esteli_Nicaragua.jpg','Tisey'],
    bosque:['Bosque de Estelí','Neblina_del_Bosque_Esteli_Nicaragua.jpg','Tisey'],
    cascada:['Cascada de Miraflor','Waterfall,_Miraflor_Esteli_Nicaragua.jpg','Tisey'],
    matapalo:['Matapalo de Miraflor','Matapalo_Tree_Miraflor,_Esteli.jpg','Tisey']
  };
  const photo = (id, style='') => {
    const [title, filename, author] = authors[id];
    return `<figure class="stage-photo ${style}"><img src="assets/esteli/${id}.webp" alt="${title}"><figcaption>${title} · <a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename)}" target="_blank" rel="noopener">${author}</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a></figcaption></figure>`;
  };
  const drawings = {
    eye:'<path d="M8 32c9-15 17-19 24-19s15 4 24 19c-9 15-17 19-24 19S17 47 8 32Z"/><circle cx="32" cy="32" r="9"/>',
    spark:'<path d="M32 4c0 17 10 28 27 28-17 0-27 11-27 28 0-17-10-28-27-28C22 32 32 21 32 4Z"/>',
    pin:'<path d="M49 25c0 13-17 29-17 29S15 38 15 25a17 17 0 1 1 34 0Z"/><circle cx="32" cy="25" r="6"/>',
    camera:'<rect x="8" y="17" width="48" height="34" rx="8"/><path d="m21 17 4-7h14l4 7"/><circle cx="32" cy="34" r="10"/>',
    chat:'<path d="M53 29c0 12-10 21-22 21a25 25 0 0 1-9-2L9 53l4-12a20 20 0 0 1-4-12C9 17 19 8 31 8s22 9 22 21Z"/><path d="M21 29h20"/>',
    target:'<circle cx="31" cy="33" r="23"/><circle cx="31" cy="33" r="14"/><circle cx="31" cy="33" r="5"/><path d="m32 31 22-22m0 0-1 8m1-8-8 1"/>',
    chart:'<path d="M9 8v46h47M17 43l13-15 9 6 17-19"/><path d="M44 15h12v12"/>',
    bolt:'<path d="M36 6 12 35h18l-2 23 24-30H34l2-22Z"/>',
    layers:'<path d="m32 8 25 14-25 14L7 22 32 8Zm-25 24 25 14 25-14M7 42l25 14 25-14"/>',
    arrow:'<path d="M13 49 51 11M18 11h33v33"/>',
    frame:'<path d="M8 22V8h14m20 0h14v14m0 20v14H42m-20 0H8V42"/><circle cx="32" cy="32" r="8"/>',
    heart:'<path d="M12 15a12 12 0 0 1 19 1l1 2 1-2a12 12 0 0 1 19-1c6 6 4 14-2 20L32 53 14 35c-6-6-8-14-2-20Z"/>',
    calendar:'<rect x="8" y="13" width="48" height="42" rx="6"/><path d="M8 25h48M19 8v10m26-10v10M20 35h4m8 0h4m8 0h4M20 44h4m8 0h4"/>',
    play:'<path d="m24 16 25 16-25 16V16Z"/><circle cx="32" cy="32" r="26"/>',
    audio:'<path d="M8 27v10m9-16v22m10-31v40m10-30v20m10-25v30m9-21v12"/>',
    check:'<path d="m13 33 12 12 26-28"/>'
  };
  const icon = name => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${drawings[name]}</svg>`;
  const chapterArt = ['eye','spark','camera','chat','target','chart'];
  const itemIcons = {
    'manifest':['frame','spark','calendar'],
    'itinerary':chapterArt,
    'airwaves':['chat','camera','play','arrow'],
    'trust':['frame','pin','heart'],
    'senses':['eye','audio','heart'],
    'sequence':['camera','spark','frame'],
    'shootlist':['frame','heart','pin','layers'],
    'remix':['play','layers','camera'],
    'toolkit':['frame','play','camera','spark'],
    'signals':['heart','eye','spark'],
    'reception':['frame','layers','bolt','check'],
    'control-room':['bolt','layers','target'],
    'objectives':['eye','arrow','chat','target','frame','heart'],
    'radar':['pin','frame','arrow'],
    'automation':['target','pin','spark'],
    'scorecard':['eye','heart','chat','check']
  };
  const largeArt = {
    'businesses':'pin','script':'layers','checklist':'check'
  };
  function dress(el, slide, index) {
    const treatment = treatments[index];
    el.dataset.art = treatment;
    el.dataset.palette = colors[index];
    el.classList.add('art-' + treatment);
    const content = el.querySelector('.content');

    if (treatment === 'cover' || treatment === 'finale' || treatment === 'chapter') {
      buildScene(el,slide,treatment);
    } else {
      const h1 = el.querySelector('h1');
      const subtitle = el.querySelector('.subtitle');
      const heading = document.createElement('div');
      heading.className = 'stage-heading';
      h1.before(heading);
      heading.append(h1,subtitle);
    }
    if (itemIcons[treatment]) {
      content.querySelectorAll('.tile').forEach((tile,i)=>{
        tile.insertAdjacentHTML('afterbegin',`<span class="stage-item-icon">${icon(itemIcons[treatment][i % itemIcons[treatment].length])}</span>`);
      });
    }
    if (largeArt[treatment]) {
      el.insertAdjacentHTML('afterbegin',`<div class="stage-mark" aria-hidden="true">${icon(largeArt[treatment])}</div>`);
    }
    if (treatment==='postcards') {
      content.querySelector('.editorial-photo')?.remove();
      content.insertAdjacentHTML('afterbegin',`<div class="places-strip">${photo('esteli-parque')}${photo('cascada')}${photo('esteli-ciudad')}</div>`);
    }
    if (treatment==='dispatch') content.querySelectorAll('.tile').forEach((tile,i)=>tile.style.setProperty('--feature-order',i));
    if (treatment==='contrast' || treatment==='search' || treatment==='choice' || treatment==='split-ad') {
      content.querySelectorAll('.tile').forEach((tile,i)=>{
        const mark = i===0?'layers':treatment==='search'?'pin':'arrow';
        tile.insertAdjacentHTML('afterbegin',`<span class="stage-item-icon">${icon(mark)}</span>`);
      });
    }
    if (treatment==='viewfinder') content.querySelector('.photoBox').insertAdjacentHTML('beforeend',`<div class="focus-corners" aria-hidden="true">${icon('frame')}</div>`);
    if (treatment==='wheel') buildWheel(content);
    if (treatment==='participate') {
      const qr=content.querySelector('.questionQrCard');
      qr.insertAdjacentHTML('beforebegin',`<div class="scan-arrow" aria-hidden="true">${icon('arrow')}</div>`);
    }
    if (treatment==='reel') content.querySelector('.reel-preview')?.classList.add('view-social');
  }
  function buildScene(el,slide,treatment) {
    el.querySelector(':scope > .editorial-photo')?.remove();
    el.classList.remove('with-photo');
    const index = Number(slide.extra) - 1;
    const isCover = treatment==='cover';
    const isFinal = treatment==='finale';
    const mark = isCover ? 'arrow' : isFinal ? 'pin' : chapterArt[index];
    const visual = isCover ? `<div class="hero-frames">${photo('esteli-ciudad','hero-main')}${photo('cascada','hero-inset')}</div>`
      : isFinal ? `<div class="hero-frames">${photo('esteli-parque','hero-main')}${photo('matapalo','hero-inset')}</div>`
      : index < 3 ? photo(['bosque','matapalo','cascada'][index], 'chapter-photo') : '';
    el.insertAdjacentHTML('afterbegin', `<div class="scene-art">
      <svg class="scene-orbits" viewBox="0 0 600 600" fill="none" aria-hidden="true">
        <path d="M-50 500c220 94 605-240 748-93M-40 429c210 97 367-174 651-120M3 369C244 435 336 115 682 228M-19 306C196 341 331 49 643 151" stroke="currentColor" stroke-width="2"/>
      </svg>
      ${visual}<div class="scene-glyph">${icon(mark)}</div></div>`);
    if (!isCover && !isFinal) el.querySelector('.sectionnum').setAttribute('aria-label','Estación ' + (index+1) + ' de 6');
  }
  function buildWheel(content) {
    const sectors = ['EDUCAR','INSPIRAR','ENTRETENER','VENDER','CONFIANZA'];
    const inks = ['#7cdcec','#ff8378','#ad9bff','#f9c95f','#b4edc8'];
    const sectorsArt = inks.map((ink,i)=>`<path d="M100 100v-92a92 92 0 0 1 87.5 63.57Z" fill="${ink}" transform="rotate(${i*72},100,100)"/>`).join('');
    content.insertAdjacentHTML('beforeend',`<div class="idea-wheel" aria-hidden="true"><svg viewBox="0 0 200 200"><g class="wheel-rotor">${sectorsArt}<circle cx="100" cy="100" r="22" fill="#24173a"/><path d="M100 86q0 14 14 14-14 0-14 14 0-14-14-14 14 0 14-14" fill="#fff6ea"/></g><path fill="#24173a" d="M86 1h28l-14 22Z"/></svg></div>`);
    let spin = 0;
    content.querySelector('#spin').addEventListener('click',()=>queueMicrotask(()=>{
      spin += 360;
      const sector = sectors.indexOf(content.querySelector('#idea').textContent);
      content.querySelector('.wheel-rotor').style.transform = `rotate(${spin - Math.max(0,sector)*72 - 36}deg)`;
    }));
  }
  return {dress};
})();
