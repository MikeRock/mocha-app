
describe("Date object",()=>{
    it("should display the current month",()=> {
    // Miesiące rozpoczynają sie od indexu 0       
    expect(new Date().getMonth()).to.equal(10)  
    })
    it("should display the current full year",()=> {
            
        expect(new Date().getFullYear()).to.equal(2017)  
        }) 
    it("should display the current year as 3 digits",()=> {
            
        expect(new Date().getYear()).to.equal(117)  
        })
     it("should display the current day of the week",()=> {
       
       expect(new Date().getDay()).to.equal(4)
        })
    it("should display the current day of the month",()=> {
            
       expect(new Date().getDate()).to.equal(9)
        })                     
})   