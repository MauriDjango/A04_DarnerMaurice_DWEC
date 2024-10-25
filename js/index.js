const carritoDiv = document.querySelector("#lista-carrito")
const listaCarritoBody = carritoDiv.querySelector("tbody")
const listaCursosDiv = document.querySelector("#lista-cursos")
const vaciarButton = document.querySelector("#vaciar-carrito")
const localMem = {
  _carrito: JSON.parse(localStorage.getItem('carrito')) || {},
  get carrito() {
    return this._carrito
  },
  set carrito(value) {
    localStorage.setItem('carrito', JSON.stringify(value))
  }
}

// EVENT LISTENERS -------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  loadListeners()
  createCarritoHTML(localMem.carrito)
})

function loadListeners() {
  listaCursosDiv.addEventListener("click", handleClickAgregar)
  vaciarButton.addEventListener("click", handleClickVaciar)
  listaCarritoBody.addEventListener("click", handleClickListaCarritoBody)
}

function handleClickListaCarritoBody(e) {
  if (e.target.id === "remove-item") {
    const cursoName = e.target.dataset.id

    removeCarritoItem(cursoName)
    createCarritoHTML(localMem.carrito)
  }
}

function handleClickVaciar(e) {
  e.preventDefault()

  cleanListaCompra()
  localMem.carrito = {}
}

function handleClickAgregar(e) {
  e.preventDefault()

  const curso = e.target.parentElement.parentElement
  const carritoItem = createCarritoItem(
    curso.querySelector("img").src,
    curso.querySelector("h4").innerText,
    curso.querySelector("span").innerHTML
  )
  addCarritoItem(carritoItem)

  updateListaCompra()
}

// MANIPULATE CARRITO OBJECT ---------------------------------------------------

function addCarritoItem(carritoItem) {
  localMem.carrito[carritoItem.name] ?
    localMem.carrito[carritoItem.name].quantity++
    : localMem.carrito[carritoItem.name] = carritoItem;
  localMem.carrito = localMem.carrito
}

function removeCarritoItem(cursoName) {
  localMem.carrito[cursoName].quantity - 1 <= 0 ?
    delete localMem.carrito[cursoName]
    : localMem.carrito[cursoName].quantity--;
  localMem.carrito = localMem.carrito
}

function createCarritoItem(imgSrc, name, price) {
  return {
    imgSrc,
    name,
    price,
    quantity: 1,
  }
}

// MANIPULATE OF HTML ELEMENTS -------------------------------------------------

function updateListaCompra() {
  cleanListaCompra()
  createCarritoHTML(localMem.carrito)
}

function cleanListaCompra() {
  while (listaCarritoBody.firstChild) {
    listaCarritoBody.removeChild(listaCarritoBody.firstChild)
  }
}

function createCarritoHTML(carrito) {
  cleanListaCompra()
  for (let item of Object.values(carrito)) {
  listaCarritoBody.appendChild(createCarritoRow(item))
  }
}

function createCarritoRow(carritoItem) {
  const row = document.createElement('tr')
  row.appendChild(createTableRowImage(carritoItem.imgSrc))
  row.appendChild(createTableRowText(carritoItem.name))
  row.appendChild(createTableRowText(carritoItem.price))
  row.appendChild(createTableRowText(carritoItem.quantity))
  row.appendChild(createTableRowRemove('../assets/img/remove.png', carritoItem.name))
  return row
}

function createTableRowImage(imgSrc) {
  const cell = document.createElement('th')
  const  element = document.createElement('img')
  element.src = imgSrc
  element.alt = "Image not found"
  element.classList.add('carrito-img')
  cell.appendChild(element)
  return cell
}

function createTableRowRemove (imgSrc, itemName) {
  const cell = document.createElement('th')
  const element = document.createElement('img')
  element.src = imgSrc
  element.alt = "Image not found"
  element.classList.add('remove-icon')
  element.id ='remove-item'
  element.dataset.id = itemName
  cell.appendChild(element)
  return cell
}

function createTableRowText(textContent) {
  const cell = document.createElement('th')
  const element = document.createElement('p')
  element.innerText = textContent
  cell.appendChild(element)
  return cell
}
