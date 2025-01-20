+++
title = "Static Offensive (JS Project)"
date = 2013-01-01T00:00:00

[menu.main]
  name = "OTHER-staticoffensive"
	parent = "OTHER"
+++

<div id="main">
  <p class='blogimportant'>
    <a href='https://chikin.net/staticoffensive'>Try out the game</a> or <a href='https://github.com/dakodun/staticoffensive'>view the repository</a>.
  </p>

  <p class='thumbbar'>
    <a href='/site/staticoffensive/ss1.png'><img class='thumb' src='/site/staticoffensive/ss1_t.png' title='static-offensive-screen-1-thumb' width='211px' height='158px'></img></a>
    <a href='/site/staticoffensive/ss2.png'><img class='thumb' src='/site/staticoffensive/ss2_t.png' title='static-offensive-screen-2-thumb' width='211px' height='158px'></img></a>
  </p>

  <p class='blogpost'>
      Static Offensive was a project I started after competing in the <a href='https://github.com/blog/1303-github-game-off'>Github Game Off 2012</a>. My entry wasn't 
    particularly exciting or complete from a gameplay point of view and so I set out to improve upon it. The basics were to be the same in regards to objective and 
    mechanics, however I opted to change from a top-down view with two-dimensional movement to an isometric style with additional z-axis movement.
  </p>

  <p class='blogpost'>
      The map system was the biggest change both in terms of the technical aspect as well as visually. After designing and defining the map format and style I decided 
    it would be most conducive to smooth progress to create a map editor to aid me in designing maps for testing and to ship. An added benefit of this was the ability 
    for players to create and share their own maps if they so wished. The map editor allows the creation of blocks of tiles which can then be saved, 
    loaded, imported, exported and used in map generation (more on that below). The tiles can differ in height (including slopes which bridge two differing heights), 
    direction and terrain type (visual only). Saving and loading uses Local Storage whereas importing and exporting merely uses a single string that can be copy and 
    pasted around to share.
  </p>

  <p class='thumbbar'>
    <a href='/site/staticoffensive/ssmapeditor.png'><img class='thumb' src='/site/staticoffensive/ssmapeditor_t.png' title='static-offensive-map-editor-thumb' width='211px' height='158px'></img></a>
  </p>

  <p class='blogpost'>
      Map generation also differed from my previous project. Whilst it was possible to generate maps with a third dimension using the previous technique, it would be 
    much more difficult to validate them or create interesting features. This meant I diverged from generating the maps from scratch to instead using pre-defined 'blocks' 
    or 'segments' and instead stitching these together via an algorithm. Each segment contains one or more special tiles defined as 'entrance', 'exit' or 'both'. The 
    generator selects segments and pieces them together at these special tiles (an 'entrance' can't be matched to another 'entrance', likewise for an 'exit') assuming their 
    height and slopes are compatible.
  </p>

  <p class='blogpost'>
      The UI also had to change due to the visual style change and the inclusion of a third dimension. Now instead of only up and down we have north, east, 
    south and west (up-left, up-right, down-right and down-left). It is also now possible that units or map features are hidden behind others so an option to raise and 
    lower the z-level was added; anything above the selected level is hidden which also aids in selecting the correct unit.
  </p>
</div>
