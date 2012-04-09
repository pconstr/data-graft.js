/*jslint white: true, browser: true, plusplus: true, vars: true, nomen: true, bitwise: true*/
/*global jQuery: false, $: false, data_graft: false*/

/* Copyright 2010-2011, Carlos Guerreiro
 * Licensed under the MIT license */

"use strict";

var data_input = {
  1 : [
    'graft',
    'graft',
    'data'
  ],
  2 : [
    'graft',
    'graft',
    'data'
  ],
  3 : [
    {a: 'graft', b: 'data'},
    {a: 'graft', b: 'data'},
    {a: 'graft', b: 'other'}
  ],
  4 : [
    {inside: {a: 'data'}},
    {inside: {a: 'data'}},
    {inside: {a: 'other'}}
  ],
  5 : [
    {b: 'outside', inside: {a: 'inside'}},
    {b: 'other', inside: {a: 'inside'}},
    {b: 'outside', inside: {a: 'other'}}
  ],
  6 : [
    [1, 2, 3],
    [1, 2, 3]
  ],
  7 : [
    {'a':1, 'b':2, 'c':3},
    {'a':1, 'b':22, 'c':3},
    {'a':1, 'd':3}
  ],
  8 : [
    {'a':1, 'b':2, 'c':3},
    {'a':1, 'b':22, 'c':3},
    {'aa':11, 'b':2, 'c':3}
  ],
  9 : [
    {
      'a':{'x':'ax', 'y':'ay', 'z':'az'},
      'b':{'x':'bx', 'y':'by', 'z':'bz'},
      'c':{'x':'cx', 'y':'cy', 'z':'cz'},
    },
    {
      'a':{'x':'ax2', 'y':'ay', 'z':'az'},
      'b':{'x':'bx', 'y':'by', 'z':'bz'},
      'c':{'x':'cx', 'y':'cy', 'z':'cz2'},
    },
    {
      'a':{'x':'ax', 'y':'ay', 'z':'az'},
      'c':{'x':'cx', 'y':'cy', 'z':'cz'},
      'd':{'x':'dx', 'y':'dy', 'z':'dz'}
    }
  ],
  10 : [
    {'a':1, 'b':2, 'c':3},
    {}
  ],
  11 : [
    {},
    {'a':1, 'b':2, 'c':3}
  ],
  12: [
    {name:'Tom'},
    {name:'Tom', location: {city: 'NYC', country: 'USA'}}
  ],
  13: [
    {name:'Tom', location: {city: 'NYC', country: 'USA'}},
    {name:'Tom'}
  ],
  14: [
    {'fb':'facebook.png','tw':'twitter.png'},
    {'fb':'facebook.png','tw':'twitter_large.png'},
    {'fb':'facebook.png','tw':'twitter.png', 'ca': 'identica.png'}
  ],
  15: [
    {'a':'outside', 'sub': {'a':'inside'}},
    {'a':'outside', 'sub': {'a':'inside'}},
    {'sub': {'a':'inside'}}
  ],
  16: [
    {'a':'outside', 'sub': {'a':'inside'}},
    {'a':'outside', 'sub': {'a':'inside'}},
    {'sub': {'a':'inside'}}
  ],
  17: [
    {'a':'x'},
    {'a':null},
    {}
  ],
  18: [
    {'link': 'http://perceptiveconstructs.com'},
    {'link': null},
    {}
  ],
  19: [
    {},
    {'link': 'http://perceptiveconstructs.com'},
    {'link':  undefined}
  ],
  20: [
    {'link': 'http://perceptiveconstructs.com'},
    {},
    {'link': 'http://www.perceptiveconstructs.com'}
  ],
  21 : [
    [1, 2, 3],
    [1, 2, 3]
  ],
  22: [
    {},
    {a:1, b:2},
  ]
};

function allAttributesIn(al, e) {
  var excludedAttributeNames = {'id':true};
  var i, eav;
  for(i = 0; i < al.length; ++i) {
    if(excludedAttributeNames[al[i].name] === undefined) {
      eav = e.getAttribute(al[i].name);
      if(eav !== al[i].value) {
        return false;
      }
    }
  }
  return true;
}

function trimmedString(s) {
  return s.replace(/^\s+|\s+$/g,"");
}

function accumText(ci) {
  var t = '';
  while(ci.i < ci.e.childNodes.length && ci.e.childNodes[ci.i].nodeType === 3) {
    t = t + ci.e.childNodes[ci.i].nodeValue;
    ci.i = ci.i + 1;
  }
  return trimmedString(t);
}

