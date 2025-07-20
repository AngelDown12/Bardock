if (m.text === '.info') {
  await conn.sendMessage(m.chat, { text: 'ℹ️ Este es un bot hecho con Baileys.' }, { quoted: m })
}
if (m.text === '.comandos') {
  await conn.sendMessage(m.chat, { text: '📄 Aquí van tus comandos:\n.menu\n.hola\n.adiós\n.y más...' }, { quoted: m })
}
if (m.text === '.estado') {
  await conn.sendMessage(m.chat, { text: '✅ El bot está funcionando correctamente.' }, { quoted: m })
}