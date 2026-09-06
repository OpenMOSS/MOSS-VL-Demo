# MOSS-VL web demo

Web frontend for exploring [MOSS-VL](https://github.com/OpenMOSS/MOSS-VL) video understanding.

[Open demo](https://openmoss.ai/MOSS-VL-Demo/) · [Model repository](https://github.com/OpenMOSS/MOSS-VL) · [Model downloads](https://huggingface.co/collections/OpenMOSS-Team/moss-vl) · [Project page](https://openmoss.ai/MOSS-VL/)

## Develop locally

This frontend uses Vue, TypeScript, Vite, and Tailwind CSS. From the repository root:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. Model inference and serving instructions are maintained in the [MOSS-VL repository](https://github.com/OpenMOSS/MOSS-VL); starting this frontend does not start an inference server.

## Build and preview

```bash
npm run build
npm run preview
```

Application code is in [`src/`](src/), static files are in [`public/`](public/), and Vite configuration is in [`vite.config.ts`](vite.config.ts).

For interface issues, open an [issue here](https://github.com/OpenMOSS/MOSS-VL-Demo/issues). For model behavior, installation, or inference, use [MOSS-VL Issues](https://github.com/OpenMOSS/MOSS-VL/issues).
