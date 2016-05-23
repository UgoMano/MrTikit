/**
 * PayPalController
 *
 * @description :: Server-side logic for managing Paypals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');

module.exports = {
    createPayment: function (req, res) {
        var pp = PayPalService.createPayment(req.body.amount, 1);

        request.post(pp, function (err, httpResponse, body) {
            if (err) {
                res.badRequest("Error: " + err);
            }
            var data = {
                payKey: body.payKey,
                remoteUrl: "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=",
            }

            if(data.error) {
                res.badRequest(data);
            } else {
                res.ok(data);
            }
        });
    },
    getPaymentDetails: function (req, res) {
        var pp = PayPalService.getPaymentDetails(req.body.payKey);

        request.post(pp, function (err, httpResponse, body) {
            if (err) {
                res.badRequest("Error: " + err);
            }

            //We'll need to parse this response and just return if its good or not.
            if(body.error) {
                res.badRequest(body);
            } else {
                var data = {
                    status: body.status,
                }
                res.ok(data);
            }
        });
    }
};