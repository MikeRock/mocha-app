import Enzyme, {mount, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import {expect} from 'chai'
import React from 'react'
import{BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import App from './../components/App.js'
import Misc from './../components/Misc.js'
Enzyme.configure({adapter: new Adapter()})
describe('React',() => {
  it('window should be defined',() => {
      expect(window).to.exist
  }) 
  it('document should be defined',() => {
    expect(document).to.exist
}) 
it('component should mount',() => {
    const wrapper = mount(<div>
        <span>Test</span>
    </div>)
    expect(wrapper.children().debug().indexOf('Test')).to.not.equal(-1)
}) 
it('component should match',() => {
    // containsMatchingElement also checks the children as well
    // the props not supplied into the matching element are ignored
    const wrapper = mount(<div>
        <span className='test'>Test</span>
    </div>)
    expect(wrapper.contains(<span className='test'>Test</span>)).to.equal(true)
    expect(wrapper.contains(<span>Test</span>)).to.not.equal(true)
    expect(wrapper.containsMatchingElement(<span>Test</span>)).to.equal(true)
    expect(wrapper.containsMatchingElement(<span className='test'></span>)).to.not.equal(true)
}) 
it('component should have children',() => {
    const wrapper = mount(<div>
        <span className='test'>Test</span>
    </div>)
    expect(wrapper.children().length).to.not.equal(0)
    expect(wrapper.children().length).to.equal(1)
}) 
it('component should have children',() => {
    const wrapper = mount(<div>
        <span className='test'>Test</span>
    </div>)
    expect(wrapper.children().length).to.not.equal(0)
    expect(wrapper.children().length).to.equal(1)
}) 
it('component should have children',() => {
    const wrapper = mount(<div>
        <span className='test'>Test</span>
        <span className='test2'>Test2</span>
    </div>)
    expect(wrapper.findWhere(node => node.type() === 'span').length).to.equal(2)
}) 
it.skip('component should mount when routed to',() => {
    const spy = sinon.spy(Misc.prototype,'componentDidMount')
    const wrapper = mount(<div>
        <Router>
            <div>
            <Link to='/test'>Test</Link>
            <Switch>
            <Route exact path="/" component={App} />
            <Route path="/test" component={Misc} />
            </Switch>
            </div>
        </Router>
    </div>)
    expect(wrapper.exists()).to.equal(true)
    expect(Misc.prototype.componentDidMount.calledOnce).to.equal(false)
    wrapper.find('a').simulate('click')
    expect(Misc.prototype.componentDidMount.callCount).to.equal(1)
}) 
it('component should have children with explicidly set classNames',() => {
    // get returns a ReactNode
    const wrapper = mount(<div>
        <span className='test'>Test</span>
        <span className='test2'>Test2</span>
    </div>)
    expect(wrapper.find('.test2').length).to.equal(1)
    expect(wrapper.find('span').at(0).text()).to.equal('Test')
    expect(wrapper.find('span').at(1).text()).to.equal('Test2')
    expect(wrapper.find('span').get(0).type).to.equal('span')
    expect(wrapper.find('span').at(0).prop('className')).to.equal('test')
    expect(wrapper.find('span').first().prop('className')).to.equal('test')
}) 
it('component should render with given props',() => {
    const wrapper = mount(<App/>)
    expect(wrapper.find('div').last().text()).to.equal('App')
    wrapper.setProps({name:'Mike'})
    expect(wrapper.find('div').last().text()).to.equal('Mike')
}) 
it('component should filter out the returned nodes',() => {
    // find and findWhere  get all matching rendered nodes starting from the most outer one
    // at(0) outer div, at(1) - first div with props.children
    //filter and filterWhere check the component and not what it renders [???]
    const CHILD = 'CHILD'
    const wrapper = mount(<App>{CHILD}</App>)
    expect(wrapper.findWhere(node => node.is('div')).length).to.equal(3)

    expect(wrapper.find('div.prop').text()).to.equal('App')
    expect(wrapper.findWhere(node => node.is('div')).at(1).text()).to.equal(CHILD)
    expect(wrapper.findWhere(node => node.is('div')).at(2).prop('className')).to.equal('prop')
    expect(wrapper.filterWhere(node => node.is('div')).length).to.equal(0)
    expect(wrapper.filterWhere(node => node.is(App)).length).to.equal(1)
    expect(wrapper.filterWhere(node => node.prop('name') =='App').length).to.equal(1) 
    expect(wrapper.filterWhere(node => node.is(App)).props()).to.include({name:'App'})
    expect(wrapper.filterWhere(node => node.is(App)).props()).to.include({children:CHILD})
}) 
it('component should have children',() => {
    // contains has to have alle props matching
    // containsMatchingElement matches only passed props
    const wrapper = mount(<div>
        <span className='test'>Test</span>
    </div>)
    expect(wrapper.contains(<span className='test'>Test</span>)).to.equal(true)
    expect(wrapper.contains(<span>Test</span>)).to.equal(false)
    expect(wrapper.contains(<div><span className='test'>Test</span></div>)).to.equal(true)
    expect(wrapper.containsMatchingElement(<span>Test</span>)).to.equal(true)
    expect(wrapper.matchesElement(<div><span>Test</span></div>)).to.equal(true)
    expect(wrapper.matchesElement(<div><span className='not_test'>Test</span></div>)).to.equal(false)   
}) 
it('component matches contents',() => {
    // contains has to have alle props matching
    // containsMatchingElement matches only passed props
    const wrapper = mount(<App>
        TEST
    </App>)
    expect(wrapper.contains(<div className='prop'>App</div>)).to.equal(true)
    expect(wrapper.contains(<div>App</div>)).to.equal(false)
    expect(wrapper.contains(<div><div className='prop'>App</div></div>)).to.equal(false)
    expect(wrapper.containsMatchingElement(<div>App</div>)).to.equal(true)
    expect(wrapper.containsMatchingElement(<div>
                                             <div>TEST</div>
                                             <div className='prop'>App</div>
                                            </div>)).to.equal(true)
    expect(wrapper.containsMatchingElement(<div>
                                            <div className='prop'>App</div>
                                            <div>TEST</div>
                                            </div>)).to.equal(false)                                        
    expect(wrapper.matchesElement(<div><div>TEST</div></div>)).to.equal(false)
    expect(wrapper.matchesElement(<div><div className='prop'>App</div></div>)).to.equal(false)
    expect(wrapper.matchesElement(<div className='prop'>App</div>)).to.equal(false) 
    expect(wrapper.find('.prop').matchesElement(<div className='prop'>App</div>)).to.equal(true) 
    expect(wrapper.find('.prop').matchesElement(<div>App</div>)).to.equal(true)
}) 
    it('component has class',() => {
        const wrapper = mount(<App>
            TEST
        </App>)
        expect(wrapper.find('.prop').hasClass('prop')).to.equal(true)

    })
})