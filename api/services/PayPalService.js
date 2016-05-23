// EventsService.js - in api/services
var Transaction = require('sails-mysql-transactions').Transaction;

module.exports = {
    createPayment: function (amount, event) {
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
                            amount: 20,
                            email: 'eventManager@mrtikit.com',
                            primary: true
                        },
                        {
                            amount: 1,
                            email: 'mrtikit@mrtikit.com',
                            primary: false
                        }]
                },
                requestEnvelope: {
                    errorLanguage: 'en_US'
                },
                returnUrl: 'http://mrtikit.com/Success',
                cancelUrl: 'http://mrtikit.com/Fail'
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