export class FlightResultsPage {

    private readonly firstResultSelector =
        '[aria-label="Result item 1"]'

    private readonly resultItemsSelector =
        '[aria-label^="Result item"]'

    private readonly originAirportSelector =
        '[title="Tokyo Narita"]'

    private readonly destinationAirportSelector =
        '[title="Manila Ninoy Aquino Intl"]'

    private readonly tripTypeSelector =
        '[aria-label="One-way"]'

    private readonly cabinClassSelector =
        '[aria-label*="First Cabin"]'

    private readonly departureDateSelector =
        '[aria-label^="Departure date "]'

    get firstResult() {
        return $(this.firstResultSelector)
    }

    get resultItems() {
        return $$(this.resultItemsSelector)
    }

    get originAirport() {
        return $(this.originAirportSelector)
    }

    get destinationAirport() {
        return $(this.destinationAirportSelector)
    }

    get tripType() {
        return $(this.tripTypeSelector)
    }

    get cabinClass() {
        return $(this.cabinClassSelector)
    }

    get departureDate() {
        return $(this.departureDateSelector)
    }

    async waitForResults(): Promise<void> {
        await this.firstResult.waitForDisplayed({
            timeout: 30000
        })
    }

    async getResultCount(): Promise<number> {
        const results = await this.resultItems
        return results.length
    }

    async getOriginAirport(): Promise<string> {
        return await this.originAirport.getAttribute('title') ?? ''
    }

    async getDestinationAirport(): Promise<string> {
        return await this.destinationAirport.getAttribute('title') ?? ''
    }

    async getTripType(): Promise<string> {
        return await this.tripType.getAttribute('aria-label') ?? ''
    }

    async getCabinClass(): Promise<string> {
        return await this.cabinClass.getAttribute('aria-label') ?? ''
    }

    async getDepartureDate(): Promise<string> {
        const ariaLabel =
            await this.departureDate.getAttribute('aria-label') ?? ''

        return ariaLabel.replace('Departure date ', '')
    }
}