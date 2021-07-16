import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import './footercomponentcss.css'

library.add(fab, faCheckSquare, faCoffee)



class FooterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventNameSearch: "",
            eventSearchResults: []
        }
    }

    render(){
        return (
            <footer id={"footer"} className="text-center text-lg-start bta-font" style={{padding: '1px', backgroundColor: '#3b5cad', color: 'white'}}>
                <section style={{backgroundColor: '#3b5cad'}}>
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Contact Us
                                </h6>
                                <p>
                                    Contact us
                                    Helpline: 0800 018 0527
                                    helpline@tinnitus.org.uk
                                    Office: 0114 250 9933
                                    Text/SMS: 07537 416841
                                </p>
                                <p>
                                    Tinnitus is the perception of noises in the head and/or ear which have no external source, it is often described as buzzing or ringing in the ears. The British Tinnitus Association's vision is a world where no one suffers from tinnitus.
                                </p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Useful Links
                                </h6>
                                <p>
                                    <a href="#!" className="text-reset">Accessibility</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Terms and conditions</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Policies and procedures</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Forum</a>
                                </p>
                                <p>
                                    <a href="#!" className={'text-reset'}>Your contact preferences</a>
                                </p>
                                <p>
                                    <a href="#!" className={'text-reset'}>Press Contact</a>
                                </p>
                            </div>



                            <div style={{padding: 'auto'}} className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <p>
                                    Material on this site is for information purposes only and is not a substitute for medical advice - you should always see your doctor and/or medical professional.
                                </p>

                                <p style={{display: 'flex'}}>
                                    <FontAwesomeIcon style={{margin: 'auto'}} icon={['fab', 'twitter']} />
                                    <FontAwesomeIcon style={{margin: 'auto'}} icon={['fab', 'facebook-f']} />
                                    <FontAwesomeIcon style={{margin: 'auto'}} icon={['fab', 'youtube-square']} />
                                    <FontAwesomeIcon style={{margin: 'auto'}} icon={['fab', 'instagram-square']} />
                                </p>
                                <p style={{fontSize: '10px'}}>
                                    The British Tinnitus Association is a registered charity. Registered charity number 1011145.
                                    The British Tinnitus Association is a company limited by guarantee, registered in England and Wales, under registration number 2709302.
                                    British Tinnitus Association, Unit 5 Acorn Business Park, Woodseats Close, Sheffield, S8 0TB.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
                    © 2021 Copyright
                </div>
            </footer>
        );
    }
}

export default FooterComponent;
