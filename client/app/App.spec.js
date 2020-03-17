const target = {
    DEV: 'http://localhost:4002',
    PROD: 'https://azuredatamicrosite.azurewebsites.net/azuredata'
    //Staging prod
    //PROD: 'https://stagingazuredatamicrosite.azurewebsites.net'
};

jest.setTimeout(15000);

const testID = id => `[data-testid="${id}"]`;
const aria = label => `[aria-label="${label}"]`;

const url = process.env.NODE_ENV !== 'test' ? target.PROD : target.DEV;

const navigator = location => page.goto(location ? url + location : url);

describe('Microsoft Azure Data', () => {
    beforeAll(async () => {
        await page.goto(url);
    });

    describe('Home Page', () => {
        it('should display "Microsoft" text on like somewhere on the page', async () => {
            await expect(page).toMatch('Microsoft');
        });
    });
});
