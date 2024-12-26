# [**[EXE Download Link]**](https://github.com/ClaytonTDM/robloxAssetDownloader/releases/download/1.1.2/privateAssetDownloader.Setup.1.1.2.exe)

# Roblox Asset Downloader

A desktop application built with Electron that allows you to download Roblox assets, including private audio files and game assets.

## Features

- Download Roblox assets using asset IDs
- Support for Roblox-specific assets such as **animations/models**
- Support for **private assets** using .ROBLOSECURITY cookie and place ID
- Dark/Light theme support

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (Comes with Node.js)

## Installation

1. Clone this repository:

```sh
git clone https://github.com/ClaytonTDM/robloxAssetDownloader.git
```

2. Install dependencies:

```sh
npm install
```

3. Start the application:

```sh
npm start
```

## Usage

1. Launch the application
2. Fill in the required fields:
   - **Roblox Cookie** (Optional): Your .ROBLONECURITY cookie (required for private assets)
   - **Place ID** (Optional): The ID of the game you want to download assets from (required for private assets)
   - **Asset ID**: The ID of the asset you want to download

3. Click the **Download** button
4. The asset will be downloaded to your downloads folder

## Development

- Build with Electron
- Uses Roblox API to fetch asset information
- Uses Tailwind CSS for styling
- Includes file type detection using `file-type` package and custom logic for Roblox-specific assets thanks to [RobloxAPI's helpful spec](https://github.com/RobloxAPI/spec/blob/master/formats/rbxl.md)

## FAQ

- Q: How do I install this?
- A: [Download the EXE](https://github.com/ClaytonTDM/robloxAssetDownloader/releases/download/1.1.2/privateAssetDownloader.Setup.1.1.2.exe), or if you're on MacOS/Linux, refer to the [Installation steps](#installation).
- Q: Can I sell this?
- A: **No.** It is prohibited by the Commons Clause in the [LICENSE](LICENSE) file.
- Q: Does this break Roblox TOS?
- A: No. This uses official Roblox APIs according to the TOS.
- Q: What can this download?
- A: Models, animations, audio, etc. You name it and my tool can probably download it.
