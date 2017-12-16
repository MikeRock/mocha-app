import Rx from 'rxjs'
import {expect} from 'chai'
import events from 'events'

describe('Rxjs',() => {
    it('should be declared',() => {
        expect(Rx).to.exist
    })  
    it('should declare na Observable from an array',(done) => {
        // with contain.members you can match partially but with just 'members' or 'include' or 'contains' 
        //the array must match strictly with the passed array - every element must be present
        const ob = Rx.Observable.from([1,2,3])
        const arr = []
        ob.subscribe((val) => {arr.push(val)},(err) => {},() => {expect(arr).lengthOf(3).and.contain.members([1,3]); done()})
    })   
    it('should declare na Observable from a range',(done) => {
        const ob = Rx.Observable.range(1,5)
        const arr = []
        ob.subscribe((val) => {arr.push(val)},(err) => {},() => {expect(arr).to.include.members([1,5]); done()})
    }) 
    it('should declare a chain of observables executed seqentialy',(done) => {
        const ob = Rx.Observable.interval(10).take(4).scan((acc,v) => 'a'+v,0).concat(Rx.Observable.interval(10).take(4).scan((acc,v)=>'b'+v))
        const arr = []
        ob.subscribe((val) => {arr.push(val)},(err) => {},() => {expect(arr).to.include.members(['a1','b1']); done()})
    }) 
    it('should declare a buffer with a closing Observable',(done) => {
      const ob = Rx.Observable.interval(10).take(2).buffer(Rx.Observable.interval(10))
      ob.subscribe((arr) => {expect(arr).to.be.an('array')},err=> {},() => {done()})
    })     
    it('should declare a buffer with a toggle',(done) => {
        const ob = Rx.Observable.interval(10).take(2).bufferToggle(Rx.Observable.interval(10),(val) => {
            return Rx.Observable.interval(10)
        })
        let count = 1
        ob.subscribe((arr) => {if(count === 1)expect(arr).to.be.an('array').lengthOf(1);count++},err=> {},() => {expect(count).to.equal(3);done()})
      })   
      it('should declare a buffer with a toggle',(done) => {
          // if a toggle is not closed for example by specifying Observable.never() as the closing observable 
          //the complete emit from the buffered observable emit serves as the closing emit event
        const ob = Rx.Observable.interval(12).take(4).bufferToggle(Rx.Observable.interval(10),(val) => {
            return val % 2 ? Rx.Observable.interval(10) : Rx.Observable.empty()
        })
        let count = 1
        ob.subscribe((arr) => {
            switch(count) {
                case 1: expect(arr).lengthOf(0); break;
                case 2: expect(arr).lengthOf(1).and.that.contain.members([1]); break;
                case 3: expect(arr).lengthOf(0); break;
                case 4: expect(arr).lengthOf(1).and.that.contain.members([3]); break;
                default: break;
            }
            count++
        },err=> {},() => {done()})
  
    })  
    it('should audit the observable and pass only the most recent value',(done) => {
     const ob = Rx.Observable.interval(10).take(5).audit(val => Rx.Observable.interval(50))
     let count = 1
     ob.subscribe((val) => {
         switch(count) {
            case 1: expect(val).to.equal(3); break;
            case 2: expect(val).to.equal(4); break; 
            default: break;
         }
         count++
     },err => {done()},() => {done()})

  })   
    it('should audit the observable and pass only the most recent value',(done) => {
      // audit is started on source emit and is initially DISABLED
    const ob = Rx.Observable.from([1,2,3,4]).delay(30).auditTime(20)
    ob.subscribe((v) => {expect(v).to.euqal(4)},err=>{},() => {done()})
    })   
    it('should throttle the observable and pass only the first sent value',(done) => {
        // throttle is started on source emit and is initially DISABLED 
        // it's similar to auditTime but gets the first emitted value
        const ob = Rx.Observable.from([1,2,3,4]).delay(30).throttleTime(20)
        ob.subscribe((v) => {expect(v).to.equal(1)},err=>{},() => {done()})
    })   
    it('should throttle the observable and pass only the first sent value',(done) => {
        const ob = Rx.Observable.interval(10).take(3).throttle((v) => Rx.Observable.interval(30))
        ob.subscribe((v) => {expect(v).to.equal(0);done()})
    })  
    it('should throttle the observable and pass only the first sent value',(done) => {
        const ob = Rx.Observable.interval(10).take(3).throttle((v) => Rx.Observable.interval(30))
        ob.subscribe((v) => {expect(v).to.equal(0);done()})
    }) 
    it('should combine the observables passed to it and return an array of values',(done) => {
        // if a non delayed interval is passed it emits its values and then the next observable emitts its own
        // so the first emitted array will have the last value of the 
        const ob = Rx.Observable.combineLatest(Rx.Observable.of(1,2,3).delay(10),Rx.Observable.of(1,2,3))
        ob.subscribe((v) => {expect(v).to.have.members([1,3]);done()})
    }) 
    it('should combine the observables passed to it and return an array of values',(done) => {
        const ob = Rx.Observable.combineLatest(Rx.Observable.of(1,2,3),Rx.Observable.of(1,2,3))
        ob.subscribe((v) => {expect(v).to.have.members([3,1]);done()})
    }) 
    it('should concat the observables passed to it',(done) => {
        //source observable acts as a trigger for outputting new observables which are then sequentialy executed
        const ob = Rx.Observable.of(1).repeat(3).concatMap((val,idx) => Rx.Observable.interval(10).take(2)) 
        let arr = []       
        ob.subscribe((val) => {arr.push(val)},err=>{},()=>{
            expect(arr).to.have.members([0,1,0,1,0,1])
            done()
        })
    }) 
    it('should concat the observables passed to it',(done) => {
        // with added resultSelector taking the outer emit from Rx.Observable.of and inner emits from Rx.Observable.interval
        const ob = Rx.Observable.of(1).concatMapTo(Rx.Observable.interval(10).take(2),(outer,inner) =>{return "" + outer + inner}) 
        let arr = []       
        ob.subscribe((val) => {arr.push(val)},err=>{},()=>{
            expect(arr).to.have.members(["10","11"])
            done()
        })
    }) 
    it('should connect a subject to an observable',(done) => {
        // Subject is like an EventEmitter
       const sub = new Rx.Subject()
       let count = 1
       let concated = sub.concatMapTo(Rx.Observable.interval(100).take(1).mapTo('it'))
       concated.subscribe({
           next:(v) => {expect(v).to.equal('it');count++},
           error:(v) => {},
           complete: () => {expect(count).to.equal(3);done()} 
        })
       sub.next('notIt')
       sub.next('notIt')
       sub.complete()    
    })  
    it('should divide an observable stream into two',(done) => {
        const ob = Rx.Observable.interval(10).take(2)
                    .concatMap((v) => v%2 ? Rx.Observable.of('tic') : Rx.Observable.of('tac'))
                    .partition((v) => v === 'tic')
        ob[0].subscribe((v) => expect(v).to.equal('tic'),err=>{},()=>{done()})
        ob[1].subscribe((v) => expect(v).to.equal('tac'),err=>{},()=>{})
    }) 
    it('should create a callback to be used inside a function',(done) => {
        // the below is synanomous with func(2,(v) => {expect...}))
       const func = (v,callback) => {callback(v)}
       const ob = Rx.Observable.bindCallback(func)(2)
       ob.subscribe((v) => {expect(v).to.equal(2)},err=>{},() => {done()})
    }) 
    it('should create a callback to be used inside a function',(done) => {
       const func = (a,b,cb) => {cb(a,b)}
       const ob = Rx.Observable.bindCallback(func)(1,2)
       ob.subscribe((v) => {expect(v).to.be.an('array').that.has.members([1,2])},err=>{},() => {done()})
    }) 
    it('should create a callback to be used inside a function',(done) => {
        const emitter = new events.EventEmitter()
        const ob = Rx.Observable.fromEvent(emitter,'click')
        .mapTo('click')
        .mergeMapTo(Rx.Observable.of(1,2,3))
        .scan((acc,v) => {acc++; return acc},0)
        .do((v) => {console.log(v)})
        .takeUntil(Rx.Observable.interval(20))
        .reduce((acc,val) => {acc.push(val);return acc},[])
        .repeat(3)
        ob.subscribe((arr)=>{expect(arr).to.be.an('array')},()=>{},()=>{done()})
        emitter.emit('click')
        setTimeout(() => {emitter.emit('click');emitter.emit('click')},30)
        setTimeout(() => {emitter.emit('click')},50)
     }) 
})