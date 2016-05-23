// EventsService.js - in api/services
var Transaction = require('sails-mysql-transactions').Transaction;
var mrtikitPercentage = .05;
module.exports = {
    createPayment: function (amount, event, eventPaypalEmail, transactionId) {
        //Calculate percent for mrtikit
        var mrtikitFee = mrtikitPercentage * amount;

        //get event manager email for primary reciever
        var options = {
            method: 'POST',
            url: 'https://svcs.sandbox.paypal.com/AdaptivePayments/Pay',
            headers: {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'x-paypal-security-signature': 'AFcWxV21C7fd0v3bYYYRCpSSRl31A9eS.Hxi5aTLQ3K7gzcNm1f6chQP',
                'x-paypal-security-password': 'P32UAUYAHDAQK3ZR',
                'x-paypal-security-userid': 'chainedpayment_api1.test.com',
                'x-paypal-response-data-format': 'JSON',
                'x-paypal-request-data-format': 'JSON',
                'x-paypal-application-id': 'APP-80W284485P519543T'
            },
            body: {
                actionType: 'PAY',
                clientDetails: {
                    applicationId: 'APP-80W284485P519543T',
                    ipAddress: '127.0.0.1'
                },
                currencyCode: 'USD',
                feesPayer: 'EACHRECEIVER',
                memo: 'Example',
                receiverList: {
                    receiver: [{
                            amount: amount,
                            email: eventPaypalEmail,
                            primary: true
                        },
                        {
                            amount: mrtikitFee,
                            email: 'mrtikit@mrtikit.com',
                            primary: false
                        }]
                },
                requestEnvelope: {
                    errorLanguage: 'en_US'
                },
                returnUrl: 'http://mrtikit.com/reviewPurchase?trans=' + transactionId,
                cancelUrl: 'http://mrtikit.com/reviewPurchase'
            },
            json: true
        };

        return options;
    },
    getPaymentDetails: function (payKey) {
        var options = {
            method: 'POST',
            url: 'https://svcs.sandbox.paypal.com/AdaptivePayments/PaymentDetails',
            headers: {
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'x-paypal-security-signature': 'AFcWxV21C7fd0v3bYYYRCpSSRl31A9eS.Hxi5aTLQ3K7gzcNm1f6chQP',
                'x-paypal-security-password': 'P32UAUYAHDAQK3ZR',
                'x-paypal-security-userid': 'chainedpayment_api1.test.com',
                'x-paypal-response-data-format': 'JSON',
                'x-paypal-request-data-format': 'JSON',
                'x-paypal-application-id': 'APP-80W284485P519543T'
            },
            body: {
                payKey: payKey,
                requestEnvelope: {
                    errorLanguage: 'en_US'
                }
            },
            json: true
        };

        return options;
    },
};