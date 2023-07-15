
const imageArray = []
const uploadWidget = cloudinary.createUploadWidget({
    cloudName: "itsdaijoebu-api", uploadPreset: "fhlblog"
},
    (err, res) => {
        console.log('err:', err, 'info:', res.info)
        if (res.info.secure_url) {
            console.log('secureurl:', res.info.secure_url)
            imageArray.push(res.info.secure_url)
            console.log('imgurls:', imageArray)
        }
    }
)

const postId = document.getElementById('post-id').innerText;
console.log('postId:', postId)
const addMoreImages = document.getElementById('add-more-images-btn')
addMoreImages.addEventListener('click', () => uploadWidget.open())

document.getElementById('submit-button').addEventListener('click', submitImages)
function submitImages() {
    let fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    let jsonData = {
        id: postId,
        images: imageArray
    }

    fetchOptions.body = JSON.stringify(jsonData)
    console.log(fetchOptions.body)

    fetch('./add-images', fetchOptions)
    .then(res => res.json())
    .then(res => console.log('fetch', res))
    .catch(err => console.log('fetch err', err))
}

// form.addEventListener('submit', e => {
//     e.preventDefault();
//     const formData = new FormData(form)
//     formData.append('id', postId)
//     console.log('image array submitted', imageArray)
//     for(let image of imageArray) {
//         formData.append('imageArray', image)
//     }

//     console.log(formData.get('id'))
//     console.log(formData.get('imageArray'))
    
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", './add-images', true)
//     xhr.send(formData)
//     // window.location.reload();
// })
