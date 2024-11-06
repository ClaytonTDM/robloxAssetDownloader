const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
const stream = require("stream");
const { promisify } = require("util");
const FileType = require("file-type");

const pipeline = promisify(stream.pipeline);

let mainWindow;

app.on("ready", () => {
	Menu.setApplicationMenu(null);

	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		autoHideMenuBar: false,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			webSecurity: false,
			preload: path.join(__dirname, "src/preload.js"),
		},
	});

	mainWindow.loadFile("src/index.html");
});

ipcMain.handle(
	"download-request",
	async (event, { url, userAgent, robloSecurity, robloxPlaceId }) => {
		try {
			const downloadsPath = app.getPath("downloads");
			const assetId = url.split("/").pop().split("=")[1];

			const timeout = new Promise((_, reject) =>
				setTimeout(
					() =>
						reject(
							new Error("Download timed out after 10 seconds")
						),
					10000
				)
			);

			const downloadProcess = async () => {
				const response = await fetch(url, {
					headers: {
						"User-Agent": userAgent,
						Cookie: ".ROBLOSECURITY=" + robloSecurity,
						"Roblox-Place-Id": robloxPlaceId,
					},
				});

				if (!response.ok) {
					let body = JSON.parse(await response.text());
					if (body.errors[0].customErrorCode !== undefined) {
						return "err" + response.status + " (" + response.statusText + ")|" + body.errors[0].message + "|" + body.errors[0].customErrorCode;
					} else {
						return "err" + response.status + " (" + response.statusText + ")|" + body.errors[0].message + "|" + body.errors[0].code;
					}
				}

				const buffer = Buffer.from(await response.arrayBuffer());

				// check for rbxm or rbxmx
				const magicBytes = buffer.slice(0, 8).toString();
				let extension;

				if (magicBytes === "<roblox!") {
					extension = "rbxm";
				} else if (magicBytes.startsWith("<roblox")) {
					extension = "rbxmx";
				} else {
					// check for anything else
					const type = await FileType.fromBuffer(buffer);
					extension = type ? type.ext : "bin";
				}

				const filePath = path.join(
					downloadsPath,
					`${assetId}.${extension}`
				);
				await fs.promises.writeFile(filePath, buffer);
				return filePath;
			};

			return await Promise.race([downloadProcess(), timeout]);
		} catch (error) {
			console.error("Download error:", error);
			throw error;
		}
	}
);

app.on("window-all-closed", () => {
	app.quit();
});
