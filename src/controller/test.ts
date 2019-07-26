import puppeteer from 'puppeteer'
 async function ejecutar () {
        console.log('Ejecutando función')
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://es.wikipedia.org/wiki/Wikipedia:Portada');
        await page.screenshot({path: 'example.png'});
      
        await browser.close();
      }

export {ejecutar}