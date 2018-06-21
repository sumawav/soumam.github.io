# Apostrophe
#### _if you keep saying it it starts to sound weird_
###### *June 21st, 2018*

Searchin' USA is a fun but rather non-descriptive name. Then again, what would you think a product called Google does if you already didn't know?

I wanted to re-create a wildly popular tool I made at a previous job. It was a search tool that made use of Elasticsearch. The goal was to recreate that interface, but have a different set of data to search on. After some looking around, I settled on [Food Establishment Inspection Scores](https://data.austintexas.gov/Health-and-Community-Services/Food-Establishment-Inspection-Scores/ecmv-9xxi). That information seemed useful.

The first real problem that I didn't find an immediate solution for was the way Elasticsearch likes to handle apostrophes. Suppose we log into the elasticsearch db :

```Tyson's Tacos```

The standard [analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-analyzer.html) in elasticsearch actually stores that name as:

```
{
    "token": "tyson's",
    "start_offset": 0,
    "end_offset": 7,
    "type": "<ALPHANUM>",
    "position": 0
},
{
    "token": "tacos",
    "start_offset": 8,
    "end_offset": 13,
    "type": "<ALPHANUM>",
    "position": 1
}
```

so when you search for ```Tyson's``` this document will show up in the results.

_but here's the thing_

In many cases people don't bother with apostrophes when searching. I first noticed my friends do this when testing my app. Then I realized I do this all the time too. I find that I can't really test my own app.

I decided I wanted the terms:

```
tyson's
tyson
tysons
```

to all result in a match. The first thing was to use a different analyzer than the standard. I came up with this:

```
"analyzer": {
    "place_names": {
        "filter": [
            "lowercase",
            "custom_delimiter"
        ],
        "type": "custom",
        "tokenizer": "standard"
    }
}
"filter": {
    "custom_delimiter": {
        "type": "word_delimiter",
        "preserve_original": "true"
    }
},
```

The non-standard part here is the ```word_delimiter``` filter. This does a [bunch of things](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-word-delimiter-tokenfilter.html) including removing apostrophes and all the letters after it. We also set the flag ```preserver_original``` to true so the orginal word is preserved. The tokens now look like:

```
{
    "token": "tyson's",
    "start_offset": 0,
    "end_offset": 7,
    "type": "<ALPHANUM>",
    "position": 0
},
{
    "token": "tyson",
    "start_offset": 0,
    "end_offset": 5,
    "type": "<ALPHANUM>",
    "position": 0
},
{
    "token": "tacos",
    "start_offset": 8,
    "end_offset": 13,
    "type": "<ALPHANUM>",
    "position": 1
}
```

This takes care of the ```tyson``` and ```tyson's``` cases. The last case is taken care of client-side.

```
let cleanedString = string
    .replace(/[Ss](?!\S)/g, "s~1")
```

This regex looks for words that end with an ```s``` and replaces it with ```s~1```. This activates a fuzzy search with a value of 1. This way, a search for ```tysons``` will match.

With all that done it STILL didn't work on iOS. Turns out, iOS's default apostrophe is actually the single end quote. It's a setting that can be changed, but it's on by default. As much as I love my iPhone, this was a really bad design choice. So the client side code became:

```
let cleanedString = string
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[Ss](?!\S)/g, "s~1")
```

this replaces weird apostrophes with the standard apostrophe. It does the same for double quotes as well.

WHEW. I suspect there's a better way to approach this, but I wasn't able to find a succint solution that would cover the three cases I wanted.