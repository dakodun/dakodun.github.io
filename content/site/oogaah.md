+++
title = "Oogaah (JS Project)"
date = 2014-01-01T00:00:00

[menu.main]
  name = "OTHER-oogaah"
	parent = "OTHER"
+++

<div id="main">
  <p class='blogimportant'>
    <a href='https://chikin.net/oogaah'>Try out the game</a> or <a href='https://github.com/dakodun/oogaah'>view the repository</a>.
  </p>

  <p class='thumbbar'>
    <a href='/site/oogaah/ss1.png'><img class='thumb' src='/site/oogaah/ss1_t.png' title='oogaah-screen-1-thumb' width='211px' height='158px'></img></a>
    <a href='/site/oogaah/ss2.png'><img class='thumb' src='/site/oogaah/ss2_t.png' title='oogaah-screen-2-thumb' width='211px' height='158px'></img></a>
    <a href='/site/oogaah/ss3.png'><img class='thumb' src='/site/oogaah/ss3_t.png' title='oogaah-screen-3-thumb' width='211px' height='158px'></img></a>
  </p>

  <p class='blogpost'>
      When I was younger I used to play a game on my Playstation that consisted of a variety of card games and was especially fond of one in particular. The version on 
    the disc was called "Rich Man", though it is known by many other names such as <a href='https://en.wikipedia.org/wiki/President_(card_game)'>President</a>. The rules are 
    fairly simple: players take turns playing cards that are 'stronger' than the cards played before (cards rank from 3 through to K then A and then 2 with Joker being a 
    special card that can substitute for one of any other card, or played vanilla where it beats a 2). Cards are played as singles, doubles, triples, quads or as a 4 card 
    straight, though only the first player to play gets to decide this (if they play two 4s then other players must play double 5s or higher, or pass). Once all other players 
    pass, the last to play wins the hand and now goes first. The first to play all of their cards wins the round and waits for the other players to finish resulting in a ranking of 1 
    to 4. Cards are then dealt once again and players trade cards: the rank 1 player trades two of any of their cards with the rank 4 player where the rank 4 player must trade 
    their 2 best cards. Similarly the rank 2 and 3 players also trade, except it is only one card. The game continues in this vain until a set number of rounds pass. The 
    ultimate winner is the player with most points.
  </p>

  <p class='blogpost'>
      Rather than dig out and set up my old Playstation I decided to create my own version of 'Rich Man'. Early in the design process I had the idea to not only re-create 
    the game but also to add a little extra flavour to it in the form of card abilities; now it's not only the Joker that has a special ability but every card. I also decided 
    to theme the cards after fantasy elements rather than using traditional playing cards and thus Oogaah (Of Orcs, Goblins and also Humans) was born. Each card is either red 
    or blue which represent Orcs and Goblins, or Humans (this is mostly cosmetic) -- the special card (essentially the Joker) is rainbow coloured, naturally.
  </p>

  <p class='thumbbar'>
    <a href='/site/oogaah/cards.png'><img class='thumb' src='/site/oogaah/cards.png' title='oogaah-cards' width='213px' height='182px'></img></a>
    <span class ='thumblabel'>
        A side by side view of all the cards that constitute the game.
    </span>
  </p>

  <p class='blogpost'>
      Oogaah's AI system is a simple one: each AI player has a store of behaviours (example behaviours might be 'Combo' which causes the AI to prefer to hold onto cards 
    to play bigger and better combos, or simply 'Beginner' which causes the AI to play at a lower level and make more mistakes) and when an action is required the AI pools 
    all of these behaviours. The behaviours each add a weight value to their choice (some decisions are as simple as yes or no whilst others are more complex) and the choice 
    with the highest resulting weight is performed. This allows for some behaviours to be more dominant during certain actions. If there is a tie then a decision will be 
    chosen at random.
  </p>

  <p class='thumbbar'>
    <a href='/site/oogaah/ai.png'><img class='thumb' src='/site/oogaah/ai.png' title='oogaah-ai-system' width='479px' height='254px'></img></a>
    <span class ='thumblabel'>
        An example of an AI decision process.
    </span>
  </p>

  <p class='blogpost'>
      The image above shows what the process behind an AI decision might look like: a previous player played three Goblin Technicians. The AI then makes a decision based on what's in their hand (other factors may 
      also be considered depending on the behaviour). Each behaviour chooses what it thinks is best. You'll notice they all decided the same action (although the 'Beginner' 
      behaviour was more certain of their action). After the result is played out another decision is required immediately due to the activation of an ability. Here the 
      behaviours diverge:
  </p>

  <p class='blogpost'>
      'Tempo' wants to maintain control of the game and so decides to play Being of Energy which guarantees they will win this hand and have first play 
      in the next (it values this move highly as it is a huge tempo gain).
  </p>

  <p class='blogpost'>
      'Combo' wants to play the Orc Shaman. The thinking behind this move is that it is then possible to 
      play Being of Energy to win the hand and then combo out the remaining cards. The reason 'Tempo' didn't go with this play is because it is not guaranteed if another 
      player activates certain abilities (it assigns a medium weight to this action as the combo is not particularly huge).
  </p>

  <p class='blogpost'>
      Finally, 'Beginner' wants to play Goblin Horde. 
      From an experienced point of view this is not a strong move as it breaks the possible combo with Goblin Overseer and potentially loses tempo since it opens up EVERY 
      other single card (except another single Goblin Horde). However, 'Beginner' values this move highly and so we end up with a tie between two actions; the tie is resolved 
      by simply picking one at random. As a result we have a play made by the AI and now the next player takes a turn.
  </p>

  <p class='blogpost'>
      The game is complete insofar as it is playable and meets the initial goal set: to create a card game similar to the one I used to play when I was younger. 
    That being said there are definitely some incomplete or just plain absent features, the most prevalent being:
    
  <ul>
    <li>
        Incomplete tutorials - I started work on some interactive tutorials that teach the basics of the game and UI but never got around to finishing them off.
    </li>
    
  <li>
      No win detection - A round plays out fine and the game will rank players depending on how they finished, but there is no new round afterwards and no swapping 
    of cards requiring the player to refresh to begin a new one.
  </li>
    
  <li>
      Lack of AI options - Whilst the AI system is fully in place, only one basic type of AI is available.
  </li>
    
  <li>
      Missing UI elements - The UI is fairly complete and adequate enough to allow the game to be played but it is missing some elements and features such as a 
    visual indication on how to leave certain screens (pause, card preview, etc all require the player to press the 'p' key) or widgets to customise AI parameters 
    such as name and behaviour.
  </li>
    
  <li>
      No audio - There is no audio in the game. I added basic audio support to the engine whilst working on Oogaah, and at one point even had some basic sounds 
    implemented (such as deck shuffling and dealing) but I wasn't happy with the quality and so put it on the back burner.
  </li>
    
  <li>
      No animations - There are no animations when an action occurs and so it happens instantly which can make it hard to follow the chain of events. The console 
    does help in this regard as it documents each move as it happens, but some simple animations would vastly improve the player experience. I did have some shuffling 
    and dealing animations in but removed them temporarily alongside the audio (see above).
  </li>
    
  <li>
      Unfinished visuals - The graphics of the game are simple, clean and convey the information neccesary to play but I wanted to have illustrated cards, a choice 
    of card styles, avatars for the AI and a more visually gratifying game board.
  </li>
  </ul>
  </p>
</div>
