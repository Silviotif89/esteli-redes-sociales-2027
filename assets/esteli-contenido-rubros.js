/* Publication examples for the tourism businesses selected in slide 4. */
const EsteliContenidoRubros = (() => {
  const stages = {
    atraer: { label: 'Atraer', description: 'Ofrecer información útil antes de que el visitante consulte.' },
    interactuar: { label: 'Interactuar', description: 'Resolver dudas que ayudan al visitante a tomar una decisión.' },
    deleitar: { label: 'Deleitar', description: 'Dar apoyo después de la compra o la visita.' }
  };

  const businesses = {
    hospedaje: {
      title: 'Hospedaje',
      posts: [
        {
          stage: 'atraer', title: 'Guía para elegir habitación', format: 'Carrusel',
          visual: 'Una portada con la pregunta y tres fotos reales que muestren camas, baño y acceso.',
          hook: '¿Qué conviene revisar antes de reservar una habitación?',
          value: 'Confirme el tipo de cama y la capacidad, revise si el baño es privado y pregunte si el acceso tiene gradas. Estos detalles ayudan a elegir una habitación adecuada para todo el grupo.',
          action: 'Guarde esta guía para comparar opciones antes de reservar.', metric: 'Veces que se guardó la publicación.'
        },
        {
          stage: 'atraer', title: 'Así se ve una llegada', format: 'Reel',
          visual: 'Grabe la fachada, el acceso y la recepción en ese orden, con subtítulos cortos.',
          hook: 'Así puede reconocer la entrada cuando llegue a nuestro hospedaje.',
          value: 'En este recorrido mostramos la fachada, el acceso desde la calle y el punto de recepción. Si llega en vehículo, pregunte por las opciones de estacionamiento antes de salir.',
          action: 'Comparta el video con quienes viajan con usted.', metric: 'Veces que se compartió el Reel.'
        },
        {
          stage: 'interactuar', title: 'Qué incluye la tarifa', format: 'Historias',
          visual: 'Use una foto de habitación y una historia con las preguntas sobre servicios incluidos.',
          hook: 'Antes de reservar, confirme qué incluye la tarifa.',
          value: 'El desayuno, el estacionamiento y el horario de salida pueden variar según la reserva. Consulte el total para su fecha y confirme qué servicios están incluidos.',
          action: 'Responda esta historia con el servicio que necesita confirmar.', metric: 'Respuestas sobre servicios y tarifas.'
        },
        {
          stage: 'interactuar', title: 'Consulta de disponibilidad', format: 'Foto y texto',
          visual: 'Elija una foto real de una habitación representativa y muestre el canal de consulta.',
          hook: '¿Está organizando una estadía para varias personas?',
          value: 'Para revisar opciones necesitamos la fecha de entrada, la fecha de salida y el número de huéspedes. Con esos datos podemos confirmar disponibilidad, tarifa total y condiciones.',
          action: 'Envíe los tres datos por WhatsApp para solicitar una cotización.', metric: 'Consultas que llegaron con los tres datos.'
        },
        {
          stage: 'deleitar', title: 'Guía después de reservar', format: 'Historia destacada',
          visual: 'Muestre el acceso, el contacto de recepción y el lugar donde se entrega la llave.',
          hook: '¿Su reserva ya está confirmada? Guarde esta guía de llegada.',
          value: 'Tenga a mano su confirmación y revise la ubicación antes de viajar. Si cambia su hora de llegada, avise por el canal donde hizo la reserva para coordinar el ingreso.',
          action: 'Envíe esta guía a su grupo y avise si cambia el horario.', metric: 'Consultas de llegada resueltas por el canal de reserva.'
        }
      ]
    },
    restaurante: {
      title: 'Restaurante',
      posts: [
        {
          stage: 'atraer', title: 'Un ingrediente, tres detalles', format: 'Reel',
          visual: 'Grabe el ingrediente, una etapa de preparación y el plato terminado en la cocina del negocio.',
          hook: '¿Cómo cambia el sabor de un plato al tostar sus ingredientes?',
          value: 'En el video mostramos cómo el calor cambia el color y el aroma de la preparación. Observe el punto de tostado y el acabado del plato para entender qué aporta ese paso.',
          action: 'Guarde el video si le interesa conocer cómo se prepara lo que come.', metric: 'Veces que se guardó el Reel.'
        },
        {
          stage: 'atraer', title: 'Qué pedir en grupo', format: 'Carrusel',
          visual: 'Muestre porciones reales, un plato para compartir y una bebida del menú.',
          hook: '¿Van a almorzar en grupo? Estas preguntas ayudan a elegir el pedido.',
          value: 'Revise cuáles platos se sirven en porciones individuales, cuáles se pueden compartir y qué acompañamientos están incluidos. Si alguien tiene una restricción alimentaria, conviene comunicarla antes de pedir.',
          action: 'Comparta la guía con su grupo antes de salir.', metric: 'Veces que se compartió la guía.'
        },
        {
          stage: 'interactuar', title: 'Menú e ingredientes', format: 'Historias',
          visual: 'Muestre un fragmento del menú y agregue un espacio para preguntas sobre ingredientes.',
          hook: '¿Necesita confirmar los ingredientes de un plato?',
          value: 'Indique el nombre del plato y el ingrediente que desea evitar. El personal puede revisar con cocina tanto la receta como las condiciones de preparación antes de responder.',
          action: 'Envíe su consulta por mensaje antes de hacer el pedido.', metric: 'Consultas sobre ingredientes respondidas.'
        },
        {
          stage: 'interactuar', title: 'Reserva de mesa', format: 'Foto y texto',
          visual: 'Use una foto real del salón y acompañe la publicación con el enlace o contacto del negocio.',
          hook: '¿Está planificando un almuerzo familiar?',
          value: 'Para consultar una mesa indique el día, la hora y cuántas personas llegarán. El equipo puede confirmar el espacio disponible y las condiciones de la reserva.',
          action: 'Envíe el día, la hora y el tamaño del grupo por WhatsApp.', metric: 'Solicitudes de mesa con los datos completos.'
        },
        {
          stage: 'deleitar', title: 'Opinión después de la visita', format: 'Historia',
          visual: 'Use una imagen del local y un enlace para dejar comentarios de forma privada.',
          hook: '¿Ya nos visitó? Nos interesa conocer su experiencia.',
          value: 'Sus comentarios sobre el servicio, los tiempos de espera o el menú ayudan al equipo a identificar mejoras. Si quedó alguna consulta pendiente, puede comunicarse con nosotros.',
          action: 'Comparta su experiencia por el canal de contacto del negocio.', metric: 'Comentarios recibidos y respondidos.'
        }
      ]
    },
    cafeteria: {
      title: 'Cafetería',
      posts: [
        {
          stage: 'atraer', title: 'El café que va con su gusto', format: 'Carrusel',
          visual: 'Fotografíe dos bebidas propias y describa su preparación con palabras sencillas.',
          hook: '¿Prefiere un café intenso o una bebida con leche?',
          value: 'Para orientar el pedido, compare el método de preparación, si lleva leche y si el dulzor se añade al servir. Esos detalles ayudan a elegir de acuerdo con su gusto.',
          action: 'Guarde esta guía para su próxima visita.', metric: 'Veces que se guardó el carrusel.'
        },
        {
          stage: 'atraer', title: 'Del grano a la taza', format: 'Reel',
          visual: 'Grabe la molienda, el método de extracción que realmente usa el negocio y el servido.',
          hook: '¿Qué ocurre entre moler el café y servir la taza?',
          value: 'En este video puede ver la molienda y cómo se prepara una bebida. El tamaño de la molienda, el método y el tiempo de preparación influyen en el resultado.',
          action: 'Comparta el video con una persona que disfrute preparar café.', metric: 'Veces que se compartió el video.'
        },
        {
          stage: 'interactuar', title: 'Preguntas sobre el café en grano', format: 'Historias',
          visual: 'Muestre los empaques disponibles y añada un espacio de preguntas.',
          hook: '¿Busca café para preparar en casa y tiene dudas sobre la molienda?',
          value: 'El método que usa en casa ayuda a elegir la presentación. Al consultar, indique si lo prepara en cafetera, prensa o filtro y si puede molerlo en casa.',
          action: 'Responda la historia con el método que usa.', metric: 'Respuestas sobre métodos y presentaciones.'
        },
        {
          stage: 'interactuar', title: 'Pedido para llevar', format: 'Foto y texto',
          visual: 'Muestre una bebida o bolsa disponible y el canal donde se confirman los pedidos.',
          hook: '¿Quiere consultar un pedido para llevar?',
          value: 'Indique qué producto desea, la cantidad y cuándo pasaría a recogerlo. El equipo le confirmará la disponibilidad y el precio antes de preparar el pedido.',
          action: 'Escriba al negocio con el producto, la cantidad y la hora de retiro.', metric: 'Consultas completas para retiro.'
        },
        {
          stage: 'deleitar', title: 'Conservación en casa', format: 'Carrusel',
          visual: 'Use fotos del envase cerrado y del lugar donde recomienda guardarlo.',
          hook: '¿Se llevó café a casa? Así puede proteger su aroma.',
          value: 'Conserve el café en su envase bien cerrado y manténgalo en un lugar seco, alejado de la luz y del calor. Si lo compró en grano, muela únicamente la cantidad que vaya a preparar.',
          action: 'Guarde la guía y consulte si necesita ayuda con la preparación.', metric: 'Veces que se guardó la guía.'
        }
      ]
    },
    finca: {
      title: 'Finca / tour',
      posts: [
        {
          stage: 'atraer', title: 'Qué llevar a una caminata', format: 'Carrusel',
          visual: 'Fotografíe el equipo recomendado y un tramo representativo del recorrido.',
          hook: '¿Qué debe llevar para su primera caminata guiada?',
          value: 'Prepare agua, calzado con agarre y protección para el clima. Antes de salir, confirme con el guía el nivel de dificultad, la duración y las condiciones del camino.',
          action: 'Guarde esta lista para preparar su próxima salida.', metric: 'Veces que se guardó la publicación.'
        },
        {
          stage: 'atraer', title: 'La experiencia por dentro', format: 'Reel',
          visual: 'Muestre el punto de encuentro, un tramo del sendero y una pausa interpretativa.',
          hook: '¿Cómo se vive un recorrido acompañado por un guía?',
          value: 'Este video muestra cómo se presenta la ruta al inicio, cómo avanza el grupo y qué se observa durante las paradas. Cada salida se adapta a las condiciones del recorrido.',
          action: 'Comparta el video con quien le gustaría hacer el recorrido.', metric: 'Veces que se compartió el Reel.'
        },
        {
          stage: 'interactuar', title: 'Qué tan exigente es la ruta', format: 'Historias',
          visual: 'Use un video real de una subida o cruce y una historia para recibir preguntas.',
          hook: '¿Tiene dudas sobre el terreno antes de inscribirse?',
          value: 'Pregunte por pendientes, duración y pausas. Si viaja con personas con movilidad reducida o requiere alguna adaptación, consulte con el guía qué alternativas están disponibles.',
          action: 'Envíe su pregunta por mensaje para revisar la ruta más adecuada.', metric: 'Consultas respondidas sobre dificultad o acceso.'
        },
        {
          stage: 'interactuar', title: 'Consulta para un grupo', format: 'Foto y texto',
          visual: 'Muestre una foto real del lugar y el canal para solicitar información del recorrido.',
          hook: '¿Está organizando una salida con amistades o familiares?',
          value: 'Para revisar la disponibilidad indique la fecha, el número de personas y qué tipo de recorrido le interesa. Con esos datos podemos confirmar el precio, los servicios incluidos y las condiciones.',
          action: 'Envíe los tres datos por WhatsApp para recibir una propuesta.', metric: 'Consultas completas sobre disponibilidad.'
        },
        {
          stage: 'deleitar', title: 'Guía para una visita confirmada', format: 'Historia destacada',
          visual: 'Muestre los puntos de referencia de la reunión y cómo contactar al guía.',
          hook: '¿Ya confirmó su salida? Revise estos detalles antes de viajar.',
          value: 'Guarde la ubicación acordada, consulte el pronóstico y llegue a la hora indicada en su confirmación. Durante el recorrido siga las indicaciones del guía y llévese sus residuos.',
          action: 'Comparta esta guía con su grupo y consulte cualquier cambio de última hora.', metric: 'Dudas de preparación resueltas antes de la salida.'
        }
      ]
    },
    artesania: {
      title: 'Artesanía',
      posts: [
        {
          stage: 'atraer', title: 'De la materia prima a la pieza', format: 'Reel',
          visual: 'Grabe el material, una etapa real de elaboración y la pieza final con autorización del taller.',
          hook: '¿Qué pasos convierten un material en una pieza artesanal?',
          value: 'En el taller mostramos cómo se selecciona el material, cómo se le da forma y cómo se revisa el acabado. Cada paso ayuda a comprender el trabajo que hay detrás de la pieza.',
          action: 'Comparta este video con quienes disfrutan conocer los oficios artesanales.', metric: 'Veces que se compartió el Reel.'
        },
        {
          stage: 'atraer', title: 'Cómo elegir un recuerdo', format: 'Carrusel',
          visual: 'Muestre varias piezas del taller junto a una referencia de tamaño.',
          hook: '¿Busca un recuerdo que pueda llevar en su equipaje?',
          value: 'Antes de elegir, compare tamaño, peso y fragilidad. Pregunte cómo se empaca la pieza y revise si necesita cuidados especiales durante el traslado.',
          action: 'Guarde la guía para usarla al visitar un taller.', metric: 'Veces que se guardó el carrusel.'
        },
        {
          stage: 'interactuar', title: 'Consultas sobre una pieza', format: 'Historias',
          visual: 'Use una toma de cerca para mostrar el acabado y otra para mostrar el tamaño.',
          hook: '¿Le interesa una pieza que vio en nuestro catálogo?',
          value: 'Envíe una captura de la publicación para identificarla. El taller puede confirmar el material, las medidas, el precio y si la pieza sigue disponible.',
          action: 'Responda la historia con una captura o el nombre de la pieza.', metric: 'Respuestas que identifican una pieza.'
        },
        {
          stage: 'interactuar', title: 'Cotización de un encargo', format: 'Foto y texto',
          visual: 'Muestre un trabajo propio y señale qué características pueden consultarse para un encargo.',
          hook: '¿Necesita una pieza para regalar o un pedido de varias unidades?',
          value: 'Indique qué diseño le interesa, la cantidad y la fecha en que lo necesita. El taller puede confirmar materiales, plazo de elaboración, precio y forma de entrega antes de aceptar el encargo.',
          action: 'Envíe los datos por mensaje para solicitar una cotización.', metric: 'Solicitudes de encargo con datos completos.'
        },
        {
          stage: 'deleitar', title: 'Cuidado de la pieza', format: 'Carrusel',
          visual: 'Fotografíe los cuidados apropiados para un material real del taller.',
          hook: '¿Ya compró su pieza? Consulte cómo conservarla.',
          value: 'El cuidado depende del material y del acabado. Antes de limpiarla, revise la indicación del taller. Si necesita una recomendación específica, comparta una foto y el nombre de la pieza.',
          action: 'Guarde las indicaciones del taller y escriba si le queda alguna duda.', metric: 'Consultas de cuidado respondidas.'
        }
      ]
    }
  };

  const selectedByBusiness = new Map();

  const gallery = {
    hospedaje: {
      imageOrder:[1,2,3,4,2],
      descriptions:['Habitación con dos camas','Entrada de un alojamiento','Desayuno servido en el corredor','Entrada a una habitación'],
      actions:['Guardar la guía','Compartir el Reel','Consultar servicios','Solicitar cotización','Guardar indicaciones']
    },
    restaurante: {
      imageOrder:[1,3,2,4,3],
      descriptions:['Plato servido en la mesa','Manos de un cocinero sirviendo un plato','Mesa familiar en un restaurante','Selección de platos de la casa'],
      actions:['Guardar el Reel','Compartir la guía','Consultar ingredientes','Solicitar una mesa','Enviar una opinión']
    },
    cafeteria: {
      imageOrder:[3,1,4,2,4],
      descriptions:['Preparación de café de filtro','Barra de una cafetería','Café servido con repostería','Granos de café, bolsa y taza'],
      actions:['Guardar la guía','Compartir el Reel','Consultar sobre la molienda','Consultar un pedido','Guardar las recomendaciones']
    },
    finca: {
      imageOrder:[1,2,4,2,3],
      descriptions:['Sendero en un bosque nuboso','Granos secándose en una finca','Botas y equipo para una caminata','Cascada en el bosque'],
      actions:['Guardar la lista','Compartir el recorrido','Consultar la dificultad','Solicitar una propuesta','Compartir la guía']
    },
    artesania: {
      imageOrder:[2,1,3,4,3],
      descriptions:['Piezas de cerámica y tejidos','Manos moldeando una pieza de arcilla','Detalle de una taza de barro','Artesanías envueltas con hilo'],
      actions:['Compartir el proceso','Guardar la guía','Preguntar por una pieza','Solicitar una cotización','Guardar los cuidados']
    }
  };

  function photo(slug, index) {
    const entry = gallery[slug];
    const number = entry.imageOrder[index];
    return {
      src:`assets/esteli-contenido/${slug}-${number}.webp`,
      description:entry.descriptions[number-1]
    };
  }

  function sceneText(post, scene) {
    return [post.hook,post.value,post.action][scene];
  }

  function renderPost(slug, index, scene=0) {
    const post = businesses[slug].posts[index];
    const stage = stages[post.stage];
    const isPortrait = post.format === 'Reel' || post.format.startsWith('Historia');
    const hasScenes = isPortrait || post.format === 'Carrusel';
    const format = isPortrait ? 'portrait' : hasScenes ? 'carousel' : 'photo';
    const image = photo(slug,index);
    return `<article class="content-lab-hero" data-scene="${scene}" data-format="${format}" data-idea="${index}" aria-label="Ejemplo de publicación">
        <div class="content-lab-media"${isPortrait ? ` style="--media-image:url('${image.src}')"` : ''}>
          <div class="content-lab-image-frame"><img class="content-lab-photo" src="${image.src}" alt="${image.description}"></div>
          ${hasScenes ? `<div class="content-lab-scenes" role="group" aria-label="Partes del ejemplo">
            ${['Gancho','Aporte','Acción'].map((label,i)=>`<button type="button" data-content-scene="${i}" aria-pressed="${i===scene}">${label}</button>`).join('')}
          </div>` : ''}
        </div>
        <div class="content-lab-main-copy">
          <div class="content-lab-post-head">
            <span class="content-lab-stage" data-stage="${post.stage}">${stage.label}</span>
            <span class="content-lab-format">${post.format}</span>
          </div>
          <h2>${post.title}</h2>
          <p class="content-lab-hook" aria-live="polite">${sceneText(post,scene)}</p>
          <p class="content-lab-action"><span aria-hidden="true">↗</span> ${gallery[slug].actions[index]}</p>
        </div>
      </article>`;
  }

  function renderDetails(post) {
    return `<details class="content-lab-detail">
      <summary>Cómo está hecha</summary>
      <div class="content-lab-explainer">
        <dl class="content-lab-brief">
          <div><dt>${stages[post.stage].label}</dt><dd>${stages[post.stage].description}</dd></div>
          <div><dt>Formato</dt><dd>${post.format}</dd></div>
          <div><dt>Qué mostrar</dt><dd>${post.visual}</dd></div>
          <div><dt>Qué medir</dt><dd>${post.metric}</dd></div>
        </dl>
        <article class="content-lab-copy" aria-label="Texto completo de ejemplo">
          <h3>Texto completo de ejemplo</h3>
          <dl>
            <div><dt>Gancho</dt><dd>${post.hook}</dd></div>
            <div><dt>Aporte útil</dt><dd>${post.value}</dd></div>
            <div><dt>Llamada a la acción</dt><dd>${post.action}</dd></div>
          </dl>
        </article>
      </div>
      <p class="content-lab-note">Imágenes ilustrativas generadas para el taller. Adapte el ejemplo a los servicios reales de su negocio. <a href="https://www.hubspot.es/inbound-marketing" target="_blank" rel="noopener noreferrer">Metodología inbound de HubSpot ↗</a></p>
    </details>`;
  }

  function render(demo, slug) {
    const business = businesses[slug];
    const {index:selected,scene} = selectedByBusiness.get(slug) ?? {index:0,scene:0};
    demo.innerHTML = `<section class="content-lab" aria-label="Simulador de marketing de contenidos">
      <div class="content-lab-top">
        <nav class="content-lab-nav" aria-label="Tipos de negocio">${Object.entries(businesses).map(([key,item]) =>
          `<a href="#4/${key}"${key===slug?' aria-current="page"':''}>${item.title}</a>`).join('')}</nav>
      </div>
      <section class="content-lab-preview" id="content-lab-preview" aria-label="Publicación seleccionada">${renderPost(slug,selected,scene)}</section>
      <div class="content-lab-list" role="group" aria-label="Ejemplos de publicaciones">${business.posts.map((post,index) =>
        `<button type="button" data-content-post="${index}" aria-pressed="${index===selected}" aria-controls="content-lab-preview">
          <img src="${photo(slug,index).src}" alt=""><span>${post.title}</span>
        </button>`).join('')}</div>
      <div class="content-lab-details">${renderDetails(business.posts[selected])}</div>
      <p class="content-lab-announcement" role="status"></p>
    </section>`;
    const preview = demo.querySelector('#content-lab-preview');
    const details = demo.querySelector('.content-lab-details');
    const options = Array.from(demo.querySelectorAll('[data-content-post]'));
    preview.addEventListener('click', event => {
      const option = event.target.closest('[data-content-scene]');
      if (!option || option.getAttribute('aria-pressed') === 'true') return;
      const index = selectedByBusiness.get(slug)?.index ?? 0;
      const scene = Number(option.dataset.contentScene);
      selectedByBusiness.set(slug,{index,scene});
      preview.querySelector('.content-lab-hero').dataset.scene = scene;
      preview.querySelector('.content-lab-hook').textContent = sceneText(business.posts[index],scene);
      preview.querySelectorAll('[data-content-scene]').forEach(candidate => candidate.setAttribute('aria-pressed',String(candidate===option)));
    });
    options.forEach(option => option.addEventListener('click', event => {
      if (option.getAttribute('aria-pressed') === 'true') return;
      const index = Number(option.dataset.contentPost);
      selectedByBusiness.set(slug,{index,scene:0});
      options.forEach(candidate => candidate.setAttribute('aria-pressed', String(candidate === option)));
      preview.innerHTML = renderPost(slug,index);
      details.innerHTML = renderDetails(business.posts[index]);
      demo.querySelector('.content-lab-announcement').textContent = `Publicación seleccionada: ${business.posts[index].title}`;
      if (event.detail && preview.getBoundingClientRect().top < 0) preview.scrollIntoView({block:'start'});
    }));
  }

  const cases = Object.fromEntries(Object.entries(businesses).map(([slug,business]) =>
    [slug,{title:business.title,render:demo=>render(demo,slug)}]));
  return {cases};
})();
