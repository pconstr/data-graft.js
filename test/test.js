#!/usr/bin/env node
/*jslint white: true, browser: true, plusplus: true, vars: true, nomen: true, bitwise: true*/
/*global jQuery: false, $: false, data_graft: false*/

/* Copyright 2010-2011, Carlos Guerreiro
 * Licensed under the MIT license */

'use strict';

var jsdom = require('jsdom');

var tests = ['test-1'];

function runNext() {
  var test = tests.shift();

  if(test === undefined) {
    return;
  }

  console.log(test+ ':');

  jsdom.env({
    html: test+ '.html',
    scripts: [
      '../stuff/jquery-1.7.1.min.js',
      '../data-graft.js',
      'test-common.js',
      test+ '.js'
    ],
    done: function(errors, window) {
      if(errors) {
        throw errors;
      }
      window.console = console;
      window.runTests(function(err) {
        if(err) {
          console.log('failed');
        } else {
          console.log('OK');
        }
        process.nextTick(runNext);
      });
    }});
}

runNext();
