// on submit, retrieve correct data and present it in the cards on the page

// function to create the div for the information of that city that was submitted

let cityBig = $("#cityBig");
let cityBigContent = $(`<div class="p-3 border border-dark border-1px">
      <h2 id="cityTitle" class="row w-100 p-1"></h2>
      <img id="cityImage">
    <p id ="bigTemp"class=""></p>
    <p id ="bigWind"class=""></p>
    <p id='bigHum'class=""></p>
  </div>
  <div class="pt-3">
    <h3 class="w-100">5 Day Forecast:</h3>
    <div id="dayCards" class="row justify-content-around">
      <div id='dayCard' class="col-2 border border-dark border-1px bg-darkblue">
        <h4></h4>
        <img></img>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div id='dayCard' class="col-2 border border-dark border-1px">
        <h4></h4>
        <img></img>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div id='dayCard' class="col-2 border border-dark border-1px">
        <h4>Date</h4>
        <img></img>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div id='dayCard' class="col-2 border border-dark border-1px">
        <h4></h4>
        <img></img>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div id='dayCard' class="col-2 border border-dark border-1px">
        <h4></h4>
        <img></img>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </div>
  </div>`);
// create a funciton to create and present empty div cards for the weather info to get put in later

function createCityBigCard() {
  let currentDay = dayjs();
  const search = $("#searchBtn");

  search.on("click", function () {
    const myKey = "bcb6773f3b002fedb6080301885d15d3";
    let lat;
    let lon;
    let cityName = $("#searchBar");
    let inputValue = cityName.val();
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&lat=${lat}&lon=${lon}&limit=1&appid=${myKey}`;

  
    cityBig.append(cityBigContent);
    
    let updateCityTitle = $("#cityTitle");
    let historyButton = $(`<button id ="history" class='col-12'>${inputValue}</button>`);

    function API() {
      $.ajax({
        url: apiUrl,
        success: function (data) {

          for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const latitude = item.lat;
            const longitude = item.lon;

            if (inputValue === item.name) {
              $("#historyButton").append(historyButton);
            }

            updateCityTitle.text(
              item.name + " " + currentDay.format("M/D/YYYY")
            );

            const secondUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${myKey}`;
            $.ajax({
              url: secondUrl,
              success: function (data2) {
                // big card
                let temp = data2.list[0].main.temp;
                let wind = data2.list[0].wind.speed;
                let hum = data2.list[0].main.humidity;

                data2.list.shift();
                for (let j = 0; j < 5; j++) {
                  let icon = data2.list[j * 8].weather[0].icon;
                  let temp1 = data2.list[j * 8].main.temp;
                  let wind1 = data2.list[j * 8].wind.speed;
                  let hum1 = data2.list[j * 8].main.humidity;
                  let iconURL =
                    "http://openweathermap.org/img/w/" + icon + ".png";

                  $("#cityImage").attr("src", iconURL);

                  $("#dayCards")
                    .children()
                    .eq(j)
                    .children()
                    .eq(0)
                    .text(currentDay.add(j + 1, "day").format("M/D/YYYY"));
                  $("#dayCards")
                    .children()
                    .eq(j)
                    .children()
                    .eq(1)
                    .attr("src", iconURL);
                  $("#dayCards")
                    .children()
                    .eq(j)
                    .children()
                    .eq(2)
                    .text("Temp: " + temp1 + "°F");
                  $("#dayCards")
                    .children()
                    .eq(j)
                    .children()
                    .eq(3)
                    .text("Wind: " + wind1 + "MPH");
                  $("#dayCards")
                    .children()
                    .eq(j)
                    .children()
                    .eq(4)
                    .text("Humidity: " + hum1 + " %");
                }
                $("#bigTemp").text(`Temp: ${temp} °F`);
                $("#bigWind").text("Wind: " + wind + " MPH");
                $("#bigHum").text("Humidity: " + hum + " %");
              },
              error: function () {
                alert("Search Invalid!");
              },
            });
          }
        },
        error: function () {
          alert("Search Invalid!");
        },
      });
    }
    API();
    cityName.val("");
    historyButton.on("click", function () {
      historyButton.val(inputValue);
      API();
    });
  });
}

createCityBigCard();
