var curOffset = 0;
var curQuery = '';


function search(query, offset) {
  $.ajax({
    type: 'GET',
    url: 'https://api.spotify.com/v1/search?q=' + query + '&type=track&limit=10&offset=' + offset,
    headers: {
      Accept: 'application/json'
    }
  }).done(function(data) {
    display(data);
  }).fail(function(jqxhr, textstatus, error) {
    console.log(error);
  });
}

function searchSpecific() {
  query = '';

  if ($('#artist').val() !== '') {
    query += 'artist:' + $('#artist').val() + '%20';
  }
  if ($('#album').val() !== '') {
    query += 'album:' + $('#album').val() + '%20';
  }
  if ($('#track').val() !== '') {
    query += 'track:' + $('#track').val() + '%20';
  }
  if ($('#genre').val() !== '') {
    query += 'genre:' + $('#genre').val() + '%20';
  }
  if ($('#year').val() !== '') {
    query += 'year:' + $('#year').val() + '%20';
  }
  if (query !== '') {
    $('#searchrequired').css('display','none');
    query = query.substring(0, query.length - 3);
    curQuery = query;
    curOffset = 0;
    search(curQuery, curOffset);
  }
  else {
    $('#searchrequired').css('display','block');
  }
}

function searchGeneral() {
  var query = $('#searchbar').val();
  if (query !== '') {
    $('#searchrequired').css('display','none');
    curQuery = query;
    curOffset = 0;
    search(curQuery, curOffset);
  }
  else {
    $('#searchrequired').css('display','block');
  }
}

function displayNext() {
  curOffset = curOffset + 10;
  search(curQuery, curOffset);
}

function displayPrev() {
  curOffset = curOffset - 10;
  search(curQuery, curOffset);
}

function createMusicPlayer(url,img,artist,album,title,id) {
  var code =  '<li class="musicplayer">'+
              ' <div class="albumcover">'+
              '   <img src="'+img+'">'+
              ' </div>'+
              ' <div class="info">'+
              '   <span class="title">'+title+'</span><br>'+
              '   <b>'+artist+'</b><br>'+
              '   <i>'+album+'</i><br>'+
              '   <button class="play">'+
              '     <span class="glyphicon glyphicon-play" aria-hidden="true"></span>'+
              '     Preview Track'+
              '     <audio class="audioDemo" controls preload="none"> '+
              '       <source src="'+url+'" type="audio/mpeg">'+
              '     </audio>'+
              '   </button>'+
              '   <a class="openinspotify" href="https://play.spotify.com/track/'+id+'" target="_blank">'+
              '     <span class="glyphicon glyphicon-link" aria-hidden="true"></span>'+
              '     Open in Spotify'+
              '   </a>'+
              ' </div>'+
              '</li>'
  return code;
}

function display(data) {
  $('#resultsheader').css('display', 'block')

  var tracks = data.tracks.items;
  var total = data.tracks.total;

  $('#resultsheader').empty();

  if (tracks !== undefined && total > 0) {
    var plural = 'tracks';
    if (total == 1) {
      plural = 'track';
    }
    $('#next').css('display', 'none');
    $('#prev').css('display', 'none');
    $('#counter').css('visibility','hidden');
    $('#loading').css('display', 'block');
    $('#resultsheader').append(total + ' ' + plural +' found for <i>' + curQuery.replace('%20',', ') + '</i>');
    $('#results').empty();
    $('html,body').animate({
      scrollTop: $('#top').offset().top,
    }, 0, setTimeout(function() {

        $('#loading').css('display', 'none');
        for (var i = 0; i < tracks.length; i++) {
          var url = tracks[i].preview_url,
              img = tracks[i].album.images[0].url,
              album = tracks[i].album.name,
              artist = tracks[i].artists[0].name,
              title = tracks[i].name,
              id = tracks[i].id;
          
          $('#results').append(createMusicPlayer(url,img,artist,album,title,id));
        }

        if (total > 10 && total - curOffset > 10) {
          $('#next').css('display', 'block');
        } else {
          $('#next').css('display', 'none');
        }

        if (curOffset >= 10) {
          $('#prev').css('display', 'block');
        } else {
          $('#prev').css('display', 'none');
        }

        $('#counter').css('visibility','visible');
        $('#counter').empty();
        $('#counter').append('Results '+(curOffset+1)+'-'+Math.min(curOffset+10,total)+' of '+total);
        listenForPlays();
      }, 300));
    // });?
  }
  else {
    $('#results').empty();
    $('#resultsheader').append('No tracks found for <i>' + curQuery.replace('%20',', ') + '</i>');
    $('#counter').empty();
    $('#counter').css('visibility','hidden');
    $('#next').css('display', 'none');
    $('#prev').css('display', 'none');
  }
}

function listenForPlays() {
  $('.play').click(function() {
    clicked = $(this).children('audio')[0];
    if (clicked.paused) {
      clicked.play();
      button = $(this).children('span');
      button.removeClass('glyphicon-play');
      button.addClass('glyphicon-pause');
    }
    else {
      clicked.pause();
      button = $(this).children('span');
      button.removeClass('glyphicon-pause');
      button.addClass('glyphicon-play');
    }
  })
}

$(document).ready(function() {
  $('#advancedsearch').css('display', 'none');
  $('#resultsheader').css('display', 'none');
  $('#loading').css('display', 'none');
  $('#next').css('display', 'none');
  $('#prev').css('display', 'none');
  $('#searchrequired').css('display','none');
  $('#counter').css('visibility', 'hidden');

   $('input').keydown(function (e) {
    if (e.keyCode == 13) {
      if ($('#advancedsearch').css('display') === 'none') {
        searchGeneral();
      } else {
        searchSpecific();
      }
    }
  });

  $('#searchbutton').click(function() {
    if ($('#advancedsearch').css('display') === 'none') {
      searchGeneral();
    } else {
      searchSpecific();
    }
  });

  $('.searchfield').change(function(e) {
    var filled = e.currentTarget.id.replace('field', '');

    if ($('#' + filled + 'field').val() !== '') {
      $('#' + filled + 'label').css('color', '#2ebd59');
    }
    if ($('#' + filled).val() == '') {
      $('#' + filled + 'label').css('color', '#555');
    }
  });

  $('#next').click(function() {
    displayNext();
  });

  $('#prev').click(function() {
    displayPrev();
  });

  $('#advancedsearchlink').click(function() {
    $('#advancedsearch').css('display', 'inline');
    $('#generalsearch').css('display', 'none');
    $('#searchbar').val('');
    $('#searchrequired').css('display','none');
  });

  $('#generalsearchlink').click(function() {
    $('#advancedsearch').css('display', 'none');
    $('#generalsearch').css('display', 'inline');
    $('.searchfield').val('');
    $('#searchrequired').css('display','none');
    $('.input-group-addon').css('color','#555');
  });
})