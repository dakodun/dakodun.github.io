+++
title = "chikin.net"
layout = ""
date = 2000-01-01
type = ""

[params]
  stylesheets = [ "css/home.css" ]

[menu.main]
	name = "HOME"
	weight = 1
+++

<div style="width: 100%; height: 300px; background: #AAAAAA00;
position: absolute; top: 0px; left: 0px;">
</div>

{{< main backing="#00000000" >}}

<div class="homebox">
  <div>
    Iain Crawford
  </div>

  <div>
  {{< button url="https://github.com/dakodun" bgcolor="#3A363E"
  color="#EDEEF3" glowcolors="#F14EAA, #82DD0C, #F14EAA"
  width="200px" height="100%" >}}
    <div style="width: 28px; height: 24px;
    background-size: contain;
    background-image: url('/site/github-mark-white.svg');
    background-position: right center;
    background-repeat: no-repeat;
    flex-grow: 0; align-self: center;">
      <!-- I'm a background image! -->
    </div>
    <div style="flex-grow: 1; align-self: center; text-align: center;">
      Find me on GitHub
    </div>
    <div style="width: 28px; flex-grow: 0;">
      <!-- I'm blank, just for positioning! -->
    </div>
  {{< /button >}}
  </div>

  <div>
  {{< button url="/themepark/sea" bgcolor="#0F6E8C"
  color="#FAFAFF" glowcolors="#0A0A0AAA, #0A0A0AAA"
  width="154px" height="100%" target="_self" >}}
    <div style="align-self: center; text-align: center;">
      View an alternate version of this page
    </div>
  {{< /button >}}

  <div class="marker">
  </div>
  </div>

  <div>
  {{< home/blurb >}}
  ---
  While I designed and implemented this website primarily using Firefox on Windows,
  I further tested it on Windows with Chrome and Edge, on Android with Firefox,
  Chrome and Samsung Internet, and with GNOME Web on Linux ensuring I
  covered a wide range of the platforms, browser engines and implementations
  available to me.
  
  It should look and function the same irrespective of how you choose to view
  it, as long as JavaScript is enabled and the device width is greater than
  300px; even then, I've made every effort to display the content correctly
  without JavaScript, but you will lose some functionality.

  You can view the source files in the [repository][src] on my GitHub,
  on the (orphaned) _source_ branch.

  [src]: https://github.com/dakodun/dakodun.github.io/tree/source (htllo)
  
  {{< /home/blurb >}}
</div>
</div>

{{< /main >}}
