// Client ID and API key from the Developer Console
// var CLIENT_ID = '304030376995-peok82ttae46jmdvqra62jv4agaaa4e9.apps.googleusercontent.com';
// var API_KEY = 'AIzaSyD52L7GpxR5QoOrX0PtPIQf-XGJPKSzwL8';

// brungo1995 Account
// var CLIENT_ID = '304030376995-2kt3cvphngb0q4ujjg8bn89o5rugs3ic.apps.googleusercontent.com';
// var API_KEY = 'AIzaSyD52L7GpxR5QoOrX0PtPIQf-XGJPKSzwL8';

// nanosoft Account
var CLIENT_ID = '268533544506-b9ebe7rme4t6c99jbksi03gb3fc5iu7h.apps.googleusercontent.com';
// var API_KEY = '<AOI_KEY>';
var API_KEY = 'AIzaSyBbwCP7WsVophZAYHOH2oVw3pqUY9Xzklw';


// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// var SCOPES = 'https://www.googleapis.com/auth/drive.file';
var SCOPES = 'https://www.googleapis.com/auth/drive';
// var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';


var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
var listFoldersButton = document.getElementById('list_folders');
var clearButton = document.getElementById('clear');
var createFolderButton = document.getElementById('create_folder');
var deleteFolderButton = document.getElementById('delete_folder');
// var createFileButton = document.getElementById('create_file');
var listFilesButton = document.getElementById('list_files');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
        listFilesButton.onclick = listFiles;


        // Register folder handlers
        listFoldersButton.onclick = handleListFolders;
        clearButton.onclick = handleClear;
        createFolderButton.onclick = handleCreateFolder;
        deleteFolderButton.onclick = handleDeleteFolder;

        // File handlers
        // createFileButton.onclick = handleCreateSpreadsheet;

    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'block';
        listFoldersButton.style.display = 'block';
        clearButton.style.display = 'block';
        createFolderButton.style.display = 'block';
        deleteFolderButton.style.display = 'block';
        //  createFileButton = document.getElementById('create_file');
        listFilesButton.style.display = 'block';
        document.getElementById("folder_name").style.display = 'block';

        // listFiles();
        appendPre("SIGNED IN")
        // appendPre("SIGNED IN ! YEY!!")
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        listFoldersButton.style.display = 'none';
        clearButton.style.display = 'none';
        createFolderButton.style.display = 'none';
        deleteFolderButton.style.display = 'none';
        //  createFileButton = document.getElementById('create_file');
        listFilesButton.style.display = 'none';
        document.getElementById("folder_name").style.display = 'none';

    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

function handleClear() {
    var pre = document.getElementById('content');
    pre.innerText = "";
}

/**
 * Print files.
 */
function listFiles() {
    gapi.client.request({
        path: "https://www.googleapis.com/drive/v3/files",
        method: "GET",
    }).then(function (response) {
        appendPre('Files:');
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                appendPre(file.name + ' (' + file.id + ')');
            }
        } else {
            appendPre('No files found.');
        }
    });
    // gapi.client.drive.files.list({
    //     'pageSize': 10,
    //     'fields': "nextPageToken, files(id, name)"
    // }).then(function (response) {
    //     appendPre('Files:');
    //     var files = response.result.files;
    //     if (files && files.length > 0) {
    //         for (var i = 0; i < files.length; i++) {
    //             var file = files[i];
    //             appendPre(file.name + ' (' + file.id + ')');
    //         }
    //     } else {
    //         appendPre('No files found.');
    //     }
    // });


}

/**
 * CREATE FOLDER
 */
function handleCreateFolder() {
    const folderName = document.getElementById("folder_name").value
    gapi.client.request({
        path: "https://www.googleapis.com/drive/v3/files",
        method: "post",
        body: {
            name: `${folderName}`,
            mimeType: "application/vnd.google-apps.folder"
        }
    }).then(function (response) {
        appendPre('Created Folder:');
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                appendPre(file.name + ' (' + file.id + ')');
            }
        } else {
            appendPre('No files found.');
        }
    });
}


/**
 * DELETE FOLDER
 */
function handleDeleteFolder() {
    const folderName = document.getElementById("folder_name").value

    gapi.client.request({
        path: `https://www.googleapis.com/drive/v3/files/${folderName}`,
        method: "delete"
    }).then(function (response) {
        console.log(response)
        appendPre('DELETED Folder:');
        handleListFolders();
    });
}


/**
 * LIST FOLDERS
 */
function handleListFolders() {
    gapi.client.request({
        path: "https://www.googleapis.com/drive/v3/files?q=mimeType: 'application/vnd.google-apps.folder'",
    }).then(function (response) {
        appendPre('Files:');
        var files = response.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                appendPre(file.name + ' (' + file.id + ')');
            }
        } else {
            appendPre('No Folders found.');
        }
    });
    // gapi.client.drive.files.list({
    //     'pageSize': 10,
    //     'fields': "nextPageToken, files(id, name)"
    // }).then(function (response) {
    //     appendPre('Files:');
    //     var files = response.result.files;
    //     if (files && files.length > 0) {
    //         for (var i = 0; i < files.length; i++) {
    //             var file = files[i];
    //             appendPre(file.name + ' (' + file.id + ')');
    //         }
    //     } else {
    //         appendPre('No files found.');
    //     }
    // });
}

/**
 * CREATE SPREADSHEET
 */
function handleGetSpreadsheet() {
    let docName = document.getElementById("spreadsheet_name").value;

    gapi.client.request({
        path: `https://sheets.googleapis.com/v4/spreadsheets/${docName}`,
        method: "GET",
    }).then(function (response) {
        appendPre('Spreadsheets:');
        var files = response.result.files;
        console.log("CREATE SPREADSHEETS RES: ")
        console.log(response);
        // list files
    });
}

/**
 * GET SPREADSHEET
 */
function handleCreateSpreadsheet() {
    let docName = document.getElementById("spreadsheet_name").value
    gapi.client.request({
        path: "https://sheets.googleapis.com/v4/spreadsheets",
        method: "post",
        body: {
            name: docName,
        }
    }).then(function (response) {
        appendPre('Spreadsheets:');
        var files = response.result.files;
        console.log("CREATE SPREADSHEETS RES: ")
        console.log(response);
        // list files
    });
}



// gapi.client.request({
//     path: "https://www.googleapis.com/drive/v3/files",
//     method: "post",
//     body:{}
// }).then(function (response) {
//     appendPre('Files:');
//     var files = response.result.files;
//     if (files && files.length > 0) {
//         for (var i = 0; i < files.length; i++) {
//             var file = files[i];
//             appendPre(file.name + ' (' + file.id + ')');
//         }
//     } else {
//         appendPre('No files found.');
//     }
// });