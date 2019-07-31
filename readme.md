
    Tourney_Bracketz

This web application will allow any user to provide a number of names (between 3 & 64) and the application will randomly assign these names into a tournament bracket and apply byes as needed. The users can indicate winners in any contest to advance to the next level of the tournament. A list of features is below:

    Any user can create a bracket.
    To save a bracket the user must be registered.
    User can style the bracket (name the tournament, upload images, etc)
    Alert all (registered) participants by email after tournament created
    Generate PDF of tournament for printing at any time

    Stretch goals:
        Allow posting of the bracket to twitter/facebook/IG
        Allow for double elimination tournaments
        Track score per contest
        Track games per contest (for instance, if it's best 2 out of 3 to advance to the next round)
        Make mobile version

Getting Started
Clone the repository
run NPM install from the root directory of this repository to install dependencies

Database Initialization
    We are using MySQL Server (I'm using version 5.6) as the backend for this project.

    Install MySQL Server https://dev.mysql.com/downloads/mysql/
        Note: I am using MySQL Server 5.6.40. That is NOT the current version.
    
    Install database visualization software. https://dev.mysql.com/downloads/workbench/
        Note: I am using MySQL Workbench ver 6.3.10. That is NOT the current version.
    
    The following instructions assume you are using the tehcnologies mentioned above
    
    When you open MySQL Workbench you will need to make a connection to your MySQL server. Click "Setup New Connection" or click on the plus icon to pull up the dialogue box. Enter data into the fields:

        Connection Name: This is the name of your database and can be whatever you like. This will be referenced as the db_name later.
        Connection Method: Accept the default value (TCP/IP)
        
    On the parameters tab:
        Hostname: Accept the default value (127.0.0.1)
        Port: Accept the default value (3306)
        Username: This is your username and can be whatever you like. It is "root" by default.
        Password: This was set (or left blank) during the installation process
        Default Schema: This indicates which table within your database will load when you open MySQL Workbench. You can leave it blank.

    I leave the SSL & Advanced tabs at their default settings.

    Now we're ready to test the connection. So, hit the "Test Connection" button on the bottom right. If this succeeds, move on. If not, double check your settings and make sure the MySQL Server is running.

    Double click on the card that represents the connection that you just made.
    Click on the Create New Schema icon in the taskbar (cylinder with 3 sections)
    Enter a name ("tourney_bracketz")
    Now you have an empty database on your MySQL server.

    Open your code editor and navigate to the .env file in the root directory. If you don't have it, create the file .env. Make sure to add this to your gitignore. Copy the fields below & Fill in the values you created in the previous steps. Do not change the names of the items, just the values. You do not need quotes around these values.

        SCHEMA_NAME=the_name_of_your_schema (Connection Name you provided earlier)
        DB_USERNAME=root
        DB_PASSWORD=your_password
        DB_DATABASE=tourney_bracketz
    
    On the command line, run npm install if you haven't already. Then, run this command from inside this project:

        sequelize db:migrate

   If you get an error saying that 'sequelize' command doesn't exist either:

   1. Install sequelize globally with correct version.
   2. Run 'npm run migrate' from the command line.

   When this runs it will generate the tables that you need in your database. Refresh your MySQL view and you should see the tables have been created.

   If you need to run this again, in MySQL drop the sequelizemeta table.

   To populate dummy data, run this command in the command line:

   sequelize db:seed:all

   This will generate data based on the files in the /migrations folder. If you run this multiple times you will get multiple entries of the dummy data. So, keep an eye on your database.

   To access tournament data hit the http://localhost:8888/json/ route and append the tournamentID that you want to see. For instance, http://localhost:8888/json/1 will return all of the players associated with Tournament 1. If you enter an invalid tournament ID you will recieve back an empty object.















Prerequisites:

Running the tests

Deployment

See "build-env-notes" file for break down of the development and build process.


Built With
Node.JS
Webpack


Contributing
We are not looking for outside contributions at this time. Feel free to fork this project for your own use.

Authors
Matt Palumbo
Tom Cariello
Dean Russell Rivers III
Brandon Casasnovas


License
This project is licensed under the MIT License - see the LICENSE.md file for details


