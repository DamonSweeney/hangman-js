let field = document.getElementById('word-field')
let visBtn = document.getElementById('vis')

visBtn.addEventListener("mouseover", (e) => {
    field.type = 'input'
})
visBtn.addEventListener("mouseout", (e) => {
    field.type = 'password'
})