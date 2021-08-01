import React, { Component } from 'react'

class Footer extends Component {
    render() {
        const date = new Date();
        const year = date.getFullYear()
        return (
            <div>
               <footer className="site-footer">
                    <div className="container-fluid">
                    <hr  style={{
                                height: .5,
                                borderColor : 'white'
                            }}/>
                            <br/>
                        <div className="row  ">
                            
                            <div className="col-md-3 offset-1 text-left">
                            
                                <h2>Links</h2>
                                <ul className="list-unstyled">
                                    <li><a href="http://www.opendoor.com"><h5>Opendoor</h5></a></li>
                                    <li><a href="http://www.redfin.com"><h5>Redfin</h5></a></li>
                                    <li><a href="http://www.zillow.com"><h5>Zillow</h5></a></li>
                                </ul>
                            </div>

                            <div className="col-md-4 text-center ">
                                
                                <p>copyright ©  {year}</p>
                            </div>
                     
                            <div className="col text-left offset-1">
                                <a role="button" className="btn btn-link" href="tel:+1(3364570568)"><h5><i className="fa fa-phone-square fa-lg"></i> (336) 457-0568</h5></a><br />
                                <a role="button" className="btn btn-link" href="mailto: mamusstaffali@gmail.com"><h5><i className="fa fa-envelope-square fa-lg"></i> mamusstaffali@gmail.com </h5></a>
                                <a role="button" className="btn btn-link" href="https://github.com/musstaffali/realestate-react"><h5><i className="fa fa-github fa-lg"></i> Repository </h5></a>
                            </div>
                        </div>
                    </div>
                </footer>

              

            </div>
            
        );
    }
}

export default Footer;


