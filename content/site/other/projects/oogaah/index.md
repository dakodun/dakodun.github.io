+++
title = "Oogaah (JS Project)"
date = 2014-01-01
type = "project"

summary = """A short retrospective of an earlier JS project: Oogaah is a
card game (based on 'President') played against 3 CPU opponents."""

[params]
  scripts = [
    ["js/lazyload.js", "module"]
  ]

[menu.main]
  name = "OTHER-oogaah"
	parent = "OTHER"
+++

{{< main >}}
{{< blog/blog >}}

{{< blog/important >}}
  [Try out the game][game] or [view the repository][repo].

  [game]: https://chikin.net/oogaah (Oogaah Game Page)
  [repo]: https://github.com/dakodun/oogaah (Oogaah Repository)
{{< /blog/important >}}

{{< blog/thumbbar `` "211px" "158px" >}}
  {{< blog/thumb "ss1.png" `` >}}
  {{< blog/thumb "ss2.png" `` >}}
  {{< blog/thumb "ss3.png" `` >}}
{{< /blog/thumbbar >}}

{{% blog/markdown %}}
  ## A Short History

  When I was younger I used to play a game on my Playstation that
  consisted of a variety of card games and was especially fond of one
  in particular. The version on the disk was called "Rich Man", though
  it is known by many other names such as [President][pres]. The rules
  are fairly simple: players take turns playing cards that are
  'stronger' than the cards played before (cards rank from 3 through
  to K then A and then 2 with Joker being a special card that can
  substitute for one of any other card, or played vanilla where it
  beats a 2). Cards are played as singles, doubles, triples, quads or
  as a 4 card straight, though only the first player to play gets to
  decide this (if they play two 4s then other players must play double
  5s or higher, or pass). Once all other players pass, the last to play
  wins the hand and now goes first. The first to play all of their cards
  wins the round and waits for the other players to finish resulting in
  a ranking of 1 to 4. Cards are then dealt once again and players trade
  cards: the rank 1 player trades two of any of their cards with the
  rank 4 player where the rank 4 player must trade their 2 best cards.
  Similarly the rank 2 and 3 players also trade, except it is only one
  card. The game continues in this vain until a set number of rounds
  pass. The ultimate winner is the player with most points.

  [pres]: https://en.wikipedia.org/wiki/President_(card_game) (President \(Card Game\) - Wikipedia)
{{% /blog/markdown %}}

{{% blog/markdown %}}
  Rather than dig out and set up my old Playstation I decided to
  create my own version of 'Rich Man'. Early in the design process
  I had the idea to not only re-create the game but also to add a
  little extra flavour to it in the form of card abilities; now it's
  not only the Joker that has a special ability but every card. I
  also decided to theme the cards after fantasy elements rather than
  using traditional playing cards and thus Oogaah (Of Orcs, Goblins
  and also Humans) was born. Each card is either red or blue which
  represent Orcs and Goblins, or Humans (this is mostly cosmetic) —
  the special card (essentially the Joker) is rainbow coloured, naturally.
{{% /blog/markdown %}}

{{< blog/thumbbar `A side by side view of all the cards that constitute the
game.` "213px" "182px" >}}
  {{< blog/thumb "cards.png" `` >}}
{{< /blog/thumbbar >}}

{{% blog/markdown %}}
  ## The CPU Opponents
  
  Oogaah's AI system is a simple one: each AI player has a store of
  behaviours (example behaviours might be 'Combo' which causes the
  AI to prefer to hold onto cards to play bigger and better combos,
  or simply 'Beginner' which causes the AI to play at a lower level
  and make more mistakes) and when an action is required the AI pools 
  all of these behaviours. The behaviours each add a weight value to
  their choice (some decisions are as simple as yes or no whilst others
  are more complex) and the choice with the highest resulting weight
  is performed. This allows for some behaviours to be more dominant
  during certain actions. If there is a tie then a decision will be 
  chosen at random.
{{% /blog/markdown %}}

{{% blog/markdown %}}
  The image below shows what the process behind an AI decision might
  look like: a previous player played three Goblin Technicians. The
  AI then makes a decision based on what's in their hand (other factors
  may also be considered depending on the behaviour). Each behaviour
  chooses what it thinks is best. You'll notice they all decided the
  same action (although the 'Beginner' behaviour was more certain of
  their action). After the result is played out another decision is
  required immediately due to the activation of an ability. Here the 
  behaviours diverge:
{{% /blog/markdown %}}

{{< blog/thumbbar `An example of an AI decision process.` "479px" "254px" >}}
  {{< blog/thumb "ai.png" `` >}}
{{< /blog/thumbbar >}}

{{% blog/markdown %}}
  'Tempo' wants to maintain control of the game and so decides to
  play Being of Energy which guarantees they will win this hand and
  have first play in the next (it values this move highly as it is
  a huge tempo gain).
{{% /blog/markdown %}}

{{% blog/markdown %}}
  'Combo' wants to play the Orc Shaman. The thinking behind this move
  is that it is then possible to play Being of Energy to win the hand
  and then combo out the remaining cards. The reason 'Tempo' didn't go
  with this play is because it is not guaranteed if another player
  activates certain abilities (it assigns a medium weight to this action
  as the combo is not particularly huge).
{{% /blog/markdown %}}

{{% blog/markdown %}}
  Finally, 'Beginner' wants to play Goblin Horde. From an experienced
  point of view this is not a strong move as it breaks the possible
  combo with Goblin Overseer and potentially loses tempo since it opens
  up EVERY other single card (except another single Goblin Horde).
  However, 'Beginner' values this move highly and so we end up with a
  tie between two actions; the tie is resolved by simply picking one
  at random. As a result we have a play made by the AI and now the next
  player takes a turn.
{{% /blog/markdown %}}

{{% blog/markdown %}}
  ## The State of the Game

  The game is complete insofar as it is playable and meets the initial goal
  set: to create a card game similar to the one I used to play when I was
  younger. That being said there are definitely some incomplete or just
  plain absent features, the most prevalent being:
  
  - Incomplete tutorials
    - I started work on some interactive tutorials that teach the basics
    of the game and UI but never got around to finishing them off.
  - No win detection
    - A round plays out fine and the game will rank players
  depending on how they finished, but there is no new round afterwards and
  no swapping of cards requiring the player to refresh to begin a new one.
  - Lack of AI options
    - Whilst the AI system is fully in place, only one
  basic type of AI is available.
  - Missing UI elements
    - The UI is fairly complete and adequate enough to
  allow the game to be played but it is missing some elements and features
  such as a visual indication on how to leave certain screens (pause, card
  preview, etc all require the player to press the 'p' key) or widgets to
  customise AI parameters such as name and behaviour.
  - No audio
    - There is no audio in the game. I added basic audio support to
  the engine whilst working on Oogaah, and at one point even had some basic
  sounds implemented (such as deck shuffling and dealing) but I wasn't happy
  with the quality and so put it on the back burner.
  - No animations
    - There are no animations when an action occurs and so it
  happens instantly which can make it hard to follow the chain of events.
  The console does help in this regard as it documents each move as it
  happens, but some simple animations would vastly improve the player
  experience. I did have some shuffling and dealing animations in but
  removed them temporarily alongside the audio (see above).
  - Unfinished visuals
    - The graphics of the game are simple, clean and
  convey the information neccesary to play but I wanted to have illustrated
  cards, a choice of card styles, avatars for the AI and a more visually
  gratifying game board.
{{% /blog/markdown %}}

{{< /blog/blog >}}
{{< /main >}}
