+++
title = "GitHub Game Off 2012 (JS Project)"
layout = "single"
date = 2012-01-01
type = "project"

summary = """Looking at my entry in the GitHub Game Off — a month long
Game Jam."""

[params]
  scripts = [
    ["js/lazyload.js", "module"]
  ]

[menu.main]
  name = "OTHER-project-gameoff2012"
	parent = "OTHER"
+++

{{< main >}}
{{< blog/blog >}}

{{< blog/important >}}
  [Try out the game][game] or [view the repository][repo].

  [game]: https://chikin.net/game-off-2012 (Game Off 2012 Game Page)
  [repo]: https://github.com/dakodun/game-off-2012 (Game Off 2012 Repository)
{{< /blog/important >}}

{{< blog/thumbbar `` "211px" "158px" >}}
  {{< blog/thumb "ss1.png" `` >}}
  {{< blog/thumb "ss2.png" `` >}}
  {{< blog/thumb "ss3.png" `` >}}
  {{< blog/thumb "ss4.png" `` >}}
{{< /blog/thumbbar >}}


{{% blog/markdown %}}
  ## Introduction

  This was my entry for Github's [Game Off 2012][gameoff]. The aim
  was to create a web-based game loosely relating to one or more
  selected Git terms. I created the game and engine from scratch
  for the event, opting to use HTML5 and Javascript as I hadn't yet
  had the chance to play around with Canvas. The git terms I focused
  on were 'pushing' and pulling'.

  [gameoff]: https://github.com/blog/1303-github-game-off (GitHub Game Off Page)
{{% /blog/markdown %}}

{{% blog/markdown %}}
  The game plays out like a traditional turn-based strategy would,
  except that your units are split into two specifications: expendable 
  and replaceable worker units, and  expensive, stationary artillery
  units. The worker units exist to scout out ahead through the
  fog-of-war — often resulting in their deaths — and to maneuver your
  artillery units into offensive positions via pushing and pulling 
  them. Your artillery units are the only offence you have and once
  they are lost the game is over. To win you must reach and destroy
  the enemy base.
{{% /blog/markdown %}}

{{% blog/markdown %}}
  ## Map Generation

  The maps are created procedurally using a (variable) number of
  'ants' which 'burrow' a path from one end to the other. The ants
  have a quota of left and right movements that they must fulfil
  before moving up one, and bounds on how far left or right they
  can move. These horizontal movements are randomised along with
  the ant's starting position. This method ensures that there will
  always be a path connecting the bottom of the map to the top and
  as a result all maps will be valid. In addition to this, both the
  size of the bases (the player's landing zone and enemies base,
  the former of which will always be smaller in comparison to the
  latter) and the size of the map is variable.
{{% /blog/markdown %}}

{{< blog/thumbbar `The 'Ant' wiggles left and right randomly from its
starting position (the circle) until it reaches its wiggle quota, n, and
then it moves up to the next row from its current position (the dotted
line). The Ant cant move more than x spaces from its starting position
in either direction (denoted by the red half blocks) and when it reaches
this boundary it moves in the opposite direction. The spaces visited by
the Ant are valid terrain (green squares) and any not visited are
impassable terrain (black squares).` "183px" "91px" >}}
  {{< blog/thumb "ssmapgen1.png" `` >}}
{{< /blog/thumbbar >}}

{{% blog/markdown %}}
  Originally I planned to use a set of circles to create the map
  by placing points at distances along the map (with some random
  variance) and then expanding the radii of the circles together
  until they collide with one another. This ensures that there is
  a valid path from one end of the map to the other. However, because
  the maps have a constrained width this led to the map essentially
  being a solid block except for one or two missing tiles.
{{% /blog/markdown %}}

{{< blog/thumbbar `Small circles that fit entirely inside one space (black
circles) are seeded throughout the map at set distances apart (with some
random variation) and grow their radii in turn by a size of one space (the
dotted line) until they collide with each other. Every circle must collide 
with at least 2 others or with a map boundary (top or bottom). Any spaces
inside the resulting circles (red circles) are considered valid terrain
(green squares) and any outwith are impassable (black squares).`
"211px" "158px" >}}
  {{< blog/thumb "ssmapgen2.png" `` >}}
{{< /blog/thumbbar >}}

{{% blog/markdown %}}
  ## Conclusion

  Due to time constraints (a lot of the time was spent working on
  the actual engine) there are a lot of planned features that didn't
  make it in. Things such as mobile enemy offensive units that patrol
  or seek you out, enemy camps — essentially smaller versions of the
  enemy base — which act as blockades to be avoided or destroyed, a
  variety of player units to control, and some sort of resource or base 
  management. On the engine side of things I would have liked to have
  audio support (both music and sound effects).
{{% /blog/markdown %}}

{{< /blog/blog >}}
{{< /main >}}
