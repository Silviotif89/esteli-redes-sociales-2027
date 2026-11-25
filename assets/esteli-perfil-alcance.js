/* Practice comparisons for the opening slide of the tourism workshop. */
const EsteliPerfilAlcance = (() => {
  const profileNetworks = {
    facebook: {
      label: 'Facebook',
      defaultType: 'pagina',
      types: {
        personal: {
          title: 'Perfil personal',
          purpose: 'Representa a una persona',
          benefits: ['Conecta con amistades y familiares.', 'Permite elegir el público de cada publicación personal.'],
          exampleName: 'Ana, guía local',
          example: 'Utiliza su perfil para compartir fotos de un paseo con sus amistades y decidir quién puede verlas.',
          source: ['Meta · Selección del público', 'https://about.fb.com/ltam/news/2017/01/presentamos-una-nueva-version-de-aspectos-basicos-de-privacidad/']
        },
        pagina: {
          title: 'Página de negocio',
          purpose: 'Representa a un negocio o una marca',
          benefits: ['Muestra la categoría, el horario, la ubicación y los datos de contacto.', 'Permite asignar accesos al equipo, consultar estadísticas y crear anuncios.'],
          exampleName: 'Estelí Tours',
          example: 'Publica los servicios de la operadora y añade un botón de contacto para recibir consultas sobre rutas, fechas y cupos.',
          source: ['Meta · Crear una Página', 'https://secure.facebook.com/business/learn/video/create-facebook-page']
        },
        profesional: {
          title: 'Perfil en modo profesional',
          purpose: 'Desarrolla una audiencia pública desde el perfil personal',
          benefits: ['Ofrece estadísticas sobre el contenido y la audiencia.', 'Permite seguir publicando para amistades o para el público según la audiencia elegida.'],
          exampleName: 'Ana, guía y creadora',
          example: 'Publica videos educativos de senderismo para sus seguidores y revisa cuáles despiertan más interés.',
          source: ['Meta · Modo profesional', 'https://about.fb.com/news/2023/06/helping-creators-get-discovered-and-earn-money-on-facebook/']
        }
      }
    },
    instagram: {
      label: 'Instagram',
      defaultType: 'empresa',
      types: {
        personal: {
          title: 'Cuenta personal',
          purpose: 'Comparte contenido a título personal',
          benefits: ['Permite elegir entre una cuenta pública o privada.', 'En una cuenta privada, se aprueban las solicitudes de seguimiento.'],
          exampleName: 'Ana en Estelí',
          example: 'Comparte fotos personales de su viaje con las personas que aprueba como seguidoras.',
          source: ['Meta · Privacidad en Instagram', 'https://about.fb.com/news/2021/07/instagram-safe-and-private-for-young-people/']
        },
        empresa: {
          title: 'Cuenta profesional · Empresa',
          purpose: 'Presenta un establecimiento o servicio',
          benefits: ['Permite mostrar una categoría y opciones de contacto.', 'Da acceso al panel profesional y a estadísticas del contenido.'],
          exampleName: 'Estelí Tours',
          example: 'Comparte un carrusel con el itinerario y usa el perfil como punto de contacto para solicitar información.',
          source: ['Meta · Cuenta de empresa en Instagram', 'https://en-gb.facebook.com/business/learn/lessons/setting-up-instagram-business-account']
        },
        creador: {
          title: 'Cuenta profesional · Creador',
          purpose: 'Apoya a personas que crean contenido público',
          benefits: ['Da acceso al panel profesional y a estadísticas de audiencia.', 'Ayuda a evaluar qué videos, fotografías o publicaciones interesan más a la comunidad.'],
          exampleName: 'Ana, creadora de viajes',
          example: 'Prueba una serie de Reels sobre cómo prepararse para una caminata y revisa cuáles generan más interés.',
          source: ['Meta · Panel profesional de Instagram', 'https://about.fb.com/news/2024/10/best-practices-education-hub-creators-instagram/']
        }
      }
    }
  };

  const reachChannels = [
    {
      id: 'organic', title: 'Alcance orgánico', type: 'Distribución sin pauta', initial: 120,
      description: 'Cuentas distintas que vieron contenido distribuido sin pagar por su difusión. Una publicación puede llegar a seguidores y a otras cuentas mediante recomendaciones o publicaciones compartidas.',
      source: ['Meta · Recomendaciones en Facebook e Instagram', 'https://about.fb.com/news/2023/06/how-ai-ranks-content-on-facebook-and-instagram/']
    },
    {
      id: 'paid', title: 'Alcance pagado', type: 'Distribución con pauta', initial: 420,
      description: 'Cuentas distintas que vieron el anuncio. La entrega depende, entre otros factores, del público, el presupuesto, la duración y la subasta publicitaria.',
      source: ['Meta · Subasta de anuncios', 'https://secure.facebook.com/business/ads/ad-auction']
    }
  ];
  const sampleAudience = 1000;
  const integer = new Intl.NumberFormat('es-NI');

  function sourceLink([label, url]) {
    return `<a class="pl-source" href="${url}" target="_blank" rel="noopener">${label} <span aria-hidden="true">↗</span></a>`;
  }

  function shell(current, content) {
    return `<section class="profile-lab">
      <nav class="pl-nav" aria-label="Comparaciones del perfil">
        <a href="#2/perfil"${current === 'perfil' ? ' aria-current="page"' : ''}>Tipos de perfil</a>
        <a href="#2/alcance"${current === 'alcance' ? ' aria-current="page"' : ''}>Orgánico y pagado</a>
      </nav>
      ${content}
    </section>`;
  }

  function renderProfiles(demo) {
    demo.innerHTML = shell('perfil', `<div class="pl-intro">
      <div><h2>La cuenta adecuada para cada propósito</h2><p>Compare qué representa cada opción y qué herramientas aporta a un negocio turístico.</p></div>
      <div class="pl-switch" aria-label="Red social" role="group">
        ${Object.entries(profileNetworks).map(([key, network]) => `<button type="button" data-profile-network="${key}">${network.label}</button>`).join('')}
      </div>
    </div>
    <div class="pl-identity" aria-label="Tipos de cuenta" role="group"></div>
    <div class="pl-example" aria-live="polite"></div>`);

    const networkButtons = [...demo.querySelectorAll('[data-profile-network]')];
    const identities = demo.querySelector('.pl-identity');
    const example = demo.querySelector('.pl-example');

    function selectType(network, key) {
      const type = network.types[key];
      for (const button of identities.querySelectorAll('button')) {
        button.setAttribute('aria-pressed', String(button.dataset.profileType === key));
      }
      example.innerHTML = `<div>
        <h3>Ventajas de esta opción</h3>
        <ul>${type.benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>
        ${sourceLink(type.source)}
      </div><div class="pl-example-case">
        <span>Ejemplo del taller</span><h3>${type.exampleName}</h3><p>${type.example}</p>
      </div>`;
    }

    function selectNetwork(key) {
      const network = profileNetworks[key];
      for (const button of networkButtons) {
        button.setAttribute('aria-pressed', String(button.dataset.profileNetwork === key));
      }
      identities.innerHTML = Object.entries(network.types).map(([id, type]) => `<button type="button" data-profile-type="${id}">
        <strong>${type.title}</strong><span>${type.purpose}</span>
      </button>`).join('');
      for (const button of identities.querySelectorAll('button')) {
        button.addEventListener('click', () => selectType(network, button.dataset.profileType));
      }
      selectType(network, network.defaultType);
    }

    for (const button of networkButtons) {
      button.addEventListener('click', () => selectNetwork(button.dataset.profileNetwork));
    }
    selectNetwork('facebook');
  }

  function renderReach(demo) {
    const audienceLabel = integer.format(sampleAudience);
    demo.innerHTML = shell('alcance', `<div class="pl-intro">
      <div><h2>¿A cuántas cuentas llegó la publicación?</h2><p>Use los controles para comparar ambos canales dentro de un mismo público hipotético de <strong>${audienceLabel} cuentas</strong>.</p></div>
    </div>
    <div class="pl-reach-comparison">
      ${reachChannels.map(channel => `<article class="pl-channel pl-${channel.id}">
        <span>${channel.type}</span><h3>${channel.title}</h3><p>${channel.description}</p>
        <label for="pl-reach-${channel.id}">Cuentas alcanzadas en el ejercicio</label>
        <input type="range" id="pl-reach-${channel.id}" min="0" max="${sampleAudience}" step="10" value="${channel.initial}">
        <output class="pl-reach-output" for="pl-reach-${channel.id}">
          <strong></strong><span></span>
        </output>
        ${sourceLink(channel.source)}
      </article>`).join('')}
    </div>
    <div class="pl-reading">
      <p><strong>Cómo interpretar el porcentaje.</strong> Divida las cuentas alcanzadas entre las ${audienceLabel} cuentas del ejercicio y multiplique por 100. Las cifras son hipotéticas. Meta no garantiza un porcentaje fijo para ninguno de los dos canales.</p>
      <p><strong>Para medir el total.</strong> Consulte el alcance total del mismo período en las estadísticas. Algunas cuentas pueden aparecer tanto en el alcance orgánico como en el pagado. ${sourceLink(['Meta · Medición del alcance', 'https://developers.facebook.com/docs/graph-api/reference/insights/'])}</p>
    </div>
    <details class="pl-history">
      <summary>Referencia histórica de Facebook (2012–2014)</summary>
      <div class="pl-history-notes">
        <p><strong>2012 · Cerca del 16 % orgánico y 50 % pagado en una semana.</strong> Un folleto de Facebook señalaba que una Página podía llegar a alrededor del 16 % de sus fans por semana y estimaba un 50 % semanal con Reach Generator, un producto publicitario de entonces. ${sourceLink(['Folleto citado en el expediente de 2012', 'https://democraticmedia.org/assets/resources/SeeborgFacebookObjectionJuly3012.pdf#page=5'])}</p>
        <p><strong>2013–2014 · Del 12,05 % al 6,15 %.</strong> El alcance orgánico medio bajó entre octubre de 2013 y febrero de 2014 en 106 páginas de marcas analizadas por Social@Ogilvy. Las cifras describen esa muestra y ese período. ${sourceLink(['Informe de Social@Ogilvy de 2014', 'https://www.techenet.com/wp-content/uploads/2014/03/Facebook-Zero-a-Social%40Ogilvy-White-Paper.pdf'])}</p>
      </div>
    </details>`);

    for (const channel of reachChannels) {
      const input = demo.querySelector(`#pl-reach-${channel.id}`);
      const result = input.nextElementSibling;
      const render = () => {
        const count = Number(input.value);
        const percent = count / sampleAudience * 100;
        const countLabel = `${integer.format(count)} de ${audienceLabel} cuentas`;
        result.querySelector('strong').textContent = `${integer.format(percent)} %`;
        result.querySelector('span').textContent = countLabel;
        input.style.setProperty('--pl-fill', `${percent}%`);
        input.setAttribute('aria-valuetext', countLabel);
      };
      input.addEventListener('input', render);
      render();
    }
  }

  return {cases: {
    perfil: {title: 'Perfil personal y Página de negocio', render: renderProfiles},
    alcance: {title: 'Alcance orgánico y pagado', render: renderReach}
  }};
})();
