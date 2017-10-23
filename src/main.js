'use strict'

import React, {Component} from 'react';
import Menu from './components/menu'
import Footer from './components/footer'

class Main extends Component{
    render(){
        return(
            <div>
                <Menu/>
                <div style={{marginTop:'100px',paddingBottom:'100px'}}>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        )
    }
}


export default Main;