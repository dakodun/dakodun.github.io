+++
title = "Games Page 3D Models (.blend)"
layout = "single"
date = 2025-04-16
type = "resource"

summary = """3D models I made for use on my shelf on the games
page (carts, cds and the like)"""

[params]
  scripts = [
    ["js/lazyload.js", "module"]
  ]

[menu.main]
  name = "OTHER-resource-snescart"
	parent = "OTHER"
+++

{{< main >}}
{{< blog/blog >}}

{{% blog/markdown %}}
  I made these models in Blender for the shelf on the [games] page when
  I couldn't find any readily available. They allow me to quickly render
  carts and cds of various games (at the correct perspective) by simply
  changing a texture; feel free to use them as you please.

  [games]: {{% ref "site/gaming/games/" %}} (chikin.net - games)
{{% /blog/markdown %}}

{{< blog/important >}}
  ## SNES Cart (PAL)

  [Download .zip archive][dl]  

  [dl]: snes-cart-pal.zip (Download SNES cart PAL archive)
{{< /blog/important >}}

{{< blog/thumbbar `` "160px" "120px" >}}
  {{< blog/thumb "cart-editor.png" `` >}}
  {{< blog/thumb "cart-render.png" `` >}}
{{< /blog/thumbbar >}}

{{< /blog/blog >}}
{{< /main >}}
