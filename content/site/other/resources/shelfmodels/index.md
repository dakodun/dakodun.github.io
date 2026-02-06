+++
title = "Games Page 3D Models (.blend)"
layout = "single"
date = 2026-02-06
type = "resource"

summary = """3D models I made for use on my shelf on the games
page (carts, cds and the like)"""

[params]
  scripts = [
    ["js/lazyload.js", "module"]
  ]

[menu.main]
  name = "OTHER-resource-shelfmodels"
	parent = "OTHER"
+++

{{< main >}}
{{< blog/blog >}}

{{< blog/embox >}}
  ## Downloads
  
  - [SNES Cart and Box (PAL and NTSC) (.zip archive)][dl-snes]  
  - [N64 Cart and Box (.zip archive)][dl-n64]  
  - [Dreamcast CD and Case (PAL) (.zip archive)][dl-dreamcast]  
  - [GBA Cart and Box (.zip archive)][dl-gba]  

  [dl-snes]: snes.zip (Download SNES Cart \(PAL/NTSC\) archive)
  [dl-n64]: n64.zip (Download SNES Cart archive)
  [dl-dreamcast]: dreamcast.zip (Download Dreamcast CD \(PAL\) archive)
  [dl-gba]: gba.zip (Download GBA Cart archive)
{{< /blog/embox >}}

{{% blog/markdown %}}
  I made these models in Blender for the shelf on the [games] page when
  I couldn't find any readily available. They allow me to quickly render
  carts and CDs of a variety of games (at the correct perspective and size) by
  simply changing a couple of textures; feel free to use them as you please.

  [games]: {{% ref "site/gaming/games/" %}} (chikin.net - games)
{{% /blog/markdown %}}

{{< blog/thumbbar `` "160px" "120px" >}}
  {{< blog/thumb "snes-pal.png" `` >}}
  {{< blog/thumb "dreamcast-pal.png" `` >}}
{{< /blog/thumbbar >}}

{{< /blog/blog >}}
{{< /main >}}