function onlyWhitespaceLeft(ci) {
  var e, s;
  while(ci.i < ci.e.childNodes.length) {
    e = ci.e.childNodes[ci.i];
    if(e.nodeType !== 3) {
      return false;
    }
    s =  trimmedString(e.nodeValue);
    if(s !== '') {
      return false;
    }
    ci.i = ci.i + 1;
  }
  return true;
}

function compareDOM(e1, e2) {
  if(e1.nodeType !== e2.nodeType) {
    return false;
  }

  if(e1.tagName !== e2.tagName) {
    return false;
  }

  if(e1.nodeValue !== e2.nodeValue) {
    return false;
  }

  if(e1.attributes !== undefined && e1.attributes !== null) {
    if(!allAttributesIn(e1.attributes, e2)) {
      return false;
    }
    if(!allAttributesIn(e2.attributes, e1)) {
      return false;
    }
  }

  var ci1 = {e: e1, i:0};
  var ci2 = {e: e2, i:0};
  var t1, t2;

  while(ci1.i < ci1.e.childNodes.length &&
        ci2.i < ci2.e.childNodes.length) {
    t1 = accumText(ci1);
    t2 = accumText(ci2);
    if(t1 !== t2) {
      return false;
    }

    if(ci1.i < ci1.e.childNodes.length) {
      if(ci2.i < ci2.e.childNodes.length) {
        if(!compareDOM(e1.childNodes[ci1.i], e2.childNodes[ci2.i])) {
          return false;
        }
        ci1.i = ci1.i + 1;
        ci2.i = ci2.i + 1;
      } else {
        return false;
      }
    } else {
      if(ci2.i < ci2.e.childNodes.length) {
        return false;
      }
    }
  }

  if(!onlyWhitespaceLeft(ci1)) {
    return false;
  }
  if(!onlyWhitespaceLeft(ci2)) {
    return false;
  }

  return true;
}

function test(cb) {
  var errors = [];

  function checkPart(graft, i, j) {
    var expected, comp;
    expected = $('#expected_'+ i+ '_'+ j)[0];
    comp = compareDOM(graft.output, expected);
    if(!comp) {
      errors.push([i, j, graft.output, expected]);
    }
    return comp;
  }

  var env = {
    '_all_': {
      postUpdateText: function(e, f) {
        $(e).addClass('updated');
        f();
      },
      postInsertSequence: function(e, f) {
        $(e).addClass('added');
        f();
      },
      postInsertIf: function(e, f) {
        $(e).addClass('added');
        f();
      },
      postInsertElse: function(e, f) {
        $(e).addClass('added');
        f();
      },
      postUpdateAttribute: function(e, f, attr) {
        $(e).addClass('updated-'+ attr);
        f();
      },
      postAddAttribute: function(e, f, attr) {
        $(e).addClass('added-'+ attr);
        f();
      },
      postRemoveAttribute: function(e, f, attr) {
        $(e).addClass('removed-'+ attr);
        f();
      }
    }
  };

  var remCases = 0;
  $.each(data_input, function() { ++remCases; });

  $.each(data_input, function(i, input) {

    var j, graft;

    var t = $('#tpl_'+ i)[0];

    var html = '<tr><td id="id_'+ i+ '">'+ i+ '</td>';

    for(j = 0; j < input.length; ++j) {
      html += '<td id="output_'+ i+ '_'+ j+ '"></td><td id="show_expected_'+ i + '_'+ j+ '"></td>';
    }
    html += '</tr';

    $('#output').append(html);

    var matched = true;
    var remInCase = input.length - 1;

    $.each(input, function(j, part) {
      graft = data_graft.germ(input[0], t, env);
      $('#output_'+ i+ '_'+ j).append(graft.output);
      $('#show_expected_'+ i+ '_'+ j).append($('#expected_'+ i+ '_'+ j));

      if(j > 0) {
        graft.update(part, function() {
          matched = matched && checkPart(graft, i, j);
          --remInCase;
          if(remInCase === 0) {
            $('#id_'+ i).addClass(matched ? 'OK' : 'failed');
            --remCases;
            if(remCases === 0) {
              if(cb) {
                cb(errors);
              }
            }
          }
        });
      } else {
        matched = matched && checkPart(graft, i, j);
      }
    });
  });
}

jQuery(document).ready(function() {
  test();
});
