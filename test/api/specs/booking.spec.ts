import { expect } from 'chai'

import { BookingService } from '../services/bookingService.js'
import {
    bookingData,
    updatedBookingData
} from '../data/bookingData.js'

describe('Restful Booker - Booking API', () => {

    const bookingService = new BookingService()

    let bookingId: number
    let token: string

    const logBooking = (
        title: string,
        status: number,
        id: number,
        booking: any
    ): void => {
        console.log(`\n========== ${title} ==========`)
        console.log(`Status Code:      ${status}`)
        console.log(`Booking ID:       ${id}`)
        console.log(`First Name:       ${booking.firstname}`)
        console.log(`Last Name:        ${booking.lastname}`)
        console.log(`Total Price:      ${booking.totalprice}`)
        console.log(`Deposit Paid:     ${booking.depositpaid}`)
        console.log(`Check-in:         ${booking.bookingdates.checkin}`)
        console.log(`Check-out:        ${booking.bookingdates.checkout}`)
        console.log(`Additional Needs: ${booking.additionalneeds}`)
        console.log('====================================')
    }

    const assertBooking = (
        actual: any,
        expected: typeof bookingData
    ): void => {
        expect(actual.firstname)
            .to.equal(expected.firstname)

        expect(actual.lastname)
            .to.equal(expected.lastname)

        expect(actual.totalprice)
            .to.equal(expected.totalprice)

        expect(actual.depositpaid)
            .to.equal(expected.depositpaid)

        expect(actual.bookingdates.checkin)
            .to.equal(expected.bookingdates.checkin)

        expect(actual.bookingdates.checkout)
            .to.equal(expected.bookingdates.checkout)

        expect(actual.additionalneeds)
            .to.equal(expected.additionalneeds)
    }

    before(async () => {
        const response =
            await bookingService.createToken()

        expect(
            response.status,
            'Expected authentication to return HTTP 200'
        ).to.equal(200)

        token = response.data.token

        expect(
            token,
            'Expected authentication token to be generated'
        ).to.be.a('string').and.not.be.empty

        console.log('\n========== AUTHENTICATION ==========')
        console.log(`Status Code:    ${response.status}`)
        console.log('Authentication: Token generated')
        console.log('====================================')
    })

    it('should create a booking successfully', async () => {

        const response =
            await bookingService.createBooking(bookingData)

        bookingId = response.data.bookingid

        logBooking(
            'CREATE BOOKING',
            response.status,
            bookingId,
            response.data.booking
        )

        expect(
            response.status,
            'Expected CreateBooking to return HTTP 200'
        ).to.equal(200)

        expect(
            bookingId,
            'Expected a booking ID to be generated'
        ).to.be.a('number')

        assertBooking(
            response.data.booking,
            bookingData
        )
    })

    it('should retrieve the created booking successfully', async () => {

        const response =
            await bookingService.getBooking(bookingId)

        logBooking(
            'GET CREATED BOOKING',
            response.status,
            bookingId,
            response.data
        )

        expect(
            response.status,
            'Expected GetBooking to return HTTP 200'
        ).to.equal(200)

        assertBooking(
            response.data,
            bookingData
        )
    })

    it('should reject booking update without authentication', async () => {

        const response =
            await bookingService.updateBookingWithoutAuth(
                bookingId,
                updatedBookingData
            )

        console.log('\n======= UNAUTHORIZED UPDATE =======')
        console.log(`Status Code:     ${response.status}`)
        console.log(`Booking ID:      ${bookingId}`)
        console.log('Authentication:  Missing')
        console.log('Expected Result: Update rejected')
        console.log('===================================')

        expect(
            response.status,
            'Expected unauthenticated update to be rejected'
        ).to.not.equal(200)
    })

    it('should keep the original booking unchanged after unauthorized update', async () => {

        const response =
            await bookingService.getBooking(bookingId)

        logBooking(
            'VERIFY UNCHANGED BOOKING',
            response.status,
            bookingId,
            response.data
        )

        expect(
            response.status,
            'Expected booking to still be retrievable'
        ).to.equal(200)

        assertBooking(
            response.data,
            bookingData
        )
    })

    it('should update the booking successfully', async () => {

        const response =
            await bookingService.updateBooking(
                bookingId,
                updatedBookingData,
                token
            )

        console.log('\n========== UPDATE BOOKING ==========')
        console.log(`Status Code:      ${response.status}`)
        console.log(`Booking ID:       ${bookingId}`)
        console.log(`First Name:       ${response.data.firstname}`)
        console.log(`Last Name:        ${response.data.lastname}`)
        console.log(
            `UPDATED → Total Price:      ${bookingData.totalprice} → ${response.data.totalprice}`
        )
        console.log(`Deposit Paid:     ${response.data.depositpaid}`)
        console.log(
            `Check-in:         ${response.data.bookingdates.checkin}`
        )
        console.log(
            `UPDATED → Check-out:        ${bookingData.bookingdates.checkout} → ${response.data.bookingdates.checkout}`
        )
        console.log(
            `UPDATED → Additional Needs: ${bookingData.additionalneeds} → ${response.data.additionalneeds}`
        )
        console.log('====================================')

        expect(
            response.status,
            'Expected UpdateBooking to return HTTP 200'
        ).to.equal(200)

        assertBooking(
            response.data,
            updatedBookingData
        )
    })

    it('should retrieve the updated booking successfully', async () => {

        const response =
            await bookingService.getBooking(bookingId)

        logBooking(
            'VERIFY UPDATED BOOKING',
            response.status,
            bookingId,
            response.data
        )

        expect(
            response.status,
            'Expected updated booking to return HTTP 200'
        ).to.equal(200)

        assertBooking(
            response.data,
            updatedBookingData
        )
    })

    it('should delete the booking successfully', async () => {

        const response =
            await bookingService.deleteBooking(
                bookingId,
                token
            )

        console.log('\n========== DELETE BOOKING ==========')
        console.log(`Status Code: ${response.status}`)
        console.log(`Booking ID:  ${bookingId}`)
        console.log('Result:      Booking deleted')
        console.log('====================================')

        expect(
            response.status,
            'Expected DeleteBooking to return HTTP 201'
        ).to.equal(201)
    })

    it('should not retrieve the deleted booking', async () => {

        const response =
            await bookingService.getBookingAllowNotFound(
                bookingId
            )

        console.log('\n======= VERIFY DELETED BOOKING =======')
        console.log(`Status Code: ${response.status}`)
        console.log(`Booking ID:  ${bookingId}`)
        console.log('Result:      Booking not found')
        console.log('======================================')

        expect(
            response.status,
            'Expected deleted booking to return HTTP 404'
        ).to.equal(404)
    })
})