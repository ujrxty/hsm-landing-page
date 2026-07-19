import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  
  await page.screenshot({ path: 'final-1-hero.png' });
  
  await page.evaluate(() => document.querySelector('#results')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'final-2-results.png' });
  
  await page.evaluate(() => document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'final-3-testimonials.png' });
  
  await browser.close();
  console.log('Screenshots saved');
})();
