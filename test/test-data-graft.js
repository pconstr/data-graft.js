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
