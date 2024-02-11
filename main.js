/* 
    Start carousel
*/

let startBtn = document.getElementById('start');
let prevBtn = document.getElementById('prev');
let prevTowBtn = document.getElementById('prev-tow');
let listItem = document.querySelector('.carousel .list');

let firstIndex = document.getElementById('first');


startBtn.addEventListener("click", function(){
    slideShow('next');
});

prevBtn.onclick = function() {
    slideShow('prev');
};

prevTowBtn.onclick = function() {
    slideShow('prev');
};

// prevBtn.addEventListener("click", function() {
//     slideShow('prev');
// });



function slideShow(type) {
    let items = document.querySelectorAll('.carousel .list .item');


    if(type === 'next') {
        //listItem.appendChild(items[0]);

        items[0].classList.add('next');

        //console.log('iam next');
    }
    else {
        // let lastItem = items.length - 1;
        // listItem.prepend(items[lastItem]);
        //console.log('iam prev');

            items.forEach(myFun);

            function myFun(e) {
                e.classList.replace('next', 'prev');
            }

    }

    items.forEach(myFun);

            function myFun(e) {
                
                e.classList.remove('prev');
                
            }

};


/* 
    End carousel
*/





/* 
    Start Api
*/

let tableTr = document.getElementById('table-tr');
let tableTrTow = document.getElementById('table-tr-tow');
let inputText = document.getElementById('input');
let btnSearch = document.getElementById('search');
let cityName = document.getElementById('city');
let allTable = document.getElementById('table-data');

let nextPrayer = document.getElementById('next-prayer');
let nextHours = document.getElementById('hours');
let nextMin = document.getElementById('minutes');

let vectorbehaindTable = document.getElementById('vector-list');
let h1TodaysPrayer = document.getElementById('Today-prayer');



// Today Date
let todayNumber = new Date().getDate();
//console.log(todayNumber);

let monthNumber = new Date().getMonth();
//console.log(monthNumber + 1);

let yearNumber = new Date().getFullYear();
//console.log(yearNumber);

let todayData = `${todayNumber}-${monthNumber + 1}-${yearNumber}`;
//console.log(todayData);



// Table display
if(inputText.value === '') {
    //console.log('empty');

    allTable.style.display = 'none';
}




// Start Search
btnSearch.addEventListener("click", function(){
    let keySrarch = inputText.value.toLowerCase();
    //console.log(inputText.value.toLowerCase());

    


    const egyptCityName = ['cairo', 'giza', 'Alexandria', 'Dakahlia', 'Red Sea', 'Beheira', 'Fayoum', 'Gharbiya', 'Ismailia', 'Menofia', 'Minya', 'Qaliubiya', 'New Valley', 'Suez', 'Aswan', 'Assiut', 'Beni Suef', 'Port Said', 'Damietta', 'Sharkia', 'South Sinai', 'Kafr Al sheikh', 'Matrouh', 'Luxor', 'Qena', 'North Sinai', 'Sohag'];

    let cityNameCheck = egyptCityName.find((e)=>{   // find = get first element of your result - filter get all element of your result
        return e.toLowerCase().startsWith(keySrarch);
    });

    //console.log(cityNameCheck);


    cityName.innerHTML = cityNameCheck;


    if (cityNameCheck === undefined) {
        //console.log('No Sir - No Data');

        cityName.style.fontSize = '30px';
        cityName.innerHTML = 'Please Enter City Name';

        allTable.style.display = 'none';

    } else {
        allTable.style.display = 'block';
    }





    

    if(keySrarch === '') {
        cityName.style.fontSize = '30px';
        cityName.innerHTML = 'Please Enter City Name';

        allTable.style.display = 'none';

        nextPrayer.innerHTML = '...';
        nextHours.innerHTML = '...';
        nextMin.innerHTML = '...';

        vectorbehaindTable.style.opacity = '1';

    } else {
        cityName.style.fontSize = '30px';
        //allTable.style.display = 'block';
        //console.log('No');
        vectorbehaindTable.style.opacity = '0.5';
        // h1TodaysPrayer.style.marginTop = '40px';
        // prevBtn.style.left = '100px';
    }


    if(cityNameCheck === undefined && keySrarch != '') {
        //console.log('Tow');
        cityName.style.fontSize = '30px';
    }


    const url = `https://api.aladhan.com/v1/timingsByCity/${todayData}?city=Egyptian&country=${keySrarch}&method=8`;

    const getApi = async function() {
    
        const myApi = await fetch(url);
        const mydata = await myApi.json();
    
        const allData = [mydata.data.timings];
        //const getData = allData[0];
    
        //console.log(allData);
    
        
        allData.map((e)=>{
            //console.log(e.Fajr);
    
            tableTr.innerHTML = `
            <td>${e.Fajr}</td>
            <td>${e.Sunrise}</td>
            <td>${e.Dhuhr}</td>
            <td>${e.Asr}</td>
            <td>${e.Maghrib}</td>
            <td>${e.Isha}</td>
            `;
        });

        allData.map((e)=>{
            tableTrTow.innerHTML = `
            <td>${e.Firstthird}</td>
            <td>${e.Midnight}</td>
            <td>${e.Lastthird}</td>
            <td>${e.Imsak}</td>
            <td>${e.Sunset}</td>
            <td>...</td>
            `;
        });





        // Test (To Calculate Next Time Of prayer)
        const obj = mydata.data.timings;
        const objVals = Object.values(obj); // to get all value only in object without key
        //console.log(objVals);
        const myKeys = Object.keys(obj);
        //console.log(myKeys);
        
        let todayDate = mydata.data.date.readable;
        //console.log(todayDate);



        // Hours
        const numHours = objVals.map((e)=>{
            return [parseInt(e)]; // to convert all value from string to number and return array
            
        });
        //console.log(numHours);

        let timeHourrs = new Date().getHours(); // curent time now in hours
        //console.log(timeHourrs);

        const getTarget = numHours.find((e)=>{
            return e > timeHourrs; // to find time in all value who > curent time 
        });
        //console.log('Time Is: ' + getTarget);
        
        const indexOfValus = numHours.indexOf(getTarget); // to get index of value in object
        //console.log(indexOfValus); // 3

        const valueOfKey = myKeys[indexOfValus];
        //console.log(valueOfKey); // Asr

        let nextTime = objVals[indexOfValus]; // to get only index in object that ok my time from find 
        //console.log(nextTime);





        // Get Target Hours And Min
        let timeSoon = new Date(`${todayDate} ${nextTime}`).getTime();
        let nowDate = new Date().getTime(); // curent Time


        // To calculate the time difference of two dates in (milliseconds)
        let Difference_In_Time = timeSoon - nowDate;
        //console.log(Difference_In_Time );


        /* 
            To Calculate The Houre
        */
        let Difference_In_Hours = Difference_In_Time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60);
        let curentHours = Math.floor(Difference_In_Hours)
        //console.log('Houre :' + curentHours);

        /* 
            To Calculate The Mintets
        */
        let Difference_In_Mintets = Difference_In_Time % (1000 * 60 * 60) / (1000 * 60);
        let curentMin = Number.parseFloat(Difference_In_Mintets).toFixed(2);
       // console.log('Mintets: ' + curentMin);



        if(keySrarch === '') {
    
            nextPrayer.innerHTML = '...';
            nextHours.innerHTML = '...';
            nextMin.innerHTML = '...';
    
        } else {
            nextPrayer.innerHTML = valueOfKey;
            nextHours.innerHTML = curentHours;
            nextMin.innerHTML = curentMin;
        };

        
        if (cityNameCheck === undefined) {
            nextPrayer.innerHTML = '...';
            nextHours.innerHTML = '...';
            nextMin.innerHTML = '...';
        }


        // nextPrayer not working after 10:00 pm to 00:00 am = get undefined
        if(nextPrayer.innerHTML === undefined) {
            nextPrayer.style.display = 'none';
            h1TodaysPrayer.innerHTML = 'Did you pray today ?';
            nextHours.innerHTML = '...';
            nextMin.innerHTML = '...';
        }
        
    };
    getApi();
});





