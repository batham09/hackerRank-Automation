const puppeteer= require("puppeteer");
console.log("before");
let cpage;
let  browserPages;

const openBrowser= puppeteer.launch({headless: false});
openBrowser.then(function (browser){
    // console.log("opend browser")
    // currently opend tabs
   const pagesArr =  browser.pages();
    return pagesArr;
}).then(function (browserPages){
    cpage =  browserPages[0];
    let gotoPromis= cpage.goto("https://www.google.com/");
    return gotoPromis;
}).then(function(){
    // console.log("went on google home ");
    let WaitForPageToOpen= cpage.waitForSelector("input[type='text']", {visible: true});
    return WaitForPageToOpen;
}).then(function(){
    // type any element on that page
    let TypeWhatWant= cpage.type("input[type='text']", "pepcoding");
    return TypeWhatWant;
}).then(function(){
    let keyWillBePresssed= cpage.keyboard.press("Enter");
    return keyWillBePresssed;
}).then(function(){
    let waitForopen= cpage.waitForSelector("h3.LC20lb.MBeuO.DKV0Md" , {visible: true});
    return waitForopen;
}).then(function(){
    let OnTheClick= cpage.click("h3.LC20lb.MBeuO.DKV0Md");
    return OnTheClick;
}).catch(function (err){
    console.log(err);
})
console.log("after");
