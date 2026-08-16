import { expect } from 'chai'

import { BookingService } from '../services/bookingService.js'
import { bookingData } from '../data/bookingData.js'

describe('Restful Booker - Booking API', () => {

    const bookingService = new BookingService()

    let bookingId: number

    it('should create a booking successfully', async () => {
        const response =
            await bookingService.createBooking(bookingData)

        bookingId = response.data.bookingid

        expect(response.status).to.equal(200)
        expect(response.data.bookingid).to.be.a('number')

        expect(response.data.booking.firstname)
            .to.equal(bookingData.firstname)

        expect(response.data.booking.lastname)
            .to.equal(bookingData.lastname)

        expect(response.data.booking.totalprice)
            .to.equal(bookingData.totalprice)

        expect(response.data.booking.depositpaid)
            .to.equal(bookingData.depositpaid)

        expect(response.data.booking.bookingdates.checkin)
            .to.equal(bookingData.bookingdates.checkin)

        expect(response.data.booking.bookingdates.checkout)
            .to.equal(bookingData.bookingdates.checkout)

        expect(response.data.booking.additionalneeds)
            .to.equal(bookingData.additionalneeds)
    })

    it('should retrieve the created booking successfully', async () => {
        const response =
            await bookingService.getBooking(bookingId)

        console.log('\n========== GET BOOKING ==========')
        console.log(`Status Code: ${response.status}`)
        console.log(`Booking ID: ${bookingId}`)
        console.log(`First Name: ${response.data.firstname}`)
        console.log(`Last Name: ${response.data.lastname}`)
        console.log(`Total Price: ${response.data.totalprice}`)
        console.log(`Deposit Paid: ${response.data.depositpaid}`)
        console.log(`Check-in: ${response.data.bookingdates.checkin}`)
        console.log(`Check-out: ${response.data.bookingdates.checkout}`)
        console.log(`Additional Needs: ${response.data.additionalneeds}`)
        console.log('=================================')

        expect(
            response.status,
            'Expected GetBooking to return HTTP 200'
        ).to.equal(200)

        expect(response.data.firstname)
            .to.equal(bookingData.firstname)

        expect(response.data.lastname)
            .to.equal(bookingData.lastname)

        expect(response.data.totalprice)
            .to.equal(bookingData.totalprice)

        expect(response.data.depositpaid)
            .to.equal(bookingData.depositpaid)

        expect(response.data.bookingdates.checkin)
            .to.equal(bookingData.bookingdates.checkin)

        expect(response.data.bookingdates.checkout)
            .to.equal(bookingData.bookingdates.checkout)

        expect(response.data.additionalneeds)
            .to.equal(bookingData.additionalneeds)
    })
})