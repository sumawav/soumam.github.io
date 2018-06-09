# lunr.js
#### A bit like Solr, but much smaller and not as bright.
###### *June 8th, 2018*


Funny thing: this blog became an SPA. The first challenge was linking from a blog post, to another blog post. It seems simple enough but it was a [rum do](https://www.phrases.org.uk/meanings/307350.html) for a minute.

First problem: because a calling function is the only way to load posts, there's no way to link to a post. This didn't even occur to me until I wanted to link from a post to anothr. 

Solution: The url#hash is now used to route to posts. There's a handy ```window.onhashchange``` event. Now links created in markdown just need the syntax:
```
[link title](#<post-title-here>)
```

Boom. The [Read More>>](#games) link in the games post can now link directly to the [SPACE CATS](#spacecats-intro) post.


oh yeah, and i want to try to use [lunrjs](https://github.com/olivernn/lunr.js) to make a searchable db. it might be an easier option than rolling my own.