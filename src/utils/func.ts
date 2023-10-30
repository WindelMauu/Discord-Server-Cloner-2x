import gradient from "gradient-string";
import backup from "../src/index";
import boxen from "boxen";
import { rl, translations } from "../index";
import chalk from "chalk";
import { Client } from "discord.js-selfbot-v13";

export function choiceinit(client: Client) {
  const clearall = () => {
    console.clear();
    menutext(client);
    choiceinit(client);
  };
  rl.question(
    gradient(["purple", "pink"])(t("optionPrompt")),
    async (choice) => {
      choice = choice.trim();
      switch (choice) {
        case "":
        case "back":
          clearall();
          break;
        case "1":
        case "2":
        case "3":
          console.clear();
          await client.guilds.fetch();
          const option = choice === "1" ? "Clonerop2choice" : choice === "2" ? "Clonerop1choice" : "Clonerop3choice";
          configop(client, option);
          break;
        case "6":
          console.clear();
          serverinfo(client);
          break;
        case "7":
          console.clear();
          creatorname();
          console.log(
            gradient(["red", "purple"])(
              "Link: https://discord.gg/zECBBtM2VR"
            )
          );
          awaitenter(client);
          break;
        case "5":
          console.clear();
          infouser(client);
          break;
        case "8":
          console.clear();
          Channgelang(client);
          break;
        default:
          clearall();
      }
    }
  );
}

let langat: "esp" | "en" = "esp";

export function setlang(lang: "en" | "esp") {
  langat = lang;
}

export function t(key: string): string {
  return translations[langat][key] || key;
}
export function creatorname() {
  console.log(
    gradient(["#ff4500", "#ffa500", "#ff6347"])(`
██████╗┼┼█████╗┼███╗┼┼██╗
██╔══██╗██╔══██╗████╗┼██║
██████╔╝██║┼┼╚═╝██╔██╗██║
██╔══██╗██║┼┼██╗██║╚████║
██║┼┼██║╚█████╔╝██║┼╚███║
╚═╝┼┼╚═╝┼╚════╝┼╚═╝┼┼╚══╝
┼██████╗██╗┼┼██╗┼█████╗┼██████╗┼
██╔════╝██║┼┼██║██╔══██╗██╔══██╗
╚█████╗┼███████║██║┼┼██║██████╔╝
┼╚═══██╗██╔══██║██║┼┼██║██╔═══╝┼
██████╔╝██║┼┼██║╚█████╔╝██║┼┼┼┼┼
╚═════╝┼╚═╝┼┼╚═╝┼╚════╝┼╚═╝┼┼┼┼┼


    `)
  );


}

export function menutext(client: Client) {
  console.clear();
  creatorname();
  console.log(gradient(["#ff4500", "#ffa500", "#ff6347"])(t("menuText")));
  choiceinit(client);
}

export function infouser(client: Client) {
  console.clear();
  creatorname();

  console.log(
    gradient(["#ff4500", "#ffa500", "#ff6347"])(
      `Nome da conta: ${client.user.username}\nNome global da conta: ${client.user.globalName
      }\nAvatar ${client.user.avatarURL({
        format: "png",
        dynamic: true,
        size: 1024,
      })}\nBanner: ${client.user.bannerURL({
        format: "png",
        dynamic: true,
      })}\nID: ${client.user.id}\nData de criação da conta: ${client.user.createdAt
      }\nGuildas: ${client.guilds.cache.size} \nNitro?: ${client.user.nitroType
      }\nEmail: ${client.user.emailAddress}\nCelular: ${client.user.phoneNumber
      } `
    )
  );
  awaitenter(client);
}

