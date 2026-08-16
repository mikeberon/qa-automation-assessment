import { expect } from 'chai'
import { HomePage } from '../pages/homePage.js'

describe('Cheapflights - Home Page', () => {

    const homePage = new HomePage()

    beforeEach(async () => {
        await homePage.open()
    })

    it('should display the Cheapflights logo', async () => {
        expect(await homePage.isLogoDisplayed()).to.be.true
    })

    it('should display the Cheapflights logo within the header', async () => {
        const headerLocation = await homePage.header.getLocation()
        const headerSize = await homePage.getHeaderSize()

        const logoLocation = await homePage.getLogoLocation()
        const logoSize = await homePage.getLogoSize()

        expect(logoLocation.y).to.be.at.least(headerLocation.y)

        expect(logoLocation.y + logoSize.height)
            .to.be.at.most(headerLocation.y + headerSize.height)
    })

    it('should display the login button', async () => {
        expect(await homePage.isLoginButtonDisplayed()).to.be.true
    })

    it('should display the login button in the header area', async () => {
        const location = await homePage.getLoginButtonLocation()
        expect(location.x).to.be.greaterThan(0)
        expect(location.y).to.be.greaterThan(0)
    })

    it('should display the login button within the header', async () => {
        const headerLocation = await homePage.header.getLocation()
        const headerSize = await homePage.getHeaderSize()

        const loginLocation = await homePage.getLoginButtonLocation()
        const loginSize = await homePage.getLoginButtonSize()

        expect(loginLocation.y).to.be.at.least(headerLocation.y)

        expect(loginLocation.y + loginSize.height)
            .to.be.at.most(headerLocation.y + headerSize.height)
    })
})