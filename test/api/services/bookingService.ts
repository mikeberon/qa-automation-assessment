import axios from 'axios'

export class BookingService {

    private readonly baseUrl =
        'https://restful-booker.herokuapp.com'

    async createBooking(bookingData: object) {
        return await axios.post(
            `${this.baseUrl}/booking`,
            bookingData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
    }

    async getBooking(bookingId: number) {
        return await axios.get(
            `${this.baseUrl}/booking/${bookingId}`,
            {
                headers: {
                    'Accept': 'application/json'
                }
            }
        )
    }
}