let handler = async (m) => {
  if (m.quoted?.fromMe) return;

  await m.reply(`💰 *¿Quieres tu propio bot como este?*

📌 *Para comprarme háblale a mi creador:*
👉 wa.me/5217227584934`);
};

handler.command = ['comprar'];
export default handler;