# What?
`ramda-in-fl4m3s` is a complementary utils library that adds new functions on top of ramda.

# Why?

`ramda` is great but most of the time we end up re-declaring a specific set of function over and over again, copying and pasting our utils files from project to project. 
Which version of my utils is the latest? Which one has issue X fixed? You don't know ... This aims to fix that, by proving a simple list of complementary functions to ramda that most people ( or at least I ) use, so they don't have to redeclare it over and over again.

# API

This utils comes with the following extra functions:

 - notEmpty
 - allEqual
 - notNil
 - assocTrans
 - isFunction
 - isNumber
 - isMap
 - isString
 - isArray
 - renameProp
 - mapToSequentialPromises
 - promiseAll
 - mapAsyncFn
 - compact
 - seedlessReduce
 - then
