sequenceDiagram
    participant browser
    participant server

    Note right of browser: User types a note and clicks "Save"

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP 201 Created
    deactivate server  

    Note right of browser: The browser, using JavaScript (from spa.js), dynamically updates the UI to include the new note without refreshing the page.