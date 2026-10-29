const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {}); const p = await b.newPage({viewport:{width:390,height:844}});
  const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  const U='file://' + require('path').join(__dirname, '..', '..', 'index.html');
  async function faire(hash){
    await p.goto(U+hash); await p.waitForTimeout(100);
    let n=0;
    while (await p.$('#valider')) {
      await p.click('.choice'); await p.click('#valider'); n++;
      const w = await p.evaluate(()=>document.documentElement.scrollWidth); if (w>390) console.log('  OVERFLOW',w);
      await p.click('#suivant'); await p.waitForTimeout(20);
    }
    console.log(hash, n, 'questions ->', (await p.textContent('h1')));
  }
  for (const m of ['m12','m13','m14','m15','m16']) await faire('#/quiz/'+m);
  await faire('#/quiz/revision/m12,m14/30');
  await p.goto(U+'#/'); const t = await p.textContent('body'); console.log((t.match(/\d+\/100 vues/g)||[]).slice(-3));
  console.log('errors',errs); await b.close();
})();
