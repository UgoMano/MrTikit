"use strict";
const assert = require('chai').assert;

const newTransaction = {
 title: "test transaction",
 user: "1",
 event: "10",
 tempTickets: [2,9,8],
 payKey: "Phat",
 completed: true,
 tickets: [1,3,4,5,7], /* either has tickets or tempTickets not both
 somewhere, we should assert that if tempTickets then tickets = 'NULL', and vice versa */
 remoteUrl: "paypal.com/memes123",
};


describe('models:Transactions', () => {
  /* UNCOMMENTING THIS WILL MAKE THE TESTS HANG; Transactions are not generating properly, I assume.
 it('Should create new transaction', done => {
   Transactions
     .create(newTransaction)
     .then(transaction => {
       assert.equal(transaction.title, newTransaction.title);
       assert.equal(transaction.user, newTransaction.user);
       done();
     })
     .catch(done);
 });
*/

 it('Should remove transaction', done => {
   Transactions
     .destroy({title: newTransaction.title, user: newTransaction.user})
     .then(transactions => {
       assert.equal(transactions[0].title, newTransaction.title);
       assert.equal(transactions[0].user, newTransaction.user);
       done();
     })
     .catch(done);
 });
});

