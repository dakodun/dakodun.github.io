+++
title = "Games"
layout = "single"
date = 2025-03-14
type = ""

[params]
  scripts = [
    ["js/lazyload.js", "module"],
    ["js/tablecontrol.js", "module"]
  ]
  stylesheets = ["css/games.css" ]
  fonts = ["https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap"]

[menu.main]
  name = "GAMING-GAMES"
	parent = "GAMING"
+++

{{< main >}}
  {{< gaming/games/table >}}
  {{< gaming/games/shelf >}}
{{< /main >}}
