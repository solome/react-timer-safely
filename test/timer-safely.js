import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'

import TestComponent from './TestComponent'


console.log(TestComponent)

describe('<TestComponent />', () => {
  it('renders a `main` tag', () => {
    const wrapper = shallow(<TestComponent />)
    expect(wrapper.find('main')).to.have.length(1)
  })
})
