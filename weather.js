$(document).ready(function(){
    event.preventDefault();
    $('#submitWeather').click(function(){
        var city = $('#city').val();
        if (city != ''){
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" +
                "&appid=1abebcf0761d655c2ca70199c1b29583",
                type:'GET',
                dataType:'jsonp',
                success: function(data){
                console.log(data);
                
                
            //create button from searched city and save to local storage//
                if (city !== ""){
                    localStorage.setItem('city', JSON.stringify(city));
                    var list = $("<button>").text(city);
                    list.addClass("favorites");
                    $(".list-group").append(list)
                    
                }

                //show weather when a city list is clicked
                $('.favorites').on("click", function(event){
                    event.preventDefault();
                    city = $(this).html();
                    console.log(city);
                    show(data);
                })
               

            // Click delete to clear local storage
                $('#clear').click(function(){
                    localStorage.clear();
                    showHistory();
                })
             


                    var widget = show(data);
                
                    $("#show").html(widget);

                    $('#city').val("");

                
                }
            });
        } else {
            $("error").html("Please enter the city name!");
        }
    });
});
    // show the weather data //
        function show(data){
            return   "<h2> " + data.name +", " + data.sys.country +"</h2><br>" +
                     "<h2> <img src='http://openweathermap.org/img/wn/" + data.weather[0].icon +"@2x.png'> </h2>" + 
                     "<h4>Weather : "+ data.weather[0].main + "</h4>" +
                     "<h4>Description : "+ data.weather[0].description + "</h4>" +
                     "<h4>Current Temperature : "+ data.main.temp + " &deg;F</h4>" +
                     "<h4>Highest Temperature : "+ data.main.temp_max + " &deg;F</h4>" +
                     "<h4>Lowest Temperature : "+ data.main.temp_min + " &deg;F</h4>" +
                     "<h4>Humidity : "+ data.main.humidity + " %</h4>" +
                     "<h4>Wind Speed : "+ data.wind.speed + " mph</h4>";

        }
    
        
    function showHistory(){
        var fromLocalStorage = [];
        fromLocalStorage = JSON.parse(localStorage.getItem("city"))
        $('.favorites').empty();
        if (!fromLocalStorage) {
            fromLocalStorage = ["Bangkok"];
            show("Bangkok");
        } else if (fromLocalStorage != null){
            fromLocalStorage = JSON.parse(localStorage.getItem('city'));
            city = fromLocalStorage[fromLocalStorage.lenght -1];
            return(city);
        }
    }
        

        //  add moment.js //
        $(document).ready(function(){
            var dayOfWeek = moment().format("dddd");
            var currentDay = moment().format("MMMM Do YYYY");
            var currentInfo = dayOfWeek + ", " + currentDay;
            $("#date").text(currentInfo);
            console.log(currentInfo);

        });