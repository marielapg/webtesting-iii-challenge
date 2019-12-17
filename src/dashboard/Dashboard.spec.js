// Test away

import React from 'react';
import {render} from '@testing-library/react';

import Dashboard from './Dashboard';

test('App renders correctly', ()=> {
    expect(render(<Dashboard/>)).toMatchSnapshot()

})