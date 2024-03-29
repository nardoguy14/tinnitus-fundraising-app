import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import {Button, Modal, InputGroup, FormControl, Table, Form, Container, Row, Col} from 'react-bootstrap'
import {withRouter} from "react-router";
import {Elements, CardElement, ElementsConsumer, useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import './Donation.css'
import {Field, SubmitButton, ErrorMessage, ResetButton} from './SmallerComponents'
import xxxx from './getimage.png'
import {postDonation, postPaymentIntent} from "../../lib/apiRequestor";
import * as Swal from "sweetalert2";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#c4f0ff',
            color: '#0e0909',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {
                color: '#fce883',
            },
            '::placeholder': {
                // color: '#87BBFD',
            },
            width:'100%'
        },
        invalid: {
            iconColor: '#d20810',
            color: '#d20810',
        },
    },
};

const DEFAULT_STATE = {
    error: null,
    cardComplete: false,
    processing: false,
    paymentMethod: null,
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    amount: 0,
    username: '',
    message: ''
}


class DonationComponent extends React.Component {
    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search)
        DEFAULT_STATE['username'] = urlParams.get("username")
        DEFAULT_STATE['fundraiserId'] = urlParams.get("fundraiserId")
        this.state = DEFAULT_STATE;
    }

    handleSubmit = (event, stripe, elements) => {
        this.setState({processing: true})
        let comp = this;
        if (!stripe ) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        let {username, amount, firstName, lastName, message, fundraiserId} = this.state

        postPaymentIntent(username, parseFloat(amount))
        .then(response => {
            const payload = stripe.confirmCardPayment(response.data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            }).then( (resp) => {
                if (resp.error) {
                    console.log("error", resp)
                    this.setState({
                        error: `Payment failed ${payload.error.message}`,
                        processing: false
                    })
                } else {
                    console.log("success", resp)

                    postDonation(username, firstName, lastName, message, amount, fundraiserId)
                    .then(resp => {

                        Swal.fire({
                            icon: 'info',
                            title: 'Thank you for your Donation!',
                            text: 'Your donation goes a long way to progressing research and support for tinnitus!',
                            confirmButtonColor: '#3b5cad',
                        }).then(function() {
                            comp.props.history.push('/')
                        });
                    })
                }
            })
        })
    };

    reset = () => {
        this.setState(DEFAULT_STATE);
    };

    handleAmount(amount) {
        this.setState({amount: amount})
    }

    render() {
        const {error, processing, paymentMethod, name} = this.state;
        var body = null

        return (
            <Container
                style={{
                    marginLeft: 0, marginRight: 0,
                    maxWidth: '100%',
                    display: 'grid',
                    'min-height': '100vh',
                    'align-items': 'center',
                    backgroundImage: `url(${xxxx})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%'
                }}>
                <Row style={{ marginLeft: 0, marginRight: 0 }}>
                    <Col xs={12} md={{ span: 6, offset: 6 }}>
                        <Container style={{backgroundColor: 'rgba(255,255,255,.9)', padding:'30px'}}  className={"rounded shadow-lg"} fluid>

                            <h1 className="display-3 bta-font-bold">Donate Today!</h1>
                            <p>
                                TOGETHER WE CAN SILENCE TINNITUS. The Covid-19 pandemic has made tinnitus worse for
                                nearly half of UK sufferers. We urgently need your help to support more people living
                                with tinnitus.
                            </p>


                            <Elements stripe={stripePromise}>

                            <ElementsConsumer>
                            {({elements, stripe}) => (
                                paymentMethod ? (
                                    <div className="Result">

                                        <div className="ResultTitle" role="alert">
                                            Payment successful
                                        </div>

                                        <div className="ResultMessage">
                                            Thanks for trying Stripe Elements. No money was charged, but we
                                            generated a PaymentMethod: {paymentMethod['id']}
                                        </div>

                                        <ResetButton onClick={this.reset} />
                                    </div>
                                ) : (
                                    <div>
                                <Field
                                    label="First Name"
                                    id="firstName"
                                    type="text"
                                    placeholder="Jane"
                                    required
                                    autoComplete="first name"
                                    value={name}
                                    onChange={(event) => {
                                    this.setState({firstName: event.target.value})}}/>

                                <Field
                                    label="Last Name"
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    required
                                    autoComplete="last name"
                                    value={name}
                                    onChange={(event) => {
                                        this.setState({lastName: event.target.value})}}/>


                                <label className="FormRowLabel">
                                    Amount
                                </label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl onChange={e => {this.handleAmount(e.target.value)}} style={{marginTop: 0}} aria-label="Amount (to the nearest dollar)" />
                                </InputGroup>


                                <div className="hello">
                                    <CardElement
                                        options={CARD_OPTIONS}
                                        onChange={(event) => {
                                            console.log(event)
                                            this.setState({
                                                error: event.error,
                                                cardComplete: event.complete,
                                            });
                                        }}
                                    />
                                </div>

                                <Field
                                    label="Message"
                                    id="message"
                                    type="textarea"
                                    placeholder="Leave a message!"
                                    required
                                    autoComplete="message"
                                    value={name}
                                    onChange={(event) => {
                                        this.setState({message: event.target.value})}}/>

                                {error && <ErrorMessage>{error.message}</ErrorMessage>}
                                <br/>
                                <SubmitButton onChange={e => {this.handleSubmit(e, stripe, elements)}} processing={processing} error={error} disabled={!stripe}>
                                Submit Donation
                                </SubmitButton>
                                    </div>
                                )
                            )}
                            </ElementsConsumer>
                            </Elements>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DonationComponent = withRouter(DonationComponent);
