// EventsService.js - in api/services
var Transaction = require('sails-mysql-transactions').Transaction;

module.exports = {
    createPayment: function (amount, event) {
        var createHeaders = {
            "X-PAYPAL-APPLICATION-ID": "APP-80W284485P519543T",
            "X-PAYPAL-REQUEST-DATA-FORMAT": "JSON",
            "X-PAYPAL-RESPONSE-DATA-FORMAT": "JSON",
            "X-PAYPAL-SECURITY-USERID": "chainedpayment_api1.test.com",
            "X-PAYPAL-SECURITY-PASSWORD": "P32UAUYAHDAQK3ZR",
            "X-PAYPAL-SECURITY-SIGNATURE": "AFcWxV21C7fd0v3bYYYRCpSSRl31A9eS.Hxi5aTLQ3K7gzcNm1f6chQP",
            "Content-Type": "application/json"
        }

        var payData = {
            actionType: "PAY",
            clientDetails: {
                applicationId: "APP-80W284485P519543T",
                ipAddress: "127.0.0.1"
            },
            currencyCode: "USD",
            feesPayer: "EACHRECEIVER", //Lets take a look at this line for presentation
            memo: "Example",
            receiverList: {
                receiver: [
                    {
                        amount: 20.00,
                        email: "eventManager@mrtikit.com", //We will need to get this from the event creator eventually
                        primary: true
                    },
                    {
                        amount: 1.00,
                        email: "mrtikit@mrtikit.com",
                        primary: false
                    }
                ]
            },
            requestEnvelope: {
                errorLanguage: "en_US"
            },
            returnUrl: "http://mrtikit.com/Success", //Null values obviously
            cancelUrl: "http://mrtikit.com/Fail"
        }
            
        var reqObj = {
            url: 'https://svcs.sandbox.paypal.com/AdaptivePayments/Pay',
            headers: createHeaders,
            formData: JSON.stringify(payData)
        }
        return reqObj;
    },
};