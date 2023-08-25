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

Use should be able to see Account Activity up on clicking Account Infomation. Account Activity belongs to Product API specific to Account API and Transaction API.

User should be able to see Reward Activity which is owned by Card Rewards API.

User should be able to make a Payment on the Card, which is owned and supported by Car Payment API.



