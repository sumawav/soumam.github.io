# Making a Blog 
#### like, literally making it
###### *June 7th, 2018*

I remember pulling out quite a bit of hair before placing Jekyll in the trash. Surely it can't be that hard to make a lightweight static blog?


We'll use [showdown](https://github.com/showdownjs/showdown) to do the converting from markdown to html.

We'll store blog posts as markdown files. Then our blog will request a .md file, convert it into html, and append it to the page. Super simple. In fact, all of the pages in this website will now just be blog posts.

Eventually, I'll make a directory structure for searching and tagging, but for now we'll keep it easy.
