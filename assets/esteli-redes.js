/* Practice content for the four social-channel examples on slide 11. */
const EsteliRedes = (() => {
  const photos = {
    miraflor: ['miraflor.webp', 'Entrada al área protegida de Miraflor'],
    bosque: ['bosque.webp', 'Bosque de Miraflor, Estelí'],
    cascada: ['cascada.webp', 'Cascada en Miraflor, Estelí']
  };

  const cases = {
    facebook: {
      title: 'Facebook',
      deviceLabel: 'Facebook · publicación de ejemplo',
      intro: 'Publicá la información que ayuda a un grupo a decidir si el tour es para ellos.',
      tip: 'Usá una foto propia, explicá qué incluye la salida y confirmá fecha, tarifa y cupos antes de publicar.',
      render: facebook
    },
    instagram: {
      title: 'Instagram',
      deviceLabel: 'Instagram · formatos de ejemplo',
      intro: 'Mostrá cómo se vive el tour. Elegí un formato para ver qué contaría Estelí Tours en cada uno.',
      tip: 'Usá el Reel para despertar curiosidad, la Historia para recibir preguntas y el Carrusel para dar detalles que se puedan guardar.',
      render: instagram
    },
    tiktok: {
      title: 'TikTok',
      deviceLabel: 'TikTok · guion de 15 segundos',
      intro: 'Enseñá algo útil con un video corto. Probá las tres tomas de este guion.',
      tip: 'Grabá en vertical y agregá subtítulos. Abrí con lo más interesante en los primeros segundos.',
      render: tiktok
    },
    whatsapp: {
      title: 'WhatsApp Business',
      deviceLabel: 'WhatsApp Business · conversación de ejemplo',
      intro: 'Pasá de una consulta que llegó por redes a una reserva con datos claros.',
      tip: 'Confirmá los cupos, el precio total y el punto de encuentro antes de dar por hecha la reserva.',
      render: whatsapp
    }
  };

  function photo(name) {
    const [file, description] = photos[name];
    return `<div class="wa-profile-photo">
      <img src="assets/esteli/${file}" alt="${description}">
      <a href="assets/esteli/CREDITOS.md" target="_blank" rel="noopener">Tisey · CC BY-SA 4.0</a>
    </div>`;
  }

  function mediaCard(image, title, copy, detail) {
    return `${photo(image)}
      <div class="wa-profile-data">
        <h2>${title}</h2>
        <p>${copy}</p>
        <p>${detail}</p>
      </div>`;
  }

  function facebook(demo) {
    demo.innerHTML = mediaCard(
      'cascada',
      'Caminata guiada en Miraflor',
      '¿Con quién te gustaría caminar entre bosque y cascadas? Te proponemos una salida de medio día con guía local y paradas para fotos.',
      '<strong>¿Te interesa?</strong> Comentá con quién irías o escribinos para consultar fechas, tarifa y cupos.'
    );
  }

  function instagram(demo) {
    const formats = [
      ['Reel', 'bosque', 'Así empieza una mañana en Miraflor',
        'Guion visual: abrí con el bosque, seguí con un tramo del sendero y cerrá en la cascada.',
        '<strong>Cierre</strong> · Guardá este Reel para tu próxima salida.'],
      ['Historia', 'cascada', '¿Bosque o cascada?',
        'Mostrá un momento del tour y abrí una encuesta con esas dos opciones.',
        '<strong>Después de la encuesta</strong> · Invitá a escribir por mensaje directo para consultar por la ruta elegida.'],
      ['Carrusel', 'miraflor', '3 láminas para preparar tu salida',
        '1. Mostrá el destino. 2. Explicá qué incluye la caminata. 3. Indicá qué llevar y cómo consultar cupos.',
        '<strong>Cierre</strong> · Deslizá y guardá la guía.']
    ];
    switcher(demo, 'Formatos de Instagram', formats.map(([name]) => name), index => {
      const [, image, title, copy, detail] = formats[index];
      return mediaCard(image, title, copy, detail);
    });
  }

  function tiktok(demo) {
    const shots = [
      ['0–3 s', 'cascada', 'Gancho', 'Abrí con la cascada en plano abierto.',
        '<strong>Texto en pantalla</strong> · ¿Primera vez en Miraflor?'],
      ['3–10 s', 'bosque', 'Consejo útil', 'Mostrá el sendero y un plano del calzado en movimiento.',
        '<strong>Decí</strong> · Traé zapatos con agarre y llevá agua.'],
      ['10–15 s', 'miraflor', 'Cierre', 'Terminá en la entrada del recorrido.',
        '<strong>Decí</strong> · Guardá estos consejos y escribinos si querés saber más.']
    ];
    switcher(demo, 'Tomas del video', shots.map(([time]) => time), index => {
      const [, image, title, copy, detail] = shots[index];
      return mediaCard(image, title, copy, detail);
    });
  }

  function whatsapp(demo) {
    const steps = [
      ['Consulta', 'Vi el Reel de Miraflor. ¿Tienen una salida para dos?',
        '¡Hola! Con gusto revisamos. ¿Qué día les queda bien?'],
      ['Cotización', 'Nos queda bien el sábado. ¿Qué está incluido?',
        'La propuesta incluye guía y recorrido de medio día. Te compartimos el precio total y qué llevar.'],
      ['Reserva', 'Gracias. Aceptamos la propuesta para dos.',
        '¡Listo! Confirmamos su reserva para dos. Les enviamos por aquí la hora, el punto de encuentro y el contacto de su guía.']
    ];
    switcher(demo, 'Pasos de la conversación', steps.map(([step]) => step), index => {
      const [, question, answer] = steps[index];
      return `<div class="wa-thread">
        <p class="wa-message"><b>Visitante</b>${question}</p>
        <p class="wa-message wa-sent"><b>Estelí Tours</b>${answer}</p>
      </div>`;
    });
  }

  function switcher(demo, label, options, render) {
    demo.innerHTML = `<div class="wa-demo-pills" role="group" aria-label="${label}">
      ${options.map((option, index) => `<button type="button" data-demo-option="${index}">${option}</button>`).join('')}
    </div><div class="red-demo-content" aria-live="polite"></div>`;
    const buttons = [...demo.querySelectorAll('[data-demo-option]')];
    const output = demo.querySelector('.red-demo-content');
    function select(index) {
      buttons.forEach((button, current) => button.setAttribute('aria-pressed', String(index === current)));
      output.innerHTML = render(index);
    }
    buttons.forEach((button, index) => button.addEventListener('click', () => select(index)));
    select(0);
  }

  return {cases};
})();
