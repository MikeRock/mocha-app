describe('Local Storage',() => {
    it('should be declared',() => {
        expect('localStorage' in window).to.be.true
    })
    it('should set an item',() => {
        localStorage.setItem('test',2)
        // ok checls for implicit truth
        expect(localStorage.getItem('test')).to.be.ok
        expect(!!localStorage.getItem('test')).to.be.true
        // true checks for strict truth
        expect(localStorage.getItem('test')).to.not.equal(2)
        expect(localStorage.getItem('test')).to.equal((2).toString())
    
    })
    it('should set a object',() => {
        localStorage.setItem('string',{valueOf:() => 's1',toString:() => 's2',name:'Mike'})
        expect(localStorage.getItem('string')).to.be.a('string')
        // localStorage invokes toString() method on any non strings passed as a prop
        expect(localStorage.getItem('string')).to.include('s2')
    })
})