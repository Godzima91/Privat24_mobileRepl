/// <reference types="Cypress" />

import { mobileReplenishment } from "../support/pages/mobileReplenishment"


describe('headHunter course', () => {
    it('Should', () => {
        cy.visit('https://next.privat24.ua/mobile?lang=en')
            .get('[data-qa-node="amount"]')
            .type('999')
            .wait(2000)
            .should('have.value', 999)
            .and('be.visible')
    }) 
    it('EXPECT', () => {
        cy.visit('https://next.privat24.ua/mobile?lang=en')
            .get('[data-qa-node="amount"]')
            .type('999').then( input => {
                expect(input).to.have.value(999)
            })              
    }) 
    it('deposit', () => {
        cy.visit('https://next.privat24.ua/deposit?lang=en')
           .get('[data-qa-value="UAH"]')
            .should('be.checked')
    })
    it('mouseover check', () => {
        cy.visit('https://next.privat24.ua/deposit?lang=en')
            .contains('Мої депозити')
            .trigger('mouseover')
            .get('#archiveDeposits')
            .should('be.visible')
    })

    it('check attr of button', () => {
        cy.visit('https://next.privat24.ua?lang=en')
            .contains('Show cards')
            .should('have.attr', 'type')
            .and('match', /button/)
    })
    it('check attr of button', () => {
        cy.visit('https://next.privat24.ua?lang=en')
          .url()
          .should('eq', 'https://next.privat24.ua/?lang=en')
    })


    it('Replenishment of Ukrainian mobile phone number', () => {
        cy.visit('https://next.privat24.ua/mobile?lang=en')

        mobileReplenishment.typePhoneNumber('632462537')
        mobileReplenishment.typeAmount('1')
        mobileReplenishment.typeDebitCardData('4552331448138217', '0524', '111')
        
        cy.wait(2000)
        mobileReplenishment.fillFirstName('Ivan')
        mobileReplenishment.fillLastName('Ivanoc')
        
        mobileReplenishment.submitPayment()
        mobileReplenishment.checkDebitCard('4552 **** **** 8217')
        mobileReplenishment.checkDebitAmount('1')
        mobileReplenishment.checkDebitCommission('2')


    })


    it('Ex sending GET request', () => {
        cy.request('https://next.privat24.ua')
            .then((response) => {
                console.log('Slava Ukraine :', response);
            })
    })

    it('Ex sending POST request', () => {

        const requestBody = {
                "action":"info",
                "phone":"+380632462537",
                "amount":50,
                "currency":"UAH",
                "cardCvv":"111",
                "card":"4552331448138217",
                "cardExp":"0524",
                "xref":"8cade66d0599d318e1515df2ffb42950",
                "_":1653914679058
        }

        const headersData = {
            cookie: '_ga=GA1.2.158242902.1652790183; _gid=GA1.2.458749969.1653906076; pubkey=daaf5a920da227af9b266e875d6f2535; fp=37; lfp=5/17/2022, 3:23:14 PM; pa=1653913796270.10130.13442736276569578next.privat24.ua0.038222813181294946+1'
        }

        cy.request({
            method: "POST",
            url:'https://next.privat24.ua/api/p24/pub/mobipay',
            body: requestBody,
            headers: headersData
        }).then((response) => {
            expect(response).to.have.property('status').to.equal(200)
                console.log(response);
            })
    })

})

