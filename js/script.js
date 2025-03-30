// Import all buttons and elements
const optionsButtons = document.querySelectorAll(".option-button");
const advancedOptionButton = document.querySelectorAll(".adv-option-button");
const fontName = document.getElementById("fontName");
const fontSizeRef = document.getElementById("fontSize");
const writingArea = document.getElementById("text-input");
const alignButtons = document.querySelectorAll(".align");
const spacingButtons = document.querySelectorAll(".spacing");
const formatButtons = document.querySelectorAll(".format");
const scriptButtons = document.querySelectorAll(".script");
const pageTitle = document.getElementById("title");

const zoomInput = document.getElementById("zoom");
const zoomLabel = document.getElementById("zoom-label");
const mainArea = document.querySelector("main");

// sidebar opening and closig buttons
const sidebarOpen = document.getElementById("open-sidebar");
const sidebarClose = document.getElementById("close-sidebar");
const sidebar = document.getElementById("sidebar");

// font list
let fontList = [
    "Arial",
    "Brush Script MT",
    "Courier New",
    "cursive",
    "Garamond",
    "Georgia",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana"
];

// highlight functions
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            //needsRemoval = true means only one button should be highlight and other would be normal
            if (needsRemoval) {
                let alreadyActive = false;
                //If currently clicked button is already active
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }
                //Remove highlight from other buttons
                highlighterRemover(className);
                if (!alreadyActive) {
                    //highlight clicked button
                    button.classList.add("active");
                }
            } else {
                //if other buttons can be highlighted
                button.classList.toggle("active");
            }
        });
    });
};

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

// function to add option to select from a given array
const addOptions = (target, list) => {
    for (let i = 0; i < list.length; i++) {
        let option = document.createElement("option");
        option.value = list[i];
        option.innerHTML = list[i];
        target.appendChild(option);
    }
};

// page title change 
console.log(document.title);
console.log(pageTitle);
pageTitle.addEventListener("input", () => {
    document.title = `${pageTitle.innerText}`;
})

// Initial settings
const initializer = () => {
    // buttons highlights
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);
    // all buttons need to not be in highlight if another one is already highligted, except for the formatting ones

    // create options for font names
    addOptions(fontName, fontList);

    // fontSize options
    // execCommand fontSize accept values from 1 to 7 only
    for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    // default size
    fontSizeRef.value = 3;

    // zoom
    zoomLabel.innerText = `${zoomInput.value}%`;
    zoomInput.value = 100;
}

// core function to allow page to work
const modifyText = (command, defaultUi, value) => {
    //execCommand executes command on selected text
    document.execCommand(command, defaultUi, value);
    // we'll use the id of each button as command
};

//For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

//options that require value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

// zoom
zoomInput.addEventListener("click", (e) => {
    // label correspond on succrent zoom level
    zoomLabel.innerText = `${zoomInput.value}%`;

    // actual zoom functionality
    mainArea.style.zoom = `${zoomInput.value}%`;

});

// clicking zoom label will bring back zoom level to default value: 100%
zoomLabel.addEventListener("click", (e) => {
    zoomInput.value = 100;
})

// toggle sidebar on different buttons
sidebarOpen.addEventListener("click", () => {
    sidebar.classList.remove("hidden-sidebar");
    sidebar.classList.add("active-sidebar");
});

sidebarClose.addEventListener("click", () => {
    sidebar.classList.remove("active-sidebar");
    sidebar.classList.add("hidden-sidebar");
});

// keydown and keyup event provide key code of the key pressed
// keycode of escape is 27, but keyCode is deprecated
// use key instead
// alternative keypressed is deprecated. It also use a different keycode
document.body.addEventListener('keyup', (e) => {
    if (e.key == "Escape" && sidebar.classList.contains("active-sidebar")) {
        sidebar.classList.remove("active-sidebar");
        sidebar.classList.add("hidden-sidebar");
    }
});

// run initializer function as soon as window loads
window.onload = initializer();