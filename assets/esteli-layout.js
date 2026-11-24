/* Editorial treatments keyed to the stable order of the workshop. */
const EsteliLayout = (() => {
  const layouts = [
    'opening','outcomes','questions','business','route','chapter','number','field-notes','briefing','journey',
    'channels','trust','profile-compare','chapter','contrast','senses','matrix','idea-lab','acronym','acronym',
    'quotes','publish-lab','prompt-lab','hook-library','chapter','recipe','viewfinder','inventory','formats','storyboard',
    'remix','toolkit','search','signals','planner','journey','shot-demo','chapter','reception','conversation',
    'journey','chapter','contrast','toolkit','briefing','hierarchy','inventory','signals','ads-lab','ad-pair',
    'chapter','metrics','dashboard','publication-demo','checks','journey','reading','closing'
  ];
  const chapters = [
    ['Miraflor', 'miraflor','Estelí · Miraflor'],
    ['Entender','bosque','Bosque de Estelí'],
    ['Crear','matapalo','Matapalo de Miraflor'],
    ['Publicar','cascada','Cascada de Miraflor'],
    ['Conversar',null,''],
    ['Promocionar',null,''],
    ['Medir',null,'']
  ];
  const license = 'https://creativecommons.org/licenses/by-sa/4.0/';
  const sources = {
    miraflor:'Miraflor_Esteli_Nicaragua.jpg',
    bosque:'Neblina_del_Bosque_Esteli_Nicaragua.jpg',
    matapalo:'Matapalo_Tree_Miraflor,_Esteli.jpg',
    cascada:'Waterfall,_Miraflor_Esteli_Nicaragua.jpg'
  };
  const file = name => 'assets/esteli/' + name + '.webp';
  const photo = (name, title) => `<figure class="editorial-photo"><img src="${file(name)}" alt="${title}"><figcaption>${title} · <a href="https://commons.wikimedia.org/wiki/File:${sources[name]}" target="_blank" rel="noopener">Tisey</a> · <a href="${license}" target="_blank" rel="noopener">CC BY-SA 4.0</a></figcaption></figure>`;
  const interactiveLayouts = new Set(['journey','acronym','storyboard','planner','hierarchy']);

  function setupReel(content) {
    const frames = ['miraflor','bosque','cascada','matapalo'];
    const cards = [...content.querySelectorAll('.tile')];
    const preview = document.createElement('div');
    preview.className = 'reel-preview';
    preview.innerHTML = `<div class="reel-progress" aria-hidden="true">${frames.map(()=>'<span></span>').join('')}</div>
      <div class="reel-frame"></div><p class="reel-label" role="status"></p>
      <button class="reel-next" type="button">Siguiente toma →</button>`;
    content.prepend(preview);
    let current = 0;
    function showFrame(i) {
      current = i;
      preview.querySelector('.reel-frame').innerHTML = photo(frames[i], 'Encuadre de referencia · Estelí');
      preview.querySelector('.reel-label').textContent = cards[i].querySelector('h2').textContent;
      preview.querySelectorAll('.reel-progress span').forEach((bar,j)=>bar.classList.toggle('watched',j<=i));
    }
    preview.querySelector('.reel-next').onclick = ()=>cards[(current+1)%cards.length].querySelector('button').click();
    cards.forEach((card,i)=>card.querySelector('button').addEventListener('click',()=>showFrame(i)));
    showFrame(0);
  }

  function decorate(el, slide, index) {
    const layout = layouts[index];
    const content = el.querySelector('.content');
    el.dataset.layout = layout;
    el.dataset.slideNumber = index+1;
    el.classList.add('layout-' + layout);
    const kicker = el.querySelector('.kicker');
    if (layout === 'opening') kicker.textContent = 'Laboratorio de redes sociales · Estelí 2027';
    else if (layout === 'closing') kicker.textContent = 'Estelí · Laboratorio de redes sociales';
    else if (layout === 'chapter') kicker.textContent = chapters[+slide.extra][0];
    else kicker.hidden = true;

    if (layout === 'opening' || layout === 'closing' || layout === 'chapter') {
      const art = layout==='opening' ? chapters[0] : layout==='closing' ? ['Estelí','bosque','Bosque de Estelí'] : chapters[+slide.extra];
      if (art[1]) {
        el.classList.add('with-photo');
        el.insertAdjacentHTML('afterbegin', photo(art[1],art[2]));
      }
    }
    if (layout==='field-notes') content.insertAdjacentHTML('beforeend',photo('cascada','Cascada de Miraflor'));
    if (layout==='senses') content.insertAdjacentHTML('beforeend',photo('matapalo','Matapalo de Miraflor'));
    if (layout==='viewfinder') {
      content.querySelector('.photoBox').insertAdjacentHTML('afterbegin',photo('miraflor','Miraflor, Estelí'));
    }
    if (layout==='publish-lab') {
      const phone=content.querySelector('.phone');
      phone.setAttribute('aria-label','Vista previa de tu publicación');
      phone.querySelector('b').innerHTML='<span class="mock-avatar" aria-hidden="true">E</span> Mi negocio · Estelí';
      phone.querySelector('.fakeimg').textContent='Espacio para tu foto';
      const controls=document.createElement('div');
      controls.className='format-controls';
      controls.setAttribute('aria-label','Formato de la publicación');
      const formats=['Feed','Historia','Carrusel'];
      formats.forEach((format,i)=>{
        const button=document.createElement('button');
        button.type='button';
        button.textContent=format;
        button.setAttribute('aria-pressed',String(i===0));
        button.onclick=()=>{
          phone.dataset.format=format;
          controls.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
        };
        controls.append(button);
      });
      phone.prepend(controls);
    }
    if (layout==='conversation') {
      content.insertAdjacentHTML('afterbegin','<div class="chat-heading"><span class="mock-avatar" aria-hidden="true">V</span><div><strong>Visitante</strong><small>Conversación de práctica</small></div></div>');
      const outgoing=document.createElement('div');
      outgoing.className='outgoing';
      outgoing.hidden=true;
      content.querySelector('.bubble').after(outgoing);
      content.querySelectorAll('[data-chat]').forEach(b=>b.addEventListener('click',()=>{
        outgoing.textContent=b.textContent;
        outgoing.hidden=false;
      }));
    }
    if (layout==='ads-lab') {
      const summary=content.querySelector('.flex > .panel:last-child');
      summary.insertAdjacentHTML('beforeend','<div class="mock-ad"><div><span class="mock-avatar" aria-hidden="true">E</span><strong>Mi negocio · Estelí</strong><small>Anuncio de práctica</small></div><p id="mockCreative"></p><span id="mockAdAction"></span></div>');
      const update=()=>{
        content.querySelector('#mockCreative').textContent=content.querySelector('#adCreative').value;
        const goal=content.querySelector('#adGoal').selectedIndex;
        content.querySelector('#mockAdAction').textContent=['Enviar mensaje','Conocer el negocio','Visitar el sitio'][goal];
      };
      content.addEventListener('input',update);
      update();
    }
    if (interactiveLayouts.has(layout)) {
      const cards=[...content.querySelectorAll('.tile')];
      cards.forEach((card,i)=>{
        const tag=card.querySelector('.num');
        const button=document.createElement('button');
        button.type='button';
        button.className='step-button';
        button.textContent=tag.textContent;
        button.setAttribute('aria-label',card.querySelector('h2').textContent);
        button.setAttribute('aria-pressed',String(i===0));
        if (i===0) card.classList.add('current');
        tag.replaceWith(button);
        button.onclick=()=>cards.forEach(item=>{
          item.classList.toggle('current',item===card);
          item.querySelector('button').setAttribute('aria-pressed',String(item===card));
        });
      });
    }
    if (layout==='storyboard') setupReel(content);
    if (layout==='reading') {
      const credits=document.createElement('a');
      credits.href='assets/esteli/CREDITOS.md';
      credits.target='_blank';
      credits.rel='noopener';
      credits.textContent='Créditos de fotografía';
      content.querySelector('.small').append(' · ',credits);
    }
  }
  return {decorate};
})();
