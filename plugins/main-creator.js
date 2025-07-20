import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn }) => {
  // Detecta texto o botón
  let id = m.text || m.message?.buttonsResponseMessage?.selectedButtonId || ''
  if (!/^(owner|creador)$/i.test(id)) return // Solo si es owner o creador

  if (m.quoted?.fromMe || m.isButton) return // Evita doble respuesta

  m.react('🍷')

  const imageUrl = 'https://files.catbox.moe/iydxk1.jpg'
  const numCreador = '5215565238431'
  const ownerJid = numCreador + '@s.whatsapp.net'
  const name = await conn.getName(ownerJid) || 'Alee'
  const about = (await conn.fetchStatus(ownerJid).catch(() => {}))?.status || `𝐒𝐨𝐲 𝐂𝐫𝐢𝐬𝐭𝐢𝐚𝐧, 𝐃𝐮𝐞𝐧̃𝐨 𝐝𝐞𝐥 𝐒𝐡𝐚𝐝𝐨𝐰 𝐁𝐨𝐭 🍷`
  const empresa = '𝐂𝐫𝐢𝐬𝐭𝐢𝐚𝐧 - 𝐒𝐞𝐫𝐯𝐢𝐜𝐢𝐨𝐬 𝐓𝐞𝐜𝐧𝐨𝐥𝐨́𝐠𝐢𝐜𝐨𝐬'
  const instagramUrl = 'https://www.instagram.com/bki_hm66'

  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${empresa};
TITLE:CEO & Fundador
TEL;waid=${numCreador}:${new PhoneNumber('+' + numCreador).getNumber('international')}
EMAIL:correo@empresa.com
URL:${instagramUrl}
NOTE:${about}
ADR:;;Dirección de tu empresa;;;;
X-ABADR:ES
X-ABLabel:Dirección Web
X-ABLabel:Correo Electrónico
X-ABLabel:Teléfono de contacto
X-WA-BIZ-NAME:${name}
X-WA-BIZ-DESCRIPTION:${about}
END:VCARD`.trim()

  const textbot = '🍷 𝐒𝐡𝐚𝐝𝐨𝐰 𝐁𝐨𝐭 🍷'
  const dev = 'Cristian'

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: name,
      contacts: [{ vcard }]
    },
    contextInfo: {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999,
      externalAdReply: {
        title: textbot,
        body: dev,
        thumbnailUrl: imageUrl,
        sourceUrl: instagramUrl,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}

handler.command = new RegExp
handler.customPrefix = /^(owner|creador)$/i

export default handler