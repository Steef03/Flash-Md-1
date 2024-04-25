const util = require('util');
const fs = require('fs-extra');
const { france } = require(__dirname + "/../framework/france");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const runtime = function (seconds) { 
 seconds = Number(seconds); 
 var d = Math.floor(seconds / (3600 * 24)); 
 var h = Math.floor((seconds % (3600 * 24)) / 3600); 
 var m = Math.floor((seconds % 3600) / 60); 
 var s = Math.floor(seconds % 60); 
 var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " d, ") : ""; 
 var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " h, ") : ""; 
 var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " m, ") : ""; 
 var sDisplay = s > 0 ? s + (s == 1 ? " second" : " s") : ""; 
 return dDisplay + hDisplay + mDisplay + sDisplay; 
 } 

france({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//france");
    var coms = {};
    var mode = "public";

    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }



 cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Africa/Nairobi');

// Create a date and time in EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭────✧𝐅𝐋𝐀𝐒𝐇-𝐌𝐃✧────◆
┃❃╭──────────────
┃❃│ Prefix : ${s.PREFIXE} 
┃❃│ User :  ${s.OWNER_NAME}
┃❃│ Time : ${temps}  
┃❃│ Platform : Linux
┃❃│ Date : ${date} 
┃❃│ Mode : ${mode}
┃❃│ Commands : ${cm.length}  
┃❃│ Ram : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())} 
┃❃│ Uptime : ${runtime(process.uptime())} 
┃❃╰───────────────
╰─────✧The-GOAT✧─────◆ \n`;

  let menuMsg=`  

*◇ FLASH-MD COMMANDS ◇*\n`;
 
  for (const cat in coms) {
        menuMsg += `
*╭────✿⁠${cat}✿⁠═⊷*`;
        for (const cmd of coms[cat]) {
        menuMsg += ` 
│❒ *${cmd}*`;
        }
        menuMsg += `
*╰═════════════⊷* \n`
    }

    menuMsg += `
◇ *THE FLASH MULTI DEVICE* ◇

   *Released: 22.2.2024*
   
 _Thanks For choosing FLASH-MD_

  Created by *France King ©²0²⁴*                                         
 ╰═════════════⊷
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "*📌France King*" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {

    repondre(infoMsg + menuMsg);

}

});
