# Awair-uploader
This is a community based opensource tool that is capable of fetching data of Awair Element devices from Awair servers and send them to a custom endpoint.
The idea behind this project is to send these data to PlanetWatch servers in order to be able to be still elibile for rewards.

## First Release
I've finally finished a first, basic version of this tool. I wanted to very hurry up cause i know the community needs this kind of functionality.
I'm goint to upload two builds of this tool at the first very moment:
- one for windows (x64)
- one for MacOs (M1) (I've tested on M1 but i'm not sure it will work only on M1, but also on Intel, just drop a comment if you can't run this on Intel)

## DISCLAIMER AND WARNINGS
This tool was built in very few days so it can be full of bugs. For the time being i've found one main issue while using this tool. Since the authentication is a tricky process, once you launch the application you have to force the reload when it got stucked on "Loading..." page using the "View" -> "Force Reload"

## How to use this tool
1. Open the tool
2. Log in with the PLANETWATCH CREDENTIALS (Read the disclaimer, if you got stucked, pls refresh with Force Reload (even several times))
3. Open your Awair Home Application
4. Click one of your sensors and press Awair+, Awair APIs Beta, Cloud API, Get API Token
5. Once you have clicked the Get API Token you will be able to insert the AWAIR HOME Credentials. Then you will be able to grab the token (ex: eyJ0......)
5. Once you got it insert it into the "Add sensor" section (into the search bar).
6. Search
7. Press "Add your token"
8. Repeat from step 3 for EACH awair account you own
9. Finish!


## Installation
Since the project is not yet approved by PlanetWatch Company, the software is basically only fetching data from Awair's servers. For the time being we discourage any usage of this project until PlanetWatch approves and shares the endpoints where to write our data.

If you still want to install this tool, just run clone the repository and run the following commands:
```sh
npm install
npm start
```

If you want to create a standalone version of Awair-uploader, run the following commands:
```sh
npm run make
```

## Contributing

The project was developed on MacOS and the building section is only for MacOS. Feel free to contribute to the project by adding your distro building section (Windows/Linux) with a Pull Request. 

We will appreciate any help to improve of the code.