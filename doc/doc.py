#!/usr/bin/python
# Copyright 2010-2011, Carlos Guerreiro
# Licensed under the MIT license

import os
from bottle import route, static_file

root = os.path.dirname(__file__)

@route('/data-graft/doc/data-graft-0.1.1.min.js')
def download_min():
    return static_file('data-graft-0.1.1.min.js', root=root+'/../dist/')

@route('/data-graft/doc/data-graft-0.1.1.js')
def download():
    return static_file('data-graft-0.1.1.js', root=root+'/../dist/')

@route('/data-graft/doc/:filename')
def server_static(filename):
    return static_file(filename, root=root)

@route('/data-graft/doc/stuff/:filename')
def server_static(filename):
    return static_file(filename, root=root+ '/../stuff')
