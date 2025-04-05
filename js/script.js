// Import all buttons and elements
// menu
const sidebarOpen = document.getElementById("open-sidebar");
const topHome = document.getElementById("top-home");
const topInsert = document.getElementById("top-insert");
const topDraw = document.getElementById("top-draw");
const topDesign = document.getElementById("top-design");
const topLayout = document.getElementById("top-layout");
const topReference = document.getElementById("top-reference");
const topMailings = document.getElementById("top-mailings");
const topReview = document.getElementById("top-review");
const topView = document.getElementById("top-view");
const topHelp = document.getElementById("top-help");
// toolbars
const toolbarHome = document.getElementById("toolbar-home");
const toolbarInsert = document.getElementById("toolbar-insert");
const toolbarDraw = document.getElementById("toolbar-draw");
const toolbarDesign = document.getElementById("toolbar-design");
const toolbarLayout = document.getElementById("toolbar-layout");
const toolbarReference = document.getElementById("toolbar-reference");
const toolbarMailings = document.getElementById("toolbar-mailings");
const toolbarReview = document.getElementById("toolbar-review");
const toolbarView = document.getElementById("toolbar-view");
const toolbarHelp = document.getElementById("toolbar-help");

// page elements
const pageTitle = document.getElementById("title");
const writingArea = document.querySelectorAll(".text-input");

// toolbar buttons
const optionsButtons = document.querySelectorAll(".option-button");
const advancedOptionButton = document.querySelectorAll(".adv-option-button");
const fontName = document.getElementById("fontName");
const fontSizeRef = document.getElementById("fontSize");
const alignButtons = document.querySelectorAll(".align");
const spacingButtons = document.querySelectorAll(".spacing");
const formatButtons = document.querySelectorAll(".format");
const scriptButtons = document.querySelectorAll(".script");

const newPage = document.getElementById("new-page");
const linkButton = document.getElementById("createLink");

// footer elements
// left footer
const currentPage = document.getElementById("current-page");
const totalPage = document.getElementById("total-pages");
const wordCount = document.getElementById("word-count");
// right footer
const zoomInput = document.getElementById("zoom");
const zoomLabel = document.getElementById("zoom-label");
const mainArea = document.querySelector("main");

// sidebar opening and closig buttons
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

// total page count
let totalPageNumber = mainArea.getElementsByClassName("sheet").length
totalPage.innerText = totalPageNumber;

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

//link
linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL");
    //if link has http then pass directly else add https
    if (userLink.includes("http")) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

// to make the link created clickable, I need to remove contenteditable from text-input div when ctrl is pressed
// and add it back when ctrl is released
mainArea.addEventListener("keydown", (e) => {
    const writingAreas = document.querySelectorAll(".text-input"); // Dynamically select all text-input elements
    if (e.key == "Control") {
        writingAreas.forEach((area) => {
            area.setAttribute("contenteditable", "false");
        });
    }
});

mainArea.addEventListener("keyup", () => {
    const writingAreas = document.querySelectorAll(".text-input"); // Dynamically select all text-input elements
    if (e.key == "Control") {
        writingAreas.forEach((area) => {
            area.setAttribute("contenteditable", "true");
        });
    }
})

// show large toolbar
const showToolbar = (toolbar) => {
    // hide all toolbars
    toolbarHome.classList.remove("visible-toolbar");
    toolbarInsert.classList.remove("visible-toolbar");
    toolbarDraw.classList.remove("visible-toolbar");
    toolbarDesign.classList.remove("visible-toolbar");
    toolbarLayout.classList.remove("visible-toolbar");
    toolbarReference.classList.remove("visible-toolbar");
    toolbarMailings.classList.remove("visible-toolbar");
    toolbarReview.classList.remove("visible-toolbar");
    toolbarView.classList.remove("visible-toolbar");
    toolbarHelp.classList.remove("visible-toolbar");

    toolbarHome.classList.add("hidden-toolbar");
    toolbarInsert.classList.add("hidden-toolbar");
    toolbarDraw.classList.add("hidden-toolbar");
    toolbarDesign.classList.add("hidden-toolbar");
    toolbarLayout.classList.add("hidden-toolbar");
    toolbarReference.classList.add("hidden-toolbar");
    toolbarMailings.classList.add("hidden-toolbar");
    toolbarReview.classList.add("hidden-toolbar");
    toolbarView.classList.add("hidden-toolbar");
    toolbarHelp.classList.add("hidden-toolbar");

    // hide top menu selected class
    topHome.classList.remove('selected');
    topInsert.classList.remove('selected');
    topDraw.classList.remove('selected');
    topDesign.classList.remove('selected');
    topLayout.classList.remove('selected');
    topReference.classList.remove('selected');
    topMailings.classList.remove('selected');
    topReview.classList.remove('selected');
    topView.classList.remove('selected');
    topHelp.classList.remove('selected');

    // show selected toolbar
    toolbar.classList.remove("hidden-toolbar");
    toolbar.classList.add("visible-toolbar");
}
// event listeners for each button to show the corresponding toolbar
topHome.addEventListener("click", () => {
    showToolbar(toolbarHome);
    topHome.classList.add('selected');
});
topInsert.addEventListener("click", () => {
    showToolbar(toolbarInsert);
    topInsert.classList.add('selected');
});
topDraw.addEventListener("click", () => {
    showToolbar(toolbarDraw);
    topDraw.classList.add('selected');
});
topDesign.addEventListener("click", () => {
    showToolbar(toolbarDesign);
    topDesign.classList.add('selected');
});
topLayout.addEventListener("click", () => {
    showToolbar(toolbarLayout);
    topLayout.classList.add('selected');
});
topReference.addEventListener("click", () => {
    showToolbar(toolbarReference);
    topReference.classList.add('selected');
});
topMailings.addEventListener("click", () => {
    showToolbar(toolbarMailings);
    topMailings.classList.add('selected');
});
topReview.addEventListener("click", () => {
    showToolbar(toolbarReview);
    topReview.classList.add('selected');
});
topView.addEventListener("click", () => {
    showToolbar(toolbarView);
    topView.classList.add('selected');
});
topHelp.addEventListener("click", () => {
    showToolbar(toolbarHelp);
    topHelp.classList.add('selected');
});

// new page
newPage.addEventListener("click", () => {
    //create new div with class sheet
    const newSheet = `<div class="sheet A4">
                        <div class="text-input" contenteditable="true"></div>
                    </div>`
    mainArea.innerHTML += newSheet;
    totalPageNumber += 1;
    totalPage.innerText = totalPageNumber;
});

// active word count
// event triggered every time a key gets pressed
mainArea.addEventListener("keyup", () => {
    let wordCountNumber = 0;
    const writingAreas = document.querySelectorAll(".text-input"); // Dynamically select all text-input elements
    writingAreas.forEach((area) => {
        wordCountNumber += area.innerText.trim().split(/\s+/).filter(word => word.length > 0).length; // Count words

        // trim() removes leading and trailing spaces
        // split(/\s+/) splits the string into an array of words based on whitespace
        // filter(word => word.length > 0) filters out empty strings
    });
    wordCount.innerText = wordCountNumber;
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