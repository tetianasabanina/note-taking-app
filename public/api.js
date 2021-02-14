const searchButton = document.getElementById('search_form');
searchButton.addEventListener('submit', getRequest);

function getRequest(event) {
    event.preventDefault();
    const search = event.target.searchValue.value;
    console.log('search: ', search);
    fetch(`/notes`)
        .then(response => response.json())
        .then(function (data) {
            // for (const i in data) {
            //     console.log('note ', data[i].noteTitle)
            // }
            var filteredData = []
            if (data.length > 0) {
                filteredData = data.filter(note => note.noteTitle.includes(search) || note.noteDescription.includes(search))
                if (filteredData.length === 0) {
                    document.getElementById("results").innerHTML = '';
                    document.getElementById("results").innerHTML = 'No notes found.';
                } else {
                    document.getElementById("results").innerHTML = ''; // clean <div>
                    for (const i in filteredData) {
                        document.getElementById("results").innerHTML += filteredData[i].noteTitle + ': ' + filteredData[i].noteDescription + ' (posted ' + filteredData[i].noteDate + ' )' + '<br />';
                    }
                }
            } else {
                document.getElementById("results").innerHTML = '';
                document.getElementById("results").innerHTML = "You don't have notes.";
            }
            console.log("Found: ", filteredData)
        })
}

const postButton = document.getElementById('user_form_post');
postButton.addEventListener('submit', newPost)

function newPost(event, post) {
    event.preventDefault();
    const noteTitle = event.target.noteTitle.value;
    const noteDescription = event.target.noteDescription.value;

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

const deleteButton = document.getElementById('user_form_delete');
deleteButton.addEventListener('submit', deletePost);

function deletePost(event) {
    event.preventDefault();
    const noteId = event.target.noteId.value;
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

const putButton = document.getElementById('user_form_put');
putButton.addEventListener('submit', putPost);

function putPost(event) {
    event.preventDefault();
    const noteId = event.target.noteId.value;
    const noteDescription = event.target.noteDescription.value;
    const noteTitle = event.target.noteTitle.value;
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