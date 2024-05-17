require('dotenv').config()
const {mkdirSync, writeFileSync} = require('fs')

const targetPath = './src/environments/environment.ts'
const targetPathDev = './src/environments/environment.development.ts'

const envContent = `
    export const environment = {
        apiMapboxKey: "${process.env['apiMapboxKey']}",
        baseUrl: "${process.env['baseUrl']}"
    }
`

const envContentDev = `
    export const environment = {
        apiMapboxKey: "${process.env['apiMapboxKey']}",
        baseUrl: "${process.env['baseUrlDev']}"
    }
`

mkdirSync('./src/environments/', {recursive: true});

writeFileSync(targetPath, envContent);
writeFileSync(targetPathDev, envContentDev);