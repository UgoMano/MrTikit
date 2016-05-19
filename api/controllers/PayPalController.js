/**
 * PayPalController
 *
 * @description :: Server-side logic for managing Paypals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');

module.exports = {
    createPayment: function (req, res) {
        var pp = PayPalService.createPayment(req.amount, 1);

        request.post(pp, function (err, httpResponse, body) {
            if (err) {
                res.badRequest("Error: " + err);
            }
            var data = JSON.parse(body);
            //We need to parse this response and send back a link like this
            //https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=InsertPayKeyHere
            if(data.error) {
                res.badRequest(data);
            } else {
                res.ok(data);
            }
        });
    }
};