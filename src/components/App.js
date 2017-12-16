import React, {Component} from 'react'
import PropTypes from 'prop-types'
class App extends Component {
constructor(props) {
    super(props)
}    
render() {
    return (
        <div>
        <div>{this.props.children}</div>
        <div className='prop'>{this.props.name}</div>
        </div>
    )
}
}
App.propTypes = {
name: PropTypes.string
}
App.defaultProps = {
    name: 'App'
}

export default App