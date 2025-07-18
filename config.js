import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
  ['5217227584934', 'jid', '𝐀𝐧𝐠𝐞𝐥', true],
  ['95138458116106', 'lid', '𝐀𝐧𝐠𝐞𝐥', true],
  ['5215565238431', 'jid', '𝐂𝐫𝐢𝐬𝐭𝐢𝐚𝐧', true],
  ['256237983817905', 'lid', '𝐂𝐫𝐢𝐬𝐭𝐢𝐚𝐧', true],
  ['50765609370'],
  ['50765609370'],
  ['584123989549']
]

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = `𝐒𝐡𝐚𝐝𝐨𝐰 - 𝐛𝐨𝐭 🍷`
global.author = '{\n "bot": {\n   "name": "𝐒𝐡𝐚𝐝𝐨𝐰 - 𝐛𝐨𝐭",\n     "author": "𝐂𝐫𝐢𝐬𝐭𝐢𝐚𝐧",\n   "status_bot": "active"\n }\n}'
global.wait = '𝐒𝐡𝐚𝐝𝐨𝐰 - 𝐛𝐨𝐭 🍷'
global.botname = '𝐒𝐡𝐚𝐝𝐨𝐰 - 𝐛𝐨𝐭 🍷'
global.textbot = `𝐒𝐡𝐚𝐝𝐨𝐰 𝐛𝐨𝐭 🍷`
global.listo = '𝐋𝐢𝐬𝐭𝐨 🍷'
global.namechannel = '𝐒𝐡𝐚𝐝𝐨𝐰 𝐛𝐨𝐭 🍷'
global.baileys = '@whiskeysockets/baileys'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = 'https://files.catbox.moe/5k7vwl.jpg'
global.miniurl = 'https://files.catbox.moe/5k7vwl.jpg'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.group = 'https://chat.whatsapp.com/GYOUzzKUAAq4aYgoa0pbzq?mode=r_c'
global.canal = 'https://whatsapp.com/channel/0029VbAj2nTCcW4ufY9dQ01N'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: botname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment        

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})