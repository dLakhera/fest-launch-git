ThreeJs Script for 3D model Website
===================================
Fest theme launch portal - Abhyuday Social Fest 2k20

Starting the terminal
---------------------

Click the **Applications** folder in your dock, then **Utilities**, then **Terminal**. You'll be faced with something that looks a little like this:

```
$
```

Follow these commands in Order
------------------------------

1. First check if you have nodejs installed. For that, type this after the dollar sign and hit enter:

```
$ node -v
```
2. If something like ``` v14.8.0``` is not returned then follow as below, else skip this step

```
$ sudo apt-get install nodejs
```

3. From your project directory run

```
$ npm init
$ npm install 
$ npm install lite-server --save-dev
$ npm install three --save-dev
```

4. Fire up the lite-server using ``` $ npm start``` after making the following changes to your package.json file
* add this to 'scripts' field in the json above 'test' 
``` json
"start":"npm run lite",
```
and this below 'test'
```json
"lite":"lite-server"
```



