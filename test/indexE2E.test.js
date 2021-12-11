const timeout = 15000; 
beforeAll(async () => {
    await page.goto(URL, {waitUntil: 'domcontentloaded'});
  
}); 
describe('Test index page render', () => { 
test('page title', async () => {
       
    const title = await page.title("A&I Clothing"); 

    expect(title).toBe('A&I Clothing'); 
    }, timeout);
});