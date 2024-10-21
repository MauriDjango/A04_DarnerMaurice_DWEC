const carritoDiv = document.querySelector("#lista-carrito")
const listaCarritoBody = carritoDiv.querySelector("tbody")
const listaCursosDiv = document.querySelector("#lista-cursos")
const vaciarButton = document.querySelector("#vaciar-carrito")
let carrito = {}

listaCursosDiv.addEventListener("click", handleClickAgregar)
vaciarButton.addEventListener("click", handleClickVaciar)
listaCarritoBody.addEventListener("click", handleClickListaCarritoBody)

function handleClickListaCarritoBody(e) {
  if (e.target.id === "remove-item") {
    const cursoName = e.target.dataset.id

    removeCarritoItem(cursoName)

    listaCarritoBody.innerHTML = createCarritoHTML(carrito)
  }
}

function handleClickVaciar(e) {
  e.preventDefault()

  listaCarritoBody.innerHTML = ""
  carrito = {}
}

function handleClickAgregar(e) {
  e.preventDefault()

  const curso = e.target.parentElement.parentElement
  const carritoItem = createCarritoItem(
    curso.querySelector("img").src,
    curso.querySelector("h4").innerText,
    curso.querySelector("span").innerHTML
  )
  updateCarrito(carritoItem)

  listaCarritoBody.innerHTML = createCarritoHTML(carrito)
}

function updateCarrito(carritoItem) {
  carrito[carritoItem.name] ?
    carrito[carritoItem.name].quantity++
    : carrito[carritoItem.name] = carritoItem;
}

function removeCarritoItem(cursoName) {
  carrito[cursoName].quantity - 1 <= 0 ?
    delete carrito[cursoName]
    : carrito[cursoName].quantity--;
}

function createCarritoItem(imgSrc, name, price) {
  return {
    imgSrc,
    name,
    price,
    quantity: 1,
  };
}

function createCarritoHTML(carrito) {
  // Iterate over the object using Object.values() to get an array of items
  return Object.values(carrito).map(carritoItem => `
    <tr>
        <th>
            <img src="${carritoItem.imgSrc}" class="carrito-img" alt="No image found"></img>
        </th>
        <th>
            <p>${carritoItem.name}</p>
        </th> 
        <th>
            <p>${carritoItem.price}</p>
        </th>
        <th>
            <p>${carritoItem.quantity}</p>
        </th>
        <th>
          <img class="remove-icon" src="../assets/img/remove.png" alt="Image not found" id="remove-item" data-id="${carritoItem.name}">
        </th>
    </tr>`
  ).join(''); // Combine all the HTML strings into one
}
