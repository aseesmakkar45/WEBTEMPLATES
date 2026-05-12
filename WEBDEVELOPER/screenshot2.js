const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  await page.goto('https://www.cortiz.dev/', { waitUntil: 'networkidle2' });
  
  // Wait for the OK button to appear and click it
  try {
    await page.waitForXPath('//button[contains(text(), "OK, I UNDERSTAND")]', { timeout: 5000 });
    const [button] = await page.$x('//button[contains(text(), "OK, I UNDERSTAND")]');
    if (button) {
      await button.click();
    }
  } catch (e) {
    console.log("Button not found or click failed", e);
  }

  // Wait for the main intro to load (10 seconds)
  await new Promise(resolve => setTimeout(resolve, 10000));
  
  await page.screenshot({ path: 'cortiz_main.png' });
  
  // Try to hover over something in the center or a specific text
  await page.mouse.move(960, 540);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await page.screenshot({ path: 'cortiz_main_hover.png' });
  
  await browser.close();
})();
