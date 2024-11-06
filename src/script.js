let cookieInput = document.querySelector("#cookie");
let placeIdInput = document.querySelector("#placeId");
let assetIdInput = document.querySelector("#assetId");
let downloadButton = document.querySelector("#download");
let loader = document.querySelector("#loader");

downloadButton.addEventListener("click", async () => {
	loader.querySelector("svg").classList.add("animate-spin");

	loader.querySelector("svg").classList.add("text-blue-500");
	loader.querySelector("svg").classList.add("dark:text-blue-400");

	loader.querySelector("svg").classList.remove("text-green-500");
	loader.querySelector("svg").classList.remove("dark:text-green-400");

	loader.querySelector("svg").classList.remove("text-red-500");
	loader.querySelector("svg").classList.remove("dark:text-red-400");

	loader.querySelector("svg").classList.remove("text-yellow-500");
	loader.querySelector("svg").classList.remove("dark:text-yellow-400");
	loader.querySelector(
		"svg"
	).innerHTML = `<path d="M12 3a9 9 0 1 0 9 9"></path>`;

	loader.classList.remove("hidden");
	const assetId = assetIdInput.value;
	const url = `https://assetdelivery.roblox.com/v1/asset?id=${assetId}`;
	const cookies = cookieInput.value;
	const robloxPlaceId = placeIdInput.value;

	try {
		const filePath = await window.electron.ipcRenderer.invoke(
			"download-request",
			{
				url: url,
				userAgent: "Roblox/WinInet",
				robloSecurity: cookies,
				robloxPlaceId: robloxPlaceId,
			}
		);
		if (filePath.startsWith("err")) {
			console.log(filePath);
			let error = {
				status: filePath.split("|")[0].slice(3),
				message: filePath.split("|")[1],
				code: filePath.split("|")[2],
			};
			console.log(error);
			if (
				error.status === "403" ||
				error.status === "409" ||
				error.status === "401" ||
				error.status === "404"
			) {
				loader.querySelector("svg").classList.remove("animate-spin");

				loader.querySelector("svg").classList.remove("text-blue-500");
				loader
					.querySelector("svg")
					.classList.remove("dark:text-blue-400");

				loader.querySelector("svg").classList.remove("text-green-500");
				loader
					.querySelector("svg")
					.classList.remove("dark:text-green-400");

				loader.querySelector("svg").classList.add("text-red-500");
				loader.querySelector("svg").classList.add("dark:text-red-400");

				loader.querySelector("svg").classList.remove("text-yellow-500");
				loader
					.querySelector("svg")
					.classList.remove("dark:text-yellow-400");

				loader.querySelector(
					"svg"
				).innerHTML = `<path d="M18 6 6 18M6 6l12 12"/>`;
			} else {
				loader.querySelector("svg").classList.remove("animate-spin");

				loader.querySelector("svg").classList.remove("text-blue-500");
				loader
					.querySelector("svg")
					.classList.remove("dark:text-blue-400");

				loader.querySelector("svg").classList.remove("text-green-500");
				loader
					.querySelector("svg")
					.classList.remove("dark:text-green-400");

				loader.querySelector("svg").classList.remove("text-red-500");
				loader
					.querySelector("svg")
					.classList.remove("dark:text-red-400");

				loader.querySelector("svg").classList.add("text-yellow-500");
				loader
					.querySelector("svg")
					.classList.add("dark:text-yellow-400");

				loader.querySelector(
					"svg"
				).innerHTML = `<path d="M12 9v4m-1.637-9.409L2.257 17.125a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87L13.637 3.59a1.914 1.914 0 0 0-3.274 0zM12 16h.01"/>`;
			}

			setTimeout(() => {
				alert("HTTP Code: " + error.status + "\nResponse from Roblox: " + error.message + " (" + error.code + ")");
				loader.classList.add("hidden");
			}, 10);
		} else {
			loader.querySelector("svg").classList.remove("animate-spin");

			loader.querySelector("svg").classList.remove("text-blue-500");
			loader.querySelector("svg").classList.remove("dark:text-blue-400");

			loader.querySelector("svg").classList.add("text-green-500");
			loader.querySelector("svg").classList.add("dark:text-green-400");

			loader.querySelector("svg").classList.remove("text-red-500");
			loader.querySelector("svg").classList.remove("dark:text-red-400");

			loader.querySelector("svg").classList.remove("text-yellow-500");
			loader
				.querySelector("svg")
				.classList.remove("dark:text-yellow-400");

			loader.querySelector(
				"svg"
			).innerHTML = `<path d="M5 12l5 5l10 -10" />`;
			setTimeout(() => {
				loader.classList.add("hidden");
			}, 1000);
		}
	} catch (error) {
		alert("An error occurred while downloading the asset");
		loader.classList.add("hidden");
	}
});
