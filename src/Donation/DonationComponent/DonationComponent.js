import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import {Button, Modal, InputGroup, FormControl, Table, Form, Container, Row, Col} from 'react-bootstrap'
import axios from 'axios';
import {withRouter} from "react-router";
import TokenService from "../../lib/tokenService";
import {Elements, CardElement, ElementsConsumer, useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import './Donation.css'
import {Field, SubmitButton, ErrorMessage, ResetButton} from './SmallerComponents'

const stripePromise = loadStripe('pk_test_51J4YG5EtXr3xL8O5VGzJQ0Uxn2vir402yCdjMV5uJShaHfEsChqNQuIOvBTjtDTv0FoXk4mC4Td9qtFO6Qk3qIgJ00VW9CZhmj');

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
    name: '',
    amount: 0,
    username: ''
}


class DonationComponent extends React.Component {
    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search)
        const username = urlParams.get("username")
        this.state = DEFAULT_STATE;
    }

    handleSubmit = (event, stripe, elements) => {
        alert("hi")
        alert(stripe)
        if (!stripe ) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        let {username, amount} = this.state

        axios.post('http://localhost:8000/payment_intent', {
            username: username,
            fundraiser_id: 1,
            amount: amount,
            currency: "usd"
        }).then(response => {
            alert(response.data)
            alert(response.data.clientSecret)
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
                    this.setState({
                        processing: false,
                        succeeded: true,
                        error: null,
                        paymentMethod: resp.paymentIntent
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
                    display: 'grid',
                    'min-height': '100vh',
                    'align-items': 'center'}}>
                <Row>
                    <Col md={{ span: 6, offset: 6 }}>
                        <Container style={{backgroundColor: 'transparent', padding:'30px'}}  className={"rounded shadow-lg"} fluid>

                            <h1 className="display-3">Donate Today!</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel arcu sem. In hac habitasse platea dictumst. In ac cursus urna. Nam lectus diam, vehicula nec nisl ac, tempor porttitor odio. Integer maximus mi sed sapien euismod imperdiet. </p>


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
                                    label="Name"
                                    id="name"
                                    type="text"
                                    placeholder="Jane Doe"
                                    required
                                    autoComplete="name"
                                    value={name}
                                    onChange={(event) => {
                                    this.setState({name: event.target.value})}}/>


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

                                {error && <ErrorMessage>{error.message}</ErrorMessage>}
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
