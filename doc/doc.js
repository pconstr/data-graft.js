/* Copyright 2010-2011, Carlos Guerreiro
 * Licensed under the MIT license */

var pageNo = 0;

var pageSequence = [
    'about',
    'using',
    'templates',
    'text',
    'values',
    'function',
    'attributes',
    'if',
    'each',
    'for',
    'simplefor',
    'ordinalfor',
    'else',
    'animation',
    'change_handlers',
    'change_table',
    'start_finish',
    'init'
];

var pageInfo = {
    'about':
    { title: 'About',
      input: [{'color':'red'}, {'color':'blue'} ] },
    'using':
    { title: 'Using'},
    'templates':
    { title: 'Templates'},
    'text':
    { title: 'Grafting text',
      input : [
	  {'adj':'small', 'noun':'box'},
	  {'adj':'large', 'noun':'ball'},
	  {'adj':'large', 'noun':'box'},
	  {'noun':'box'}
      ]
    },
    'values':
    { title: 'Values'},
    'attributes':
    { title: 'Grafting attributes',
      input: [
	  { 'photo': 'a.jpg' },
	  { 'photo': 'b.jpg' },
	  { 'photo': 'c.jpg' },
	  { 'photo': null }
      ]
    },
    'function':
    { title: 'Function example',
      input: [
	  {'a':1, 'b':2},
	  {'a':1, 'b':3}
      ]
    },
    'if':
    { title: 'Grafting conditionally',
      input: [
	  { 'address': {'city': 'Helsinki', 'country': 'Finland'} },
	  {},
	  { 'address': null }
      ]
    },
    'each':
    { title: 'Grafting each property',
      input: [
	  {
	      a: 1,
	      b: 2,
	      c: 3
	  },
	  {
	      a: 1,
	      c: 3
	  },
	  {
	      c: 3,
	      d: 4
	  }
      ]},
    'for':
    { title: 'Grafting an array',
      input : [
	  [
	      { id: 1 },
	      { id: 2 },
	      { id: 3 }
	  ],
	  [
	      { id: 1 },
	      { id: 3 }
	  ],
	  [
	      { id: 3 },
	      { id: 4 }
	  ]
      ]
    },
    'simplefor':
    { title: 'Grafting simple array',
      input : [
	  ['a','b','c'],
	  ['a','b'],
	  ['a','c'],
	  ['c']
      ]
    },
    'ordinalfor':
    { title: 'Grafting by index',
      input : [
	  ['a','b','c'],
	  ['a','b'],
	  ['a','c'],
	  ['c']
      ]
    },
    'else':
    { title: 'Else',
      input: [
	  { 'address': {'city': 'Helsinki', 'country': 'Finland'} },
	  {},
	  { 'address': undefined }
      ]
    },
    'animation':
    { title: 'Animation'},
    'change_handlers':
    { title: 'Change handlers'},
    'change_table':
    { title: 'Change handlers table'},
    'start_finish':
    { title: 'Animation start/finish' },
    'init':
    { title: 'Init'}
};

function textSpan(t, c) {
    var s = document.createElement('span');
    s.className = 'prettyInside';
    if(c !== undefined) {
	s.className = c;
    }
    s.appendChild(document.createTextNode(t));
    return s;
}

function textGraftSpan(k, c) {
    var s = document.createElement('span');
    s.className = 'prettyInside';
    if(c !== undefined) {
	s.className = c;
    }
    s.setAttribute('data-graft-text', k);
    return s;
}

function textDiv(t, c) {
    var s = document.createElement('div');
    s.className = 'prettyInside';
    if(c !== undefined) {
	s.className = c;
    }
    s.appendChild(document.createTextNode(t));
    return s;
}

function trimmedString(s) {
    return s.replace(/^\s+|\s+$/g,"");
}

function isFlatNode(n) {
    var i, c, t;
    for(i = 0; i < n.childNodes.length; ++i) {
	c = n.childNodes[i];
	t = c.nodeType;
	if(t === 1) {
	    return false;
	}
    }
    return true;
}

