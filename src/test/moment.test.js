//import moment from 'moment'
describe("Moment.js",() => {
    it("should be declared", () => {
        expect(moment).to.exist    
    })     
    it("should check if current date is the same as another", () => { 
        // skipping date in moment declaration sets the current date
        expect(moment().isSame(Date.now(),'minutes')).to.be.true   
        expect(moment(Date.now()).isSame('2017','year')).to.be.true
        // second arg sets the PRECISION - setting 'day' causes to check year month day
        expect(moment('2017-10-23').isSame('2017-10-23','day')).to.be.true
        // 'month' sets PRECISION to year month
        expect(moment('2017-10-31').isSame('2017-10-12','month')).to.be.true
        expect(moment('2017/02/03').isSame('2017-02-03')).to.be.true
    }) 
    it("valueOf should return time in ms", () => {
        const date = Date.now()
        expect(moment(date).valueOf()).to.equal(date)
    }) 
    it("should pass date validity check if a parse string is given", () => {
        const date = Date.now(), year = '2017'
        expect(moment('2015!12#01','YYYY-MM-DD').isValid()).to.be.true
        expect(moment('2015@12#01','YYYY-MM-DD').isValid()).to.be.true
        expect(moment('2015$12#01','YYYY-MM-DD').isValid()).to.be.true
        expect(moment('2015&12&01','YYYY-MM-DD').isValid()).to.be.true
        expect(moment('2015<12<01','YYYY-MM-DD').isValid()).to.be.true
        expect(moment('2015#12#01','YYYY-MM-DD').isValid()).to.be.true
    }) 
    it("value of month should be zero indexed", () => {

        expect(moment('2017-10-11').month()).to.equal(9)
    }) 
    it("value of hour should be zero indexed", () => {
        expect(moment('2017-10-11T23:20').hour()).to.equal(23)
    }) 
    it("value of day should NOT be zero indexed", () => {
        expect(moment('2017-10-11T23:20').date()).to.equal(11)
    })
    it("should add in many formats", () => {
        expect(moment('2017-10-11').add(2,'days').date()).to.equal(13)
        expect(moment('2017-10-11').add({days:2}).date()).to.equal(13)
        expect(moment('2017-10-11').add(2,'d').date()).to.equal(13)
    })
    it("should add and subtract to the given date", () => {
        expect(moment('2017-10-11').add(2,'months').months()).to.equal(11)
        expect(moment('2017-10-31').add({days:2}).date()).to.equal(2)
        expect(moment('2017-10-11T23:20').add(2,'m').minutes()).to.equal(22)
        // adding a negative value is the same as subtracting a positive one
        expect(moment('2017-10-31').add(-2,'M').months()).to.equal(moment('2017-10-31').subtract(2,'M').months())
        // IMPORTANT Notice the days of the month are not the same
        expect(moment('2017-10-31').add(4,'months').date()).to.not.equal(moment('2017-10-31').date())
    })
    it("should apply strict date parsing", () => {
        expect(moment('2017-10-11','YYYY-MM-DD',true).isValid()).to.be.true
        expect(moment('2017/10/11','YYYY-MM-DD',true).isValid()).to.not.be.true
    })
    it("should set date arguments", () => {
        expect(moment(Date.now()).year(2022).year()).to.equal(2022)
        // month is zero based
        expect(moment(Date.now()).month(0).month()).to.equal(0)
        expect(moment(Date.now()).month(-1).month()).to.equal(11)
        expect(moment(Date.now()).date(22).date()).to.equal(22)
        // same day next week zero based
        expect(moment(Date.now()).day(7+2).day()).to.equal(2)
        // uses locale zero based
        expect(moment(Date.now()).locale('pl').weekday(0).weekday()).to.equal(moment().weekday('Monday').weekday())
        // one based starts from monday
        expect(moment(Date.now()).isoWeekday(1).weekday()).to.equal(moment().isoWeekday('Monday').weekday())
        expect(moment(Date.now()).isoWeekday(1).weekday()).to.equal(1)
        // week of year
        expect(moment(Date.now()).week(2).week()).to.equal(2)
        // retains the same day of week
        expect(moment(Date.now()).week(2).day()).to.equal(moment(Date.now()).day())
        // day of month greater than 31 causes month to bubble up
        expect(moment('11','MM').date(31+4).month()).to.equal(11)
        expect(moment(Date.now()).hour(0).hour()).to.equal(0)
        expect(moment(Date.now()).hour(-1).hour()).to.equal(23)
        expect(moment(Date.now()).hour(-1).date()).to.equal(moment(Date.now()).subtract(1,'day').date())
    })
    it("should measure the difference between two dates", () => {
        // end.from(start)
        expect(moment('2017-10-11').diff('2020-11-12','years')).to.equal(-3)
        expect(moment('2017-10-11 18:30').diff('2017-10-12 12:30','days')).to.equal(0)
        expect(moment(Date.now()).diff(moment(Date.now()).add(3,'days'),'days')).to.equal(-3)
        expect(moment(Date.now()).diff(moment(Date.now()).add(3,'weeks'),'days')).to.equal(-21)
    })
    it('should calculate if a given date is between a timeframe', () => {
        // negative month causes year to decrease
        expect(moment(Date.now()).isBetween(moment(Date.now()).month(-2),'2018','year')).to.be.true
        expect(moment('2016').isBetween('2016','2017','years','[]')).to.be.true
        expect(moment('2016').isBetween('2016','2017','years','(]')).to.not.be.true
        expect(moment('2016').isBetween('2016','2016','years','[]')).to.be.true
        expect(moment('2016-10-22').isBetween('2016-10-21','2016-10-25','months','()')).to.be.not.true
        expect(moment('2016-10-22').isBetween('2016-11-21','2016-11-25','years','[]')).to.be.true
        expect(moment('2016-10-31 12:25').isBetween('2016-10-31 11:00','2016-10-31 12:30','hours','[)')).to.be.not.true
    })
    it('should set time in unix format',() => {
        expect(moment([2017,11,12]).unix().valueOf()).to.equal(moment([2017,11,12]).local().valueOf()/1000)
    })
    it('should display the number of days in a month',() => {
        expect(moment([2017,9,12]).daysInMonth()).to.equal(31)
    })
    it('should display the number of days in a month',() => {
        expect(moment([2017,9,12]).toObject()).to.be.instanceOf(Object)
        .and.have.property('months').which.equals(9)
        expect(moment([2017,9,12]).toObject()).to.be.instanceOf(Object)
        .and.have.ownProperty('months').which.equals(9)
        expect(moment([2017,9,12]).toObject()).to.be.instanceOf(Object)
        .and.to.include({months:9,years:2017,date:12})  
    })
    it('should measure duration',() => {
        expect(moment.duration(100).asMilliseconds()).to.equal(100)
        expect(moment.duration(100).asSeconds()).to.equal(.1)
        expect(moment.duration(2,'hours').asMinutes()).to.equal(120)
        expect(moment.duration(2,'hours').add(5,'minutes').minutes()).to.equal(5)
        expect(moment.duration({hours:2,minutes:30}).add(5,'minutes').minutes()).to.equal(35)
    })
})