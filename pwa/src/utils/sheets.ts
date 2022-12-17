// @ts-nocheck
import fs, { promises as fsPromises } from 'fs'
import path from 'path'
import process from 'process'
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'
import { AVAILABLE_LOCALES } from '../composables/usei18n'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const TOKEN_PATH = path.join(process.cwd(), '/src/utils/token.json')
const CREDENTIALS_PATH = path.join(
  process.cwd(),
  '/src/utils/hotel-translations.json',
)

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fsPromises.readFile(TOKEN_PATH)
    const credentials = JSON.parse(content)
    return google.auth.fromJSON(credentials)
  } catch (err) {
    return null
  }
}

async function saveCredentials(client) {
  const content = await fsPromises.readFile(CREDENTIALS_PATH)
  const keys = JSON.parse(content)
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await fsPromises.writeFile(TOKEN_PATH, payload)
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })
  if (client.credentials) {
    await saveCredentials(client)
  }
  return client
}

async function generateMessagesForLocales(auth) {
  const sheets = google.sheets({ version: 'v4', auth })

  AVAILABLE_LOCALES.map(async (locale) => {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: '1L9eRiQH4sXaUbnYbA0yKCEvMv75ZneC2jKcTn3eyTgg',
      range: locale,
    })
    const rows = res.data.values

    if (!rows || rows.length === 0) return

    rows!.shift()

    const translations = { [locale]: {} }
    for (const row of rows) {
      // @ts-ignore
      translations[locale][row[0]] = row[2]
    }

    await fsPromises.writeFile(
      path.join(process.cwd(), `/src/locales/${locale}.json`),
      JSON.stringify(translations),
    )
  })
}

authorize().then(generateMessagesForLocales).catch(console.error)
