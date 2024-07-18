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
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
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
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
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

const bookmarks = [{"id":"oxp4gmJZe6EL7llG","label":"reddit","bookmarks":[{"id":"XvLLtrGfrMhPj9r7","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"v5uc7vLucPbmd3g3","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"m4cGtN3svNhJe8ox","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"8eDrIHR8SteCfl4p","label":"design tools","bookmarks":[{"id":"A6HIX6XZmuIRaNDY","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"Fz4KMh0B7H3U256f","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"56J7Q63z6Nq7OlJ3","label":"haikei","url":"https://app.haikei.app/"},{"id":"gGNHuxnS8k83H5n6","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"tfwPvv8zqWToYudL","label":"worth reading","bookmarks":[{"id":"5ZGAPA3gQmxIJuBP","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"F1Q3bnWZkKKDa37D","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"O4xeBKGGPpTK9Lub","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"rGhvJSS4PUNq55dr","label":"sources","bookmarks":[{"id":"9BXdRsgwr4lcJcTC","label":"icons","url":"https://feathericons.com/"},{"id":"FnPxUmTVPb0N1izQ","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"ckKILYkxUrH8kh5k","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"QblwXpWsfmE0Ndtf","label":"author","url":"https://prettycoffee.github.io/"}]}]

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
