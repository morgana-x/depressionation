mangaListFlexContainer = document.getElementById("mangaReccomendationFlexContainer")
mangaGenreFlexContainer = document.getElementById("mangaGenrePickerFlexContainer")
animeGenreFlexContainer = document.getElementById("animeGenrePickerFlexContainer")
animeListCurrent = {}
mangaListCurrent = {}
mangaGenres = {}
animeGenres = {}
selectedMangaGenres = {}
selectedAnimeGenres = {}

showManga = true;
showAnime = true;

searchBar = document.getElementById("searchbar");
lastsearch = ""

currentPageManga = 1;
searchBar.onchange = function(){
	if (searchBar.value == lastsearch)
		return;
	if ( (searchBar.value != "") && searchBar.value.length < 3)
		return;
	lastsearch = searchBar.value
	
	console.log(lastsearch)
	if (showManga)
		getManga()
	if (showAnime)
		getAnime()
}
function toggleAnime(e)
{
	showAnime = !showAnime
	e.style.backgroundColor = showAnime ? "pink" : "gray";
	//animeGenreFlexContainer.style.display = showAnime ? "block" : "none"
	//document.getElementById("genereAnimeTitle").style.display = showAnime ? "block" : "none"
	updateReccomendations()
}

function toggleManga(e)
{
	showManga = !showManga
	e.style.backgroundColor = showManga ? "pink" : "gray";
	//mangaGenreFlexContainer.style.display = showManga ? "block" : "none"
	//document.getElementById("genereMangaTitle").style.display = showManga ? "block" : "none"
	updateReccomendations()
}

function getInfoMangaFromItem(e)
{
	console.log(e.children[0].getAttribute("href"))
	console.log("click " + e.children[0].textContent)
}
function updateReccomendationsAnime()
{
	if (!showAnime)
		return;
	for (i=0; i<animeListCurrent.length; i++)
	{
		title = animeListCurrent[i].title
		//console.log(title)
		reflink = animeListCurrent[i].url
		thumbnail = animeListCurrent[i].images["jpg"].image_url //"assets/icon.png" 
		mangaReccomendationFlexContainer.innerHTML += "<div class=\"manga-item\" onclick=\"getInfoMangaFromItem(this);\"><h2 class = \"manga-title\" href=\"" + reflink + "\">" + title + "</h2><image src=\"" + thumbnail + "\" class = \"manga-thumbnail\"></image></div>"
	}
}
function updateReccomendations()
{
	//thing = createElement()
	//mangaListFlexContainer.appendChild(
	if (mangaReccomendationFlexContainer.innerHTML != null)
		mangaReccomendationFlexContainer.innerHTML = "";
	updateReccomendationsAnime();
	if (!showManga)
		return;
	for (i=0; i<mangaListCurrent.length; i++)
	{
		title = mangaListCurrent[i].title
		//console.log(title)
		reflink = mangaListCurrent[i].url
		thumbnail = mangaListCurrent[i].images["jpg"].image_url //"assets/icon.png" 
		mangaReccomendationFlexContainer.innerHTML += "<div class=\"manga-item\" onclick=\"getInfoMangaFromItem(this);\"><h2 class = \"manga-title\" href=\"" + reflink + "\">" + title + "</h2><image src=\"" + thumbnail + "\" class = \"manga-thumbnail\"></image></div>"
	}
	/*for (x=0; x <mangaListFlexContainer.children.length; x++)
	{
		mangaListFlexContainer.children[x].onclick = getInfoMangaFromItem;
	}*/
}

