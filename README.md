# myFlix-client

The code will allow for a client interface to be built using REACT.  This will consume the API endpoints created in achievement 2 and enable the data in the various collections to be accessed.

Additional description about the project and its features.

## Built With

- [JavaScript](https://www.javascript.com/)
- [REACT](https://reactjs.org/)
- [Postman](https://www.postman.com/)
- [Parcel](https://parceljs.org/features/production/)

## Live Demo

The project ran locally using **parcel build**.  
The live link is hosted by Netlify at https://naughty-fermi-c7c82c.netlify.app/

## Getting Started
<npm init> was used to create a package.json file to allow for dependencies to be added.
A basic template structure was created to test installed REACT dependencies 

The build tool Parcel was installed using the `npm install parcel@2.0.0-beta.3.1 -g` command as the init parcel version was not functioning.
Parcel was run and this created a dist folder structure which acts as templates which will be added to later in the achievement.

The folder struture was built on further within the src folder to enable components for movie-cards, movie-views and a main view.
Onclick functionality was added to allow for movie details to be displayed.

To get a local copy up and running Parcel will need to be locally installed on your machine. 
  
The current run command is `parcel src/index.html`

### Install

  `npm install parcel@2.0.0-beta.3.1 -g`
  
### User Stories

  1) As a User I want to access information on movies, directors and genres so I can learn about movies I am interested in.
  
  2) As a User I want to be able to create, delete and edit my User information.  
  
  3) As a User I want to be able to add and delete my Favourite Movies to/from my User Profile. 

### Run tests
Some run tests were made after the Parcel build in order to check the html page was automatically updating when the code changed.  Also to ensure the css file was rendering the index.html page correctly and the information was being displayed. 

The site was then run on a localhost so changes to the DOM could be dynamically visible and the functionality of the event code and views could be tested.
    
Further tests were conducted using a combination of Parcel and Postman.  This ensured the correct endpoints were called by the functions and their execution (e.g. updating a user profile makes the correct call to the update user endpoint)

### Deployment

Under development

## Authors

👤 **Simon Hart - student developer**
👤 **gcy2312 - web developer**
 

- Github: [@githubhandle](https://github.com/githubhandle)
- Twitter: [@twitterhandle](https://twitter.com/twitterhandle)
- Linkedin: [linkedin](https://linkedin.com/linkedinhandle)

👤 **Author2**

- Github: [@githubhandle](https://github.com/gcy2312)
- Twitter: [@twitterhandle](https://twitter.com/twitterhandle)
- Linkedin: [linkedin](https://linkedin.com/linkedinhandle)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](issues/).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

## 📝 License

This project is [MIT](lic.url) licensed.
