
describe('Sinon',() => {
    const RETURN_VALUE = '@sinon/test_value'
    const fn = function (callback,...args) {
        let result
       try { result = callback(...args) } catch(err){}
        return result
    }
    fn.call = function() { return RETURN_VALUE}

    it('should be declared',() => {
        expect(sinon).to.exist
    })
    it('should create a spy called once',() => {
    let cb = sinon.spy()
    fn(cb,'test')
    expect(cb.calledOnce).to.be.true
    expect(cb.callCount).to.equal(1)
    })
    it('should create a spy called once with \'test\' argument',() => {
        let cb = sinon.spy()
        fn(cb,'test')
        expect(cb.callCount).to.equal(1)
        expect(cb.firstCall.args[0]).to.equal('test')
    })
    it('should create a spy called always with \'test\' as first argument',() => {
        let cb = sinon.spy()
        fn(cb,'test',1)
        fn(cb,'test',2)
        expect(cb.alwaysCalledWith('test')).to.be.true
        expect(cb.alwaysCalledWithExactly('test')).to.be.not.true
    })
    it('should create a spy called always with \'test\' as first argument',() => {
        let cb = sinon.spy()
        fn(cb,1,'test')
        fn(cb,'test',1)
        expect(cb.alwaysCalledWith('test')).to.be.not.true
    })
    it('should create a spy called always with \'test\' as second argument',() => {
        let cb = sinon.spy()
        fn(cb,2,'test')
        fn(cb,1,'test')
        expect(cb.alwaysCalledWith(sinon.match.any,'test')).to.be.true
    })
    it('should create a spy called with different arguments',() => {
        let cb = sinon.spy()
        fn(cb,'test',1)
        fn(cb,'not test',2)
        expect(cb.alwaysCalledWith('test')).to.be.not.true
    })
    it('should create a spy called with ony numbers',() => {
        let cb = sinon.spy()
        fn(cb,1,1)
        fn(cb,2,2)
        expect(cb.alwaysCalledWith(sinon.match.number,sinon.match.number)).to.be.true
    })
    it('should create a spy always called with ony one argument',() => {
        let cb = sinon.spy()
        fn(cb,1,1)
        fn(cb,2)
        expect(cb.alwaysCalledWithExactly(sinon.match.number)).to.be.not.true
    })
    it('should create a spy called with ony one argument least once',() => {
        let cb = sinon.spy()
        fn(cb,1,1)
        fn(cb,2)
        expect(cb.calledWithExactly(sinon.match.number)).to.be.true
    })
    it('should create a spy called with number as first argument',() => {
        let cb = sinon.spy()
        fn(cb,1,1)
        fn(cb,2)
        expect(cb.calledWith(sinon.match.number)).to.be.true
    })
    it('should create a spy called with ony one argument exactly 2 times',() => {
        let cb = sinon.spy()
        fn(cb,1,1)
        fn(cb,2)
        fn(cb,4)
        expect(cb.getCalls().map((call) => call.calledWithExactly(sinon.match.any) )
        .filter((call) => call).length).to.equal(2)
    })
    it('should create a spy always called with \'test\' as one of the passed arguments',() => {
        let cb = sinon.spy()
        fn(cb,'test',1)
        fn(cb,2,'test')
        expect(cb.alwaysCalledWith(sinon.match.any.or('test'),sinon.match.any.or('test'))).to.be.true
    })
    it('should create a spy on a function method',() => {
        let cb = sinon.spy(fn,'call')
        fn.call(1)
        cb.restore()
        expect(cb.calledWith(1)).to.be.true
        expect(cb.alwaysReturned(RETURN_VALUE)).to.be.true   
    })
    it('should create a stub that throws an error',() => {
        let cb = sinon.stub().throws(new Error('Custom error'))
        expect(fn(cb)).to.throw
    })
    it('should create a stub with specified return values',() => {
        // onCall gets the required call starting from 0
        let cb = sinon.stub().onFirstCall().returns(1).onSecondCall().returns(2)
        cb(1)
        cb(2)
        expect(cb.onCall(0).returnValue).to.equal(1)
        expect(cb.onCall(1).returnValue).to.equal(2)
    })
    it('should create a stub with specified return values',() => {
        // onCall sets the required call behaviour starting from 0 index
        // getCall gets the requested call starting from 1 index
        let cb = sinon.stub().onCall(0).returns(1).onCall(1).returns(2)
        cb(1)
        cb(2)
        expect(cb.getCall(0).returned(1)).to.be.true
        expect(cb.secondCall.returnValue).to.equal(2) 
        expect(cb.returnValues).to.have.members([1,2])
        expect(cb.getCalls().map((call) => call.returnValue)).to.have.members([1,2])
    })
    it('should create a stub with return values based on passed argument values',() => {
        // with chaining its incorrect
        let cb = sinon.stub()
        cb.withArgs(1).returns(100)
        cb.withArgs(2).returns(200)
        expect(cb(1)).to.equal(100)
        expect(cb(2)).to.equal(200)
        expect(cb.getCall(0).returnValue).to.equal(100)
        expect(cb.secondCall.returned(200)).to.be.true
    })
    it('should create a stub with return values based on passed argument types',() => {
        // with chaining its incorrect
        let cb = sinon.stub()
        cb.returns('none')
        cb.withArgs(sinon.match.number).returns('number')
        cb.withArgs(sinon.match.string).returns('string')
        expect(cb(1)).to.equal('number')
        expect(cb.getCall(0).returnValue).to.equal('number')
        expect(cb('str')).to.equal('string')
    })
    it('should create a stub returns a callback function with given arguments',(done) => {
        // callArgWith(idx,...args) calls a callback function on [index] with [args]
      let cb = sinon.stub()
      cb.withArgs(sinon.match.func).returns('function')
      expect(cb(function(a,b){expect(a+b).to.equal('tictac'); done()})).to.equal('function')
      cb.callArgWith(0,'tic','tac')
      expect(cb.callCount).to.equal(1)
    })
    it('should create a stub returns a callback function',(done) => {
      let cb = sinon.stub()
      cb.withArgs(sinon.match.func).returns('function')
      expect(cb(function(){done()})).to.equal('function')
      cb.callArg(0)
      expect(cb.callCount).to.equal(1)
    })
    it('should create a mock with expectations',() => {
        // ATTENTION atLeast called with exactly throws
        // ATTENTION expect(verify).to.[not].throw passes in both cases
        // verify throws if expectations are not met
        let cb = sinon.mock(fn)
        cb.expects('call').atLeast(1)
        cb.expects('call').atMost(3)
        
        //cb.expects('call').exactly(3)

        fn.call()
        fn.call()
        fn.call()

        cb.restore()
        expect(cb.verify()).not.to.throw
      })
})