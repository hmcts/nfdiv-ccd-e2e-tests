const I = actor();

module.exports = {

  fields: {
    selectActionDropDown: 'select[id="next-step"]',
    finalOrderYes: 'doesApplicantWantToApplyForFinalOrder_Yes',
    finalOrderGrantedYes: 'granted-Yes'

  },

  async fillApplyForFinalOrder(caseNumber) {
    await I.waitInUrl('trigger/solicitor-final-order-requested/solicitor-final-order-requestedSolicitorApplyForFinalOrder');
    await I.see('Apply for final order');
    await I.see('Awaiting Final Order');
    await I.click(this.fields.finalOrderYes);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillApplyForFinalOrderCYA(caseNumber) {
    await I.waitInUrl('trigger/solicitor-final-order-requested/submit');
    await I.see('Check your answers');
    await I.see('Awaiting Final Order');
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillGrantFinalOrder(caseNumber) {
    await I.waitInUrl('trigger/caseworker-grant-final-order/caseworker-grant-final-ordergrantFinalOrder');
    await I.see('Final order requested');
    await I.see('Final Order granted?');
    await I.click(this.fields.finalOrderGrantedYes);
    await I.waitForNavigationToComplete(this.fields.submit);
  },

  async fillGrantFinalOrderCYA(caseNumber) {
    await I.waitInUrl('trigger/caseworker-grant-final-order/submit');
    await I.see('Check your answers');
    await I.see('Final order requested');
    await I.see('Check the information below carefully.');
    await I.see('Final Order granted?');
    await I.waitForNavigationToComplete(this.fields.submit);
  }

};
