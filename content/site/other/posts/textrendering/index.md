+++
title = "Rendering Text (with as little effort as possible)"
layout = "single"
date = 2025-07-10
type = "post"

summary = """Another look at implementating text rendering — this time
in my Javascript engine SolastJS — attempting to balance flexibility against
implementation difficulty"""

[params]
  scripts = [
    ["js/lazyload.js", "module"]
  ]

[menu.main]
  name = "OTHER-post-textrendering"
	parent = "OTHER"
+++

{{< main >}}
{{< blog/blog >}}
{{< blog/embox >}}
  See the implementation in the [SolastJS repository][repo], specifically
  the [atlasfont.js][atlasfont] and [renderstring.js][renderstring] files.

  [repo]: https://github.com/dakodun/solastjs (SolastJS - GitHub)
  [atlasfont]: https://github.com/dakodun/solastjs/blob/main/scr/atlasfont.js (SolastJS \(AtlasFont\) - GitHub)
  [renderstring]: https://github.com/dakodun/solastjs/blob/main/scr/renderstring.js (SolastJS \(RenderString\) - GitHub)
{{< /blog/embox >}}

{{% blog/markdown %}}
  ## Introduction

  I wrote a post about a technique for rendering text ([Rendering Text - SDF][post]) in
  the before-times, and while it's still super interesting and well worth a
  look, it's definitely on the more complex side. This time around I wanted
  something that was simple to understand, implement and use.

  Initially I just rendered the string to a canvas with the [Canvas API][canvas] and
  used that as a texture to draw the string on the screen. It was quick and
  relatively simple to implement but lacks the flexibility I was looking
  for with regards to string styling and animation. Instead I looked for a
  way to maintain the simplicity of using the canvas' text rendering
  capabilities but render the string using individual quads for each glyph.

  [canvas]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API (Canvas API - MDN)
  [post]: {{% ref "site/other/posts/sdftextrendering/" %}} (Rendering Text: Signed Distance Fields - chikin.net)
{{% /blog/markdown %}}

{{% blog/markdown %}}
  ## Preparing Font

  The [CSS Font Loading API][fontapi] makes it easy to load a font face and
  add it to the DOM for use with a canvas.

  [fontapi]: https://developer.mozilla.org/en-US/docs/Web/API/FontFace (FontFace - MDN)
{{% /blog/markdown %}}


{{< blog/codebox `Loading a font with the CSS Font Loading API, to be used
in generating our font atlas.`
>}}let font = new FontFace(family, src);
try {
  await font.load();
  document.fonts.add(font);
} catch (e) {
  console.error(e);
}

// generate font

document.fonts.delete(font);
{{< /blog/codebox >}}


{{% blog/markdown %}}
  ## Rendering Glyphs

  The Canvas API allows us to create an [OffscreenCanvas][ocanvas] of our
  desired texture dimensions, and with that a [CanvasRenderingContext2D][context]
  via the 'getContext' method. After setting the font and fillStyle of that
  context to our previously loaded font, we can use it ('fillText' method)
  — and a simple packing algorithm — to render our individual glyphs;
  the canvas can then be used as an image source for a [SolastJS][solastjs]
  Texture.

  _In practice we have an array of canvases, and for any glyph that doesn't
  fit on any of the current canvases we create another. Then we create a 2D
  texture array using our canvas array._

  [ocanvas]: https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas (OffscreenCanvas - MDN)
  [context]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D (CanvasRenderingContext2 - MDN)
  [solastjs]: {{% ref "site/solastjs/" %}} (SolastJS - chikin.net)
{{% /blog/markdown %}}


{{% blog/markdown %}}
  For the packing algorithm I went with a really simple 'shelf-based'
  approach:

  - A shelf has a maximum height and a remaining width. Each shelf also has
  a slight tolerance that allows a glyph with a smaller height to sit on it,
  but not larger.

  - If a shelf exists that the current glyph fits on (in both height and
  width) then it is placed there, otherwise it is placed above the existing
  shelves on a new one. If no space exists above then a new canvas layer
  is created.
{{% /blog/markdown %}}

{{< blog/thumbbar `Glyphs packed (in order: 'A', 'a', 'B', 'b', etc) into texture
using a shelf-based algorithm. 'F' matches the bottom shelf's height exactly,
but there's not enough width remaining so it is placed on another shelf (as it
is within the 2px tolerance). 'g' is taller than all existing shelves and there
is no room for a new shelf, so a new texture layer is needed.` "323px" "303px" >}}
  {{< blog/thumb "atlas-texture.png" `An example of a texture with glyphs
  packed tightly on 'shelves'.` >}}
{{< /blog/thumbbar >}}


{{% blog/markdown %}}
  ## Glyph Metrics

  Using an OffscreenCanvas we can get metrics for our glyphs. To do so
  we only need a temporary 1 by 1 canvas and the 'measureText' method
  _(we could also use one of our existing render canvases)_. After
  ensuring the font size and family is properly set, we can measure a
  single character and use the actual left/right and actual top/bottom
  values to get the visual bounds of the glyph (and from this calculate
  the width and height); this also includes other metrics such as drop
  and advance values.
{{% /blog/markdown %}}

{{% blog/markdown %}}
  We can also use this method to get kerning data for our glyphs. Instead of
  measuring a single character we measure two characters together and
  subtract the sum of their widths from the combined width. The leftover
  is the kerning value, positive or negative.

  _A single glyph has to be kerned with itself. Adding in a second glyph
  requires kerning with itself and with the existing glyph, in both
  directions ('AB' and 'BA')._
{{% /blog/markdown %}}

{{< blog/codebox `Calculating our glyph kerning has a time complexity of n²
where n is the number of glyphs.`
>}}1 glyph  =  1 kern  =  1 (AA)
2 glyphs = +3 kerns =  4 (BB, AB, BA)
3 glyphs = +5 kerns =  9 (CC, AC, BC, CA, CB)
4 glyphs = +7 kerns = 16 (DD, AD, BD, CD, DA, DB, DC)
{{< /blog/codebox >}}

{{% blog/markdown %}}
  ## Conclusion

  Using Canvas API offloads a lot of the busy work to its font and text
  engine. One useful artefact of this process is the ability to easily mix
  glyphs from various fonts to essentially construct a new one, though
  kerning must be carefully considered.

  As for improvements, the packing algorithm is not the most efficient (for
  example, order of insertion matters and glyphs could be packed more tightly
  by pre-sorting by height) but any improvements come at the cost of
  complexity (in implementation).

  The kerning map can also get quite large. One way to reduce its size would
  be to keep track of the most popular kerning gap, set that as a default
  and remove any matching entry. Then, anytime a kerning search returns
  undefined, we can just use the default gap value instead.
{{% /blog/markdown %}}

{{< /blog/blog >}}
{{< /main >}}
