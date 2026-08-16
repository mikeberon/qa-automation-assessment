export class HomePage {

    private readonly logoSelector = 'a[aria-label="Go to the cheapflights homepage"]'
    private readonly loginButtonSelector = '[aria-label="Sign in"]'
    private readonly headerSelector = 'header.mc6t'

    get header() {
        return $(this.headerSelector)
    }

    async getHeaderSize() {
        return await this.header.getSize()
    }

    get logo() {
        return $(this.logoSelector)
    }

    get loginButton() {
        return $(this.loginButtonSelector)
    }

    async open(): Promise<void> {
        await browser.url('/')
    }

    async isLogoDisplayed(): Promise<boolean> {
        return await this.logo.isDisplayed()
    }

    async isLoginButtonDisplayed(): Promise<boolean> {
        return await this.loginButton.isDisplayed()
    }

    async getLogoLocation() {
        return await this.logo.getLocation()
    }

    async getLogoSize() {
        return await this.logo.getSize()
    }

    async getLoginButtonLocation() {
        return await this.loginButton.getLocation()
    }

    async getLoginButtonSize() {
        return await this.loginButton.getSize()
    }
}