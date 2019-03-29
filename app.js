const readline = require("readline-sync")
const dotenv = require("dotenv")
const fs = require("fs")

dotenv.config()

if (!process.env.TOKEN) {
  console.log("Você não definiu a variável \"TOKEN\" no \".env\"!")
}

const token = process.env.TOKEN || readline.question("Digite o token: ")
const Canarinho = require("./src/Canarinho")

const bot = new Canarinho()
bot.start(token)