export async function Cloner(
  client: Client,
  configOptions: {
    maxMessagesPerChannel: number;
    jsonSave: boolean;
    jsonBeautify: boolean;
    doNotBackup: string[];
  },
  cloneOption: number,
  createNewServer?: boolean
) {
  let guildId1: string;
  let GUILD_ID: string = '';
  const starttime = process.hrtime();
  let errors = 0;
  let clonedall = 0;
  const clearall = () => {
    console.clear();
    menutext(client);
    choiceinit(client);
  };

  const proceedWithCloning = async () => {
    try {
      await client.guilds.fetch();
      const guild = client.guilds.cache.get(guildId1);

      if (!guild) {
        console.error(gradient(["red", "darkred"])(
          `Esta ID no existe o no estás en él, intenta corregir el ID`
        ));
        errors++;
        rl.close();
        return;
      }

      if (createNewServer) {
        const newGuild = await client.guilds.create(
          'RCN Shop Cloner',
          {
            icon:
              'https://cdn.discordapp.com/attachments/1077298432424804382/1168160102814072922/Logo_para_Estancia_Infantil.png?ex=6550c0df&is=653e4bdf&hm=1f560ab9cf0db298c78838acd88203da50014ddc0fafc91b35ed29ad7c571291&',
          }
        );

        if (!newGuild) {
          console.error(gradient(["red", "darkred"])('Se produjo un error fatal al crear el servidor, el clonador se reiniciará en 10 segundos'));
          errors++;
          setTimeout(() => {
            clearall();
          }, 10000);
          return;
        }
        GUILD_ID = newGuild.id;
      }

      console.log(gradient(["#0000ff", "#00008b", "#000080"])('» Clonagem iniciada'));
      const cloner = await backup.create(guild, {
        maxMessagesPerChannel: configOptions.maxMessagesPerChannel,
        jsonSave: configOptions.jsonSave,
        jsonBeautify: configOptions.jsonBeautify,
        doNotBackup: configOptions.doNotBackup,
      });

      if (!cloner) {
        console.error(gradient(["red", "darkred"])('Se produjo un error fatal de clonación y el clonador se reiniciará en 10 segundos.'));
        errors++;
        setTimeout(() => {
          clearall();
        }, 10000);
        return;
      }

      const newGuild = client.guilds.cache.get(GUILD_ID);

      if (!newGuild) {
        console.error(gradient(["red", "darkred"])(
          `El servidor de destino no existe o no estás en él, prueba a corregir el ID`
        ));
        errors++;
        rl.close();
        return;
      }

      const startime2 = process.hrtime();
      console.log(gradient(["blue", "darkblue"])('» Começando'));
      let channelCount = 0;

      cloner.channels.categories.forEach((category: { children: any[] }) => {
        category.children.forEach(() => {
          channelCount += 1;
        });
      });

      cloner.channels.others.forEach(() => {
        channelCount += 1;
      });

      backup.load(cloner.id, newGuild);
      const tempss = channelCount * 1;
      const temp = tempss * 1000;

      setTimeout(async () => {
        const endtime2 = process.hrtime(startime2);
        const exetimess = endtime2[0] + endtime2[1] / 1e9;
        const Tempo2 = Tempoex(exetimess);

        console.log(gradient(["blue", "darkblue"])(`» La clonación tomó tiempo: ${Tempo2}`));
        console.log(gradient(["blue", "darkblue"])(`» La configuración tomó tiempo: ${Tempo}`));
        console.log(gradient(["blue", "darkblue"])(`» Número de canales clonados: ${clonedall}`));
        console.log(gradient(["blue", "darkblue"])(`» Recuento de errores durante la clonación: ${errors}`));

        if (cloneOption === 3) {
          const template = await newGuild.createTemplate(
            `${guild.name}`,
            `By RCN Shop (https://discord.gg/4SbMhwXjNc)`
          );
          console.log(`» Enlace de plantilla: ${template.url}`);
        }

        rl.close();
      }, temp);

      cloner.channels.categories.forEach((category: { children: any[] }) => {
        category.children.forEach(() => {
          clonedall++;
        });
      });

      cloner.channels.others.forEach(() => {
        clonedall++;
      });

      const endtime = process.hrtime(starttime);
      const exetimes = endtime[0] + endtime[1] / 1e9;
      const Tempo = Tempoex(exetimes);
    } catch (error) {
      console.error(gradient(["red", "darkred"])('Se produjo un error durante la clonación:', error));
      errors++;
      rl.close();
    }
  };

  rl.question(gradient(["blue", "darkblue"])('Digite el ID del servidor: '), async (guildId) => {
    guildId1 = guildId;

    if (!createNewServer) {
      rl.question(gradient(["blue", "darkblue"])('Digite el ID del servidor de destino: '), (destinationId) => {
        GUILD_ID = destinationId;
        proceedWithCloning();
      });
    } else {
      proceedWithCloning();
    }
  });
}
export async function serverinfo(client: Client) {
  async function fetchGuildData(guildId: string) {
    try {
      const guild = await client.guilds.fetch(guildId);
      const preview = await guild.fetchPreview();
      console.clear();
      creatorname();
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Nombre del servidor: ${preview.name}`
        )
      );
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Descripción del servidor: ${preview.description}`
        )
      );
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Número de Miembros: ${preview.approximateMemberCount}`
        )
      );
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Número de canales: ${preview.approximatePresenceCount}`
        )
      );
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Creado en: ${preview.createdAt}`
        )
      );
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `ID del servidor: ${preview.id}`
        )
      );

      if (preview.icon) {
        console.log(
          gradient(["#ff4500", "#ffa500", "#ff6347"])(
            `Icono del servidor: ${preview.iconURL()}`
          )
        );
      }

      if (preview.splash) {
        console.log(
          gradient(["#ff4500", "#ffa500", "#ff6347"])(
            `Splash del servidor: ${preview.splashURL()}`
          )
        );
      }

      if (preview.discoverySplash) {
        console.log(
          gradient(["#ff4500", "#ffa500", "#ff6347"])(
            `Presentación del splash del servidor: ${preview.discoverySplashURL()}`
          )
        );
      }

      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Recursos del servidor: ${preview.features.join(", ")}`
        )
      );
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Emojis del servidor: ${preview.emojis.size}`
        )
      );
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Stickers del servidor: ${preview.stickers.size}`
        )
      );
    } catch (error) {
      console.error(
        gradient(["#ff4500", "#ffa500", "#ff6347"])("Ocurrió un error:"),
        error
      );
    }
    awaitenter(client);
  }
  rl.question(
    gradient(["purple", "pink"])("Digite el ID del servidor: "),
    (guildId) => {
      fetchGuildData(guildId);
    }
  );
}
export const configOptions2 = {
  ignoreTickets: false,
  Debug: false,
};
export async function configop(client: Client, functionName: string) {
  console.clear();
  creatorname();
  console.log(
    gradient(["purple", "pink"])("Configurando el clonador:")
  );

  const configOptions: any = {
    maxMessagesPerChannel: 1,
    jsonSave: true,
    jsonBeautify: true,
    doNotBackup: ["emojis", "bans"],
  };

  const configOptions2: any = {
    ignoreTickets: false,
    Debug: false,
  };

  while (true) {
    const tableContent = `
    ${chalk.red("O:")} ${gradient(["purple", "pink"])(
      "¿Cuántos mensajes deseas clonar por canal? (Esta función está temporalmente deshabilitada)"
    )}
    ${chalk.red("V:")} ${chalk.blue(configOptions.maxMessagesPerChannel)}
    ${chalk.red("O:")} ${gradient(["purple", "pink"])("¿Guardar en JSON?")}
    ${chalk.red("V:")} ${configOptions.jsonSave ? chalk.green("Si") : chalk.red("No")
      }
    ${chalk.red("O:")} ${gradient(["purple", "pink"])("Json bonito?")}
    ${chalk.red("V:")} ${configOptions.jsonBeautify ? chalk.green("Si") : chalk.red("No")
      }
    ${chalk.red("O:")} ${gradient(["purple", "pink"])("No clonar")}
    ${chalk.red("V:")} ${chalk.yellow(configOptions.doNotBackup.join(", "))}
    ${chalk.red("O:")} ${gradient(["purple", "pink"])("Ignorar tickets?")}
    ${chalk.red("V:")} ${configOptions2.ignoreTickets ? chalk.green("Si") : chalk.red("No")
      }
    ${chalk.red("O:")} ${gradient(["purple", "pink"])("Debug?")}
    ${chalk.red("V:")} ${configOptions2.Debug ? chalk.green("Si") : chalk.red("No")
      }
    `;
    const tableWithBorders = boxen(tableContent, {
      borderStyle: {
        topLeft: "╭",
        topRight: "╮",
        bottomLeft: "╰",
        bottomRight: "╯",
        horizontal: "─",
        vertical: "│",
        top: "─",
        right: "│",
        bottom: "─",
        left: "│",
      },
      padding: 2,
      margin: 2,
      borderColor: "green",
      backgroundColor: "#1A1A1A",
    });

    console.log(tableWithBorders);

    try {
      const choice = await espop(
        gradient(["purple", "pink"])(
          "¿Quieres reconfigurar? (1 - Si, 2 - No, 3 - Volver): "
        )
      );

      if (choice === "1") {
        configOptions.maxMessagesPerChannel = parseInt(
          await espop(
            gradient(["purple", "pink"])(
              "¿Cuántos mensajes quieres clonar por canal? (Esta función ha sido deshabilitada temporalmente): "
            )
          ),
          10
        );
        configOptions.jsonSave = await yop(
          gradient(["purple", "pink"])(
            "Desea guardar el JSON?"
          )
        );
        configOptions.jsonBeautify = await yop(
          gradient(["purple", "pink"])(
            "Quieres dejar el JSON más bonito?"
          )
        );
        configOptions.doNotBackup = (
          await espop(
            gradient(["purple", "pink"])(
              "Ingresa lo que deseas ignorar (por ejemplo, emojis, canales, roles): "
            )
          )
        )
          .split(",")
          .map((item) => item.trim());
        const ticketop = await yop(
          gradient(["purple", "pink"])(
            "¿Quieres ignorar los tickets? "
          )
        );

        const Debugop = await yop(
          gradient(["purple", "pink"])(
            "¿Quieres activar la depuración?"
          )
        );

        if (Debugop) {
          configOptions2.Debug = true;
        }
        if (ticketop) {
          configOptions2.ignoreTickets = true;
        }

        break;
      } else if (choice === "2") {
        switch (functionName) {
          case "Clonerop1choice":
            console.clear();
            creatorname();
            await Cloner(client, configOptions, 1, true);
            break;
          case "Clonerop2choice":
            console.clear();
            creatorname();
            await Cloner(client, configOptions, 2, false);
            break;
          case "Clonerop3choice":
            console.clear();
            creatorname();
            await Cloner(client, configOptions, 3, true);
            break;
          default:
            console.log(gradient(["red", "darkred"])(t("returnnull")));
            break;
        }
      } else if (choice === "3") {
        const clearall = () => {
          console.clear();
          menutext(client);
          choiceinit(client);
        };
        clearall();
      } else {
        console.log(gradient(["red", "darkred"])(t('undefinedfunc')));
      }
    } catch (error) {
      console.error(
        gradient(["red", "darkred"])(
          t('error2'),
          error
        )
      );
      awaitenter(client);
    }
  }
}


async function yop(question: string): Promise<boolean> {
  const answer = await espop(question + chalk.yellow(t('yandn')));
  return answer === "1";
}

function espop(question: string): Promise<string> {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

function Tempoex(timeInSeconds: number) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");

  if (hours > 0) {
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  } else {
    return `${minutesStr}:${secondsStr}`;
  }
}
function awaitenter(client: Client) {
  rl.question(
    gradient(["purple", "pink"])(t('awaitenter')),
    () => {
      menutext(client);
      choiceinit(client);
    }
  );
}
function Channgelang(client: Client) {
  if (langat === "esp") {
    setlang("en");
    langat = "en";
  } else {
    setlang("esp");
    langat = "esp";
  }
  console.clear();
  creatorname();
  menutext(client);
  choiceinit(client);
}
