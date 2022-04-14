

function placeOrder(order){
   return new Promise(function(resolve , reject){
   if(order == 'coffee'){
       resolve('order placed')
   }else{
       reject('sorry, hum sirf coffee dete hai')
   }
})

}

function processOrder(yourOrder){
  return new Promise(function(resolve){

  console.log('order ban raha hai!');
  resolve(`order ho gaya for ${yourOrder}`)

  })

}


async function orderIs(){
   const orderRecived = await placeOrder('coffee')
   console.log(orderRecived);
   const process= await processOrder(orderRecived);
   console.log(process);
}

orderIs();