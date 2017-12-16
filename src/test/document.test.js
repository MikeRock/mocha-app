describe("Document",() => {  
        it("should exist",()=> {
            expect(document).to.exist
        })
        it("nodeName should be #document",()=>{
            expect(document.nodeName).to.equal("#document")
        }) 
        it("defaultView should be the window object",()=>{
            expect(document.defaultView).to.equal(window)
        }) 
        it("location should be \"http://localhost:3000\"",()=>{
            expect(document.location.protocol).to.equal("http:")
            expect(document.location.host).to.equal("localhost:3000")
            expect(document.location.hostname).to.equal("localhost")
            expect(document.location.port).to.equal("3000")
            expect(document.location.origin).to.equal("http://localhost:3000")
        })
        it("createElement insert a node",()=>{
            const element = document.createElement("div")
            const insert = document.createElement("div")
            insert.className = "test"
            element.appendChild(insert)
            expect(element.querySelector("div.test")).to.exist
        })  
        it("createElement to exists",()=>{
            const check = "createElement" in document
            expect(check).to.equal(true)
        })
        it("has finished loading",()=>{
            expect(document.readyState).to.equal("complete")
        }) 
         it("is renderd in quirks mode",()=>{
            expect(document.compatMode).to.not.equal("CSS1Compat").and.equal("BackCompat")
        }) 
        it("domain in \"localhost\"",()=>{
            expect(document.domain).to.equal("localhost")
        })   
        it("URL in \"http://localhost:3000/?grep=Document\"",()=>{
            expect(document.URL).to.equal("http://localhost:3000/?grep=Document")
        })   
        it("has attribute custom",()=>{
            const attr = document.createAttribute("custom")
            const element = document.createElement("div")
            attr.value = "custom_name"    
            element.setAttributeNode(attr)
            // Zwraca wartosc
             expect(element.getAttribute("custom")).to.equal("custom_name")
             //Zwraca element typu Node
             expect(element.attributes.item(0).textContent).to.equal("custom_name")
        })  
        it('documentElement to equal body.parentElement', () => {
            expect(document.documentElement).to.deep.equal(document.body.parentElement)
        })
})
                                                   
