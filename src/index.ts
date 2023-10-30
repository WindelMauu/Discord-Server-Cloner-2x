import Discord from "discord.js-selfbot-v13";
import readline from "readline";
import dotenv from "dotenv"; 
import gradient from "gradient-string";
import { choiceinit, menutext, creatorname } from "./utils/func";

dotenv.config();

export const client = new Discord.Client({
  checkUpdate: false,
  patchVoice: true, 
  partials: [],
});

export const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const token = process.env.TOKEN;

client.on("ready", async () => {
  menutext(client);
  choiceinit(client);
  const unixTimestamp = 1677642874;
  const dateFromTimestamp = new Date(unixTimestamp * 1000);
  const r = new Discord.RichPresence()
    .setApplicationId('1146949248617828455')
    .setType('PLAYING')
    .setURL('https://discord.gg/infinite-community-1014921352500756500')
    .setName('RCN Shop')
    .setState('Running...')
    .setDetails('The best server about selfbots and bots')
    .setAssetsLargeImage('https://media.discordapp.net/attachments/1077298432424804382/1168160102814072922/Logo_para_Estancia_Infantil.png?ex=6550c0df&is=653e4bdf&hm=1f560ab9cf0db298c78838acd88203da50014ddc0fafc91b35ed29ad7c571291&=')
    .setAssetsLargeText('RCN Shop')
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1077298432424804382/1168160102814072922/Logo_para_Estancia_Infantil.png?ex=6550c0df&is=653e4bdf&hm=1f560ab9cf0db298c78838acd88203da50014ddc0fafc91b35ed29ad7c571291&=')
    .setAssetsSmallText('Join')
    .setStartTimestamp(dateFromTimestamp)
    .addButton('Join', 'https://discord.gg/hcR6xuZePq');
  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" });
});

client.once("finish", (event) => {
  client.user.setActivity();
});

