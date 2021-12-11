const timeout = 15000; 
beforeAll(async () => {
    await page.goto(URL+"/bigorder", {waitUntil: 'domcontentloaded'});
  
}); 
describe('Test Big order page render', () => { 
test('page title', async () => {
    const title = await page.title();
    expect(title).toBe("Big Order - A&I Clothing") 
    }, timeout);
});