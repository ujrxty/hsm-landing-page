import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  
  // Take hero screenshot
  await page.screenshot({ path: 'ss-1-hero.png' });
  
  // Scroll to results
  await page.evaluate(() => document.querySelector('#results').scrollIntoView());
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'ss-2-results.png' });
  
  // Scroll to testimonials  
  await page.evaluate(() => document.querySelector('#testimonials').scrollIntoView());
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'ss-3-testimonials.png' });
  
  // Scroll to about
  await page.evaluate(() => document.querySelector('#about').scrollIntoView());
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'ss-4-about.png' });
  
  console.log('Screenshots saved: ss-1-hero.png, ss-2-results.png, ss-3-testimonials.png, ss-4-about.png');
  
  await browser.close();
})();
