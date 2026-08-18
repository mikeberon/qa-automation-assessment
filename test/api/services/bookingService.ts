import axios from 'axios'

export class BookingService {

    private readonly baseUrl =
        'https://restful-booker.herokuapp.com'

    async updateBookingWithoutAuth(
        bookingId: number,
        bookingData: object
    ) {
        return await axios.put(
            `${this.baseUrl}/booking/${bookingId}`,
            bookingData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                validateStatus: () => true
            }
        )
    }

    async createToken() {
        return await axios.post(
            `${this.baseUrl}/auth`,
            {
                username: 'admin',
                password: 'password123'
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
    }

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

    async updateBooking(
        bookingId: number,
        bookingData: object,
        token: string
    ) {
        return await axios.put(
            `${this.baseUrl}/booking/${bookingId}`,
            bookingData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cookie': `token=${token}`
                }
            }
        )
    }

    async deleteBooking(
        bookingId: number,
        token: string
    ) {
        return await axios.delete(
            `${this.baseUrl}/booking/${bookingId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `token=${token}`
                }
            }
        )
    }

    async getBookingAllowNotFound(bookingId: number) {
        return await axios.get(
            `${this.baseUrl}/booking/${bookingId}`,
            {
                headers: {
                    'Accept': 'application/json'
                },
                validateStatus: () => true
            }
        )
    }
}