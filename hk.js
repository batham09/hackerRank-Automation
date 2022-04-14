const puppeteer= require('puppeteer');
let loginLink= 'https://www.hackerrank.com/auth/login';
let page;
let cpage;
let pass= 'PLAYbold09@';
let email= 'harshbatham8@gmail.com';
const codeobj= require('./code');

const openBrowser= puppeteer.launch({
    headless: false,
    args : ['--start-maximized'],
    defaultViewport: null
});

openBrowser.then(function(browser){

    let getBrowserPromise= browser.newPage();
    return getBrowserPromise;
//   let gotoPage= cpPage.goto();
//   return gotoPage
}).then(function(newTab){
    page = newTab;
    let hrpromise= newTab.goto(loginLink);
    return hrpromise;
}).then(function(){
    let typeEmail= page.type("input[id='input-1']", email, {delay : 50} );
    return typeEmail
}).then(function(){
    let typepass= page.type("input[id='input-2']", pass, {delay: 40});
    return typepass;
}).then(function(){
    let OnTheClick= page.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled', {delay : 60});
    return OnTheClick;
}).then(function(){
    let waitForopen= page.waitForSelector('.track-card a[data-attr2="algorithms"]' , {visible: true});
    return waitForopen;
})
.then(function(){
    let goOnAlgo= page.click('.track-card a[data-attr2="algorithms"]' );
    return goOnAlgo;
}).then(function(){
    let waitForopen= page.waitForSelector('input[value="warmup"]' , {visible: true});
    return waitForopen;
}).then(function(){
    let gotoWarmup= page.click('input[value="warmup"]');
    return gotoWarmup;
}).then(function(){
    let waitForsec= page.waitFor(3000);
    return waitForsec;
}).then(function(){
  let allChallenges= page.$$('.theme-m .new-challenge-list .challenge-submit-btn');
  return allChallenges;
}).then(function(questionsArr){
    console.log('no of questions', questionsArr.length);
   let questionWillBeReturned = quickSolver(page, questionsArr[0], codeobj.answers[0]);
    return questionWillBeReturned;
})
.catch(function(err){
    console.log(err);
});

function waitAndClick(selector, cpage){
    return new Promise(function(resolve, reject){
    let waitForModelPromise= cpage.waitForSelector(selector);
    waitForModelPromise.then(function(){
        let clickMode= cpage.click(selector);
        return clickMode;
    }).then(function(){
        resolve()
    }).catch(function(){
        reject()
     })
    })
}

function quickSolver(page, question, answer){
     return new Promise(function(resolve, reject){
         let questionWillBeClicked= question.click()
         questionWillBeClicked.then(function(){
             let EditorInFocus= waitAndClick('.monaco-editor.no-user-select.vs',page)
             return EditorInFocus;
         }).then(function(){
             return waitAndClick('.checkbox-input', page)
         }).then(function(){
             return page.waitForSelector('textarea.custominput',page)
         }).then(function(){
            return page.type('textarea.custominput',answer , {delay:10})
        }).then(function(){
            let ctrlPress= page.keyboard.down('Control')
            return ctrlPress;
        }).then(function(){
            let AisPress= page.keyboard.press('A', {delay:100});
            return AisPress;
        }).then(function(){
            let XisPress= page.keyboard.press('X', {delay:100});
            return XisPress;
        }).then(function(){
            let cntrl= page.keyboard.up('Control');
            return cntrl;
        }).then(function(){
            let editorInFocus= waitAndClick('.monaco-editor.no-user-select.vs',page)
            return editorInFocus;
        }).then(function(){
            let ctrlPress= page.keyboard.down('Control')
            return ctrlPress;
        }).then(function(){
            let copyAll= page.keyboard.press('A', {delay:100});
            return copyAll
        }).then(function(){
            let pasteAll= page.keyboard.press('V', {delay:100});
            return pasteAll;
        }).then(function(){
            let submit= waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled', page);
            return submit;
        })
     })
}
