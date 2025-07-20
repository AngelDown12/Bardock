import fetch from 'node-fetch'

export async function before(m, { conn }) {
  // Carga la miniatura desde una URL externa
  let img = await (await fetch('https://files.catbox.moe/wwa311.jpg')).buffer()

  // Tarjeta visual sin mostrar canal, solo ícono y enlace
  global.adReply = {
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true, // muestra como sugerencia
        title: '𝐁𝐚𝐫𝐝𝐨𝐜𝐤 𝐁𝐨𝐭 🔥', // título grande
        body: 'Sígueme en Instagram 😼', // texto pequeño
        mediaType: 1, // tipo de media
        thumbnail: img, // imagen miniatura (buffer)
        renderLargerThumbnail: true, // imagen grande
        sourceUrl: 'https://www.instagram.com/baki_hm66?igsh=cHk1eW1uZXF2ZWsy' // ENLACE al tocar
      }
    }
  }
}