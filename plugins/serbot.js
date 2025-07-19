import {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  jidNormalizedUser,
  PHONENUMBER_MCC
} from '@whiskeysockets/baileys'
import moment from 'moment-timezone'
import NodeCache from 'node-cache'
import readline from 'readline'
import crypto from 'crypto'
import fs from 'fs'
import pino from 'pino'
import { makeWASocket } from '../lib/simple.js'

if (!(global.conns instanceof Array)) global.conns = []

let handler = async (m, { conn: _conn, args, usedPrefix, command }) => {
  if (!global.conn || !global.conn.user) {
    return m.reply('⚠️ El bot principal no está conectado. Espera a que se inicie correctamente.')
  }

  let parent = args[0] === 'plz' ? _conn : global.conn

  if (!(args[0] === 'plz' || _conn.user.jid === global.conn.user.jid)) {
    return m.reply(`❌ Este comando solo puede ser usado en el bot principal.\n\nEscribe: *${usedPrefix}code*`)
  }

  async function serbot() {
    const authFolder = crypto.randomBytes(10).toString('hex').slice(0, 8)
    const folderPath = `./serbot/${authFolder}`

    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true })

    if (args[0] && args[0] !== 'plz') {
      const credsJson = Buffer.from(args[0], 'base64').toString('utf-8')
      fs.writeFileSync(`${folderPath}/creds.json`, JSON.stringify(JSON.parse(credsJson), null, 2))
    }

    const { state, saveCreds } = await useMultiFileAuthState(folderPath)
    const { version } = await fetchLatestBaileysVersion()

    let conn = makeWASocket({
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }))
      },
      browser: ['Ubuntu', 'Chrome', '20.0.04'],
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: async () => ({}),
      msgRetryCounterCache: new NodeCache(),
      version
    })

    conn.isInit = false

    conn.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, isNewLogin } = update
      const code = lastDisconnect?.error?.output?.statusCode

      if (isNewLogin) conn.isInit = true

      if (connection === 'open') {
        global.conns.push(conn)
        await parent.reply(m.chat, '✅ Sub bot conectado exitosamente.', m)

        // Enviar sesión en base64 si no usó código
        if (!args[0] || args[0] === 'plz') {
          const credsFile = fs.readFileSync(`${folderPath}/creds.json`)
          const base64Creds = Buffer.from(credsFile).toString('base64')
          await parent.sendMessage(conn.user.jid, {
            text: `${usedPrefix}${command} ${base64Creds}`
          }, { quoted: m })
        }
      }

      if (connection === 'close') {
        if (code !== DisconnectReason.loggedOut) {
          parent.sendMessage(m.chat, { text: '⚠️ Conexión perdida. Intentando reconectar...' }, { quoted: m })
          try {
            conn.ws.close()
          } catch { }
          global.conns = global.conns.filter(c => c !== conn)
        }
      }
    })

    // Pairing Code si no hay sesión
    if (!conn.authState.creds.registered) {
      const phoneNumber = m.sender.split('@')[0]
      const cleaned = phoneNumber.replace(/[^0-9]/g, '')
      if (!Object.keys(PHONENUMBER_MCC).some(k => cleaned.startsWith(k))) return m.reply('Número no válido para código')

      try {
        const code = await conn.requestPairingCode(cleaned)
        const formatted = code.match(/.{1,4}/g)?.join('-')
        await parent.reply(m.chat, `🔑 Tu código de emparejamiento:\n\n${formatted}`, m)
      } catch (e) {
        console.error(e)
        await parent.reply(m.chat, '❌ Error generando el código de emparejamiento', m)
      }
    }

    conn.ev.on('creds.update', saveCreds)
  }

  serbot()
}

handler.help = ['code']
handler.tags = ['serbot']
handler.command = ['codebot', 'codebotsisked', 'codebotraro']
handler.rowner = false

export default handler