function downMark(n, keepGraft, keepId) {

    if(keepId === undefined) {
	keepId = false;
    }

    var i, a;

    nt = n.nodeType;

    if(nt === 3) {
	// text node
	// document.createTextNode(n.nodeValue);
	return document.createTextNode(trimmedString(n.nodeValue));
    } else if(nt === 8) {
	// comment node
	// document.createComment(n.nodeValue);
	return document.createComment(n.nodeValue);
    } else {
	// n.tagName;
	var tagName = n.tagName.toLowerCase();

	var oE = document.createElement('div');

	oE.className = 'element';

	var oOpening = document.createElement('span');
	oOpening.className = 'openingtag';
	var oClosing = document.createElement('span');
	oClosing.className = 'closingtag';

	oInside = document.createElement('span');

	oOpening.appendChild(textSpan('<', 'tagless'));
	oOpening.appendChild(textSpan(tagName, 'tagname'));

	var carryAttributes = [];
	var aName;

	for(i = 0; i < n.attributes.length; ++i) {
	    a = n.attributes[i];
	    if(a.name == 'id' && !keepId) {
	    } else if (keepGraft && a.name.slice(0, 12) === 'data-graft--') {
		aName = a.name.slice(12);

		var s2 = document.createElement('span');
		s2.setAttribute('data-graft-if', a.value);
		var s3 = document.createElement('span');
		s2.appendChild(s3);

		oOpening.appendChild(s2);

		s3.appendChild(textSpan(' '));
		s3.appendChild(textSpan(aName, "attributename"));
		s3.appendChild(textSpan('=', 'equals'));
		s3.appendChild(textSpan('"', 'quote'));

		s3.appendChild(textGraftSpan('', "attributevalue"));

		s3.appendChild(textSpan('"', 'quote'));
	    } else if (keepGraft && a.name.slice(0, 11) === 'data-graft-') {
		carryAttributes.push(a);
	    } else {
		oOpening.appendChild(textSpan(' '));
		oOpening.appendChild(textSpan(a.name, "attributename"));
		oOpening.appendChild(textSpan('=', 'equals'));
		oOpening.appendChild(textSpan('"', 'quote'));
		oOpening.appendChild(textSpan(a.value, "attributevalue"));
		oOpening.appendChild(textSpan('"', 'quote'));
	    }
	}

	oOpening.appendChild(textSpan('>', 'tagmore'));

	oE.appendChild(oOpening);

	oE.appendChild(oInside);
	
	var oChildren;
	if(isFlatNode(n)) {
	    oChildren = document.createElement('span');
	} else {
	    oChildren = document.createElement('div');
	    oChildren.className = 'children';
	}

	for(i = 0; i < n.childNodes.length; ++i) {
	    oChildren.appendChild(downMark(n.childNodes[i], keepGraft));
	}

	for(i = 0; i < carryAttributes.length; ++i) {
	    oChildren.setAttribute(carryAttributes[i].name, carryAttributes[i].value);
	}

	oE.appendChild(oChildren);

	oClosing.appendChild(textSpan('</', 'tagless'));
	oClosing.appendChild(textSpan(tagName, 'tagname'));
	oClosing.appendChild(textSpan('>', 'tagmore'));

	oE.appendChild(oClosing);

	return oE;
    }
}

function prettyInput(d) {
    var t = typeof(d);
    var e;
    var c;
    var i;
    var needComma;
    if( t === 'number' || d === null || d === undefined) {
	return textSpan(''+ d, "literal");
    } else if(t === 'object') {
	if(d.constructor === Array) {
	    e = document.createElement('span');
	    e.className = 'prettyinside';
	    e.appendChild(textSpan('[', 'openbracket'));
	    needComma = false;
	    for(i = 0; i < d.length; ++i) {
		if(needComma) {
		    e.appendChild(textSpan(',', 'comma'));
		    }
		e.appendChild(prettyInput(d[i]));
		needComma = true;
	    }
	    e.appendChild(textSpan(']', 'closebracket'));
	    return e;
	} else {
	    e = document.createElement('span');
	    e.className = 'prettyinside';
	    e.appendChild(textSpan('{', 'openbrace'));
	    needComma = false;
	    for(c in d) {
		if(d.hasOwnProperty(c)) {
		    if(needComma) {
			e.appendChild(textSpan(', ', 'comma'));
		    }
		    e.appendChild(prettyInput(c));
		    e.appendChild(textSpan(':', 'colon'));
		    e.appendChild(prettyInput(d[c]));
		    needComma = true;
		}
	    }
	    e.appendChild(textSpan('}', 'closebrace'));
	    return e;
	}
    } else if(t === 'string') {
	e = document.createElement('span');
	e.className = 'prettyinside';
	e.appendChild(textSpan('"', 'quote'));
	e.appendChild(textSpan(d, 'literal'));
	e.appendChild(textSpan('"', 'quote'));
	return e;
    }
}

