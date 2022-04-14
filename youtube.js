const puppeteer = require('puppeteer');
const link='https://www.youtube.com/playlist?list=PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq';

(async function(){
     try {
        let  openPlaylist= await puppeteer.launch({
            headless: false,
            args:['--start-maximized'],
              defaultViewport: null 
        })

        let newTab= await openPlaylist.newPage()
        await newTab.goto(link);
        await newTab.waitForSelector('h1#title')
        let nameOfPLaylist= await newTab.evaluate(function(select){return document.querySelector(select).innerText}, 'h1#title')
        console.log(nameOfPLaylist)
        let AllData= await newTab.evaluate(getData, '#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer')
        console.log(AllData.noOfVideosArr, AllData.noOfViewsArr)    
    } catch (error) {
        console.log(error)
    }

})()

function getData(selector){
   let allElements= document.querySelectorAll(selector)
   let noOfVideosArr= allElements[0].innerText
   let noOfViewsArr= allElements[1].innerText

   return {
        noOfVideosArr,
        noOfViewsArr
   }
}