import { Favorites } from './favorites.js'

// Classe que vai criar a visualização dos dados e eventos no HTML.

// fazendo a herança de classes
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    // Inserindo aqui para a aplicação como um todo
    this.tbody = this.root.querySelector('table tbody')

    this.checkAndLoadTheme()

    this.update()

    this.onadd()
  }

  checkAndLoadTheme() {
    const applicationPage = document.querySelector('body')

    const switcherButtonLight = this.root.querySelector(
      '.theme-button .lighter-theme'
    )

    const switcherButtonDark = this.root.querySelector(
      '.theme-button .darker-theme'
    )

    const localStorageTheme = localStorage.getItem('GitFavTheme')

    switcherButtonLight.addEventListener('click', () => {
      switcherButtonLight.classList.add('hide')
      switcherButtonDark.classList.remove('hide')

      applicationPage.classList.add('light-theme')
      applicationPage.classList.remove('dark-theme')

      localStorage.setItem('GitFavTheme', 'light-theme')
    })

    switcherButtonDark.addEventListener('click', () => {
      switcherButtonDark.classList.add('hide')
      switcherButtonLight.classList.remove('hide')

      applicationPage.classList.add('dark-theme')
      applicationPage.classList.remove('light-theme')

      localStorage.setItem('GitFavTheme', 'dark-theme')
    })

    if (localStorageTheme !== null && localStorageTheme === 'light-theme') {
      applicationPage.className = localStorageTheme

      switcherButtonLight.classList.add('hide')
      switcherButtonDark.classList.remove('hide')
    }

    console.log(applicationPage, switcherButtonLight, switcherButtonDark)
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

  favoriteAnUser() {
    /*     
    const { value } = this.root.querySelector('.search input')

    this.add(value) 

    ${value} = ''
    */
    const input = this.root.querySelector('.search input')

    this.add(input.value)

    input.value = ''
  }

  // Registrando eventos do botão de pesquisa
  onadd() {
    const addButton = this.root.querySelector('.search button')

    addButton.addEventListener('click', () => {
      /* 
        const { value } = this.root.querySelector('.search input')

        this.add(value)
      */

      this.favoriteAnUser()
    })

    // Colocando o enter para funcionar
    document.addEventListener('keydown', event => {
      const isEnterKey = event.key == 'Enter'

      // const { value } = this.root.querySelector('.search input')

      if (isEnterKey) {
        /* this.add(value) */
        this.favoriteAnUser()
      }
    })
  }

  update() {
    this.removeAllTr()

    this.entries.forEach(user => {
      const row = this.createRow()

      row.querySelector(
        '.user img'
      ).src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name}`
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').innerText = user.login

      row.querySelector('.repositories').textContent = user.public_repos

      row.querySelector('.followers').textContent = user.followers

      // Eventpo de remover no botão da linha
      row.querySelector('button.remove').onclick = () => {
        const isOk = confirm('Tem certeza de que deseja deletar esta linha?')

        if (isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })

    this.updateBackground()
  }

  createRow() {
    const tr = document.createElement('tr')

    /* 
      const content = `
        ...
      `
      tr.innerText = content 
    */

    // Molde para o conteúdo da linha
    tr.innerHTML = `
      <td class="user">
        <img
          src="https://github.com/Macedovin.png"
          alt="Imagem de Macedovin"
        />
        <!-- Avatar do GitHub -->
        <a href="https://github.com/Macedovin" target="_blank">
          <!-- Link para o perfil -->
          <p>Vinicius Macedo</p>
          <!-- Nome -->
          <span>/Macedovinuiadibdiuvwrgfvwfwhesbd</span>
          <!-- Nome de usuário -->
        </a>
      </td>
      <td class="repositories">8</td>
      <td class="followers">4</td>
      <td>
        <button class="remove">&times;</button>
      </td>
  `

    return tr
  }

  removeAllTr() {
    /* 
    // Removendo daqui

      const tbody = this.root.querySelector('table tbody') 
    */

    this.tbody.querySelectorAll('tr').forEach(tr => {
      tr.remove()
    })
  }
}
