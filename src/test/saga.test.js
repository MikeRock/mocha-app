const {put, take, takeEvery} = ReduxSaga.effects
const {takeLatest, throttle, delay, channel} = ReduxSaga

describe('Saga Middleware',() => {
    const TEST = 'TEST'
    it('should be declared',() => {
        expect(ReduxSaga).to.exist
    })
    it('should make put',() => {
        function* gen() {return put({type: 'TEST'})}
        expect(gen().next().value).to.have.property('PUT')
        .which.is.an('object').and.has.property('action').and.includes({type:'TEST'})
    })
    it('should make take',() => {
    function* gen() {return take(channel())}
    expect(gen().next().value).to.have.property('TAKE')
    .which.is.an('object').and.has.key('channel')
    })
    it('stakeEvery is a wrapper for a FORK',() => {
        function* gen() {return takeEvery('TEST',function*(){
            yield 2
        })}
        console.info(gen().next().value)
        expect(gen().next().value).to.have.property('FORK')
        })
})
