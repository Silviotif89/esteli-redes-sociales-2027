/* Original teaching examples based on openers in official video guides. */
const EsteliGanchos = (() => {
  const businesses = [
    {
      id:'hoteles', name:'Hoteles',
      examples:[
        ['Pregunta útil','¿Viajás a Estelí con tu familia? Mirá cómo se acomoda el grupo.','Empezá con una toma general de la habitación y mostrá las camas.'],
        ['Escena en primera persona','Abrí la cortina y mirá cómo amanece en Estelí.','Usá la vista real desde la habitación que estás mostrando.'],
        ['Duda frecuente','¿Llegás tarde a Estelí? Así se coordina tu entrada.','Mostrá la entrada y explicá el horario que sí podés ofrecer.'],
        ['Recorrido breve','Así se llega desde la calle hasta tu habitación.','Mostrá el acceso y señalá si el trayecto tiene gradas.']
      ]
    },
    {
      id:'restaurantes', name:'Restaurantes',
      examples:[
        ['Pregunta local','¿Qué pedís si querés probar algo de acá?','Abrí con un plato del menú y contá qué lo vincula con la zona.'],
        ['Acción y sonido','Escuchá la tortilla cuando toca el comal.','Usá un plano cercano y el sonido real de la cocina.'],
        ['Duda frecuente','¿Pedís para compartir? Así se ve una porción servida.','Mostrá el plato llegando a la mesa para que se aprecie el tamaño.'],
        ['Revelación','Partilo y mirá qué lleva por dentro.','Abrí con el corte y nombrá los ingredientes principales.']
      ]
    },
    {
      id:'cafeterias', name:'Cafeterías',
      examples:[
        ['Acción y sonido','Escuchá el primer café de la mañana.','Mostrá el agua caer sobre el café y dejá que se oiga la preparación.'],
        ['Pregunta útil','¿Preferís un café suave o uno con más cuerpo?','Compará dos opciones reales de la carta y explicá la diferencia.'],
        ['Antes y después','Así cambia el color del grano con el tueste.','Mostrá los dos granos juntos, con luz similar para que se vea el cambio.'],
        ['Escena cercana','¿Café con rosquillas? Mirá cómo los servimos.','Mostrá el acompañamiento real que ofrecés con esa bebida.']
      ]
    },
    {
      id:'tours', name:'Tours',
      examples:[
        ['Revelación','Así se abre la vista cuando llegás al mirador.','Abrí con el paisaje y luego señalá dónde empieza el recorrido.'],
        ['Pregunta útil','¿Es tu primera caminata? Mirá este tramo antes de escoger ruta.','Mostrá el terreno real y explicá la dificultad del tramo.'],
        ['Lista breve','Dos cosas que llevaría a esta caminata.','Mostrá, por ejemplo, agua y calzado con agarre. Confirmá qué requiere esa ruta.'],
        ['Recorrido breve','¿Qué pasa desde que nos encontramos hasta el regreso?','Mostrá el punto de encuentro, una parada y cómo termina la salida.']
      ]
    },
    {
      id:'fincas', name:'Fincas turísticas',
      examples:[
        ['Escena con sonido','¿Qué se oye al llegar a la finca?','Dejá unos instantes de sonido ambiente mientras mostrás la entrada.'],
        ['Demostración','Así pasa el café de la planta a tu taza.','Mostrá los pasos que realmente forman parte de la visita.'],
        ['Pregunta útil','¿Venís con chavalos? Así es el camino de entrada.','Mostrá la superficie, desniveles y distancia con referencias claras.'],
        ['Contraste','Así se ve la finca antes y después de la lluvia.','Compará dos tomas del mismo lugar y aclarales qué pueden visitar.']
      ]
    },
    {
      id:'artesania', name:'Artesanía',
      examples:[
        ['Antes y después','Antes de ser una pieza, se veía así.','Abrí con el material y después mostrá la pieza terminada.'],
        ['Pregunta útil','¿Por qué estas dos piezas no se ven iguales?','Ponelas juntas y explicá qué parte cambia durante el trabajo a mano.'],
        ['Demostración','Mirá el detalle que más tiempo toma hacer.','Acercá la cámara a la herramienta y a la parte de la pieza que estás trabajando.'],
        ['Uso real','Así se ve esta pieza cuando la usás en casa.','Mostrá la escala y un uso concreto de la pieza terminada.']
      ]
    }
  ];

  const sources = [
    ['TikTok for Business · Guía para pequeños negocios','https://ads.tiktok.com/business/en/guides/video-advertising-guide'],
    ['Google Ads · Guía ABCD de video','https://support.google.com/google-ads/answer/14783551?hl=es']
  ];

  function render(container) {
    const bank = document.createElement('section');
    bank.className = 'hook-bank';
    bank.innerHTML = `<div class="hook-filters" role="group" aria-label="Tipo de negocio">
      ${businesses.map(({id,name})=>`<button class="hook-filter" type="button" data-hook-business="${id}" aria-pressed="false">${name}</button>`).join('')}
    </div>
    <p class="hook-status" role="status"></p>
    <div class="hook-grid"></div>
    <div class="hook-sources">
      <span>Guías consultadas</span>
      ${sources.map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${label} <span aria-hidden="true">↗</span></a>`).join('')}
    </div>`;
    container.replaceChildren(bank);
    const filters = [...bank.querySelectorAll('.hook-filter')];
    const status = bank.querySelector('.hook-status');
    const grid = bank.querySelector('.hook-grid');
    function select(index) {
      const {id, name, examples} = businesses[index];
      filters.forEach((button,i)=>button.setAttribute('aria-pressed', String(i===index)));
      bank.dataset.hookSelection = id;
      grid.innerHTML = examples.map(([mechanism, line, shot])=>`<article class="hook-card">
        <span class="hook-type">${mechanism}</span>
        <p class="hook-line">«${line}»</p>
        <p class="hook-shot">${shot}</p>
      </article>`).join('');
      status.textContent = `${examples.length} ejemplos para ${name.toLowerCase()}`;
    }
    filters.forEach((button,index)=>button.addEventListener('click',()=>select(index)));
    select(0);
  }

  return {render};
})();
