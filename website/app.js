/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = '&appid=519d637a730bd9233909f0115a0cf8c5&units=imperial';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    let newData =  document.getElementById('feelings').value;
    let zip='';
    if(document.getElementById('zip').value!=''){
        zip =  'zip=' + document.getElementById('zip').value + ',us';
    }else{
        zip = 'zip=10001,us'; //default newyork
    }

    console.log('url: ', baseURL + zip + apiKey);
    getData(baseURL, zip, apiKey)
    .then(function(data){
        postData('/addData', {temperature :data.main.temp, date: data.dt, user_response:newData} );
        updateUI()
    })
};

//POST data
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log("postData error", error);
    }
};

//GET data from API
const getData = async (url, zip, key)=>{
    const res = await fetch(url+zip+key);
    try {
        const data = await res.json();
        console.log('Client - data from get:' , data);
        return data;
    }catch(error) {
        console.log("getData error", error);
    }
};

//Update UI with new data
const updateUI = async () => {
    const request = await fetch('/getData');
    try{
      const allData = await request.json();
      console.log("UpdatUI: ", allData);
      document.getElementById('date').innerHTML = new Date(allData.date * 1000);
      document.getElementById('temp').innerHTML = Math.round(allData.temperature)+ ' degrees';
      document.getElementById('content').innerHTML = allData.user_response;
    }catch(error){
      console.log("UpdatUI error", error);
    }
  }