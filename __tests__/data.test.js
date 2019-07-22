/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'

import App from '../pages/index.js'

describe('Data Page Test', () => {
  it('App shows "Hello world!"', () => {
    const app = shallow(<App />)

    expect(app.find('a').text()).toEqual('Users')
  })
})
