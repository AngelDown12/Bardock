const handler = async (m, { conn }) => {
  const texto = `╭━━━〔 𝗠𝗘𝗡𝗨 𝗥𝗔𝗣𝗜𝗗𝗢 〕━━⬣
┃🍷 𝙷𝚘𝚕𝚊, 𝚎𝚜𝚝𝚘 𝚎𝚜 𝚞𝚗 𝚖𝚎𝚗𝚞 𝚍𝚎𝚖𝚘 🍷
┃
┃🍷 𝙲𝚘𝚖𝚊𝚗𝚍𝚘 𝟷
┃🍷 𝙲𝚘𝚖𝚊𝚗𝚍𝚘 𝟸
┃🍷 𝙲𝚘𝚖𝚊𝚗𝚍𝚘 𝟹
╰━━━━━━━━━━━━━━━━⬣`;

  const botones = [
    { buttonId: '.estado', buttonText: { displayText: '📶 Estado del Bot' }, type: 1 },
    { buttonId: '.owner', buttonText: { displayText: '👑 Creador' }, type: 1 },
    { buttonId: '.menuc', buttonText: { displayText: '📜 Menú Completo' }, type: 1 }
  ];

  const buttonMessage = {
    text: texto,
    footer: '🍷 𝙱𝚘𝚝 𝚣𝚣𝚣 🍷',
    buttons: botones,
    headerType: 1
  };

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

handler.customPrefix = /^(menu|ayuda|help)$/i;
handler.command = new RegExp;
export default handler;