var handlers = (function() {
    var isBusy = false;
    var that = {
	f: function(d) {
	    return d.a+ '_'+ d.b;
	},
	start: function() {
	    isBusy = true;
	},
	finish: function() {
	    isBusy = false;
	},
	'_all_': {
	    preInsertText: function(e, finished) {
		$(e).hide();
		$(e).fadeTo(0, 0);
		finished();
	    },

	    postInsertText: function(e, finished) {
		$(e).animate({'opacity': 1}, 300, finished);
	    },

	    preRemoveText: function(e, finished) {
		$(e).animate({'opacity': 0}, 300, finished);
	    },

	    postRemoveText: function(e, finished) {
		finished();
	    },

	    preUpdateText: function(e, finished) {
		$(e).animate({'opacity': 0}, 300, finished);
	    },

	    postUpdateText: function(e, finished) {
		$(e).animate({'opacity': 1}, 300, finished);
	    },

	    preInsertIf: function(e, finished) {
		finished();
	    },

	    preRemoveIf: function(e, finished) {
		$(e).animate({'opacity': 0}, 300, finished);
	    },

	    postRemoveIf: function(e, finished) {
		finished();		
	    },

	    postInsertIf: function(e, finished) {
		$(e).hide();
		$(e).fadeTo(0, 0);
		finished();
		$(e).animate({'opacity': 1}, 300, finished);
	    },

	    preInsertElse: function(e, finished) {
		finished();
	    },

	    preRemoveElse: function(e, finished) {
		$(e).animate({'opacity': 0}, 300, finished);
	    },

	    postRemoveElse: function(e, finished) {
		finished();		
	    },

	    postInsertElse: function(e, finished) {
		$(e).hide();
		$(e).fadeTo(0, 0);
		finished();
		$(e).animate({'opacity': 1}, 300, finished);
	    },

	    preInsertSequence: function(e, finished) {
		$(e).hide();
		$(e).fadeTo(0, 0);
		finished();
	    },
	    postInsertSequence: function(e, finished) {
		$(e).hide();
		/*
		  $(e).find('img').imagesLoaded(function(img) {
		*/
		
		// jQuery on Firefox needs some reminding here. weird...
		jQuery._data(e, "olddisplay", "inline-block");
		
		$(e).show(300, function() {
		    $(e).fadeTo(300, 1, finished);
		});
		/*
		  });
		*/
	    },
	    preRemoveSequence: function(e, finished) {
		$(e).fadeTo(300, 0, function() {
		    $(e).hide(300, finished);
		});
	    }	    
	},
	busy: function() {
	    return isBusy;
	}
    };
    return that;
}());

function updateHeader(delay) {
    var info = pageInfo[pageSequence[pageNo]];
    if(pageNo < pageSequence.length - 1) {
	$('#title-next').text(pageInfo[pageSequence[pageNo + 1]].title);
	$('#bignext').animate({'opacity':1}, delay);
    } else {
	$('#title-next').text('');
	$('#bignext').animate({'opacity': 0.3}, delay);
    }
    if(pageNo > 0) {
	$('#title-prev').text(pageInfo[pageSequence[pageNo - 1]].title);
	$('#bigprev').animate({'opacity':1}, delay);
    } else {
	$('#title-prev').text('');
	$('#bigprev').animate({'opacity':0.3}, delay);
    }
}

