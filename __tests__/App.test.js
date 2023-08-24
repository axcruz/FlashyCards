import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

// Running into known issues using jest that does not allow tests to run with Metro bundler used in Expo
// Syntax errors from node_modules/@react-native/js-polyfills/error-guard.js
// See https://github.com/facebook/react-native/issues/36765

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
