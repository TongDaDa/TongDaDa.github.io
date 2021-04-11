---
date: '2020-5-25'
slug: relaunch your application in nwjs
tags:
- native
title: Relaunch application in nwjs
author: Oliver Liu
location: Beijing;
image: https://cdn.pixabay.com/photo/2021/01/21/09/11/mountains-5936682_960_720.jpg
meta:
  - name: title
    content: Relaunch application in nwjs
  - name: description
    content: 重启应用在nwjs中, relaunch application in nwjs.
  - name: keywords
    content: 
  - name: author
    content: 刘彤, Oliver Liu
  - name: language
    content: English
featured: false
---

Nwjs has no lots of interfaces which could help us to use in our application, such as `window-handler`,
`network-proxy`, `relaunch`, and so on...

These functions would be important in some situations, and I exactly met the problem that cannot to relaunch my application
in nwjs after consulted the document of nwjs many times. In the end when I want to give up it, I found a new method to approach it!

First, we need to know that how to spawn a `detached process` in NW application, there has two ways to do it as below.

The first, `childProcess.spawn`, if you try spawning a process using it, it works well, but it just execute some 
commands of corresponding system, and it cannot work with `node script`.

```javascript
function _run (path, args, options) {
              let opts = {
                  detached: true,
                  shell: true,
                  windowsHide: true
              };
              for(let key in options){
                  opts[key] = options[key];
              }
              return spawn(path, args, opts);
}

 function  platFormRunApp(platform, appPath, args = [], options = {}) {
        if (platform === 'darwin') {
            return _run(`open ${appPath}`, args, options)
        } else {
            return _run(`start`, [appPath], options)
        }
    }
    
    platFormRunApp(process.platform, process.execPath, [])
    nw.App.quit();
```

For the above code, we call the `platFormRunApp` function after quitting the application, and then the second launching will start.
Totally, it works fine when we only use the `original command`. 

Sometimes, we want to execute some node scripts since it is flexible and maintainable than executable file in the production environment for nw's application. 
`childProcess.fork` is the second method.  it can execute `node script` after the main process was quitted. So you can maintain a 
`task queue` stored in the disk and start forking it before you call `nw.App.quit()`.

```javascript
 const rootCachingPath = path.join(process.execPath, "..");

function forkerProcess() {
  const { fork } = require("child_process");
      const trackingListServerCB = fork(
        path.join(rootCachingPath, "./pool.js"),
        [],
        {
          detached: true,
          env: {
            appRootPath,
            ...process.env
          }
        }
      );
      trackingListServerCB.on("error", error => {
        console.log(error);
      });
      trackingListServerCB.on("message", message => {
        switch (message.type) {
          case "log":
            message.logs.unshift("trackingListServerCB log:");
            console.log.apply(console, message.logs);
        }
      });
      console.log(`persistenProcessPoolCP pid: ${trackingListServerCB.pid}`);
      return trackingListServerCB;
}

global.persistenProcessPoolCP = forkerProcess();

function rejectPersistentTask(newTask, taskTypeKeyStr) {
    const fsExtra = require("fs-extra");
  	const taskFilePath = path.join(rootCachingPath, "tasks_regulation");
  	fsExtra.ensureFileSync(taskFilePath);
  	const readFile = () => {
  		const taskFileJSONMap = fs.readFileSync(taskFilePath).toString();
  		if (!taskFileJSONMap) {
  			fs.writeFileSync(taskFilePath, JSON.stringify({ [taskTypeKeyStr]: [] }));
  			return { [taskTypeKeyStr]: [] };
  		} else {
  			const taskFileMap = JSON.parse(taskFileJSONMap);
  			return taskFileMap;
  		}
  	};
  	const taskMap = readFile();
  	if (!taskMap[taskTypeKeyStr]) {
  		taskMap[taskTypeKeyStr] = [];
  	}
  	taskMap[taskTypeKeyStr].push(newTask);
  	fs.writeFileSync(taskFilePath, JSON.stringify(taskMap));
}

function quitNw() {
   function getExecutionArguments() {
     const execPath = process.execPath;
     if (process.platform === "darwin") {
       const lastIndexApp = execPath.indexOf(".app");
       return ["open", [execPath.slice(0, lastIndexApp + 4)], { shell: true }]
     } else {
       return [execPath, [], { shell: true }]
     }
   }
   
   rejectPersistentTask({ spawnArguments: getExecutionArguments(), name: "relaunch" },  "pureTasks" )
   
   global.persistenProcessPoolCP.send(
     JSON.stringify({ type: "start-exec-local-task" })
   );
   
   nw.App.quit();
}

```

The `rootCachingPath` is a root path of your application which could be different for each platform(above example just be compatible with Window).

Invoking the `quitNw` method if you want to quit your app, but ensure that you has sent the `start-exec-local-task` message,
and the `daemon.js` is reserved in your project where can be packaged in production mode.

The use of `daemon.js` is to execute these tasks of the `tasks_regulation` that you want to run after the man process quitted. 
Below is just to start the application.

```javascript
// daemon.js
const { spawn } = require("child_process");

async function execPureTask(pureTask) {
  return new Promise((resolve, reject) => {
    	const { spawnArguments, name } = pureTask;
    	if (!spawnArguments.length) {
    		return Promise.resolve();
    	}
    	const prefixOfLoggiousPureTasks = `Pure task-${name}`;
    	log(`${prefixOfLoggiousPureTasks}, The arguments of the invoking spawn is, ${spawnArguments.join(",")}`);
    	const onData = (data) => {
    		log(`${prefixOfLoggiousPureTasks}, the outputted data of the pure task is, ${data}`);
    	};
    	const cp = spawn.apply(null, spawnArguments)
      cp.on("data", onData);
    	cp.on("exit", resolve)
  })
}

function receiveProcessMsg(msg) {
  	msg = JSON.parse(msg);
  	switch (msg.type) {
  	  		case "start-exec-local-task":
  	  		  // the readTaskFile is used to read the tasks_regulation file
  	  		  const tasks = readTaskFile();
  	  		  execPureTask(tasks.pop())
  	}
}

```

😄 Above codes is a workaround of restarting `nw` application, and it is not just used in restarting situation, we can do some persistent task
such as tracking user's behaviour, upload a file, although the user has exited the application, but the `daemon.js` can execute these tasks.
