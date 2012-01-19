#!/usr/bin/python
# Copyright 2010-2011, Carlos Guerreiro
# Licensed under the MIT license

import os
from bottle import route, static_file

root = os.path.dirname(__file__)

@route('/data-graft-0.1.2.min.js')
def download_min():
    return static_file('data-graft-0.1.2.min.js', root=root+'/../dist/')

@route('/data-graft-0.1.2.js')
def download():
    return static_file('data-graft-0.1.2.js', root=root+'/../dist/')

@route('/')
def server_index():
    return static_file('doc.html', root=root)

@route('/:filename')
def server_static(filename):
    return static_file(filename, root=root)

@route('/stuff/:filename')
def server_static(filename):
    return static_file(filename, root=root+ '/../stuff')
