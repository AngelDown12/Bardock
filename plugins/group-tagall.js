const prefijoABandera = {
  '52': '🇲🇽', '54': '🇦🇷', '55': '🇧🇷', '57': '🇨🇴', '58': '🇻🇪',
  '1': '🇺🇸', '44': '🇬🇧', '91': '🇮🇳', '34': '🇪🇸', '51': '🇵🇪',
  '56': '🇨🇱', '593': '🇪🇨', '502': '🇬🇹', '507': '🇵🇦',
  '1809': '🇩🇴', '1829': '🇩🇴', '1849': '🇩🇴'
};

const obtenerBandera = numero => {
  const prefijos = Object.keys(prefijoABandera).sort((a, b) => b.length - a.length);
  for (const p of prefijos) if (numero.startsWith(p)) return prefijoABandera[p];
  return '🌍';
};

const handler = async (m, { conn, participants, isAdmin, isOwner }) => {
  if (!m.isGroup || (!isAdmin && !isOwner)) return;

  let texto = '*!  MENCION GENERAL  !*\n';
  texto += `*PARA ${participants.length} MIEMBROS* 🗣️\n\n`;

  for (const u of participants) {
    const numero = u.id.split('@')[0];
    texto += `${obtenerBandera(numero)} @${numero}\n`;
  }

  await conn.sendMessage(m.chat, {
    text: texto.trim(),
    mentions: participants.map(p => p.id)
  });
};

handler.customPrefix = /^(tagall|invocar|invocacion|invocación|todos|talibanes)$/i;
handler.command = new RegExp;
handler.group = true;
handler.admin = true;

export default handler;