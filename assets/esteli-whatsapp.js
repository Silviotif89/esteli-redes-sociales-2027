/* WhatsApp Business examples for Tour Operadora Estelí Tours. */
const EsteliWhatsApp = (() => {
  const cases = {
    perfil: {
      title: 'Perfil',
      intro: 'Que un visitante sepa quién sos, qué ofrecés y cuándo le respondés.',
      tip: 'Si atendés con cita, aclaralo en el perfil. Agregá la ubicación y el horario reales de tu negocio.',
      render: profile
    },
    catalogo: {
      title: 'Catálogo',
      intro: 'Mostrá cada tour como una ficha fácil de comparar y compartir.',
      tip: 'Al publicar una ficha real, indicá el precio vigente, qué incluye y las condiciones de reserva.',
      render: catalog
    },
    respuestas: {
      title: 'Respuestas rápidas',
      intro: 'Elegí un atajo para ver cómo responder una consulta frecuente.',
      tip: 'Personalizá el mensaje con la fecha y el grupo. Confirmá la disponibilidad antes de ofrecer un cupo.',
      render: replies
    },
    etiquetas: {
      title: 'Etiquetas',
      intro: 'Acompañá una consulta desde el primer mensaje hasta la reserva.',
      tip: 'Actualizá la etiqueta cuando cambie el estado de la conversación.',
      render: labels
    }
  };
  function profile(demo) {
    demo.innerHTML = `<div class="wa-profile-photo">
      <img src="assets/esteli/esteli-ciudad.webp" alt="Vista de Estelí desde El Tisey">
      <a href="assets/esteli/CREDITOS.md" target="_blank" rel="noopener">Tisey · CC BY-SA 4.0</a>
    </div>
    <div class="wa-profile-data">
      <h2>Tour Operadora Estelí Tours</h2>
      <p>Excursiones guiadas por Estelí, Miraflor y El Tisey. Escribinos para organizar tu salida.</p>
      <dl>
        <div><dt>Categoría</dt><dd>Operador turístico</dd></div>
        <div><dt>Ubicación</dt><dd>Estelí, Nicaragua · salida por confirmar</dd></div>
        <div><dt>Horario de ejemplo</dt><dd>Lunes a sábado · 8:00 a. m. a 5:00 p. m.</dd></div>
      </dl>
    </div>`;
  }

  function catalog(demo) {
    const trips = [
      {
        name:'Sendero en Miraflor', photo:'cascada.webp', alt:'Cascada de Miraflor',
        details:'Caminata guiada de medio día con paradas para tomar fotos.',
        includes:'Guía local y acompañamiento durante el recorrido.'
      },
      {
        name:'Mirador de El Tisey', photo:'esteli-ciudad.webp', alt:'Estelí desde el mirador de El Tisey',
        details:'Salida de medio día para disfrutar el paisaje y fotografiar la vista de Estelí.',
        includes:'Guía y paradas panorámicas.'
      }
    ];
    demo.innerHTML = `<div class="wa-demo-pills" aria-label="Elegí un tour">
      <button type="button" data-demo-option="0">Miraflor</button>
      <button type="button" data-demo-option="1">El Tisey</button>
    </div><div class="wa-trip" aria-live="polite"></div>`;
    switcher(demo, index => {
      const trip = trips[index];
      demo.querySelector('.wa-trip').innerHTML = `
      <div class="wa-profile-photo"><img src="assets/esteli/${trip.photo}" alt="${trip.alt}">
        <a href="assets/esteli/CREDITOS.md" target="_blank" rel="noopener">Tisey · CC BY-SA 4.0</a></div>
      <div class="wa-profile-data"><h2>${trip.name}</h2><p>${trip.details}</p>
        <p><strong>Incluye</strong> · ${trip.includes}</p>
        <p>Confirmá tarifa, cupos y punto de encuentro al reservar.</p></div>`;
    });
  }

  function replies(demo) {
    const examples = [
      ['tarifa','¿Cuánto cuesta el tour a Miraflor?','¡Hola! Decinos qué día querés salir y cuántas personas vienen. Te compartimos el precio total y lo que incluye.'],
      ['salida','¿Dónde nos encontramos?','Al confirmar tu reserva te enviamos la ubicación exacta y la hora de encuentro en Estelí.'],
      ['cupos','¿Tienen espacio este sábado?','¿Para cuántas personas sería? Revisamos los cupos del sábado y te avisamos qué horarios hay disponibles.']
    ];
    demo.innerHTML = `<div class="wa-demo-pills" aria-label="Atajos de ejemplo">
      ${examples.map(([shortcut],i)=>`<button type="button" data-demo-option="${i}">/${shortcut}</button>`).join('')}
    </div><div class="wa-thread" aria-live="polite"></div>`;
    switcher(demo, index => {
      const [,question,answer] = examples[index];
      demo.querySelector('.wa-thread').innerHTML = `
        <p class="wa-message"><b>Visitante</b>${question}</p>
        <p class="wa-message wa-sent"><b>Estelí Tours</b>${answer}</p>`;
    });
  }

  function labels(demo) {
    const states = [
      ['Nuevo','La persona pregunta por el tour a Miraflor.','Pedile fecha y número de personas.'],
      ['Cotizado','Ya recibió el precio, el itinerario y lo que incluye.','Anotá cuándo enviaste la cotización.'],
      ['Pendiente','Quiere reservar, pero aún falta confirmar el cupo o el anticipo acordado.','Revisá qué falta antes de confirmar.'],
      ['Confirmado','La reserva ya está confirmada para la fecha acordada.','Mandale el punto de encuentro y qué debe llevar.']
    ];
    demo.innerHTML = `<div class="wa-demo-pills wa-label-pills" aria-label="Estados de una reserva">
      ${states.map(([name],i)=>`<button type="button" data-demo-option="${i}">${name}</button>`).join('')}
    </div><div class="wa-label-state" aria-live="polite"></div>`;
    switcher(demo, index => {
      const [name,summary,action] = states[index];
      demo.querySelector('.wa-label-state').innerHTML = `
        <span class="wa-tag" data-state="${index}">${name}</span>
        <h2>Consulta por Miraflor</h2><p>${summary}</p><p><strong>Siguiente paso</strong> · ${action}</p>`;
    });
  }

  function switcher(demo, render) {
    const controls = [...demo.querySelectorAll('[data-demo-option]')];
    function select(index) {
      controls.forEach((button,i)=>button.setAttribute('aria-pressed',String(index===i)));
      render(index);
    }
    controls.forEach((button,i)=>button.addEventListener('click',()=>select(i)));
    select(0);
  }
  return {cases};
})();
