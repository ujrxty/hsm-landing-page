import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  const errors = [];
  page.on('pageerror', err => errors.push('PAGE ERROR: ' + err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push('CONSOLE ERROR: ' + msg.text());
  });
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  // Check each section
  const sections = ['#results', '#testimonials', '#about'];
  for (const sel of sections) {
    const count = await page.locator(sel).count();
    const visible = count > 0 ? await page.locator(sel).isVisible() : false;
    console.log(`${sel}: count=${count}, visible=${visible}`);
  }
  
  // Get page HTML to see what's actually rendered
  const html = await page.content();
  console.log('\nPage has Results text:', html.includes('Check Out Our'));
  console.log('Page has Testimonials text:', html.includes('What Our'));
  console.log('Page has About text:', html.includes('Everything You Need'));
  
  if (errors.length > 0) {
    console.log('\nErrors:');
    errors.forEach(e => console.log(e));
  }
  
  await browser.close();
})();
