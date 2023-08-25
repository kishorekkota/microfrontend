# microfrontend
Microfront end concepts with exampls.

This repo covers below topics on Micro Frontends.

Build a micro frontend app which pulls in information from other APP using React Components via runtime composition.

Few guideline to be followed.

- All of the UI apps will be using leveraging reusable components at a lower level, as you go higher components represent specific functionality and journey.
- Approach UI as a Product way.
- Experience as a Product.
- Product API provide core functionality needed for UI. Product API here is going to be refered as Core Product API instead to draw distiction from Experience built as a Product.


What I would demonstrate here is ?

Build a shell app which bring in content from different Micro Frontend as the user navigates from one page to another page.

Here is the classic Credit Card example.

Use should be able to see Account Activity up on clicking Account Infomation. Account Activity belongs to product apis specific to **Account API** and **Transaction API**.

User should be able to see Reward Activity which is owned by **Card Rewards API**.

User should be able to make a Payment on the Card, which is owned and supported by **Card Payment API**.

TO DO

Build backend API 

Account API

Transaction API

Card Rewards API

Card Payment API

We will try to leverage BIAN Spec as much as possible. Only goal was to build the API interface, no working functionality.


Build Experience API

Which aggregates information from different Products API as needed. These can be seen as view helpers.

Experience API will be dedicated for each experience. Web will have it's own, native app will have its own.


