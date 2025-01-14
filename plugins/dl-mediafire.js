const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');




cmd({
  pattern: 'mediafirepro',
  desc: 'Download MediaFire files',
  category: 'download',
  filename: __filename
}, async (conn, mek, m, {
  text,
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!text) return reply(`*Example*: ${command} https://www.mediafire.com/file/n6tgcrktbnov1oy/Queen_Anita-V4.zip/file`);

    await reply('> *Processing...*');

    const apiUrl = `https://api.davidcyriltech.my.id/mediafire?url=${encodeURIComponent(text)}`;

    const apiResponse = await axios.get(apiUrl);

    if (apiResponse.data && apiResponse.data.downloadLink) {
      const { fileName, mimeType, downloadLink } = apiResponse.data;

      await conn.sendMessage(m.chat, {
        document: { url: downloadLink },
        mimetype: mimeType,
        fileName: fileName,
        caption: `📦 *File Name:* ${fileName}\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ ᴏғᴄ`
      }, { quoted: m });
    } else {
      reply(`*Failed to fetch file details! Please check the MediaFire URL and try again.*`);
    }
  } catch (error) {
    console.error('Error during MediaFire command:', error);
    reply(`*An error occurred while processing your request. Please try again later.*`);
  }
});