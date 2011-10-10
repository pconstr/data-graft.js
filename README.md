data-graft.js
=============

data-graft.js is a animation-friendly differential DOM template engine, self-contained and framework-agnostic.

Instead of stringing up bits of HTML markup, it works from a DOM template, operates on DOM nodes and never touches markup.

data-graft.js updates differentially - minimizing the number of changes to the presentation required to match the new data - and provides hooks to animate those changes.

The intended scenario for data-graft.js is one where the front-end presents a view of changing data coming from a server. Typically data will be encoded as JSON and pulled in with AJAX or pushed by the server through web sockets. In this scenario, new data will appear or will change outside the control of the frontend. The frontend needs to update its presentation smoothly, ideally with descriptive animations to cue the user on what has changed.

Templates have enough information about the internal structure of the data to determine how to granularly update its presentation, and change hooks provide the opportunity to animate changes. So you feed data-graft.js the changed data and let it orchestrate the necessary DOM operations and animation calls.

To learn more, read the [documentation](http://labs.perceptiveconstructs.com/data-graft/doc/doc.html) and check out the [catsagram demo](http://labs.perceptiveconstructs.com/catsagram)

Download release 0.1.2: [plain](http://labs.perceptiveconstructs.com/data-graft/doc/data-graft-0.1.2.js) or [minified](http://labs.perceptiveconstructs.com/data-graft/doc/data-graft-0.1.2.min.js)
