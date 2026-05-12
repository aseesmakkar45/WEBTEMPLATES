const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  await page.goto('https://www.cortiz.dev/', { waitUntil: 'networkidle2' });
  
  // Wait for the OK button to appear and click it
  try {
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const okButton = buttons.find(b => b.textContent.includes('OK, I UNDERSTAND'));
      if (okButton) okButton.click();
    });
  } catch (e) {
    console.log("Button click failed", e);
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
