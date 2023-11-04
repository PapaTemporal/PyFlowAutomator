# PyFlowAutomatorCore

PyFlowAutomator is a web-based visual scripting UI for the PyFlowAutomatorCore engine. It's built to handle the needs of both individual users and enterprises, and can be deployed horizontally or vertically to scale with your environment. Its core purpose is to enable users to write scripts remotely through a user-friendly UI, and with the PyFlowAutomatorCore REST backend its easy to automate runbooks, act as a first responder to alerts or incidents, and more. You can use any functions in any Python package or create custom functions to run on the backend and create the corresponding nodes in the frontend, making it highly extendable.

## Usage

To use the PyFlowAutomator, just run the UI with `npm run dev` or build it for production with `npm run build` and run it that way.

PyFlowAutomator uses [@xyflow](https://reactflow.dev/) (formerly reactflow) so the same rules apply with a few modifications.

Note: old view, will update soon
![work area image](static/usage.png)

#### running a flow

With the backend running, the easiest way to run a flow is to open the Live Run window under the Flow menu. Press the start button and the results of each step will show up in the terminal-like view.
Another way is to copy the the flow to clipboard and put it into a json file and then use the script method of PyFlowAutomatorCore.

```
PyFlowAutomatorCore
usage: run.py [-h] [--http] [--script SCRIPT] [--host HOST] [--port PORT] [--reload] [--stdout] [--out OUT]

Run the application.

options:
  -h, --help       show this help message and exit
  --http           Run the HTTP server.
  --script SCRIPT  Run a Python script instead of the server. Provide the file path.
  --host HOST      The host to bind to for http and ws servers. Default is localhost.
  --port PORT      The port to bind to for http and ws servers. Default is 8000.
  --reload         Reloads on code change. Only available with --http. (BROKEN)
  --stdout         Prints the function call and results to stdout.
  --out OUT        Filepath to save results to. Only available with --script.

Examples: 
python run.py --http --host 0.0.0.0 --port 8080 --stdout
python run.py --script my_script.py --out my_saved_results.json --stdout
```

## Examples

From the UI go to the File menu and select to load the sample flow (won't look pretty at the moment because I made changes to the UI, but it will run) and then run using the live run window.

## License

PyFlowAutomatorCore © 2023 by Abinadi Cordova is licensed under CC BY-NC-SA 4.0. To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/