if (!token) {
  console.clear();
  creatorname();
  rl.question(gradient(["purple", "pink"])("Inserta tu token de Discord (Consejo: una vez que el token se coloque en el .env, ya no tendrás esta pregunta)\n» "), (input) => {
    if (input.trim() === '') {
      console.log(gradient(["red", "orange"])("El token fue devuelto vacío."));
      process.kill(1);
    } else {
      client.login(input)
        .catch((error) => {
          if (error.message === 'An invalid token was provided.') {
            console.clear();
            console.log(gradient(["red", "orange"])("Este token no existe (Invalid token)"));
          } else {
            console.clear();
            console.error(gradient(["red", "orange"])(`Error al iniciar sesión: ${error.message}`));
          }
        });
    }
  });
} else {
  console.clear();
  client.login(token)
    .catch((error) => {
      console.clear();
      if (error.message === 'An invalid token was provided.') {
        console.log(gradient(["red", "orange"])("Este token no existe (Invalid token)"));
      } else {
        console.clear();
        console.error(gradient(["red", "orange"])(`Error al iniciar sesión: ${error.message}`));
      }
    });
}
export type Translations = {
  en: { [key: string]: string };
  esp: { [key: string]: string };
};
// fiquei com preguiça de utilizar tudo isso
export const translations: Translations = {
  en: {
    optionPrompt: 'Option (Type "back" to go back): ',
    menuText: `Warn: The English version does not have complete translations\n1 - Clone everything to an existing server\n2 - Clone everything to a server the cloner will create\n3 - Clone everything to a server the cloner will create and generate a template\n5 - Account information\n6 - Server information by ID\n7 - Official Discord Server\n8 - Switch language`,
    cloneInProgress: '> Cloning in progress...',
    returnnull: 'No response...',
    yandn: ' (1 - Yes, 2 - No): ',
    messagesPerChannel: 'How many messages per channel do you want to clone? (This function is temporarily disabled): ',
    saveToJson: 'Do you want to save to JSON? (1 - Yes, 2 - No): ',
    beautifyJson: 'Do you want to beautify the JSON? (1 - Yes, 2 - No): ',
    ignoreOptions: 'Enter what you want to ignore (e.g., emojis, channels, roles): ',
    reconfigure: 'Do you want to reconfigure? (1 - Yes, 2 - No, 3 - Back): ',
    invalidOption: 'This option is not defined',
    cloneCompleted: '> Cloning completed!',
    configTime: '> Configuration time: ',
    error2: 'An error occurred (You can report this error on our discord):\n',
    undefinedfunc: 'Option not set manually',
    ServerID: 'Enter the ID of the server you want to clone:',
    ServerID2: 'Enter your server ID (Server for which you have an administrator role or ownership):',
    clonedChannels: '> Number of cloned channels: ',
    errorCount: '> Error count during cloning: ',
    enterServerId: 'Enter the server ID: ',
    loadInProgress: '> Loading in progress...',
    loadTime: '> Loading time: ',
    pressEnter: 'Press "ENTER" to continue...',
    guildName: 'Server Name: ',
    guildDescription: 'Server Description: ',
    memberCount: 'Number of Members: ',
    channelCount: 'Number of Channels: ',
    createdDate: 'Created at: ',
    guildId: 'Server ID: ',
    iconUrl: 'Server Icon URL: ',
    splashUrl: 'Server Splash URL: ',
    discoverySplashUrl: 'Server Discovery Splash URL: ',
    serverFeatures: 'Server Features: ',
    emojisCount: 'Number of Emojis: ',
    awaitenter: 'click "ENTER" to continue...',
    stickersCount: 'Number of Stickers: ',
  },
  esp: {
    optionPrompt: 'Opción (Escriba "atrás" para regresar): ',
    yandn: '(1 - Sí, 2 - No): ',
    ServerID: 'Ingrese el ID del servidor que desea clonar: ',
    undefinedfunc: 'Opción no configurada manualmente',
    returnnull: 'Ninguna respuesta...',
    awaitenter: 'Haga clic en "ENTRAR" para continuar...',
    ServerID2: 'Ingrese su ID de servidor (Servidor para el cual tiene rol de administrador o propiedad):',
    menuText: `1 - Clonar todo en un servidor ya creado\n2 - Clona todo en un servidor que creará el clonador\n3 - Clona todo en un servidor que el clonador creará y generará una plantilla\n5 - Información de la cuenta\n6 - Información del servidor por ID\n7 - Servidor oficial de Discord\n8 - Cambiar idioma`,
    cloneInProgress: '> Clonación en progreso...',
    messagesPerChannel: '¿Cuántos mensajes por canal quieres clonar? (Esta función está temporalmente deshabilitada): ',
    saveToJson: '¿Quieres guardar en JSON? (1 - Sí, 2 - No): ',
    beautifyJson: '¿Quieres formatear el JSON? (1 - Sí, 2 - No): ',
    ignoreOptions: 'Ingresa lo que deseas ignorar (por ejemplo, emojis, canales, títulos de trabajo): ',
    reconfigure: '¿Quieres reconfigurar? (1 - Sí, 2 - No, 3 - Atrás): ',
    invalidOption: 'Esta opción no está definida',
    cloneCompleted: '> ¡Clonación completa!',
    configTime: '> Tiempo de configuración: ',
    clonedChannels: '> Número de canales clonados: ',
    errorCount: '> Recuento de errores durante la clonación: ',
    enterServerId: 'Ingrese la identificación del servidor: ',
    loadInProgress: '> Cargando en progreso...',
    loadTime: '> Tiempo de carga: ',
    pressEnter: 'Presione "ENTER" para continuar...',
    guildName: 'Nombre del servidor: ',
    guildDescription: 'Descripción del servidor: ',
    memberCount: 'Número de miembros: ',
    error2: 'Se produjo un error (puede informar este error en nuestro discord):\n',
    channelCount: 'Número de canales: ',
    createdDate: 'Creado en: ',
    guildId: 'ID del servidor: ',
    iconUrl: 'URL del icono del servidor: ',
    splashUrl: 'URL de presentación del servidor: ',
    discoverySplashUrl: 'URL de presentación de descubrimiento del servidor: ',
    serverFeatures: 'Características del servidor: ',
    emojisCount: 'Número de emojis: ',
    stickersCount: 'Número de pegatinas: ',
  },
};
