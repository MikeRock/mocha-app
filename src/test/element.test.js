describe('Element', () => {
    let element
    beforeEach(() => {
      element = document.createElement('div')
      element.id = 'test'
      element.innerHTML = 'TEST'
      document.body.appendChild(element)
    }) 
    afterEach(() => {
        let element = document.body.querySelector('div#test')
        document.body.removeChild(element)
    })
    it('should exist in DOM after insert',() => {
        expect(document.querySelector('div#test')).to.exist
    })
    it('should apply custom attributes',() => {
       let element = document.createElement('div')
       element.style.height = '200px'
       element.style.width = '200px'
       element.setAttribute('custom','custom_value')
       expect(element.attributes.length).to.be.gt(0)
       expect(element.attributes.getNamedItem('custom').nodeName).to.equal('custom')
       expect(element.attributes.getNamedItem('custom').nodeValue).to.equal('custom_value')
       expect(element.getAttribute('custom')).to.equal('custom_value')
       expect(element.getAttribute('not_added')).not.to.exist
       expect(element.className).to.equal('')
       expect(element.accessKey).to.equal('')
       expect(document.body.querySelector('div#test').getBoundingClientRect().width).to.exist      
    })
    it('should add class values',() => {
        let element = document.createElement('div')
        element.classList.add('sclass')
        expect(element.classList.contains('sclass')).to.be.true
        element.classList.toggle('sclass')
        expect(element.classList.contains('sclass')).to.be.not.true
        element.classList.toggle('sclass')
        expect(element.classList.contains('sclass')).to.be.true
    })
    it('div should be an ELEMENT_NODE type', () => {
        expect(document.body.querySelector('div#test').nodeType).to.equal(document.ELEMENT_NODE)
        expect(document.body.querySelector('div#test').nodeName.toLowerCase())
        .to.equal(document.body.querySelector('div#test').localName)
    })
    it('element.localName and element.nodeName should differ in uppercase only',() => {
        expect(document.body.querySelector('div#test').nodeName.toLowerCase())
        .to.equal(document.body.querySelector('div#test').localName)
    })
})