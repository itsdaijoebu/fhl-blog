const form = document.querySelector('#add-form');
let editor = document.querySelector('#editor')


ClassicEditor
.create(document.querySelector('#editor'))
.then(edit => {
    editor = edit
    editor.editing.view.document.on(
        'enter',
        ( evt, data ) => {
            editor.execute('shiftEnter');
            //Cancel existing event
            data.preventDefault();
            evt.stop();
     }, {priority: 'high' });

})
.catch(error => {
    console.error(error)
})

console.log('form', form)

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form)
    const content = editor.getData();
    formData.append('body', content)
    for(let [key, value] of formData) {
        console.log('form data', key, value)
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", './add-post', true)
    xhr.send(formData)
})