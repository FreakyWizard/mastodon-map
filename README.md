# Mastodon map view

A React application to shows Mastodon posts on a map.
The application looks for posts that follow a certain [markup](#markup), posts recognized by the system will be shown on the map.

## Context

This project was set up as a Proof of Concept for
an assignment from [Amsterdam University of Applied Sciences](https://www.amsterdamuas.com/) and the [Innovation Department of the Municipality of Amsterdam](www.amsterdam.nl/innovatie/).

## Features

- Interactive map displaying posts (following a certain [markup](#markup)) from the Fediverse
- Tool to help and create posts with the needed [markup](#markup).

## Technologies

- ReactJS
- LeafletJS
- Data from OpenStreetMap

## Markup

Posts must have the following markup:

```text

@accountnameformap@instance.tld {the message to be shown}

[lat={lat} lon={lon} title={title}]
```

## How does it work

## The map

The Mastodon Map account needs to retoot all posts that mention it. 
This way the map can request the statuses from that account and fill the map.

## Create post

Its a simple from that helps you to write a post with using the right Markup. 
Using the [Intent Toot](./src/components/form/IntentToot.js) functionality one can easily post it on Mastodon.
Please make sure your toot is public!