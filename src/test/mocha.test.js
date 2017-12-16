describe('Mocha',() => {
it('should run all tests',() => {
expect([{a: 1}]).to.deep.include({a: 1})
expect([]).to.be.an.instanceOf(Array)
expect([]).to.be.an('array')
expect('').to.be.not.ok
expect({name: 'Mike'}).to.have.property('valueOf')
expect({name: 'Mike'}).to.include({name:'Mike'})
expect({name: 'Mike',deep:{name:'Rock'}}).to.deep.include({deep:{name:'Rock'}})
expect({name: 'Mike',deep:{name:'Rock'}}).to.not.include({deep:{name:'Rock'}})
expect([]).to.be.instanceOf(Array).and.to.be.instanceOf(Object)
expect({name:'Mike'}).to.have.key('name')
})
})