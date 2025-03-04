# TAXES KATA

## Description
This problem requires some kind of input. You are free to implement any mechanism for feeding
input into your solution (for example, using hard coded data within a unit test).
You should provide sufficient evidence that your solution is complete by, as a minimum,
indicating that it works correctly against the supplied test data

## Problem
You need to write a program that calculates the total taxes and the total cost for a list of
products. The rules for calculating taxes are as follow:

## Expected Output
A basic sales tax of 10% is applied to all goods, except books, food, and medical products.

Input 1
```bash
2 book at 12.49
1 music CD at 14.99
1 chocolate bar at 0.85
```

Expected Output
```bash
2 book: 24.98 
1 music CD: 16.49
1 chocolate bar: 0.85
Sales Taxes: 1.50
Total: 42.32
```


## Info

The exercise is written in Typescript and tested with Vitest

### How to run 

```bash
npm install
npm run dev
```
Then you can see the result in console or directly on browser at: http://localhost:5173/

### How to test
```bash
npm run test
```


