import { expect } from 'chai'

import { FlightSearchPage } from '../pages/flightSearchPage.js'
import { FlightResultsPage } from '../pages/flightResultsPage.js'

describe('Cheapflights - Flight Search', () => {

    const flightSearchPage = new FlightSearchPage()
    const flightResultsPage = new FlightResultsPage()

    const searchData = {
        tripType: 'One-way',
        originSearch: 'Narita',
        originExpected: 'Tokyo Narita',
        destinationSearch: 'Manila',
        destinationExpected: 'Manila Ninoy Aquino Intl',
        cabinClass: 'First Cabin'
    }

    beforeEach(async () => {
        await browser.url('/')
    })

    const formatDepartureDate = (date: Date): string => {
        const weekday = date.toLocaleDateString('en-US', {
            weekday: 'short'
        })

        return `${weekday} ${date.getDate()}/${date.getMonth() + 1}`
    }

    const setupOneWayOrigin = async (): Promise<void> => {
        await flightSearchPage.openTripTypeDropdown()
        await flightSearchPage.selectOneWay()

        await flightSearchPage.clearOrigin()

        await flightSearchPage.selectedOrigin.waitForExist({
            reverse: true,
            timeout: 5000
        })

        await flightSearchPage.enterOrigin(searchData.originSearch)
        await flightSearchPage.selectOrigin()
    }

    it('should not allow the user to search flights without a destination', async () => {

        await setupOneWayOrigin()

        // Destination intentionally left empty

        await flightSearchPage.openDepartureDatePicker()

        const departureDate =
            await flightSearchPage.selectDepartureOneMonthFromNow()

        const departureDateLabel =
            formatDepartureDate(departureDate)

        console.log('\n========== NEGATIVE SEARCH ==========')
        console.log(`Trip Type: ${searchData.tripType}`)
        console.log(`Origin: ${searchData.originExpected}`)
        console.log('Destination: EMPTY')
        console.log(`Departure Date: ${departureDateLabel}`)
        console.log('=====================================')

        await flightSearchPage.clickSearch()

        const validationMessage =
            await flightSearchPage.getMissingAirportMessage()

        console.log(`Validation Message: ${validationMessage}`)

        expect(
            validationMessage,
            'Expected validation message for missing destination'
        ).to.equal("You didn't select an airport")

        await browser.takeScreenshot()
    })

    it('should allow the user to search flights and validate the results', async () => {

        await setupOneWayOrigin()

        await flightSearchPage.enterDestination(
            searchData.destinationSearch
        )
        await flightSearchPage.selectDestination()

        const departureDate =
            await flightSearchPage.selectDepartureOneMonthFromNow()

        const departureDateLabel =
            formatDepartureDate(departureDate)

        await flightSearchPage.selectFirstClass()

        console.log('\n========== BEFORE SEARCH ==========')
        console.log(`Trip Type: ${searchData.tripType}`)
        console.log(`Origin: ${searchData.originExpected}`)
        console.log(`Destination: ${searchData.destinationExpected}`)
        console.log(
            `Route: ${searchData.originExpected} -> ${searchData.destinationExpected}`
        )
        console.log(`Departure Date: ${departureDateLabel}`)
        console.log(`Cabin Class: ${searchData.cabinClass}`)
        console.log('===================================')

        await flightSearchPage.clickSearch()
        await flightResultsPage.waitForResults()

        const resultCount =
            await flightResultsPage.getResultCount()

        const actualTripType =
            await flightResultsPage.getTripType()

        const actualOrigin =
            await flightResultsPage.getOriginAirport()

        const actualDestination =
            await flightResultsPage.getDestinationAirport()

        const actualDepartureDate =
            await flightResultsPage.getDepartureDate()

        const actualCabinClass =
            await flightResultsPage.getCabinClass()

        console.log('\n========== AFTER SEARCH ==========')
        console.log(`Flight Results: ${resultCount}`)
        console.log(`Trip Type: ${actualTripType}`)
        console.log(`Origin: ${actualOrigin}`)
        console.log(`Destination: ${actualDestination}`)
        console.log(
            `Route: ${actualOrigin} -> ${actualDestination}`
        )
        console.log(`Departure Date: ${actualDepartureDate}`)
        console.log(`Cabin Class: ${actualCabinClass}`)
        console.log('==================================')

        expect(
            resultCount,
            'Expected at least one flight result to be displayed'
        ).to.be.greaterThan(0)

        expect(
            actualTripType,
            'Returned trip type does not match the selected trip type'
        ).to.equal(searchData.tripType)

        expect(
            actualOrigin,
            'Returned origin airport does not match the expected origin'
        ).to.equal(searchData.originExpected)

        expect(
            actualDestination,
            'Returned destination airport does not match the expected destination'
        ).to.equal(searchData.destinationExpected)

        expect(
            actualDepartureDate,
            'Returned departure date does not match the selected departure date'
        ).to.equal(departureDateLabel)

        expect(
            actualCabinClass,
            `Expected cabin class to include ${searchData.cabinClass}`
        ).to.include(searchData.cabinClass)

        await browser.takeScreenshot()
    })
})