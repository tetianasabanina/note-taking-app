var getButton = document.getElementById('user_form');
getButton.addEventListener('submit', getRequest);

function getRequest(event) {
    event.preventDefault();
    var noteId = event.target.noteId.value;
    fetch(`/notes/${noteId}`)
    .then(response => response.json())
    .then(function(data) {
        if(!noteId) {
            document.getElementById("results").innerHTML = ''; // clean <div>
            for(var i in data) {
                document.getElementById("results").innerHTML += data[i].noteTitle  + ': ' + data[i].noteDescription + ' (posted ' + data[i].noteDate + ' )' + '<br />';
            }
        } else {
            console.log("noteId: ", noteId)
            document.getElementById("results").innerHTML = '';
            document.getElementById("results").innerHTML += data.noteTitle + ': ' + data.noteDescription + ' (posted ' + data.noteDate + ' )' + '<br />';
        }
        console.log("data: ", data); 
    })
}

var postButton = document.getElementById('user_form_post');
postButton.addEventListener('submit', newPost)

function newPost(event, post) {
    event.preventDefault();
    var noteTitle = event.target.noteTitle.value;
    var noteDescription = event.target.noteDescription.value;

    console.log(noteTitle, noteDescription)
    post = {
        noteTitle: noteTitle,
        noteDescription: noteDescription
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    return fetch('/notes', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .then(error => console.error('error: ', error))
}

var deleteButton = document.getElementById('user_form_delete');
deleteButton.addEventListener('submit', deletePost);

function deletePost(event) {
    event.preventDefault();
    var noteId = event.target.noteId.value;
    console.log("note: ", noteId);
    const options = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            noteId: noteId
        })
    }
    const URL = `/notes/${noteId}`

    fetch(URL, options)
    .then(response => response.json())
    .then(data => console.log('note to delete', data))
}

var putButton = document.getElementById('user_form_put');
putButton.addEventListener('submit', putPost);

function putPost(event) {
    event.preventDefault();
    var noteId = event.target.noteId.value;
    var noteDescription = event.target.noteDescription.value;
    var noteTitle = event.target.noteTitle.value;
    post = {
        noteTitle: noteTitle,
        noteDescription: noteDescription
    }
    const options = {
        method: 'PATCH',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(post)
    }
    const URL = `/notes/${noteId}`;

    return fetch(URL, options)
    .then(response => response.json())
    .then(data => console.log('note to update', data))
}