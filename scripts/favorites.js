import { GithubUser } from './GithubUser.js'

/* 
Classe que vai conter a lógica dos dados
  
// Como os dados seão estruturados
*/
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)

    this.load()

    this.updateBackground()

    // GitHubUser.search('maykbrito').then(user => console.log(user)) */
  }

  updateBackground() {
    const tableHasUser = this.entries.length > 0

    const emptyTable = document.querySelector('.empty-user')

    if (tableHasUser) {
      emptyTable.classList.add('hide')
    } else {
      emptyTable.classList.remove('hide')
    }
  }

  saveFavorites() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username) {
    try {
      const userExists = this.entries.find(
        entry => entry.login.toUpperCase() === username.toUpperCase()
      )

      if (userExists) {
        throw new Error('Usuário já cadastrado')
      }

      const user = await GithubUser.search(username)

      if (user.login === undefined) {
        throw new Error('Usuário não encontrado!')
      }

      this.entries = [user, ...this.entries]

      this.update()

      this.saveFavorites()
    } catch (error) {
      alert(error.message)
    }
  }

  load() {
    /*
      const entries = [
        ...
      ]
    
      this.entries = entries

      // Refatorando as entradas e acessando o localStorage
    
      this.entries = [...
      ]
    */

    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  delete(user) {
    const filteredEntries = this.entries.filter(
      entry => entry.login !== user.login
    )

    // Reforçando a atualização do array
    this.entries = filteredEntries

    // Atualizando o array após deletados um elemento
    this.update()

    this.saveFavorites()
  }
}
