let handler = async (m, { conn }) => {
  const texto = `🍷 𝗛𝗢𝗟𝗔, 𝗘𝗦𝗧𝗘 𝗘𝗦 𝗨𝗡 𝗘𝗝𝗘𝗠𝗣𝗟𝗢 𝗖𝗢𝗡 𝗕𝗢𝗧𝗢𝗡𝗘𝗦
𝘀𝗲𝗹𝗲𝗰𝗰𝗶𝗼𝗻𝗮 𝘂𝗻𝗮 𝗼𝗽𝗰𝗶𝗼́𝗻:`;

  const botones = [
    { buttonId: '.estado', buttonText: { displayText: '📶 Estado del Bot' }, type: 1 },
    { buttonId: '.owner', buttonText: { displayText: '👑 Creador' }, type: 1 },
    { buttonId: 'menu_botones', buttonText: { displayText: '📜 Menú Completo' }, type: 1 }
  ];

  const buttonMessage = {
    text: texto,
    footer: '🌟 Shadow Bot 🍷',
    buttons: botones,
    headerType: 1
  };

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

handler.command = ['botones', 'menuinteractivo'];
export default handler;