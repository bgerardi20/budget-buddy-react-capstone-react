import React from 'react';
import {shallow, mount, render} from 'enzyme';

import QuickView from './quick-view';

describe('<QuickView />', () => {
    it('Renders without crashing', () => {
        shallow(<QuickView />);
    });
});
