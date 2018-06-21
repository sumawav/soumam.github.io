# Touch Controls
![Steredenn](img/steredenn_clip.png)
#### _"when I think about you..."_
###### *June 15th, 2018*



The mobile browser is pretty sharp when it comes to multi-touch events. The API is smart enough to keep track of multiple touch events on the screen. It will deposit those events into an array (```event.touches```)

So if you swipe down with three fingers, there will be three elements in the array, each corresponding to one of your fingers. It's this multi touch capability that actually causes some confusion in our  implementation. But first, what IS our implementation anyway?

### [Steredenn](http://steredenn.pixelnest.io/)

Steredenn is a fantastic, roguelike, horizontal shooter. Like Space Cats, it also makes use of BulletML for Unity.

I really like the control scheme for Steredenn. When you touch and drag on the screen, the ship matches the movements of your fingertip. To be clear, you don't have to _touch_ the ship. you can touch anywhere on the left half of the screen and as you drag the ship will move in that direction.

I don't think it's an exact 1-to-1 since you can't just fly all the way across the screen with a single finger swipe.

The way it is implemented in Space Cats is we check the _change_ in x,y coordinates for a touch event. This change in position (or Delta) is used to determine the instantaneous velocity of the player. This should work right?

_not exactly_

Here's the problem. It mostly works, but when you lift your finger and place it down somewhere else, say across the screen. The Delta registers as a ginormous value - this distance between where you lifted your finger versus where you put it back down. And then the cat goes flying since it just received a huge velocity.

_This is no bueno._

So what we need to do, is make sure when your finger touches the screen, there isn't a previous touch event to compare to. This is pretty easily accomplished by hooking into the ```event.touchend``` event. 

Basically, when a touchend event happens in the movement control area, we destroy all touch events. This essentially enforces a single touch zone. As such, we only need to consider the first touch event in the ```event.touches``` array.

This is implemented in [engine.js](https://github.com/soumam/space-cats/blob/master/js/engine.js) It's a bit of a mess right now, but I've described *basically* how it works. 

I've found that people playing Space Cats aren't immediately aware how the touch controls work. I think a simple intro could help with that. I want to avoid having a "tutorial" to bore the player.