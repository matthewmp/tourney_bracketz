Feel free to add to this list and/or comment on anything ahead of our discussion.
I'm trying to be specifically verbose here.

Technology being used:
    Node.JS
    Express Server
    Webpack
    Babel
    Pug - For templating the webpages served to the users

Technology likely to be added:
    Passport: Session Management. This tracks a logged in user & verifies they have access to what is being requested.
    BCrypt: Encrypts data to be stored into the database
    MySQL: Our backend database
    Sequelize: Our ORM (most likely).
    Heroku: A git-direct deployment option.

To Do (Research):
    Talk to sports friends and see how they might want to use this app.
    Understand the point of brackets
    Decide if we want to address double elimination tournaments

To Do (Programming):
    Frontend:
        General:
            Design logo
            Select color palette
        / (Home):
            Hero image/Animation/something to bring life
            Design name entry setup for cleanliness & ease of use
        /Userdashboard:
            What information would a multi-time user want to see?
            Lay this information out
            Drill into each tournament that was saved

    Javascript:
        Accept name entry from user. 
            Seperate fields or single fields with hard returns to determine seperate players?
            If they are registered, can we help select based on friends (or previous tournaments?)
        Determine which tournament is the right fit (4,8,16,32,64)
        Determine how many byes are required
        Determine where those byes should be allocated
        Generate brackets. Allow user to re-shuffle or finalize these brackets.
        Should we have a "seeds" option?
        Personalization:
            Allow user to select from some different bracket styles
            Alow user to name the Tournament and each bracket
            Allow user to upload an image to add to the bracket
        On finalize, present options to user:
            View HTML and print
            Send email with PDF (they have to provide their email(s))
            Text them an image of the brackets (they have to provide their phone number)
            Save this tournament (they have to register to do this)
        A registered user can:
            Create a new tournament using an old tournament (in the dashboard?)
            Indicate who won each game of a tournament. Also, the date/score/what else? Only the creator can do this?
            One click share any bracket on Twitter

    Database:
        Create database(s)
        Work with JS side to handle form submittal
        Create DB calls as needed per route
