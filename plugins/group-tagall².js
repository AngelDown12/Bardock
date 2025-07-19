const prefijoABandera = {
  '52': '🇲🇽', '54': '🇦🇷', '55': '🇧🇷', '57': '🇨🇴', '58': '🇻🇪',
  '1': '🇺🇸', '44': '🇬🇧', '91': '🇮🇳', '34': '🇪🇸', '51': '🇵🇪',
  '56': '🇨🇱', '593': '🇪🇨', '502': '🇬🇹', '507': '🇵🇦',
  '1809': '🇩🇴', '1829': '🇩🇴', '1849': '🇩🇴'
};

function obtenerBandera(numero) {
  const prefijos = Object.keys(prefijoABandera).sort((a, b) => b.length - a.length);
  for (const p of prefijos) {
    if (numero.startsWith(p)) return prefijoABandera[p];
  }
  return '🌍';
}

const handler = async (m, { conn, participants, isAdmin, isOwner }) => {
  if (!m.isGroup) return;
  if (!isAdmin && !isOwner) return global.dfail?.('admin', m, conn);

  const total = participants.length;
  let texto = '*!  MENCION GENERAL  !*\n';
  texto += `*PARA ${total} MIEMBROS* 🗣️\n\n`;

  for (const user of participants) {
    const numero = user.id.split('@')[0];
    texto += `${obtenerBandera(numero)} @${numero}\n`;
  }

  await conn.sendMessage(m.chat, {
    video: { url: 'https://files.catbox.moe/gsyptn.mp4' },
    gifPlayback: true,
    caption: texto.trim(),
    mentions: participants.map(p => p.id)
  });
};

handler.customPrefix = /^(tagall|invocar|invocacion|invocación|todos|talibanes)$/i;
handler.command = new RegExp;
handler.group = true;
handler.admin = true;

export default handler;