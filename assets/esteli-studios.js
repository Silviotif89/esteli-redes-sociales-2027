/* Slide 22. Render the same composition to the preview and the exported PNG. */
const EsteliStudios = (() => {
  const formats = {
    feed: {label:'Feed', ratio:'4:5', height:1350},
    story: {label:'Historia', ratio:'9:16', height:1920},
    carousel: {label:'Carrusel', ratio:'4:5', height:1350}
  };
  const photos = {
    miraflor:{name:'Miraflor', source:'Miraflor_Esteli_Nicaragua.jpg', accent:'#f9c95f'},
    bosque:{name:'Bosque de Estelí', source:'Neblina_del_Bosque_Esteli_Nicaragua.jpg', accent:'#7cdcec'},
    cascada:{name:'Cascada de Miraflor', source:'Waterfall,_Miraflor_Esteli_Nicaragua.jpg', accent:'#ad9bff'}
  };
  const license = 'https://creativecommons.org/licenses/by-sa/4.0/';
  const paths = {
    photo:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m3 16 5-5 4 4 3-3 6 6"/><circle cx="16" cy="8" r="1"/>',
    copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v3h16v-3"/>',
    heart:'<path d="M20 6a4.6 4.6 0 0 0-6.5 0L12 7.5 10.5 6A4.6 4.6 0 0 0 4 12.5l8 8 8-8A4.6 4.6 0 0 0 20 6Z"/>',
    chat:'<path d="M4 19l1-4A8 8 0 1 1 8 18l-4 1Z"/>',
    bookmark:'<path d="M6 4h12v16l-6-4-6 4V4Z"/>',
    arrow:'<path d="M5 12h13m-5-5 5 5-5 5"/>'
  };
  const icon = key => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[key]}</svg>`;
  const photoPath = key => 'assets/esteli/' + key + '.webp';
  const theme = {ink:'#181127', paper:'#fff6ea'};
  let draftPhoto = null;
  let savedFormat = 'feed';
  let savedSample = 'miraflor';

  function enhance(el, slide, index) {
    if (index !== 21 || slide.kind !== 'composer') return;
    const content = el.querySelector('.content');
    const values = ['hook','benefit','action'].map(id=>content.querySelector('#'+id).value);
    content.innerHTML = `
      <div class="studio-shell">
        <section class="studio-controls" aria-label="Editor de publicación">
          <div class="studio-id">
            <span class="studio-signal" aria-hidden="true"></span>
            <label for="studio-business">Tipo de negocio</label>
            <select id="studio-business"></select>
          </div>
          <div class="studio-media">
            <div class="studio-field-title"><span>01</span><h2>Elegí la foto</h2></div>
            <div class="studio-thumbs">
              ${Object.entries(photos).map(([key,photo])=>`<button type="button" data-studio-photo="${key}" aria-label="Usar foto de ${photo.name}" aria-pressed="false" title="${photo.name}"><img src="${photoPath(key)}" alt=""></button>`).join('')}
              <label class="studio-upload">${icon('photo')}<span>Tu foto</span><input type="file" id="studio-upload" accept="image/*" aria-label="Cargar una foto"></label>
            </div>
            <div id="studio-photo-credit"></div>
          </div>
          <div class="studio-writing">
            <div class="studio-field-title"><span>02</span><h2>Escribí tu mensaje</h2></div>
            <div class="studio-words">
              <label for="hook">Gancho</label><input id="hook" maxlength="110" placeholder="¿Qué querés que la gente recuerde?">
              <label for="benefit">Beneficio</label><textarea id="benefit" maxlength="220" rows="2" placeholder="¿Qué van a disfrutar o resolver?"></textarea>
              <label for="action">Llamada a la acción</label><input id="action" maxlength="120" placeholder="¿Qué pueden hacer ahora?">
            </div>
          </div>
        </section>
        <section class="studio-board" aria-label="Vista previa y descarga">
          <div class="studio-rail">
            <div class="studio-formats" role="group" aria-label="Formato de la publicación">
              ${Object.entries(formats).map(([key,format])=>`<button type="button" data-studio-format="${key}" aria-pressed="false"><span class="format-mark format-mark-${key}" aria-hidden="true"></span><span>${format.label}</span><small>${format.ratio}</small></button>`).join('')}
            </div>
            <div class="studio-board-size" id="studio-size"></div>
          </div>
          <div class="studio-set" id="studio-set" data-format="feed">
            <div class="studio-post">
              <div class="studio-post-top"><span class="studio-avatar" aria-hidden="true">E</span><div><strong id="studio-account"></strong><small>Estelí, Nicaragua</small></div><span class="studio-more" aria-hidden="true">···</span></div>
              <div class="studio-visual"><canvas id="studio-preview" width="1080" height="1350" role="img" aria-label="Vista previa de la publicación"></canvas></div>
              <div class="studio-post-bottom" aria-hidden="true">${icon('heart')}${icon('chat')}<span></span>${icon('bookmark')}</div>
            </div>
            <div class="studio-caption">
              <h2>Texto de la publicación</h2>
              <p id="studio-caption-hook"></p>
              <p id="studio-caption-benefit"></p>
              <p id="studio-caption-action"></p>
            </div>
            <div class="studio-pages" id="studio-pages" hidden>
              <button type="button" id="studio-prev" aria-label="Lámina anterior">←</button>
              <span id="studio-part" role="status"></span>
              <button type="button" id="studio-next" aria-label="Lámina siguiente">→</button>
            </div>
          </div>
          <div class="studio-export">
            <button type="button" id="copyPost">${icon('copy')}Copiar texto</button>
            <button type="button" id="studio-download">${icon('download')}Descargar PNG</button>
          </div>
          <p id="studio-status" aria-live="polite"></p>
          <p id="post" hidden></p>
        </section>
      </div>`;

    const getNode = id => content.querySelector('#'+id);
    const businessMenu = getNode('studio-business');
    const fields = ['hook','benefit','action'].map(getNode);
    const account = getNode('studio-account');
    const canvas = getNode('studio-preview');
    const credit = getNode('studio-photo-credit');
    const status = getNode('studio-status');
    const download = getNode('studio-download');
    let format = savedFormat;
    let sample = draftPhoto ? null : savedSample;
    let image = null;
    let frame = 0;
    let imageRevision = 0;
    fields.forEach((field,i)=>{field.value=values[i]});
    Object.keys(examples).forEach(key=>businessMenu.add(new Option(key,key)));
    businessMenu.value = business;

    function render() {
      const size = formats[format];
      const writing = fields.map(field=>field.value.trim());
      ['hook','benefit','action'].forEach((key,i)=>{
        getNode('studio-caption-'+key).textContent=writing[i];
      });
      account.textContent = 'Mi ' + ({'Finca / tour':'experiencia', 'Artesanía':'taller'}[businessMenu.value] || businessMenu.value.toLowerCase());
      getNode('studio-size').textContent = '1080 × ' + size.height + ' px';
      getNode('studio-set').dataset.format = format;
      getNode('studio-pages').hidden = format !== 'carousel';
      getNode('studio-part').textContent = `Lámina ${frame+1} de 3`;
      getNode('studio-prev').disabled = frame === 0;
      getNode('studio-next').disabled = frame === 2;
      canvas.width = 1080;
      canvas.height = size.height;
      canvas.setAttribute('aria-label', [size.label, size.ratio, ...writing].filter(Boolean).join('. '));
      paint(canvas, {format, frame, image, sample, writing, business:businessMenu.value});
    }

    function chooseFormat(next) {
      format = savedFormat = next;
      frame=0;
      content.querySelectorAll('[data-studio-format]').forEach(button=>button.setAttribute('aria-pressed', String(button.dataset.studioFormat===next)));
      render();
    }

    async function showPhoto(url, nextSample) {
      const request = ++imageRevision;
      status.textContent='';
      download.disabled=true;
      try {
        const photo = new Image();
        photo.src=url;
        await photo.decode();
        if (request !== imageRevision || !content.isConnected) return false;
        image=photo;
        sample=nextSample;
        credit.replaceChildren();
        if (sample) {
          const source=document.createElement('a');
          source.href='https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(photos[sample].source);
          source.target='_blank';
          source.rel='noopener noreferrer';
          source.textContent='Tisey';
          const permissions=document.createElement('a');
          permissions.href=license;
          permissions.target='_blank';
          permissions.rel='noopener noreferrer';
          permissions.textContent='CC BY-SA 4.0';
          credit.append(source,' · ',permissions);
        } else {
          credit.textContent='Foto del dispositivo';
        }
        content.querySelectorAll('[data-studio-photo]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.studioPhoto===sample)));
        render();
        return true;
      } catch {
        if (request===imageRevision) status.textContent='No pudimos abrir esa imagen. Probá con una foto JPG, PNG o WebP.';
        return false;
      } finally {
        if (request===imageRevision) download.disabled=false;
      }
    }

    businessMenu.addEventListener('change',()=>{
      business=businessMenu.value;
      save('biz',business);
      fields.forEach((field,i)=>{field.value=examples[business][i];});
      fields[0].dispatchEvent(new Event('input',{bubbles:true}));
    });
    fields.forEach(field=>field.addEventListener('input',render));
    content.querySelectorAll('[data-studio-format]').forEach(button=>button.addEventListener('click',()=>chooseFormat(button.dataset.studioFormat)));
    content.querySelectorAll('[data-studio-photo]').forEach(button=>button.addEventListener('click',async ()=>{
      const key=button.dataset.studioPhoto;
      if (await showPhoto(photoPath(key),key)) {
        savedSample=key;
        if (draftPhoto) URL.revokeObjectURL(draftPhoto);
        draftPhoto=null;
      }
    }));
    getNode('studio-upload').addEventListener('change', async event=>{
      const file=event.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/') || file.size>25*1024*1024) {
        status.textContent='Elegí una imagen de hasta 25 MB.';
        event.target.value='';
        return;
      }
      const url=URL.createObjectURL(file);
      if (await showPhoto(url,null)) {
        if (draftPhoto) URL.revokeObjectURL(draftPhoto);
        draftPhoto=url;
      } else {
        URL.revokeObjectURL(url);
      }
      event.target.value='';
    });
    for (const [id,direction] of [['studio-prev',-1],['studio-next',1]]) {
      getNode(id).addEventListener('click',()=>{
        frame=Math.max(0,Math.min(2,frame+direction));
        render();
      });
    }
    download.addEventListener('click',()=>{
      const fileName='esteli-'+format+(format==='carousel'?'-'+(frame+1):'')+'.png';
      canvas.toBlob(blob=>{
        if (!blob) {
          status.textContent='El PNG no se pudo generar. Intentá de nuevo.';
          return;
        }
        const url=URL.createObjectURL(blob);
        const link=document.createElement('a');
        link.href=url;
        link.download=fileName;
        document.body.append(link);
        link.click();
        link.remove();
        setTimeout(()=>URL.revokeObjectURL(url),5000);
        status.textContent='PNG descargado.';
      },'image/png');
    });
    chooseFormat(format);
    showPhoto(draftPhoto || photoPath(sample),sample);
    document.fonts?.load('760 92px "Bricolage Grotesque"').then(()=>{if(content.isConnected)render();}).catch(()=>{});
  }

  function splitLines(ctx, value, width) {
    const lines=[];
    let line='';
    for (const word of value.split(/\s+/)) {
        const next=line?line+' '+word:word;
        if (line && ctx.measureText(next).width>width) {
          lines.push(line);
          line='';
        }
        if (!line && ctx.measureText(word).width>width) {
          for (const letter of word) {
            if (line && ctx.measureText(line+letter).width>width) {
              lines.push(line);
              line='';
            }
            line+=letter;
          }
        } else {
          line=line?line+' '+word:word;
        }
    }
    lines.push(line);
    return lines;
  }

  function textBlock(ctx, value, width, maxSize, minSize, weight, maxLines, font='Bricolage Grotesque') {
    let size=maxSize;
    let lines=[];
    for (;size>=minSize;size-=2) {
      ctx.font=`${weight} ${size}px "${font}", system-ui, sans-serif`;
      lines=splitLines(ctx,value,width);
      if (lines.length<=maxLines) break;
    }
    size=Math.max(size,minSize);
    const leading=size*1.04;
    return {
      height:lines.length*leading,
      size,
      draw(x,y,color) {
        ctx.font=`${weight} ${size}px "${font}", system-ui, sans-serif`;
        ctx.fillStyle=color;
        lines.forEach((line,i)=>ctx.fillText(line,x,y+i*leading));
      }
    };
  }

  function paint(canvas,{format,frame,image,sample,writing,business:category}) {
    const ctx=canvas.getContext('2d');
    const {width:w,height:h}=canvas;
    const margin=78;
    const accent=sample?photos[sample].accent:'#ff716b';
    let [hook,benefit,action]=writing;
    if (format==='carousel'&&frame===1) [hook,benefit,action]=[benefit,'',''];
    if (format==='carousel'&&frame===2) [hook,benefit,action]=[action,'',''];
    if (format==='carousel'&&frame===0) [benefit,action]=['',''];
    ctx.fillStyle=theme.ink;
    ctx.fillRect(0,0,w,h);
    if (image) {
      const scale=Math.max(w/image.naturalWidth,h/image.naturalHeight);
      const width=image.naturalWidth*scale,height=image.naturalHeight*scale;
      ctx.drawImage(image,(w-width)/2,(h-height)/2,width,height);
    }
    const shade=ctx.createLinearGradient(0,0,0,h);
    shade.addColorStop(0,'rgba(14,8,25,.55)');
    shade.addColorStop(.26,'rgba(14,8,25,.02)');
    shade.addColorStop(.46,'rgba(14,8,25,.38)');
    shade.addColorStop(.77,'rgba(14,8,25,.92)');
    shade.addColorStop(1,'#181127');
    ctx.fillStyle=shade;
    ctx.fillRect(0,0,w,h);
    ctx.fillStyle=accent;
    ctx.fillRect(margin,85,54,11);
    ctx.fillStyle=theme.paper;
    ctx.font='700 33px system-ui, sans-serif';
    ctx.fillText(category+' · Estelí',margin,147);
    if (format==='carousel') {
      ctx.textAlign='right';
      ctx.fillText((frame+1)+'/3',w-margin,147);
      ctx.textAlign='left';
    }
    const headline=textBlock(ctx,hook,w-margin*2,112,63,780,4);
    const benefitBlock=textBlock(ctx,benefit,w-margin*2,49,33,540,4,'Segoe UI');
    const actionBlock=textBlock(ctx,action,w-margin*2-82,37,25,720,3,'Segoe UI');
    const bottom=format==='story'?h-198:h-115;
    const actionHeight=action?actionBlock.height+56:0;
    let top=bottom-actionHeight-27;
    if (benefit) {
      top-=benefitBlock.height+22;
      benefitBlock.draw(margin,top+benefitBlock.size,theme.paper);
    }
    top-=headline.height+22;
    headline.draw(margin,top+headline.size,theme.paper);
    if (action) {
      ctx.fillStyle=accent;
      ctx.fillRect(margin,bottom-actionHeight,w-margin*2,actionHeight);
      actionBlock.draw(margin+28,bottom-actionHeight+48,theme.ink);
    }
    if (sample) {
      ctx.fillStyle='#fff6ea';
      ctx.font='500 26px system-ui, sans-serif';
      ctx.fillText('Foto: Tisey / Wikimedia Commons · CC BY-SA 4.0 · recorte',margin,h-61,w-margin*2);
      ctx.font='500 20px system-ui, sans-serif';
      ctx.fillText(photos[sample].source.replaceAll('_',' '),margin,h-32,w-margin*2);
    }
  }
  return {enhance};
})();
