/* Guided examples for the virtual session. */
const EsteliDemostraciones = (() => {
  const credits = '<a href="assets/esteli/CREDITOS.md" target="_blank" rel="noopener">Foto de Tisey · CC BY-SA 4.0</a>';
  const shots = [
    {label:'Plano abierto', image:'esteli-ciudad', alt:'Vista de Estelí desde El Tisey', title:'Ubicá al visitante', note:'Mostrá el paisaje antes de acercarte al sujeto. Aquí la vista de Estelí desde El Tisey le da un punto de referencia a la escena.'},
    {label:'Plano medio', image:'miraflor', alt:'Entrada al área protegida de Miraflor', title:'Mostrá una señal del recorrido', note:'Acercate al letrero o al guía para que el público entienda dónde empieza la experiencia.'},
    {label:'Detalle', image:'cascada', alt:'Agua en la cascada de Miraflor', title:'Cerrá con un detalle que se sienta', note:'Acercá el encuadre al agua para enseñar su textura y movimiento. Una misma secuencia puede unir paisaje, contexto y detalle.'}
  ];

  function shotsDemo(content) {
    content.innerHTML = `<div class="virtual-demo">
      <figure class="virtual-image"><img alt="">${credits}</figure>
      <div class="virtual-copy"><div class="virtual-tabs" role="group" aria-label="Tipos de plano">
      ${shots.map(({label},i)=>`<button type="button" data-shot="${i}">${label}</button>`).join('')}</div>
      <div class="virtual-shot-caption" aria-live="polite"><h2></h2><p></p></div></div>
    </div>`;
    const buttons = [...content.querySelectorAll('[data-shot]')];
    const image = content.querySelector('img');
    const caption = content.querySelector('.virtual-shot-caption');
    function select(i) {
      const shot = shots[i];
      buttons.forEach((button,j)=>button.setAttribute('aria-pressed',String(i===j)));
      image.src = `assets/esteli/${shot.image}.webp`;
      image.alt = shot.alt;
      image.dataset.shot = i;
      caption.querySelector('h2').textContent = shot.title;
      caption.querySelector('p').textContent = shot.note;
    }
    buttons.forEach((button,i)=>button.addEventListener('click',()=>select(i)));
    select(0);
  }
  function publication(content) {
    content.innerHTML = `<div class="virtual-demo virtual-post">
      <figure class="virtual-image"><img src="assets/esteli/cascada.webp" alt="Cascada de Miraflor en Estelí">${credits}</figure>
      <div class="virtual-copy">
        <div class="virtual-format">Estelí Tours <span>Feed · pieza de ejemplo</span></div>
        <h2>¿Primera vez en Miraflor?</h2>
        <p>Mirá cómo es el recorrido y qué conviene llevar para disfrutar la caminata.</p>
        <div class="virtual-post-action">Escribinos para consultar fechas y qué incluye.</div>
        <p class="virtual-metric"><strong>Qué medir</strong> · Consultas que preguntan por fecha o disponibilidad.</p>
      </div>
    </div>`;
  }
  return {shots:shotsDemo,publication};
})();
