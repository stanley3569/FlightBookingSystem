$(function() {  
  $('#btnSearch').click(function() {
    
    //validate form
    if($('#formSearchFlight').valid()){
      
      $.ajax({
        url: 'http://localhost/TenTwenty/UI_Assignment_Flight_Data.json',
        dataType: 'json',
        success: function(data) {
          formatData(data);
        },
        statusCode: {
          404: function() {
            alert('There was a problem with the server.  Try again soon!');
          }
        }
      });
    }else{
      resetData();
    }
  });
});



function formatData(arr){
  //Set Origin to destination title
  $('#spanSourceDestination').html('<span>'+ $('#origin').val() +'</span><span>></span><span>'+ $('#destination').val() +'</span>');

  //Set travel date
  var depatureDate = new Date($('#depatureDate').val());
  $('#spanDepatureDate').html('Depart: '+ depatureDate.toShortFormat());

  var arrFlight = [];
  var originCityCode = getCityCode($('#origin').val());
  var destinationCityCode = getCityCode($('#destination').val());
  var departureDate = new Date($('#depatureDate').val()).setHours(0,0,0,0);
  var passengers = $('#passengers').val();

  if(passengers != ""){
    arrFlight = jQuery.grep(arr, function (flight, i) {
      return flight.origin ==  originCityCode
          && flight.destination == destinationCityCode
          && new Date(flight.departure).setHours(0,0,0,0) == departureDate
          && flight.availableSeats >= passengers;
    });
  }else{
    arrFlight = jQuery.grep(arr, function (flight, i) {
      return flight.origin ==  originCityCode
          && flight.destination == destinationCityCode
          && new Date(flight.departure).setHours(0,0,0,0) == departureDate;
    });
  }

  var result= '';  
  for (var i = 0; i < arrFlight.length; i++) {
      var departureDate = new Date(arrFlight[i].departure);
      var arriveDate = new Date(arrFlight[i].arrival);

      result += '<li class="search-result-card">'+                  
                '<div class="price">Rs. ' + arrFlight[i].price + '</div>'+ 
                  '<div class="search-main-content">'+ 
                    '<ul class="dept-flight-details">'+ 
                      '<li>'+ arrFlight[i].airlineCode +'</li>'+ 
                      '<li>'+ arrFlight[i].origin +' > '+ arrFlight[i].destination +'</li>'+ 
                      '<li>Depart: '+ departureDate.getHours() +'.'+ departureDate.getMinutes() +'</li>'+ 
                      '<li>Arrive: '+ arriveDate.getHours() +'.'+ arriveDate.getMinutes() +'</li>'+ 
                    '</ul>'+ 
                    '<div class="actions">'+ 
                      '<button class="book-button">book this flight</button>'+ 
                    '</div>'+ 
                  '</div>'+ 
                '</li>';  
  }
  
  $('#search-results').html(result);
}

Date.prototype.toShortFormat = function() {

    var month_names =["Jan","Feb","Mar",
                      "Apr","May","Jun",
                      "Jul","Aug","Sep",
                      "Oct","Nov","Dec"];
    
    var day = this.getDate();
    var month_index = this.getMonth();
    var year = this.getFullYear();
    
    return "" + day + " " + month_names[month_index] + " " + year;
}

function getCityCode(cityName){
  var cityCode;
  switch(cityName){
    case 'Pune': cityCode = 'PNQ'; break;
    case 'Goa': cityCode = 'GOA'; break;
    case 'Delhi': cityCode = 'DEL'; break;
    default: break;
  }
  return cityCode;
}

function resetData(){
  $('#spanSourceDestination').html('');
  $('#spanDepatureDate').html('');
  $('#spanReturnDate').html('');
  $('#search-results').html('');
}

function switchtab(type){
  if(type == 1){
    $('#divReturnDate').hide();
  }else if(type == 2){
    $('#divReturnDate').show();
  }
}


$(document).ready(function(){
        $('.btnOnewayReturn').click(function () {
            $('.active').removeClass("active");
            $(this).addClass("active");
        })
    });
