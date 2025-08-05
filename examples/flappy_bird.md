# Flappy Bird Clone Tutorial

In this tutorial, we'll create a simple "Flappy Bird" style game. The player will control a bird that must fly through a series of pipes without touching them or the ground.

## Step 1: The Bird Sprite

First, create a new sprite for our hero. Let's name it "Bird". We'll need one variable for this sprite, so go to the "Variables" category and create a new variable called `y velocity`. Make sure it is for this sprite only.

### Making the Bird Fall

To simulate gravity, the bird needs to constantly fall downwards. We can achieve this by repeatedly decreasing its y-position.

```scratchblocks:en
when gf clicked
set y to (0)
set [y velocity v] to (0)
forever
  change y by (y velocity)
  change [y velocity v] by (-1)
end
```

### Making the Bird Flap

When the player presses a key, the bird should get a small upward boost. This is the "flap" action. We can do this by setting its vertical velocity to a positive number.

```scratchblocks
when [space v] key pressed
set [y velocity v] to (10)
```

## Step 2: The Pipes

Now for the obstacles. Create a new sprite named "Pipes". The costume for this sprite should be a pair of pipes with a gap in the middle for the bird to fly through.

### Creating a Stream of Pipes

We want a new pipe to appear on the right side of the screen every few seconds. We can do this by creating clones of our "Pipes" sprite.

```scratchblocks
when gf clicked
hide
forever
  wait (3) secs
  create clone of [myself v]
end
```

### Making the Pipes Move

Each time a new clone is created, it should start at the right edge of the screen and move left. We'll randomize the y-position to vary the gap height. When the clone reaches the left edge, we should delete it.

```scratchblocks
when I start as a clone
go to x: (240) y: (pick random (-80) to (80))
show
repeat until <(x position) < (-240)>
  change x by (-5)
end
delete this clone
```

## Step 3: Game Logic

Now let's add the rules for winning and losing.

### Scoring

Create a new variable for all sprites called `score`. We'll increase the score each time the player successfully navigates through a pipe. For simplicity, we'll add a point after a pipe has moved all the way across the screen. This logic goes in the "Pipes" sprite.

Modify the pipe clone script to add the scoring piece:

```scratchblocks
when I start as a clone
go to x: (240) y: (pick random (-80) to (80))
show
repeat until <(x position) < (-240)>
  change x by (-5)
end
change [score v] by (1)
delete this clone
```

And don't forget to reset the score at the beginning of the game. Add this to the "Pipes" sprite as well:
```scratchblocks
when gf clicked
set [score v] to (0)
```

### Collision and Game Over

The game should end if the bird touches a pipe or falls to the ground. Add this script to the "Bird" sprite. It will check for a collision and broadcast a "game over" message.

```scratchblocks
when gf clicked
forever
  if <<touching [Pipes v]?> or <(y position) < (-170)>> then
    broadcast [game over v]
  end
end
```

Finally, we need to tell all sprites what to do when they receive the "game over" message. Using `stop all` is the easiest way to end the game. Add this script to the "Bird" sprite.

```scratchblocks
when I receive [game over v]
say [Game Over!]
stop [all v]
```

## Conclusion

And that's it! You now have a basic but functional Flappy Bird clone. You can expand on this by adding sounds, more interesting graphics, or a start screen. Happy coding!
