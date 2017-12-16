describe("Window",() => {
    describe("Common",()=> {
    it("should be equal to the document.defaultView object",() => {
    expect(window).to.equal(document.defaultView)    
        })      
    })
describe("Navigator",()=>{
    it("should exist inside window",()=> {
        expect(window).to.have.property("navigator")
    })
    it("userAgent should contain \"Mozilla\"",()=> {
        expect(window.navigator.userAgent.indexOf("Mozilla")).to.not.equal(-1)
    })
    it("should have language set as pl-PL",()=> {
        expect(navigator.language).to.equal('pl-PL')
    })   
    it("should have plugins",()=> {
        expect(navigator.plugins).to.exist.and.have.deep.members
        if(navigator.plugins.length) {
        expect(navigator.plugins[0]).to.be.an.instanceOf(Object)
        .and.have.property('filename')
        expect(typeof navigator.plugins[0]).to.equal('object')
        }}) 
           
}) 
describe("Crypto",()=>{
    it("should exist inside window",()=> {
        expect(window).to.have.property("crypto")
    })   
    it("should generate 10 random numbers",()=> {
        const arr = new Uint8Array(10)
        expect(window.crypto.getRandomValues(arr).length).to.equal(10)
    })     
}) 
describe("Crypto",()=>{
    it("should exist inside window",()=> {
        expect(window).to.have.property("crypto")
    })   
    it("should generate 10 random numbers",()=> {
        const arr = new Uint8Array(10)
        expect(window.crypto.getRandomValues(arr).length).to.equal(10)
    })     
}) 
describe.skip("Caches API",()=>{
    it("should exist inside window",()=> {
        expect(window).to.have.ownProperty("caches")
    })   
    it("should create named cache test-v1",(done)=> {
        window.caches.open('test-v1').then((cache) => {
        return caches.keys()   
        }).then((keys) => {
       expect(keys.some((item) => {
       return item === "test-v1"    
       })).to.be.true  
       done()   
        })
    })     
})  
describe('Scroll',() => {
    // to get element position relative to the view (not document) get element.getBoundingClientRect()
    // to get the position relative to the document add the scroll position from window.pageXOffset or window.scrollX
    it('pageXOffset should be an alias for scrollX', () => {
        expect(window.pageXOffset).to.equal(window.scrollX)
        expect(window.pageYOffset).to.equal(window.scrollY)
        expect(document.documentElement.scrollTop).to.equal(window.scrollY)
    })
    it('documentElement.scrollLeft should be an alias for scrollX', () => {
        expect(document.documentElement.scrollTop).to.equal(window.scrollY)
        expect(document.documentElement.scrollLeft).to.equal(window.scrollX)
    })
})                
})