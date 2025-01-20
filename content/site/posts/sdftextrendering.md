+++
title = "(POST) Rendering Text: Signed Distance Fields"
date = 2015-08-22T20:04:56+01:00

[menu.main]
  name = "OTHER-post-sdftextrendering"
	parent = "OTHER"
+++

<div id="main">
  <p></p>
  <h2>Introduction</h2>
  <p></p>
  <p class='blogpost'>
      When it comes to rendering text in OpenGL there are a few traditional methods that I know of:
  </p>

  <p class='blogpost'>
      1. The first and perhaps the simplest is to use your font engine (such as <a href='http://www.freetype.org/' target="_blank">freetype</a>) to render your string out to a texture using your desired font, at your desired size. 
    This is relatively trivial, produces nice looking results and only requires one textured quad to render. The biggest drawback of this method is the lack of flexibility; 
    if you want to update the string -- even slightly -- you generally have to re-render it. This includes changing the positioning, spacing or other aspect of the individual 
    glyphs. Furthermore, if you have a lot of text then you'll have a lot of textures and especially long strings might need textures to be upsized a lot (to be a valid power 
    of 2).
  </p>

  <!--more-->

  <p class='thumbbar'>
    <a href='/site/posts/sdftextrendering/traditional-1.png'><img class='thumb' src='/site/posts/sdftextrendering/traditional-1.png' 
        title='text-rendering-directly-to-texture' width='512px' height='32px'></img></a>
    
  <span class ='thumblabel'>
        An example of what a string rendered directly to a texture might look like in memory.
    </span>
  </p>

  <p class='blogpost'>
      2. The second technique gets around the limitations of the first by instead rendering each glyph into a texture atlas. Rendering a string is then done using multiple textured quads, 
    each representing a single glyph. This means that you can render many strings using the same texture (which reduces bind and potentially draw calls) and change strings 
    dynamically simply by removing, replacing or adding more quads. This method introduces a little more complexity as you have to deal with texture coordinates and quad 
    positioning as well as font metrics (like kerning). It's also difficult to render many strings at varying sizes using this method as re-scaling the texture often results in 
    aliased or blurry text thus requiring another atlas to be rendered for the new size; eventually this all adds up.
  </p>

  <p class='thumbbar'>
    <a href='/site/posts/sdftextrendering/traditional-2.png'><img class='thumb' src='/site/posts/sdftextrendering/traditional-2.png' 
        title='text-rendering-font-atlas' width='128px' height='128px'></img></a>
    
  <span class ='thumblabel'>
        An example of what a simple font atlas might look like.
    </span>
  </p>

  <p class='blogpost'>
      3. The final method is to forgo texturing altogether and instead render the individual glyph using vertices. This method adds quite a bit more complexity overhead to both
    implementation and rendering. You have to read the glyphs outline from the font file (freetype makes this fairly trivial) and also convert and scale the metrics. Many characters 
    (strongly dependant on the font) are not simple, convex shapes and so rendering requires proper triangulation. There is also a cost in rendering many vertices (more vertices mean 
    a higher resolution, especially on curves) instead of a simple quad (just four vertices). The upside to this method is freedom from constraints resulting from using bitmaps, 
    the primary of which being the ability to resize glyphs without much loss of detail.
  </p>

  <p class='thumbbar'>
    <a href='/site/posts/sdftextrendering/traditional-3.png'><img class='thumb' src='/site/posts/sdftextrendering/traditional-3_t.png' 
        title='text-rendering-vector-based-glyphs' width='867px' height='115px'></img></a>
    
  <span class ='thumblabel'>
        An example of what a string rendered as vertices (at a low resolution) might look like.
    </span>
  </p>

  <p class='blogpost'>
      A fourth technique exists that uses a font atlas much like the second method, but adds an additional step that processes the bitmap into what is known as a signed distance field (it is 
    possible to generate an SDF without a bitmap input though it tends to be a little more complicated). The most cited paper that discusses this technique is 
    <a href='http://www.valvesoftware.com/publications/2007/SIGGRAPH2007_AlphaTestedMagnification.pdf' target="_blank">this paper</a> by Valve Software's Chris Green. A signed distance 
    field in this context is relatively easy to explain: imagine a bitmap as a grid of pixels with each pixel being either white or black. Anything that is white is considered outside 
    whilst anything that is black is deemed to be inside. The pixels are then given a distance value that denotes how near they are to the boundary (i.e., to a pixel of the opposing colour) 
    with anything inside having a negative value and anything outside being positive. This is the basis of a signed distance field.
  </p>

  <p class='thumbbar'>
    <a href='/site/posts/sdftextrendering/sdf-define.png'><img class='thumb' src='/site/posts/sdftextrendering/sdf-define_t.png' 
        title='text-rendering-sdf-definition' width='188px' height='188px'></img></a>
    
  <span class ='thumblabel'>
        A representation of a simple signed distance field constructed using Pythagoras' theorem (note that white pixels on the border -- with a distance of 1 in the example -- can also
      be considered to have a distance of 0).
    </span>
  </p>

  <p></p>
  <h2>Implementation</h2>
  <p></p>
  <p class='blogpost'>
      There are many ways to calculate the SDF we require: you can use a brute force approach (as described in the Valve paper), an algorithm like 
    <a href='http://www.ee.bgu.ac.il/~dinstein/stip2002/LeymarieLevineDistTrans_cvgip92.pdf'>8SSEDT</a>, or directly using the vector data of the glyph. For my needs I required something 
    reasonably fast and relatively simple, so I opted to cheat and instead use the vector data to render a gradient. The first step was to retrieve the data from the font file which was 
    made simple using freetype. The vector data is a collection of contours, each comprising of vertices and bezier curves which match up well with my own framework so it required very 
    little effort. Afterwards -- using the <a href='http://www.angusj.com/delphi/clipper.php'>Clipper</a> library -- it's just a case of offsetting the contours inwards and outwards, colouring 
    the inner contour black and the outer white and then rendering... at least, that's the idea. The problem is that the results won't be correct if your triangulation doesn't account 
    for what you're trying to do, most noticeably at corners or curves where all three vertices of the triangle lie on one contour. Since I wasn't willing to modify my triangulation to ensure 
    this was never the case, I tried to cheat even further and instead render the glyph multiple times with each successive render being offset by a small amount (this was done with a single 
    draw call). The resulting SDF texture appeared fine at first glance, but small artefacts became very pronounced when actually rendered. After unsuccessfully tweaking offsetting values and 
    texture parameters I went looking for an alternative. After much searching I came across mention of another algorithm for rendering signed distance fields: 
      <a href='http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.102.7988&rep=rep1&type=pdf'>Dead Reckoning</a>.
  </p>

  <p class='blogpost'>
      The input to our function is the texture data as returned by OpenGL (via glGetTexImage). Using this data we construct a binary map: essentially a texture where each pixel is either on (true) or 
    off (false). We then use this binary map to initialise our distance field and border point maps. These too are similar to our initial texture except each 'pixel' contains distance values and 
    the coordinates of the nearest border point respectively. We initialise these to either 0 and self (that is, the coordinates of the point we are checking) if the current point is a border point, 
    or to a maximum and the invalid point (-1, -1) if not. After that's done it's onto the actual process of creating the signed distance field. From my limited understanding how Dead Reckoning does this 
    is in two passes; first it propagates the distance values over one corner (for example left, left-down, down and down-right would be considered a corner) and then in the second pass propagates over the 
    other corner.
  </p>

  <div class='thumbbar'>
  <pre class ='code'><code>if (distanceField[x + dx, y + dy] + distance < distanceField[x, y]) {
    borderPointMap[x, y] = borderPointMap[x + dx, y + dy];
    float distx = x - borderPointMap[x, y].x;
    float disty = y - borderPointMap[x, y].y;
    distanceField[x, y] = sqrt((distx * distx) + (disty * disty));
  }</code></pre>
    
  <span class ='thumblabel'>
        The propagation function that is called eight times per pixel over two passes (four in each). <code>x</code> and <code>y</code> are the coordinates of the current point and <code>dx</code> and <code>dy</code> 
      are the offset to the point we're checking which would be (-1, -1), (0, -1), (1, -1) and (-1, 0) in the first pass.
    </span>
  </div>

  <p class='blogpost'>
      After both passes complete the final step is to normalise the data to be in a format suitable to use in our texture. Firstly we must iterate over our distance field and check each pixel against its 
    counterpart in the binary map; if the pixel is outside (a value of false in the binary map) then we negate the distance value. Afterwards, we scale the distance field values to be between 0 and 255 and this 
    gives us our SDF texture data. The last thing to take care of is the shader that interpolates our SDF data and renders it as a nice crisp glyph. I tried many different shaders -- each doing a similar thing 
    but via a slightly different method -- but settled on a version of the one used by paul.houx on the 
    <a href='https://forum.libcinder.org/topic/signed-distance-field-font-rendering'>Cinder Forums</a> (from the .zip file).
  </p>

  <div class='thumbbar'>
  <pre class ='code'><code>float mask = texture(fragBaseTex, fragTexCoord).r;
  float edgeWidth = clamp(smoothing * (abs(dFdx(fragTexCoord.x)) +
      abs(dFdy(fragTexCoord.y))), 0.0f, 0.5f);
  float alpha = smoothstep(0.5f - edgeWidth, 0.5f + edgeWidth, mask);
  finalColour = vec4(fragColour.x, fragColour.y, fragColour.z, alpha);</code></pre>

  <span class ='thumblabel'>
        The shader used to render our SDF texture. We start by getting the distance value from the texture (from the red channel) and then calculate the edge width: the range over which we will interpolate 
      the edges of the glyph; <code>smoothness</code> determines how soft the edges will be and can be set as a constant or calculated from the glyph size. Finally, we get the alpha value using the smoothstep 
      function and set the fragment's output colour.
    </span>
  </div>

  <p class='blogpost'>
      When examining the results I noticed there was considerable 'wiggle' on non axis-aligned edges which shouldn't be the case, and examining the final texture closer it was possible to see the lack 
    of sufficient detail to prevent this meaning further steps were required. The first step was to downscale the SDF by sampling a group of pixels and finding the mean distance value (to account for this I 
    increased the resolution of the input); then it was a case of scaling the distance values to be between a normalised factor which can be done using the formula 
    <code>scaledDistance = std::max(-normalFactor, std::min(distance, normalFactor)) / normalFactor</code>.
  </p>

  <div class='thumbbar'>
  <pre class ='code'><code>for (size_t y = 0u; y < textureHeight; y += scale) {
    for (size_t x = 0u; x < textureWidth; x += scale) {
      float accum = 0.0f;
      for (size_t dy = 0u; dy < scale; ++dy) {
        for (size_t dx = 0u; dx < scale; ++dx) {
          accum += distanceField[x + dx, y + dy];
        }
      }
      
      distanceFieldScaled.push_back(accum / (scale * scale));
    }
  }</code></pre>

  <span class ='thumblabel'>
        The function to scale our distance field down, sampling an area of pixels into a single average; <code>scale</code> is the factor you want to reduce by.
    </span>
  </div>

  <p class='blogpost'>
      Now our signed distance fonts are fully functional it's time for a little extra credit: our SDF generation is relatively fast but it wouldn't be efficient to generate our signed distance texture 
    every time, especially if we have many glyphs. By implementing a simple caching process we can create a file that holds all the required information that can be loaded quickly, even allowing new glyphs to 
    be appended when needed. There are also some fancy effects we can apply to our text using our shader such as drop shadows and outlines. To see what that might look like -- as well as the actual full 
    implementation of the whole process -- check out my <a href='https://github.com/dakodun/uair'>framework repository</a>, specifically: 
    <a href='https://github.com/dakodun/uair/blob/master/src/font.cpp'>font.cpp</a> for font loading, glyph loading and caching, 
    <a href='https://github.com/dakodun/uair/blob/master/src/signeddistancefield.cpp'>signeddistancefield.cpp</a> for SDF generation and 
    <a href='https://github.com/dakodun/uair/blob/master/src/game.cpp#L276-L328'>game.cpp</a> for the shader implementation.
  </p>

  <p class='thumbbar'>
    <a href='/site/posts/sdftextrendering/sizing-example.png'><img class='thumb' src='/site/posts/sdftextrendering/sizing-example_t.png' 
        title='text-rendering-sizing-example' width='241px' height='241px'></img></a>
        
  <span class ='thumblabel'>
        An example of a string rendered using the same SDF texture at multiple sizes (the font used is 
        <a href='http://tattoowoo.com/index.php?main_page=product_info&cPath=72&products_id=1490'>the Daily Bread</a>).
    </span>
  </p>

  <p class='thumbbar'>
    <a href='/site/posts/sdftextrendering/render-comparison.png'><img class='thumb' src='/site/posts/sdftextrendering/render-comparison_t.png' 
        title='text-rendering-comparison' width='238px' height='168px'></img></a>
    
  <span class ='thumblabel'>
        The same string rendered in various programs using the same parameters for comparison.
    </span>
  </p>

  <p class='thumbbar'>
    <a href='/site/posts/sdftextrendering/effects-example.png'><img class='thumb' src='/site/posts/sdftextrendering/effects-example_t.png' 
        title='text-rendering-effects-example' width='269px' height='160px'></img></a>
    
  <span class ='thumblabel'>
        Some of the effects that are possible using a shader and a signed distance field (the font used is 
        <a href='http://www.sudtipos.com/fonts/152'>Bubblegum Sans</a>).
    </span>
  </p>
</div>
