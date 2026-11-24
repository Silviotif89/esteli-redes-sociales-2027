/* Lesson metadata and the mobile simulators for slide 11. */
const EsteliRedes = {
  cases: {
    facebook: {
      title: 'Facebook',
      intro: 'Probá cómo se vería una publicación de Estelí Tours en el feed de un visitante.',
      tip: 'Elegí una foto que muestre la experiencia. Confirmá fecha, tarifa y cupos antes de publicar.',
      render: demo => EsteliFeedChat.facebook(demo)
    },
    instagram: {
      title: 'Instagram',
      intro: 'Cambiá entre Reel, Historia y Carrusel para presentar una misma salida de tres formas.',
      tip: 'Usá el Reel para despertar curiosidad, la Historia para conversar y el Carrusel para guardar los detalles.',
      render: demo => EsteliVideoSim.instagram(demo)
    },
    tiktok: {
      title: 'TikTok',
      intro: 'Reproducí un guion vertical de 15 segundos sobre Miraflor y recorré las tomas.',
      tip: 'Empezá con la toma más atractiva y agregá subtítulos para que se entienda sin sonido.',
      render: demo => EsteliVideoSim.tiktok(demo)
    },
    whatsapp: {
      title: 'WhatsApp Business',
      intro: 'Hacé una consulta y mirá cómo Estelí Tours guía la conversación hasta confirmar la reserva.',
      tip: 'Antes de confirmar, revisá cuántas personas vienen, el precio total y el punto de encuentro.',
      render: demo => EsteliFeedChat.whatsapp(demo)
    }
  }
};
