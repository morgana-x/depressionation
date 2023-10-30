mangaListFlexContainer = document.getElementById("mangaReccomendationFlexContainer")
animeListCurrent = {}
function getInfoMangaFromItem(e)
{
	console.log(e.children[0].getAttribute("href"))
	console.log("click " + e.children[0].textContent)
}
function updateReccomendations()
{
	//thing = createElement()
	//mangaListFlexContainer.appendChild(

	for (i=0; i<animeListCurrent.length; i++)
	{
		title = animeListCurrent[i].title
		console.log(title)
		reflink = animeListCurrent[i].url
		thumbnail = animeListCurrent[i].images["jpg"].image_url //"assets/icon.png" 
		mangaReccomendationFlexContainer.innerHTML += "<div class=\"manga-item\" onclick=\"getInfoMangaFromItem(this);\"><h2 class = \"manga-title\" href=\"" + reflink + "\">" + title + "</h2><image src=\"" + thumbnail + "\" class = \"manga-thumbnail\"></image></div>"
	}
	/*for (x=0; x <mangaListFlexContainer.children.length; x++)
	{
		mangaListFlexContainer.children[x].onclick = getInfoMangaFromItem;
	}*/
}
function refreshAnime(rawData)
{
	console.log(rawData)
	data = JSON.parse(rawData)
	animeListCurrent = data.data
	for (x=0; x<animeListCurrent.length; x++)
	{
		console.log(animeListCurrent[x].url)
	}
	updateReccomendations();
}
function refreshManga(rawData)
{
	console.log(rawData)
	data = JSON.parse(rawData)
	animeListCurrent = data.data
	for (x=0; x<animeListCurrent.length; x++)
	{
		console.log(animeListCurrent[x].url)
	}
	updateReccomendations();
}
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
function getAnimes()
{
	baseLink = "https://api.jikan.moe/v4/anime?q=\"\""
	httpGetAsync(baseLink, refreshAnime)
}
function getManga()
{
	baseLink = "https://api.jikan.moe/v4/top/manga"
	httpGetAsync(baseLink, refreshManga)
}

updateReccomendations();
getAnimes();
getManga();