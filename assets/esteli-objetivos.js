/* Selected campaign objectives and example optimizations for Estelí Tours. */
const EsteliObjetivos = (() => {
  const metaGuide = 'https://es-la.facebook.com/business/ads/ad-objectives';
  const blueprint = 'https://www.facebookblueprint.com/student/path/219699-selecting-objectives-course';
  const photoCredits = 'assets/esteli/CREDITOS.md';
  const cases = {
    reconocimiento: {
      title:'Reconocimiento', symbol:'◎', short:'Llegar a más personas',
      use:'Estelí Tours quiere que nuevas personas conozcan sus recorridos por Estelí.',
      headline:'Descubrí Estelí con un guía local', image:'esteli-ciudad.webp', alt:'Estelí visto desde El Tisey',
      copy:'Miradores, bosque y cascadas. Conocé las experiencias que podés recorrer en Estelí.',
      options:[{label:'En el anuncio (automática)', note:'Elegí qué tipo de exposición querés priorizar dentro de tu público.',
        cta:'Más información', action:'El visitante conoce la oferta de Estelí Tours; la campaña mide la oportunidad de ver el anuncio.',
        goals:[
          {label:'Maximizar el alcance', metric:'Alcance', detail:'Estimación de personas distintas que vieron el anuncio.'},
          {label:'Maximizar las impresiones', metric:'Impresiones', detail:'Veces que se mostró el anuncio; una persona puede verlo varias veces.'}
        ]}]
    },
    trafico: {
      title:'Tráfico', symbol:'↗', short:'Llevar visitas a un destino',
      use:'Ya hay un sitio con el itinerario de Miraflor y se busca que la gente llegue a leerlo.',
      headline:'Mirá el itinerario de Miraflor', image:'cascada.webp', alt:'Cascada de Miraflor, Estelí',
      copy:'Revisá la ruta, lo que incluye y qué llevar para una caminata por Miraflor.',
      options:[{label:'Sitio web', note:'Usá el enlace de la página del itinerario. Elegí visitas si querés optimizar hacia la carga de la página.',
        cta:'Más información', action:'El visitante toca el enlace para abrir el itinerario. El clic ocurre al tocarlo; la visita se registra cuando carga el destino.',
        goals:[
          {label:'Maximizar las visitas a la página de destino', metric:'Visitas a la página de destino', detail:'Veces que se cargó el destino después del clic.'},
          {label:'Maximizar los clics en el enlace', metric:'Clics en el enlace', detail:'Veces que se hizo clic en el enlace incluido en el anuncio.'}
        ]}]
    },
    interaccion: {
      title:'Interacción', symbol:'◇', short:'Abrir conversaciones o interacciones',
      use:'Estelí Tours quiere consultas sobre fechas o que más gente interactúe con una publicación.',
      headline:'¿Querés visitar Miraflor?', image:'bosque.webp', alt:'Bosque con neblina en Estelí',
      copy:'Contanos cuándo querés salir y cuántas personas vienen. Te orientamos sobre la ruta.',
      options:[
        {label:'Apps de mensajes · WhatsApp', note:'Usá WhatsApp si está conectado y disponible para esta campaña.',
          cta:'Enviar mensaje de WhatsApp', action:'El visitante puede iniciar un chat para preguntar por cupos, fecha e itinerario.',
          goals:[{label:'Maximizar las conversaciones', metric:'Conversaciones iniciadas', detail:'Conversaciones iniciadas desde el anuncio según la métrica seleccionada.'}]},
        {label:'En el anuncio', note:'Elegí esta variante cuando tu objetivo sea que la gente interactúe con la publicación.',
          cta:'Ver más', action:'El visitante abre la publicación y puede reaccionar, comentar o compartir.',
          goals:[{label:'Maximizar las interacciones con la publicación', metric:'Interacciones con la publicación', detail:'Acciones con la publicación, como reacciones, comentarios o veces que se compartió.'}]}
      ]
    },
    clientes: {
      title:'Clientes potenciales', symbol:'⊙', short:'Recibir contactos para dar seguimiento',
      use:'Estelí Tours quiere conocer qué fechas y tamaños de grupo interesan a quienes solicitan una cotización.',
      headline:'Solicitá una cotización para tu grupo', image:'esteli-ciudad.webp', alt:'Paisaje urbano y montañas de Estelí',
      copy:'Decinos la fecha aproximada y cuántas personas vienen para preparar una propuesta.',
      options:[
        {label:'Formulario instantáneo', note:'Definí las preguntas necesarias para responder la solicitud, como fecha y número de personas.',
          cta:'Cotizar', action:'Se abre un formulario de ejemplo para indicar fecha, cantidad de personas y un dato de contacto.',
          goals:[{label:'Maximizar los clientes potenciales', metric:'Clientes potenciales y costo por cliente potencial', detail:'Formularios enviados y costo promedio por solicitud recibida.'}]},
        {label:'Apps de mensajes · WhatsApp (si está disponible)', note:'Algunas configuraciones permiten captar prospectos con WhatsApp. Revisá que esté conectado y habilitado.',
          cta:'Enviar mensaje de WhatsApp', action:'El chat permite preguntar por fecha, número de personas y necesidades antes de dar seguimiento.',
          goals:[{label:'Maximizar los clientes potenciales', metric:'Clientes potenciales y costo por cliente potencial', detail:'Registros obtenidos por el flujo de captación configurado; se revisan según la preparación de la campaña.'}]}
      ]
    },
    app: {
      title:'Promoción de la app', symbol:'▣', short:'Impulsar instalaciones o acciones en una app',
      use:'Ejemplo hipotético para una operadora con una app de reservas registrada y preparada para medir eventos.',
      headline:'Explorá rutas desde la app de ejemplo', image:'bosque.webp', alt:'Entorno rural de Estelí',
      copy:'En este escenario, la app de práctica reúne rutas y permite consultar las experiencias.',
      options:[{label:'App', note:'Elegí la app registrada. Para optimizar una acción en ella, el evento debe estar configurado y recibir datos.',
        cta:'Instalar', action:'El anuncio llevaría a la ficha de la app registrada en la tienda correspondiente.',
        goals:[
          {label:'Maximizar las instalaciones de la app', metric:'Instalaciones y costo por instalación', detail:'Instalaciones atribuidas y costo promedio por instalación.'},
          {label:'Maximizar los eventos en la app', metric:'Eventos en la app y costo por evento',
            detail:'Acciones atribuidas que registra el evento configurado, como un registro creado.',
            cta:'Usar app', action:'El visitante abriría la sección configurada de la app. El evento se registra al completar la acción elegida.'}
        ]}]
    },
    ventas: {
      title:'Ventas', symbol:'▰', short:'Optimizar compras o su valor',
      use:'Escenario para una operadora con pago en línea y un evento de compra correctamente medido.',
      headline:'Reservá tu salida a Miraflor', image:'cascada.webp', alt:'Salto de agua en Miraflor, Estelí',
      copy:'Elegí la salida, revisá qué incluye y completá la reserva en línea en el escenario de práctica.',
      options:[{label:'Sitio web', note:'Configurá un conjunto de datos y el evento Compra. Para medir valor, el evento debe recibir importe y moneda.',
        cta:'Reservar', action:'El visitante revisa el itinerario y completa el pago en el escenario. El evento Compra se mide al confirmarse el pago.',
        goals:[
          {label:'Maximizar el número de conversiones', metric:'Compras y costo por compra', detail:'Reservas pagadas que registran el evento Compra y costo promedio por compra.'},
          {label:'Maximizar el valor de las conversiones', metric:'Valor de conversión y ROAS', detail:'Ingresos atribuidos y retorno de la inversión publicitaria, según los datos de valor recibidos.'}
        ]}]
    }
  };
  const selections = new Map();
  const route = key => '#45/' + key;

  const dictionarySections = [
    ['Estructura y configuración de una campaña',[
      ['Campaña','Nivel donde se define el objetivo publicitario. Una campaña puede agrupar varios conjuntos de anuncios.'],
      ['Conjunto de anuncios','Nivel donde se configura a qué público se dirige el anuncio, dónde puede mostrarse y qué resultado se prioriza.'],
      ['Anuncio','Pieza publicitaria que ve el público. Puede incluir una imagen o un video, texto y un botón.'],
      ['Objetivo de campaña','Resultado general que se busca con la publicidad, como dar a conocer Estelí Tours o generar ventas.'],
      ['Ubicación de conversión','Lugar donde se espera que ocurra la acción. Por ejemplo, una solicitud de cotización puede recibirse en un formulario o por WhatsApp.'],
      ['Objetivo de rendimiento','Resultado específico que Meta prioriza al mostrar los anuncios. En una campaña de tráfico, puede priorizar los clics o las visitas a la página de destino.'],
      ['Maximizar','Orientar la distribución de los anuncios para conseguir la mayor cantidad de resultados o el mayor valor posible, según la configuración y el presupuesto.'],
      ['Llamada a la acción (CTA)','Texto o botón que indica el siguiente paso al público. Algunos ejemplos son «Más información» y «Reservar».'],
      ['Vista previa','Representación de cómo se verá el anuncio antes de publicarlo. Permite revisar el texto, la imagen y el botón.'],
      ['Métrica','Indicador numérico que permite evaluar el desempeño de un anuncio, como el alcance, los clics o las compras.']
    ]],
    ['Los seis objetivos publicitarios',[
      ['Reconocimiento','Busca que más personas conozcan un negocio o servicio. Estelí Tours podría elegir este objetivo para dar a conocer sus excursiones a un público nuevo.'],
      ['Tráfico','Dirige a las personas a un destino, como la página web con el itinerario de una excursión a Miraflor.'],
      ['Interacción','Busca generar respuestas al anuncio, como reacciones, comentarios, reproducciones de video o conversaciones por WhatsApp, según la configuración.'],
      ['Clientes potenciales','Permite captar solicitudes de personas interesadas y darles seguimiento. Por ejemplo, recibir formularios de grupos que solicitan una cotización.'],
      ['Promoción de la app','Busca generar instalaciones de una aplicación o acciones dentro de ella, como completar un registro en una aplicación de reservas.'],
      ['Ventas','Busca generar compras o aumentar el valor de las ventas, según la configuración. Por ejemplo, conseguir reservas pagadas en el sitio web.']
    ]],
    ['Alcance, tráfico e interacciones',[
      ['Alcance','Cantidad estimada de personas distintas que vieron el anuncio al menos una vez.'],
      ['Impresiones','Cantidad de veces que se mostró el anuncio. Si una persona lo ve tres veces, se registran tres impresiones.'],
      ['Clics en el enlace','Número de veces que las personas seleccionan un enlace del anuncio. El clic se contabiliza aunque la página no llegue a cargar.'],
      ['Visitas a la página de destino','Número de veces que la página de destino carga después de que alguien selecciona el enlace del anuncio.'],
      ['Página de destino','Página que abre el enlace del anuncio. Por ejemplo, la página que detalla el itinerario y las condiciones de una excursión.'],
      ['Interacciones con la publicación','Acciones que las personas realizan en una publicación, como reaccionar, comentar o compartir.'],
      ['Apps de mensajes','Aplicaciones de mensajería que pueden recibir consultas desde un anuncio. Por ejemplo, WhatsApp para consultar la disponibilidad de un recorrido.'],
      ['Conversaciones iniciadas','Número de conversaciones que comienzan a través del anuncio y quedan registradas según las reglas de medición de Meta.']
    ]],
    ['Consultas y compras',[
      ['Formulario instantáneo','Formulario que se completa dentro de Facebook o Instagram. Una operadora puede usarlo para solicitar la fecha del viaje, el tamaño del grupo y un dato de contacto.'],
      ['Cliente potencial','Persona que demuestra interés y facilita un medio de contacto. Por ejemplo, alguien que solicita una cotización para un grupo.'],
      ['Costo por resultado','Gasto publicitario dividido entre los resultados registrados. Con C$100 de gasto y cinco solicitudes, el costo promedio es de C$20 por solicitud.'],
      ['Conversión','Acción completada que se ha definido como resultado de interés, como enviar una solicitud o pagar una reserva.'],
      ['Evento','Registro de una acción para su medición. Por ejemplo, el sitio web puede enviar el evento «Compra» al confirmar el pago de una reserva.'],
      ['Conjunto de datos','Recurso de Meta que reúne registros de acciones, como las compras que comunica un sitio web. Estos datos permiten medir los resultados de una campaña.'],
      ['Valor de conversión','Importe total de las conversiones atribuidas a la campaña. Si se atribuyen dos reservas de C$500 cada una, el valor total es de C$1,000.'],
      ['ROAS','Retorno de la inversión publicitaria. Se calcula dividiendo los ingresos atribuidos a los anuncios entre el gasto publicitario. Con C$300 en ventas atribuidas y C$100 de gasto, el ROAS es 3. Esto equivale a C$3 en ingresos por cada C$1 invertido.'],
      ['Atribución','Reglas que determinan cuándo un resultado se asigna a un anuncio. Por ejemplo, una reserva puede atribuirse al anuncio si se completa dentro del plazo de medición después de un clic.']
    ]],
    ['Aplicaciones',[
      ['App registrada','Aplicación que el negocio ha vinculado a Meta para promocionarla y medir las acciones configuradas.'],
      ['Instalación','Acción de instalar una aplicación en un dispositivo. El informe publicitario muestra las instalaciones atribuidas al anuncio.'],
      ['Evento en la app','Acción registrada dentro de una aplicación, como crear una cuenta o completar una reserva.']
    ]]
  ];
  const dictionaryItem = {title:'Diccionario',symbol:'≡',short:'Terminología publicitaria'};

  function shell(demo, key, content) {
    const menu = Object.entries({...cases,diccionario:dictionaryItem});
    demo.innerHTML = `<section class="objective-app" data-objective="${key}" aria-label="Simulador de objetivos publicitarios">
      <header class="objective-top"><div><strong>${key==='diccionario'?'Diccionario de anuncios':'Crear campaña'}</strong><small>Administrador de anuncios · cuenta de práctica Estelí Tours</small></div>
      <span class="objective-progress">Campaña · Conjunto de anuncios · Anuncio</span></header>
      <div class="objective-body">
        <nav class="objective-list" aria-label="Objetivos de campaña y diccionario">${menu.map(([id,choice])=>
          `<a href="${route(id)}"${id===key?' aria-current="page"':''}><span class="objective-symbol" aria-hidden="true">${choice.symbol}</span>
          <span class="objective-choice"><strong>${choice.title}</strong><small>${choice.short}</small></span></a>`).join('')}</nav>
        ${content}
      </div>
    </section>`;
  }

  function renderDictionary(demo) {
    shell(demo,'diccionario',`<section class="objective-work objective-glossary" aria-label="Diccionario de anuncios">
      <p class="objective-goal">Seleccione una categoría para consultar las definiciones y sus ejemplos aplicados a negocios turísticos.</p>
      ${dictionarySections.map(([group,terms],i)=>`<details${i===0?' open':''}>
        <summary>${group}</summary><dl>
          ${terms.map(([term,definition])=>`<div><dt>${term}</dt><dd>${definition}</dd></div>`).join('')}
        </dl></details>`).join('')}
    </section>`);
  }

  function render(demo, key) {
    const item = cases[key];
    const state = selections.get(key) || {place:0, goal:0};
    selections.set(key,state);
    shell(demo,key,`<section class="objective-work" aria-label="Configuración del objetivo">
          <span class="objective-kicker">Conjunto de anuncios</span>
          <h2>${item.title}</h2><p class="objective-goal">${item.use}</p>
          <form class="objective-config">
            <label>Ubicación de conversión<select id="objective-location">${item.options.map((option,i)=>`<option value="${i}">${option.label}</option>`).join('')}</select></label>
            <label>Objetivo de rendimiento<select id="objective-performance"></select></label>
            <div class="objective-reading"><strong>Qué revisar en una cuenta real</strong><p></p></div>
            <div class="objective-actions"><button type="submit">Ver resumen de práctica</button>
              <a href="${blueprint}" target="_blank" rel="noopener">Curso oficial de Meta ↗</a></div>
          </form>
          <div class="objective-status" role="status" aria-live="polite"></div>
        </section>
        <aside class="objective-preview" aria-label="Vista previa del anuncio">
          <div class="objective-preview-head"><strong>Vista previa</strong><small>Anuncio de práctica</small></div>
          <div class="objective-preview-copy"><strong>Estelí Tours</strong><p>${item.copy}</p></div>
          <figure class="objective-preview-media"><img src="assets/esteli/${item.image}" alt="${item.alt}">
            <figcaption><a href="${photoCredits}" target="_blank" rel="noopener">Tisey · CC BY-SA 4.0</a></figcaption></figure>
          <div class="objective-preview-copy"><strong>${item.headline}</strong></div>
          <button class="objective-preview-cta" type="button" aria-expanded="false" aria-controls="objective-visitor"></button>
          <p class="objective-visitor" id="objective-visitor" hidden></p>
          <div class="objective-metric" aria-live="polite"><strong>Qué medir</strong><b></b><p></p></div>
        </aside>`);
    const location = demo.querySelector('#objective-location');
    const performance = demo.querySelector('#objective-performance');
    const status = demo.querySelector('.objective-status');
    const cta = demo.querySelector('.objective-preview-cta');
    const visitor = demo.querySelector('.objective-visitor');
    location.value = state.place;
    location.disabled = item.options.length === 1;
    let option;
    let goal;
    function sync(loadGoals) {
      option = item.options[state.place];
      if (loadGoals) {
        performance.replaceChildren(...option.goals.map((entry,i)=>new Option(entry.label,String(i))));
        performance.value = state.goal;
      }
      goal = option.goals[state.goal];
      demo.querySelector('.objective-reading p').textContent = option.note;
      demo.querySelector('.objective-metric b').textContent = goal.metric;
      demo.querySelector('.objective-metric p').textContent = goal.detail;
      cta.textContent = goal.cta || option.cta;
      cta.setAttribute('aria-expanded','false');
      visitor.hidden = true;
      status.textContent = '';
    }
    location.addEventListener('change',()=>{
      state.place = Number(location.value);
      state.goal = 0;
      sync(true);
    });
    performance.addEventListener('change',()=>{
      state.goal = Number(performance.value);
      sync(false);
    });
    cta.addEventListener('click',()=>{
      visitor.hidden = !visitor.hidden;
      cta.setAttribute('aria-expanded',String(!visitor.hidden));
      visitor.textContent = goal.action || option.action;
    });
    demo.querySelector('form').addEventListener('submit',event=>{
      event.preventDefault();
      status.textContent = `${item.title} → ${option.label} → ${goal.label}. Métrica · ${goal.metric}.`;
    });
    sync(true);
  }
  const publicCases = Object.fromEntries(Object.entries(cases).map(([key,item])=>[key,{title:item.title,render:demo=>render(demo,key)}]));
  publicCases.diccionario = {title:dictionaryItem.title,render:renderDictionary};
  return {cases:publicCases,metaGuide};
})();
