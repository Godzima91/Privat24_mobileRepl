export class mobilePhoneReplenishment {
    typePhoneNumber(phoneNumber) {
        cy.get('[data-qa-node="phone-number"]')
            .type(phoneNumber)
    }

    typeAmount(Amount) {
        cy.get('[data-qa-node="amount"]')
          .type(Amount)
    } 

    typeDebitCardData(CardNumber, expDate, cvv) {
        cy
          .get('[data-qa-node="numberdebitSource"]')
          .type('4552331448138217')

          .get('[data-qa-node="expiredebitSource"]')
          .type('0524')

          .get('[data-qa-node="cvvdebitSource"]')
          .type('111')
    }

    fillFirstName(firstName) {
        cy
            .get('[data-qa-node="firstNamedebitSource"]')
           .type(firstName)
    }

    fillLastName(lastName) {
        cy
            .get('[data-qa-node="lastNamedebitSource"]')
           .type(lastName)
    }
        


    submitPayment() {
        cy 
          .get('[data-qa-node="submit"]')
          .click()
    }

    checkDebitCard(debitCard) {
        cy
            .get('[data-qa-node="card"]')
            .should('have.text', debitCard)
    }

    checkDebitAmount(Amount) {
        cy
            .get('[data-qa-node="amount"]')       
            .should('contain.text', Amount)
    }

    checkDebitCommission(Commission) {
        cy
            .get('[data-qa-node="commission"]')
            .eq(1)
            .should('have.text', Commission)
    }

}

export const mobileReplenishment = new mobilePhoneReplenishment()