function selectTagFromItem(e)
{
	id = e.getAttribute("href")
	if(selectedMangaGenres[id])
		selectedMangaGenres[id] = false;
	else
		selectedMangaGenres[id] = true;
	e.style.backgroundColor = selectedMangaGenres[id] ? "pink" : "gray";
	//console.log(id)
	if (showManga)
		getManga();
	if (showAnime)
		getAnime();
}
function selectTagFromItemAnime(e)
{
	id = e.getAttribute("href")
	if(selectedAnimeGenres[id])
		selectedAnimeGenres[id] = false;
	else
		selectedAnimeGenres[id] = true;
	e.style.backgroundColor = selectedAnimeGenres[id] ? "pink" : "gray";
	//console.log(id)
	getAnime();
}
function updateGenresManga()
{
	if (mangaGenreFlexContainer.innerHTML != null)
		mangaGenreFlexContainer.innerHTML = "";
	for (i=0; i<mangaGenres.length; i++)
	{
		name = mangaGenres[i].name;
		id = mangaGenres[i].mal_id;
		//console.log(name)
		//console.log(id)
		mangaGenreFlexContainer.innerHTML += "<div class=\"genre-tag\" href=\"" + id + "\" onclick=\"selectTagFromItem(this)\">" + "<h4 class=\"genre-title\">" + name + "</h4>" + "</input>"
	}
}
function updateGenresAnime()
{
	if (animeGenreFlexContainer.innerHTML != null)
		animeGenreFlexContainer.innerHTML = "";
	for (i=0; i<animeGenres.length; i++)
	{
		name = animeGenres[i].name;
		id = animeGenres[i].mal_id;
		//console.log(name)
		//console.log(id)
		animeGenreFlexContainer.innerHTML += "<div class=\"genre-tag\" href=\"" + id + "\" onclick=\"selectTagFromItemAnime(this)\">" + "<h4 class=\"genre-title\">" + name + "</h4>" + "</input>"
	}
}
function refreshAnime(rawData)
{
	//console.log(rawData)
	data = JSON.parse(rawData)
	animeListCurrent = data.data
	/*for (x=0; x<animeListCurrent.length; x++)
	{
		console.log(animeListCurrent[x].url)
	}*/
	updateReccomendations();
}
function refreshManga(rawData)
{
	//console.log(rawData)
	data = JSON.parse(rawData)
	mangaListCurrent = data.data
	/*for (x=0; x<animeListCurrent.length; x++)
	{
		console.log(mangaListCurrent[x].url)
	}*/
	updateReccomendations();
}
function refreshGenresManga(rawData)
{
	data = JSON.parse(rawData)
	mangaGenres = data.data
	updateGenresManga();
}
function refreshGenresAnime(rawData)
{
	data = JSON.parse(rawData)
	animeGenres = data.data
	updateGenresAnime();
}
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
		{
            callback(xmlHttp.responseText);
		}
		else if (xmlHttp.status == 429)
		{
			//setTimeout(httpGetAsync, 3000, theUrl, callback);// httpGetAsync(theUrl, callback)
		}
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
function getAnime()
{
	genreString = ""
	len = 0;
	i=1;
	for (var key in selectedMangaGenres)
	{
		if (selectedMangaGenres[key]) // selectedAnimeGenres
			len++
	}
	for (var key in selectedMangaGenres)
	{
		if (selectedMangaGenres[key])
		{
			genreString += key + ((i>=len || len == 1) ?"" :",") //(x ? "," : "")
			i++;
		}
	}
	baseLink = "https://api.jikan.moe/v4/anime?page=1" + ((genreString.length>0) ? "genres=" + genreString : "") + (lastsearch.length > 2 ? "q=\"" + lastsearch + "\"" : "")
	console.log(baseLink)
	httpGetAsync(baseLink, refreshAnime)
}
function getManga()
{
	genreString = ""
	len = 0;
	i=1;
	for (var key in selectedMangaGenres)
	{
		if (selectedMangaGenres[key])
			len++
	}
	for (var key in selectedMangaGenres)
	{
		if (selectedMangaGenres[key])
		{
			genreString += key + ((i>=len || len == 1) ?"" :",") //(x ? "," : "")
			i++;
		}
	}
	baseLink = "https://api.jikan.moe/v4/manga?page=1" + ((genreString.length>0) ? "genres=" + genreString : "") + (lastsearch.length > 2 ? "q=\"" + lastsearch + "\"" : "")
	console.log(baseLink)
	httpGetAsync(baseLink, refreshManga)
}
function getMangaGenres()
{
	baseLink = "https://api.jikan.moe/v4/genres/manga"
	httpGetAsync(baseLink, refreshGenresManga)
}
function getAnimeGenres()
{
	baseLink = "https://api.jikan.moe/v4/genres/anime"
	httpGetAsync(baseLink, refreshGenresAnime)
}

setTimeout(getMangaGenres, 1000)
//setTimeout(getAnimeGenres, 2000)
setTimeout(getAnime, 3000)
setTimeout(getManga,4000)