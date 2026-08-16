export class FlightSearchPage {

    private readonly originInputSelector =
        '[aria-label="Origin location"]'

    private readonly destinationInputSelector =
        '[aria-label="Destination location"]'

    private readonly selectedOriginSelector =
        "//div[@aria-label='Flight origin input']//div[@role='listitem']"

    private readonly removeOriginSelector =
        "//div[@aria-label='Flight origin input']//div[@role='listitem']//div[@class='c_neb-item-close']"

    private readonly originResultSelectorTokyo =
        "//span[contains(@class,'vPgG-name') and normalize-space()='Tokyo, Japan']"

    private readonly destinationResultSelectorManila =
        "//span[contains(@class,'vPgG-name') and normalize-space()='Manila, Philippines']"

    private readonly tripTypeDropdownSelector =
        '[aria-label="Trip type Return"]'

    private readonly tripTypeOneWay =
        '[aria-label="One-way"]'

    private readonly firstClassSelector =
        '[aria-label="First"]'

    private readonly searchButtonSelector =
        "//span[contains(@class,'A_8a-title') and normalize-space()='Search']/parent::*"

    private readonly departureDateInputSelector =
        '[aria-label="Departure date"]'

    private readonly missingAirportMessageSelector =
        '//div[contains(@class,"TaO3-title")]'

    get missingAirportMessage() {
        return $(this.missingAirportMessageSelector)
    }

    async getMissingAirportMessage(): Promise<string> {
        await browser.waitUntil(
            async () => {
                const message =
                    await this.missingAirportMessage.getText()

                return message.trim() === "You didn't select an airport"
            },
            {
                timeout: 10000,
                interval: 500,
                timeoutMsg:
                    'Expected missing airport validation message was not displayed'
            }
        )

        return await this.missingAirportMessage.getText()
    }


    get departureDateInput() {
        return $(this.departureDateInputSelector)
    }

    async openDepartureDatePicker(): Promise<void> {
        await this.departureDateInput.waitForDisplayed({
            timeout: 10000
        })

        await this.departureDateInput.click()
    }

    get searchButton() {
        return $(this.searchButtonSelector)
    }

    get firstClassOption() {
        return $(this.firstClassSelector)
    }
    get tripTypeOneWayOnly() {
        return $(this.tripTypeOneWay)
    }

    get tripTypeDropdown() {
        return $(this.tripTypeDropdownSelector)
    }

    get originInput() {
        return $(this.originInputSelector)
    }

    get destinationInput() {
        return $(this.destinationInputSelector)
    }

    get selectedOrigin() {
        return $(this.selectedOriginSelector)
    }

    get removeOriginButton() {
        return $(this.removeOriginSelector)
    }

    get originResult() {
        return $(this.originResultSelectorTokyo)
    }

    get destinationResult() {
        return $(this.destinationResultSelectorManila)
    }

    async clickSearch(): Promise<void> {
        await this.searchButton.waitForDisplayed({
            timeout: 10000
        })

        await this.searchButton.waitForClickable({
            timeout: 10000
        })

        await this.searchButton.click()
    }
    async selectFirstClass(): Promise<void> {
        await this.firstClassOption.waitForDisplayed({
            timeout: 10000
        })

        await this.firstClassOption.click()
    }

    async clearOrigin(): Promise<void> {
        await this.removeOriginButton.waitForExist({
            timeout: 10000
        })

        await this.removeOriginButton.click()
    }

    async enterOrigin(origin: string): Promise<void> {
        await this.originInput.waitForDisplayed({
            timeout: 10000
        })

        await this.originInput.click()
        await this.originInput.setValue(origin)
    }

    async selectOrigin(): Promise<void> {
        await this.originResult.waitForDisplayed({
            timeout: 10000
        })

        await this.originResult.click()
    }

    async enterDestination(destination: string): Promise<void> {
        await this.destinationInput.waitForDisplayed({
            timeout: 10000
        })

        await this.destinationInput.click()
        await this.destinationInput.setValue(destination)
    }

    async selectDestination(): Promise<void> {
        await this.destinationResult.waitForDisplayed({
            timeout: 10000
        })

        await this.destinationResult.click()
    }

    async openTripTypeDropdown(): Promise<void> {
        await this.tripTypeDropdown.waitForDisplayed({
            timeout: 10000
        })

        await this.tripTypeDropdown.click()

    }

    async selectOneWay(): Promise<void> {
        await this.tripTypeDropdown.waitForDisplayed({
            timeout: 10000
        })

        await this.tripTypeDropdown.click()

        await this.tripTypeOneWayOnly.waitForDisplayed({
            timeout: 10000
        })

        await this.tripTypeOneWayOnly.click()
    }

    async selectDepartureOneMonthFromNow(): Promise<Date> {
        const targetDate = new Date()

        targetDate.setMonth(targetDate.getMonth() + 1)

        const month = targetDate.toLocaleString('en-US', {
            month: 'long'
        })

        const day = targetDate.getDate()
        const year = targetDate.getFullYear()

        const dateSelector =
            `[aria-label^="${month} ${day} ${year}"]`

        const departureDate = $(dateSelector)

        await departureDate.waitForDisplayed({
            timeout: 10000
        })

        await departureDate.click()

        return targetDate
    }
}