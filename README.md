WYSIWYG rich text editor

This is part of my personal practice projects to get familiar with web developing

I'll try creating a functioning WYSIWYG (What You See Is What You Get) rich text editor, inspired by Microsoft Office Word 2019's design.

I'll be using only HTML, CSS and JS. The objective is to learn without the help of external libraries.

Need work:
Find a way to display with page is being actively written on in every instance

Needed:
insert image via upload by user

It's possible to know the selection starting and ending potition with the property selectionStart and selectionEnd. It is so possible to know the user cursor position inside the text editor with selection start.

Find a way to insert and image on the cursor's position (same way as table, ask image url as prompt)

Insert uploaded images
https://stackoverflow.com/questions/60203320/inserting-and-using-the-user-uploaded-image-in-html-and-javascript
needs to study this more in depth

resize image for user
https://www.w3schools.com/cssref/css3_pr_resize.php
resize not working. probably similar to links. contenteditable conflicting

row 185-203 JS commit #21
clickable link via ctrl key press is commented. When using shotcut such as ctrl+C, ctrl+V, ctrl+P..... it does not pick up keyup of ctrl key, thus making paper sheets permanently not content editable

Needs fixing