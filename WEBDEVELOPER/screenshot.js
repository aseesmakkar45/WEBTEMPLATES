const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  await page.goto('https://www.cortiz.dev/', { waitUntil: 'networkidle2' });
  
  // Wait a bit for any animations to settle
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  await page.screenshot({ path: 'cortiz_intro.png' });
  
  // Move mouse to center for hover reveal
  await page.mouse.move(960, 540);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await page.screenshot({ path: 'cortiz_intro_hover.png' });
  
  await browser.close();
})();