function generateContent(pageName) {
    var info = pageInfo[pageName];
    
    var content = $('#content_'+ pageName).clone();
    content.removeAttr('id');

    $(content).find('.htmlblock').each(function() {
	var nn = $(this).attr('data-node');
	var n = document.getElementById(nn);
	var dm = downMark(n, false, true);
	$(this).append(dm);
    });

    $(content).find('.jsblock').each(function() {
	var js = $(this).text();
	var n = $('<div class="jsblock">'+ js+ '</span>');
	$(this).replaceWith(n);
    });

    var tpl = $('#tpl_'+pageName)[0];
    if(tpl === undefined) {
	return content;
    }

    var exHolder = $(content).find('.example');

    if(exHolder.length === 0) {
	return content;
    }

    var exampleTemplate = $('#exampletemplate')[0];   
    var example = $(exampleTemplate).clone();
    example.removeAttr('id');
    $(exHolder).replaceWith(example);

    $(content).find('.downmark').append(downMark(tpl, false));
    $('#downmarkgraft').children().remove();
    $('#downmarkgraft').append(downMark(tpl, true));

    var downmarkedTemplate = $('#downmarkgraft')[0];

    var i, pd, pdc, pdd;
    var isFirst = true;

    var input = info.input;
    var graft = null;

    for(i = 0; i < input.length; ++i) {
	if(!isFirst) {
	    $(content).find('.datastack').append(textDiv('or', 'bigor'));
	}
	pdc = document.createElement('a');
	pdc.className = 'datalink';
	pd = document.createElement('div');
	pdd = prettyInput(input[i]);
	pd.className = 'data';
	pd.appendChild(pdd);
	pdc.appendChild(pd);
	pdc.href ="";
	$(pdc).click(input[i], function(event) {
	    try {
		$(content).find('.selected').removeClass('selected');
		$(this).children().addClass('selected');
		if(!handlers.busy()) {
		    //data_graft.update(output, event.data, downmarkedTemplate, handlers);
		    graft.update(event.data);
		}
	    } catch(err) {
		console.error(err);
	    } 
	    return false;
	});
	if(isFirst) {
	    $(pd).addClass('selected');
	}
	$(content).find('.datastack').append(pdc);
	isFirst = false;
    }
    var d = input[0];
    graft = data_graft.germ(d, downmarkedTemplate, handlers);
    $(content).find('.output').append(graft.output);

    return content;
}

var currentContent = null;

var navigateDelay = 300;

var navAnimCount = 0;

function navigate(delta) {
    if(navAnimCount > 0) {
	return;
    }

    var newPageNo = pageNo + delta;
    if(newPageNo >= pageSequence.length) {
	return;
    }
    if(newPageNo < 0) {
	return;
    }
    if(handlers.busy()) {
	return;
    }

    navAnimCount = navAnimCount + 2;
    var content = currentContent;
    var w = $(window).width();

    var newContent = generateContent(pageSequence[newPageNo]);

    if(delta > 0) {
	$(newContent).css('left', w);
	$(content).after(newContent);
	$(content).animate({'left': -w}, navigateDelay, function() {
	    $(content).remove();
	});
	navAnimCount = navAnimCount - 1;
    } else {
	$(newContent).css('left', -w);
	$(content).before(newContent);
	$(content).animate({'left': w}, navigateDelay, function() {
	    $(content).remove();
	});
	navAnimCount = navAnimCount - 1;
    }

    $(newContent).animate({'left': 0}, navigateDelay, function() {
	navAnimCount = navAnimCount - 1;
    });
    currentContent = newContent;
    pageNo = newPageNo;

    updateHeader(300);
}

jQuery(document).ready(function() {
    
    currentContent  = generateContent(pageSequence[pageNo]);
    $('#page').append(currentContent);

    updateHeader(300);
    $('#header').animate({'opacity':1}, 300);
    $('#page').animate({'opacity':1}, 300);

    $('#bignext').click(function() {
	try {
	    navigate(1);
	} catch(err) {
	    console.error(err);
	}
	return false;
    });
    $('#bigprev').click(function() {
	try {
	    navigate(-1);
	} catch(err) {
	    console.error(err);
	} 
	return false;
    });

});