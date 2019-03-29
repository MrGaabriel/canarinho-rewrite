const readline = require("readline-sync")
const fs = require("fs")

require("dotenv").config()

if (!process.env.TOKEN) {
  console.log("Você não definiu a variável \"TOKEN\" no \".env\"!")
}

const token = process.env.TOKEN || readline.question("Digite o token: ")
const Canarinho = require("./src/Canarinho")

const bot = new Canarinho()
bot.start(token)
