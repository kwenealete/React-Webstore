Below are instructions on how to run the project on your system; Also found in this file will be the reason around my choice of technology and how it/they contribute to making this project a success!!

# BUILD

Running this project on any system will require a few steps to be fulfilled:

1. We will need to download the project folder in our local machines.
## Project Installation

In order to get the complete project files in your local machine, you will need to clone the repo and get the various files by migrating to the frontend and backend seperately and running the following command
''' npm install '''

2. A database is a prerequisite for the backend of this project to run which also plays a huge role in storing data being sent via the frontend. Here is how to get a database setup: 

## Database setup

You could chose to go with either a postgresql database or a mongodb database. The link below can be used to setup either a mongodb or postgresql database:
    https://v5.keystonejs.com/quick-start/adapters

Your database setup configuration URL can be passed to the backend on the ''' .env ''' and '''keystone.js ''' file, this will establish connection between your db and the backend. Do not forhet to change the adapter on the keystone.js file if you are using postgres.

## Email generating provider

Certain part of the project will require an email gerating platform for it to be functional. the link below can be used to create one and the credentials passed to the .env file on the backend
        https://ethereal.email/


## Starting the project

To run the project: open 2 seperate terminals and run the following command to get the frontend and backend running simultaneously

frontend : 'npm run dev'
backend: 'npm run dev'


# CHOICE OF TECHNOLOGY(TECH STACK) AND THEIR STRENGTHS

Thesame way building materials are to a house, is the exact same importance tech stack is to IT projects, which is consequential as it is what we(developers) use to build software programs. Thus, it is an important phase before delving into building an application and a great deal amount of time needs to be given to it.

Before I go into why I chosed the tech stack used for this project, I'll firstly give a few criterias that helped in making my decision:

1. Project type: the chosen tech will greatly depend on wether you are building a small, mid-size or complex project. The size and complexity, processing strength and business goals will greatly affect your choice of technology, e.g building an order management system will involve a combination of programing languages, meaning a complex project. Hence the tech stack needs to be more sophisticated with diverse functionalities and integrations.

2. Scalability: this is the ability of an application to support the increase in the number of users and functions. This needs to be considered in both vertical and horizontal directions enabling several servers running at a time to handle user traffic flow and permit the addition of more programs for new data types to be processed respectively.

3. Community: We as developers enjoy knowledge sharing and making use of a technology with a large developer community with a ready and easy to read documentation is a huge attraction. platforms such as github and Stackoverflow are great places to share knowledge and find help from diverse people united under a common langauge.

4. Another factor worth mentioning is maintenance. Choosing programming languages that work effectively with short, reusable and easy-to-maintain code is every developer's dream. A simple and average length codebase helps developers to accord a short time to review, debug and process codes.

So, having said all that; find the tech stack used to execute this project and the reason(s) surrounding the choice made.

### React
React ia a library for building user interfaces. it will take data, put it into templates and then render it out to the DOM or web browser, but the one poweerful feature of react is when that data in the templates updates, where react is vey great at knowing how to effectively and efficicently execute that update on the page. This is the core of the package, not forgetting other advantages like state management and many others. 

### Next.js
This a framework for react, and its super important and helpfull as it takes the good stuff of react and adds other features like routing, pages, static rendering on demand or server rendering, images. Basically it takes things needed out of a framework interms of how are pages done, how is the application built, how is it being deployed and a lot more and then puts it into a framework for you. This makes the packge a very powerful tool withing the engineering ecosystem.

### Apollo Client
Apollo is a company which does a lot of things around GraphQl and highly involved in its development. In order for you to be able to query data, we need a way to interface with the graphQl API, load in the data, take care of loading and error states, we need to be able to cache in the data and avoid going to the network all the time, and Apollo client is extremely good at doing that which makes it soo important in building graphQl applications. So each time we will need to push or fetch data from the server, apollo client will come in handy.

### Styled Components
Scope css is very well handled by styled components in react. Styled components will help in creating reusable styles and use it wherever needed within the project as long as the scope is thesame, this means for example all h1 tags could have the same styling and rather than doing it individually, it could be stored in a variable and referenced whereevr required. The main advantage of styled components is allowing us how to write css in react applications and more importantly, writing modular scope components that can be reused. Making changes to the styles is quiet easy as it is being done in one place and the changes is applied everywhere it is referenced.

### Keystone.js
Untill now, every tech stack talked about has been focused on the frontend. Keystone is a framework that provides a headless CMS, and will provide us with a graphQl API based on the CRUD (create, read, update, delete) opeations. It is written in Node.js and every resolver will be in javascript. Under the hood, it hooks up to databases and gives 2 possibilities; either making use of MongoDB or PostgreSQL or even Prisma making very handy with these options. The one powerful featue of this library is the choice of database is not an issue as the code written will be figured out under the hood by keystones. We will use keystone on our backend.

These are the main tech stack that is used in building this application. It is important to highlight that there are so many other fantastic options available, but these set of technologies used here where more appealing to me due to them being extremely well supported, and actively developed. 