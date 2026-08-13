import { expect } from 'chai'

describe('Cheapflights - Smoke Test', () => {

    it('should load the Cheapflights homepage', async () => {
        await browser.url('/')

        const title = await browser.getTitle()

        expect(title).to.not.equal('')
    })

})