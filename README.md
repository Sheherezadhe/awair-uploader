# Awair-uploader
This is a community based opensource tool that is capable of fetching data of Awair Element devices from Awair servers and send them to a custom endpoint.
The idea behind this project is to send these data to PlanetWatch servers in order to be able to be still elibile for rewards.

## First Release
I've finally finished a first, basic version of this tool. I wanted to very hurry up cause i know the community needs this kind of functionality.
I'm goint to upload two builds of this tool at the first very moment:
- one for windows (x64)
- one for MacOs (M1) (I've tested on M1 but i'm not sure it will work only on M1, but also on Intel, just drop a comment if you can't run this on Intel)

## Second Release
Added two Pull requests
Added more detailed logs to better understand why the tool is not working properly
Added the token refresh (i hope this will prevent the app to stop working after 24h)

## DISCLAIMER AND WARNINGS
This tool was built in very few days so it can be full of bugs. For the time being i've found one main issue while using this tool. Since the authentication is a tricky process, once you launch the application you have to force the reload when it got stucked on "Loading..." page using the "View" -> "Force Reload"

## Download - Installation - Setup - Running the tool:
Please check my step by step guide on reddit for the user approach:
https://www.reddit.com/r/PlanetWatchers/comments/tscbe3/project_awair_element_user_data_retrieval/

The version on Reddit will be updated more frequent and includes pictures and a more step by step approach for regular users.


## Download:
go to github repository https://github.com/Sheherezadhe/awair-uploader/
click on the tag flag on the right side for the lastest current version
you get to the repository overview and there you only download the version you need, Windows, macOS, etc.




## How to use this tool
1. Open the tool
2. If it gets stuck loading, pick under view "force reload" until you get the PlanetWatch login screen.
3. Log in with the PLANETWATCH CREDENTIALS (Read the disclaimer, if you got stucked, pls refresh with Force Reload (even several times))
4. Getting tokens from app: (not recommended, better from browser, less bugs) Open your Awair Home Application, Click one of your sensors and press Awair+, Awair APIs Beta, Cloud API, Get API Token. Once you have clicked the Get API Token you will be able to insert the AWAIR HOME Credentials. Then you will be able to grab the token (ex: eyJ0......)
5. Getting tokens from browser: (usually this method is far more stable and gives clean paste)

    go to https://developer.getawair.com/

    log in with your awair account

    first tab left "access token"

    copy paste the API Token (ex: eyJ0......)
    
6. Once you got it insert it into the "Add sensor" section (into the search bar).
7. Search
8. Press "Add your token"
9. Repeat from step 3 for EACH awair account you own
10. Finish!

Mini FAQ:

Q: Can you help Sheherezhade the dev? (thats me ❤️)

A: Not yet and mostly only if you are a dev and after the next update improve it.


Q: Does Sheherezhade accept donations?

A: No absolute not! I only accept likes on my post and on github! (please no more reddit gold or any expensive things, don't waste money on such things!)


Q: Can it run on raspberri?

A: Yes it could, as it works on linux, but I will need others help to adapt it faster there.


Q: Does every Awair need a PC?

A: No, this tool can only connect to one PW user account but to infinite Awairs.


Q: Do I need a Pc in every hosts house? 🤣 👋

A: No you need the tool to run on one device but not in same house!


Q: Why don't you go online tool without device? 🤷🏽‍♀️

A: Others can adapt my tool to do this, I need to focus on this direct version now!


Q: How many Awairs can I connect? 🦗🦗🦗🦗🦗🦗

A: Read my comment here! <== for details, but it can run many, many, many!


Q: Why not go DNS server blablabla ....? 😔😔😔😱🙈🔥

A: Check my answer here! <== more details needed


Q: When docker, when executable, when NAS, when rasbian (wen wen wen)

A: This is work in progress, let us fírst make it work, then let everyone spinoff!


Q: Does that work on Windows, Mac or Linux?

A: Yes on all!


Q: Is it safe for the user?

A: Yes of course, you can check the open source repository it is 100% clean!


Q: Can it run on a android phone or small android box?

A: It could with some variation, but others should make that to have it fast!


Q: Does the PC need to stay on?

A: Yes sadly in my first version still needs to stay on and no sleep mode!


Q: It says only retrieving data what now?

A: That means it is already running!


Q: Multiple instances on same PC?

A: Of course, just don't use the "remember me" function on the login, and then once you have all tokens added and its running, simply click the desktop icon again for a second instance. Repeat this for as many instances as you want. (Within your PC's resources)

## Contributing

The project was developed on MacOS and the building section is only for MacOS. Feel free to contribute to the project by adding your distro building section (Windows/Linux) with a Pull Request. 

If you still want to install this tool, just run clone the repository and run the following commands:
```sh
npm install
npm start
```

If you want to create a standalone version of Awair-uploader, run the following commands:
```sh
npm run make
```

I will appreciate any help to improve of the code.
