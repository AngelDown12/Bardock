import { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, MessageRetryMap, makeCacheableSignalKeyStore, jidNormalizedUser, PHONENUMBER_MCC } from '@whiskeysockets/baileys'
import crypto from 'crypto'
import pino from 'pino'
import fs from 'fs'
import NodeCache from 'node-cache'
import { makeWASocket } from '../lib/simple.js'

let handler = async (m, { conn: parentConn, args, usedPrefix, command }) => {
  if (!m.isOwner) return

  let phoneNumber = m.sender.split('@')[0]
  let authFolder = crypto.randomBytes(10).toString('hex').slice(0, 8)
  let dirPath = `./serbot/${authFolder}`

  fs.mkdirSync(dirPath, { recursive: true })

  if (args[0]) {
    const decoded = Buffer.from(args[0], 'base64').toString("utf-8")
    fs.writeFileSync(`${dirPath}/creds.json`, JSON.stringify(JSON.parse(decoded), null, '\t'))
  }

  const { state, saveCreds } = await useMultiFileAuthState(dirPath)
  const { version } = await fetchLatestBaileysVersion()
  const msgRetryCounterCache = new NodeCache()

  const connectionOptions = {
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }))
    },
    msgRetryCounterCache,
    version,
    getMessage: async key => {
      let jid = jidNormalizedUser(key.remoteJid)
      let msg = await store.loadMessage?.(jid, key.id)
      return msg?.message || ""
    }
  }

  let conn = makeWASocket(connectionOptions)

  if (!conn.authState.creds.registered) {
    let cleaned = phoneNumber.replace(/\D/g, '')
    if (!Object.keys(PHONENUMBER_MCC).some(v => cleaned.startsWith(v))) {
      return parentConn.reply(m.chat, '❌ Número no válido para solicitar código.', m)
    }

    setTimeout(async () => {
      let code = await conn.requestPairingCode(cleaned)
      code = code?.match(/.{1,4}/g)?.join("-") || code

      let text = `🍷 *S U B  B O T - C Ó D I G O* 🍷\n\n` +
        `1. Abre WhatsApp del número que usaste\n` +
        `2. Toca los 3 puntos → Dispositivos vinculados\n` +
        `3. Selecciona "Vincular con el número de teléfono"\n` +
        `4. Escribe este código:\n\n` +
        `🔑 *${code}*\n\n` +
        `📝 *Nota:* Solo funciona para el número que pidió el código.`

      await parentConn.sendMessage(m.chat, { text }, { quoted: m })

      let reconect = Buffer.from(fs.readFileSync(`${dirPath}/creds.json`), 'utf-8').toString("base64")
      await parentConn.sendMessage(m.chat, {
        text: `Para reconectarte después, usa este comando:\n\n*${usedPrefix}${command} ${reconect}*`
      }, { quoted: m })
    }, 3000)
  }

  conn.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
    if (connection === 'open') {
      global.conns.push(conn)
      await parentConn.sendMessage(m.chat, {
        text: '✅ SubBot conectado correctamente.\n\nEste bot es temporal. Si el bot principal se reinicia, este SubBot se desconectará.'
      }, { quoted: m })
    }

    if (connection === 'close') {
      const code = lastDisconnect?.error?.output?.statusCode
      if (code !== DisconnectReason.loggedOut) {
        conn.ev.removeAllListeners()
        await parentConn.sendMessage(m.chat, { text: '❌ Conexión del SubBot cerrada.' }, { quoted: m })
      }
    }
  })
}
handler.help = ['code']
handler.tags = ['serbot']
handler.command = ['code']
handler.rowner = true

export default handler