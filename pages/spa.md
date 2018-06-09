# Accidental SPA
![can't tell if](img/frysquint.jpeg)
#### "You look sorta familiar..."
###### *June 9th, 2018*



Funny how thing this blog turned into an SPA. The first challenge was linking from one post to another. It seems simple enough but it turned into a [rum do](https://www.phrases.org.uk/meanings/307350.html) for a minute.

Problem: Since calling a function is the only way to load posts, there is no way to link to a post in markdown. This didn't even occur to me until I wanted to link from one post to another. 

Solution: The url#hash is now used to route to posts. There's a handy ```window.onhashchange``` event. Now links created in markdown just need the syntax:
```
[link title](#<post-title-here>)
```

Boom. The [Read More>>](#games) link in the games post can now link directly to the [SPACE CATS](#spacecats-Intro) post.