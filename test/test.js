#!/usr/bin/env node

'use strict';

var jsdom = require('jsdom');

jsdom.env({
  html: 'test-data-graft.html',
  scripts: [
    '../stuff/jquery-1.7.1.min.js',
    '../data-graft.js',
    'test-common.js',
    'test-data-graft.js'
  ],
  done: function(errors, window) {
    if(errors)
      throw errors;
    window.console = console;
    window.testSequence(window.data_input, function(errors) {
      if(errors.length === 0) {
        console.log('OK');
        return;
      }
      console.error(errors.length, 'errors');
      errors.forEach(function(error) {
        console.log('in '+ error[0]+ '.'+ error[1]);
        // FIXME: details of mismatch - perhaps compareDOM could return them?
      });
    });
  }});
