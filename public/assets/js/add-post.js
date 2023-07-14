// const { cloudinary_js_config } = require("../../../middleware/cloudinary");
const form = document.querySelector('#add-form');
let editor = document.querySelector('#editor')


ClassicEditor
    .create(document.querySelector('#editor'))
    .then(edit => {
        editor = edit
        editor.editing.view.document.on(
            'enter',
            (evt, data) => {
                editor.execute('shiftEnter');
                //Cancel existing event
                data.preventDefault();
                evt.stop();
            }, { priority: 'high' });

    })
    .catch(error => {
        console.error(error)
    })

// upload images
const imageArray = []
const uploadWidget = cloudinary.createUploadWidget({
    cloudName: "itsdaijoebu-api", uploadPreset: "fhlblog"
},
    (err, res) => {
        console.log('err:', err, 'info:', res.info)
        if (res.info.secure_url) {
            console.log('secureurl:', res.info.secure_url)
            imageArray.push(secure_url)
            console.log('imgurls:', imageArray)
        }
    }
)

const addMoreImages = document.getElementById('add-more-images-btn')
console.log(addMoreImages)
addMoreImages.addEventListener('click', () => uploadWidget.open())


form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form)
    const content = editor.getData();
    formData.append('body', content)
    formData.append('imageArray', imageArray)
    const xhr = new XMLHttpRequest();
    xhr.open("POST", './add-post', true)
    xhr.send(formData)
    window.location.reload();
})

