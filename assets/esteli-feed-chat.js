/* Original mobile practice interfaces for the Estelí Tours lesson. */
const EsteliFeedChat = (() => {
  const icons = {
    like: '<path d="M20.1 5.6a4.4 4.4 0 0 0-6.2 0L12 7.5l-1.9-1.9a4.4 4.4 0 0 0-6.2 6.2l8.1 8.1 8.1-8.1a4.4 4.4 0 0 0 0-6.2Z"/>',
    comment: '<path d="M20.5 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2 .9-5.2A7.5 7.5 0 0 1 11 4h2a7.5 7.5 0 0 1 7.5 7.5Z"/><path d="M8.5 11.5h7"/>',
    save: '<path d="M6 5.5A1.5 1.5 0 0 1 7.5 4h9A1.5 1.5 0 0 1 18 5.5V21l-6-4-6 4Z"/>',
    visit: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    send: '<path d="m3 4 18 8-18 8 3.4-8L3 4Zm3.4 8H14"/>',
    refresh: '<path d="M5.2 8a8 8 0 1 1-.3 7.3M5 4v5h5"/>',
    check: '<path d="M2 12.5 6 16 14 8m-3 7 1 1 9-8"/>',
    planet: '<circle cx="12" cy="12" r="8"/><path d="M4 12h16m-8-8c-3 3-3 13 0 16m0-16c3 3 3 13 0 16"/>'
  };
  function icon(name) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
  }

  function facebook(demo) {
    demo.innerHTML = `<section class="etz-app etz-feed" aria-label="Simulador de Facebook">
      <div class="etz-feed-head">
        <strong>Facebook</strong><span class="etz-practice">Práctica</span>
      </div>
      <div class="etz-feed-tabs" role="group" aria-label="Secciones del feed">
        <button type="button" data-feed-tab="feed" aria-pressed="true">Inicio</button>
        <button type="button" data-feed-tab="saved" aria-pressed="false">Guardados</button>
      </div>
      <div class="etz-scroll etz-feed-scroll" tabindex="0" aria-label="Publicaciones">
        <div class="etz-empty" hidden>${icon('save')}<p>Las publicaciones que guardés aparecerán aquí.</p>
          <button type="button" data-feed-return>Volver a Inicio</button>
        </div>
        <article class="etz-post" aria-label="Publicación de Estelí Tours">
          <div class="etz-author"><span class="etz-avatar" aria-hidden="true">ET</span>
            <div><strong>Estelí Tours</strong><small>Publicación de ejemplo · Público ${icon('planet')}</small></div>
          </div>
          <p class="etz-pub-copy"><strong>Un día entre bosque y cascadas</strong><br>
            Caminá por Miraflor con guía local. ¿Con quién compartirías el recorrido?</p>
          <figure class="etz-media">
            <img src="assets/esteli/cascada.webp" alt="Cascada en Miraflor, Estelí">
            <figcaption><strong>Una escapada<br>a Miraflor</strong><a href="assets/esteli/CREDITOS.md" target="_blank" rel="noopener">Foto de Tisey · CC BY-SA 4.0</a></figcaption>
          </figure>
          <div class="etz-card-link">
            <div><strong>Tour guiado en Miraflor</strong><small>Consultá fechas y cupos</small></div>
          </div>
          <div class="etz-counts" aria-live="polite"><span><b data-feed-reactions>4</b> reacciones</span><span><b data-feed-comments>1</b> <span data-feed-comment-word>comentario</span></span></div>
        </article>
        <section class="etz-comments" aria-label="Comentarios de práctica" hidden>
          <h3>Comentarios</h3>
          <ul>
            <li><span class="etz-visitor-avatar" aria-hidden="true">V</span><div><strong>Visitante</strong><p>¿Qué calzado recomendás llevar?</p></div></li>
          </ul>
          <form class="etz-comment-form">
            <input aria-label="Tu comentario de práctica" placeholder="Escribí un comentario…" maxlength="160" required>
            <button type="submit" aria-label="Añadir comentario">${icon('send')}</button>
          </form>
        </section>
      </div>
      <div class="etz-actions" aria-label="Acciones de publicación">
        <button type="button" data-feed-action="like" aria-pressed="false">${icon('like')}<span>Me gusta</span></button>
        <button type="button" data-feed-action="comments" aria-expanded="false">${icon('comment')}<span>Comentar</span></button>
        <button type="button" data-feed-action="save" aria-pressed="false">${icon('save')}<span>Guardar</span></button>
        <a class="etz-visit" href="#11/whatsapp" aria-label="Consultar el tour en la simulación de WhatsApp">${icon('visit')}<span>Consultar</span></a>
      </div>
    </section>`;

    const app = demo.querySelector('.etz-feed');
    const scroll = app.querySelector('.etz-feed-scroll');
    const post = app.querySelector('.etz-post');
    const empty = app.querySelector('.etz-empty');
    const comments = app.querySelector('.etz-comments');
    const form = comments.querySelector('form');
    const commentInput = form.querySelector('input');
    const actions = app.querySelector('.etz-actions');
    const likeButton = actions.querySelector('[data-feed-action="like"]');
    const saveButton = actions.querySelector('[data-feed-action="save"]');
    const commentButton = actions.querySelector('[data-feed-action="comments"]');
    let liked = false;
    let saved = false;
    let showComments = false;
    let commentCount = 1;
    let view = 'feed';

    function refresh() {
      const visiblePost = view === 'feed' || saved;
      empty.hidden = visiblePost;
      post.hidden = !visiblePost;
      actions.hidden = !visiblePost;
      comments.hidden = !visiblePost || !showComments;
      likeButton.setAttribute('aria-pressed',String(liked));
      saveButton.setAttribute('aria-pressed',String(saved));
      commentButton.setAttribute('aria-expanded',String(showComments && visiblePost));
      app.querySelector('[data-feed-reactions]').textContent = liked ? '5' : '4';
      app.querySelector('[data-feed-comments]').textContent = commentCount;
      app.querySelector('[data-feed-comment-word]').textContent = commentCount === 1 ? 'comentario' : 'comentarios';
      app.querySelectorAll('[data-feed-tab]').forEach(tab => tab.setAttribute('aria-pressed',String(tab.dataset.feedTab === view)));
    }

    function switchView(next) {
      view = next;
      scroll.scrollTop = 0;
      refresh();
    }

    app.querySelectorAll('[data-feed-tab]').forEach(tab => tab.addEventListener('click',() => switchView(tab.dataset.feedTab)));
    app.querySelector('[data-feed-return]').addEventListener('click',() => switchView('feed'));
    likeButton.addEventListener('click',() => {
      liked = !liked;
      refresh();
    });
    saveButton.addEventListener('click',() => {
      saved = !saved;
      refresh();
    });
    commentButton.addEventListener('click',() => {
      showComments = !showComments;
      refresh();
      if (showComments) {
        scroll.scrollTop = comments.offsetTop;
        commentInput.focus({preventScroll:true});
      }
    });
    form.addEventListener('submit',event => {
      event.preventDefault();
      const value = commentInput.value.trim();
      if (!value) return;
      const line = document.createElement('li');
      line.innerHTML = '<span class="etz-visitor-avatar" aria-hidden="true">T</span><div><strong>Vos</strong><p></p></div>';
      line.querySelector('p').textContent = value;
      comments.querySelector('ul').append(line);
      commentInput.value = '';
      commentCount++;
      refresh();
      scroll.scrollTop = scroll.scrollHeight;
    });
    refresh();
  }

  const steps = [
    {
      label:'Consulta',
      choices:[
        ['¿Hay cupo para dos?','Hola, vi la caminata en Miraflor. ¿Hay cupo para dos este sábado?'],
        ['Quiero conocer Miraflor','Hola, somos dos personas y queremos conocer Miraflor este sábado.']
      ],
      answer:'¡Hola! Revisamos cupo para dos este sábado. ¿Querés recibir la cotización?'
    },
    {
      label:'Cotización',
      choices:[
        ['Ver precio y qué incluye','Sí, ¿cuánto cuesta en total y qué incluye?'],
        ['Pedir cotización','Mandame, por favor, la cotización para dos.']
      ],
      answer:'En este ejemplo, el total para dos es C$ 900. Incluye guía y caminata de medio día. ¿Te gustaría confirmar?'
    },
    {
      label:'Confirmación',
      choices:[
        ['Confirmar reserva','Sí, confirmá la reserva de dos para el sábado.'],
        ['Preguntar punto de encuentro','Confirmemos para dos. ¿Dónde nos encontramos?']
      ],
      answer:'¡Listo! Confirmación de práctica para dos. La salida de ejemplo es a las 8:00 a. m. frente al Parque Central de Estelí.'
    }
  ];

  function whatsapp(demo) {
    demo.innerHTML = `<section class="etz-app etz-chat" aria-label="Simulador de WhatsApp Business">
      <div class="etz-chat-head">
        <span class="etz-avatar" aria-hidden="true">ET</span>
        <div><strong>Estelí Tours</strong><small>WhatsApp Business · Práctica</small></div>
        <button type="button" data-chat-reset aria-label="Reiniciar conversación" title="Reiniciar conversación">${icon('refresh')}</button>
      </div>
      <a class="etz-chat-topic" href="#11/facebook" aria-label="Volver a la publicación de Miraflor en Facebook">
        <span class="etz-topic-icon">${icon('comment')}</span><span><strong>Tour en Miraflor</strong><small>Contacto desde Facebook</small></span>
      </a>
      <div class="etz-thread etz-scroll" role="log" aria-live="polite" aria-label="Conversación de práctica" tabindex="0"></div>
      <div class="etz-compose">
        <div class="etz-chat-status"><strong data-chat-phase></strong><small>Mensajes de práctica</small></div>
        <div class="etz-chat-options" role="group" aria-label="Elegí un mensaje"></div>
      </div>
    </section>`;

    const app = demo.querySelector('.etz-chat');
    const thread = app.querySelector('.etz-thread');
    const options = app.querySelector('.etz-chat-options');
    const reset = app.querySelector('[data-chat-reset]');
    let cursor = 0;

    function message(text,sent,time) {
      const bubble = document.createElement('div');
      bubble.className = sent ? 'etz-bubble etz-bubble-sent' : 'etz-bubble etz-bubble-received';
      const copy = document.createElement('p');
      copy.textContent = text;
      const meta = document.createElement('small');
      meta.textContent = time + ' ';
      if (sent) meta.insertAdjacentHTML('beforeend',icon('check'));
      bubble.append(copy,meta);
      thread.append(bubble);
    }

    function renderOptions(focus = false) {
      const step = steps[cursor];
      app.querySelector('[data-chat-phase]').textContent = step ? step.label + ' · ' + (cursor + 1) + ' de ' + steps.length : 'Reserva confirmada';
      options.replaceChildren();
      if (step) {
        step.choices.forEach(([label],index) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.dataset.chatChoice = index;
          button.textContent = label;
          button.insertAdjacentHTML('beforeend',icon('send'));
          options.append(button);
        });
      } else {
        const restart = document.createElement('button');
        restart.type = 'button';
        restart.dataset.chatReplay = '';
        restart.textContent = 'Volver a practicar';
        restart.insertAdjacentHTML('beforeend',icon('refresh'));
        options.append(restart);
      }
      thread.scrollTop = thread.scrollHeight;
      if (focus) options.querySelector('button')?.focus({preventScroll:true});
    }

    function restart(focus = false) {
      cursor = 0;
      thread.innerHTML = '<span class="etz-day">Hoy · Ejemplo</span>';
      message('¡Hola! Somos Estelí Tours. ¿En qué te podemos ayudar?',false,'9:40');
      renderOptions(focus);
    }

    reset.addEventListener('click',() => restart(true));
    options.addEventListener('click',event => {
      const button = event.target.closest('button');
      if (!button) return;
      if (button.hasAttribute('data-chat-replay')) {
        restart(true);
        return;
      }
      const step = steps[cursor];
      const selected = Number(button.dataset.chatChoice);
      if (!step || !step.choices[selected]) return;
      message(step.choices[selected][1],true,'9:' + (41 + cursor * 2));
      message(step.answer,false,'9:' + (42 + cursor * 2));
      cursor++;
      renderOptions(true);
    });
    restart();
  }

  return {facebook,whatsapp};
})();
