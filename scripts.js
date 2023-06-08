/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"VekbtPi5HB0KuPhi","label":"relevant","bookmarks":[{"id":"EY0fuhWpS8x3aqeH","label":"google account","url":"https://myaccount.google.com/?utm_source=sign_in_no_continue&pli=1"},{"id":"Y04g82etK7kMxguq","label":"gmail","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"75RpMYNeXBHfFYjR","label":"my drive","url":"https://drive.google.com/drive/my-drive"},{"id":"zMWWgAKaWySICczj","label":"dashlane","url":"https://app.dashlane.com/credentials"}]},{"id":"kNi1DhtdD0NLeKl0","label":"social","bookmarks":[{"id":"3zCl7SS0MpdTATxl","label":"twitter","url":"https://twitter.com/home?lang=en"},{"id":"xlejQSIgvgpyOgMv","label":"facebook","url":"https://www.facebook.com/"},{"id":"EWV9cbBwrPmQpwp3","label":"reddit","url":"https://www.reddit.com/"},{"id":"1H0WnHG2522v2bG4","label":"discord","url":"https://discordapp.com/activity"}]},{"id":"XnID8X5tfav3E4oD","label":"entertainment","bookmarks":[{"id":"cER6DpegRmSLOd4o","label":"instagram","url":"https://www.instagram.com/"},{"id":"Z4mypCFv2ybmURWD","label":"youtube","url":"https://www.youtube.com"},{"id":"OEUmM7NXhf8lC5Ze","label":"anime","url":"https://animeflix.live/"},{"id":"wNqXs7pLLhqkurKM","label":"streaming","url":"https://soap2day.ac/"}]},{"id":"tzEEwgatLBwfWC9w","label":"utility","bookmarks":[{"id":"eSvv1dijqulaUG4L","label":"chatgpt","url":"https://chat.openai.com/chat"},{"id":"o9ChRVoyDXUHlJBK","label":"rephrasing tool","url":"https://quillbot.com/"},{"id":"G09m0D3BmIEKyZqh","label":"megathread","url":"https://www.reddit.com/r/piracy/wiki/megathread/tools"},{"id":"UykcIImLkGMyne7a","label":"compressor ","url":"https://8mb.video/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