/* 
    Date Ramadan 2024
*/ 
let ramadanDate = new Date('Mar 10, 2024 00:00:00').getTime();
let localTime = new Date().getTime();

/* 
    To Calculate The Days
*/

// To calculate the time difference of two dates in (milliseconds)
let ramadanInMilliSecound = ramadanDate - localTime;
//console.log(ramadanInMilliSecound);

// To calculate the number of days between two (dates) 
let ramadanInDays = ramadanInMilliSecound / (1000 * 60 * 60 * 24);
let ramadanInDays_Math = Math.floor(ramadanInDays);
//console.log(ramadanInDays_Math);

/* 
    To Calculate The Houre
*/
let ramadanInHours = ramadanInMilliSecound % (1000 * 60 * 60 * 24) / (1000 * 60 * 60);
let ramadanInHours_Math = Math.floor(ramadanInHours);
//console.log(ramadanInHours_Math);

/* 
    To Calculate The Mintets
*/
let ramadanInMini = ramadanInMilliSecound % (1000 * 60 * 60) / (1000 * 60);
let ramadanInMini_Math = Number.parseFloat(ramadanInMini).toFixed(2);
//console.log(ramadanInMini_Math);




let dayOfRamadan = document.getElementById('ramadan-day');
let hoursOfRamadan = document.getElementById('ramadan-hours');
let miniOfRamadan = document.getElementById('ramadan-mini');


dayOfRamadan.innerHTML = ramadanInDays_Math;
hoursOfRamadan.innerHTML = ramadanInHours_Math;
miniOfRamadan.innerHTML = ramadanInMini_Math;









// let targetTime = '24:30';
// console.log(targetTime);

// targetTimeHoures = targetTime.slice(0, 2);
// console.log(targetTimeHoures);

// let targetTimeMin = targetTime.slice(3);
// console.log(targetTimeMin);



// let timeHourrs = new Date().getHours();
// console.log(timeHourrs);

// let timeMin = new Date().getMinutes();
// console.log(timeMin);

// let timeNow = `${timeHourrs}:${timeMin}`;
// console.log(timeNow);



// let curentTime = new Date().getHours();
// console.log(curentTime);
// let curentMin = new Date().getMinutes();
// console.log(curentMin);

// let target = '15';
// let targetMin = '55';

// console.log(target - curentTime);
// console.log(targetMin - curentMin);


