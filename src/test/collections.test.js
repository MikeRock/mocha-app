describe('Collections',() => 
{
describe('Map',() => {
    it('should exist', () => {
        expect(Map).to.exist
    })
    it('should return the same key for NaN', () => {
        const map = new Map()
        map.set(NaN,'NaN')
        expect(map.get(NaN)).to.equal(map.get(Number('not a number')))
    })
    it('should return the same key for -0 and +0', () => {
        const map = new Map()
        map.set(-0,'zero')
        expect(map.get(-0)).to.equal(map.get(+0))
    })
})
describe('Set',() => {
    it('should exist', () => {
        expect(Set).to.exist
    })
    it('should have the same key for NaN', () => {
        const set = new Set()
        set.add(NaN,'NaN')
        expect(set.has(Number('not a number'))).to.be.true
    })
    it('should return the same key for -0 and +0', () => {
        const set = new Set()
        set.add(-0,'NaN')
        expect(set.has(+0)).to.be.true
    })
    it('should not possess duplicates', () => {
        const set = new Set([1,2,3,3,4])
        const arr = [...set]
        expect(arr.every((item,idx,arr) => {
        return arr.indexOf(item) == arr.lastIndexOf(item)
        })).to.be.true
    })
    it.skip('should not possess duplicates and remove dead references', () => {
        const set = new WeakSet([1,2,3,3,4])
        (function() {
            let num = {}
            set.add(num)
        })()
        expect(set.size).to.equal(4)
    })
})
})