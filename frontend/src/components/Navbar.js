import React, { Component } from 'react'

export class Navbar extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#6dbdc0",fontFamily: "Playfair Display", fontWeight: "400",
                    fontStyle: "normal"}}>
                    <div className="container-fluid">
                        {/* eslint-disable-next-line */}
                        <a className="navbar-brand" href="#">SortListed Links</a>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar
