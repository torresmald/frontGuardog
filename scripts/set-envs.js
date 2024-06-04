require('dotenv').config()
const {mkdirSync, writeFileSync} = require('fs')

const targetPath = './src/environments/environment.ts'
const targetPathDev = './src/environments/environment.development.ts'

const envContent = `
    export const environment = {
        apiMapboxKey: "${process.env['apiMapboxKey']}",
        baseUrl: "${process.env['baseUrl']}",
        baseUrlChat: "${process.env['baseUrlChat']}"
    }
`

const envContentDev = `
    export const environment = {
        apiMapboxKey: "${process.env['apiMapboxKey']}",
        baseUrl: "${process.env['baseUrlDev']}",
        baseUrlChat: "${process.env['baseUrlChat']}"
    }
`

mkdirSync('./src/environments/', {recursive: true});

writeFileSync(targetPath, envContent);
writeFileSync(targetPathDev, envContentDev);