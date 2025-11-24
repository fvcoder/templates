import { statSync, existsSync } from "node:fs";
import { readdir, writeFile, readFile } from "node:fs/promises";
import { join } from "node:path";

const ignoreDirs = [
    '.git',
    'scripts',
    'node_modules'
]

async function generateRepoManifest() {
    const manifestFilePath = join(process.cwd(), 'manifest.json')
    const dir = await readdir(process.cwd())
    const dirDirectory = dir.filter((name) => {
        const fullPathName = join(process.cwd(), name)

        if (!statSync(fullPathName).isDirectory()) {
            return false;
        }

        if (ignoreDirs.includes(name)) {
            return false;
        }

        return true;
    })

    if (!existsSync(manifestFilePath)) {
        await writeFile(manifestFilePath, JSON.stringify([], null, 2))
    }


    const manifestData = JSON.parse(String(await readFile(manifestFilePath, 'utf-8')))

    for (const template of dirDirectory) {
        if (manifestData.findIndex((x) => x.template === template) === -1) {
            manifestData.push({
                template,
                stack: template.split('-')
            })
        }
    }
    
    await writeFile(join(process.cwd(), 'manifest.json'), JSON.stringify(manifestData, null, 2))
}

generateRepoManifest();
