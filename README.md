Jean Mariano
UNI: jam2332
User Interfaces Fall 2015
Homework 1

To run, please visit: http://jeanmariano.github.io/spotifysearchandplay/

RUNNING THE APP
-------------------------------------------------------------------------------
My Spotify search web app is built using HTML, CSS3, and Javascript. Package
dependencies are jQuery and Twitter Bootstrap, which are loaded via CDN, so 
there's no need for a local install of the packages.

To run, simply load index.html in your browser. The layout should be optimized
for most browsers, but it is best viewed in Google Chrome


USAGE
-------------------------------------------------------------------------------
This section should be redundant as the UI should be straightforward. Simply
enter a term (artist, track, album, genre, or year) and the interface calls
the Spotify API with that search query. This is a general search option.

For the more advanced search, the user can specify any one or more of the
following: artist name, album name, track name, genre, and/or year. 

The user can press enter or click the search button to search the Spotify
library


DESIGN PROCESS
-------------------------------------------------------------------------------
I designed my UI layout based on a search engine style such as the one found on
Google or Bing, which I found is standardized as one search field and a search
button. I chose the Spotify color scheme from the spotify website, which uses
white, black, and green. The page uses a minimum number of these colors as to
satisfy the minimalist aesthetic heuristic. I based my layout design from the
Spotify website, which uses a lot of block color rounded corner buttons, and
large text in the font Montserrat (from Google Fonts), and the Spotify logo
which I took directly from the official site. I used Twitter Bootstrap to make
the site layout responsive to user window scaling, and jQuery for the user
interactions. The rest of the style is manually coded css.

The UI has two types of search, a general search and an advanced search.The
user has to specify a query for the search to happen, otherwise the app
notifies the user to enter a search term. The general search simply calls to
Spotify API search() method with the query as what the user inputs in the
search bar. Regarding the advanced search, I recall Professor Feiner mentioning 
that Google has discontinued its Advanced Search setting due to its low usage.
I decided to implement it in this case in case the user wants to specify any of
the fields on purpose; for example, 'Girls' is a common word, but it is also 
the name of a band. Most of the time, however, users would just search a
keyword without needing to specify the tags. Therefore, I implemented the
general search as the default option, that is, it is the first one that loads.

When the search finishes, the request returns with a list of the tracks which
my app displays under the search area. The list is formatted such that each
track is displayed the song title, artist name, album name, and album cover.
Each result is playable via a button "Play Preview", which plays the preview
url attribute as specified in each Spotify track object. There is also a button
"Open in Spotify", which links to the Spotify webpage if the user wants to hear
the full song. The app retrieves 10 songs at a time, and the results are divided
with simple pagination where the user can click "Next" to retrieve the next 10
tracks, "Prev" to retrieve the previous 10, and text specifying what point in
the results the user is in ("Results N of Total"). When the requests returns
with no results, the app displays a message saying "No tracks found for
[SEARCH_QUERY]". 

