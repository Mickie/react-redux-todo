/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Button } from 'antd';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <div>
        <Button>Default</Button>
        <App />
    </div>
,document.getElementById('root'));
