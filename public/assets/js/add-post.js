const form = document.querySelector('#add-form');
let editor = document.querySelector('#editor')

ClassicEditor
.create(document.querySelector('#editor'))
.then(edit => {
    editor = edit
    console.log(edit)
})
.catch(error => {
    console.error(error)
})

console.log(form)

form.addEventListener('submit', e => {
    e.preventDefault();
    const content = editor.getData();
    console.log(content)
})