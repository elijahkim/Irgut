// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"
import {Socket, LongPoller} from "phoenix"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
import React from "react"
import ReactDOM from "react-dom"
import CodeMirror from "react-codemirror"
import 'codemirror/lib/codemirror'

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {code: "// Code"}
    this.updateCode = this.updateCode.bind(this)
  }

  componentDidMount() {
    let socket = new Socket("/socket", {
      logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) })
    })

    socket.connect({user_id: "123"})
    let channel = socket.channel("room:lobby")
    channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })

    channel.on("new:msg", msg => {
      console.log("Ping")
    })
  }

  updateCode(newCode) {
    this.setState({ code: newCode });
  }

  render() {
    var options = { lineNumbers: true };
    return <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
  }
}

ReactDOM.render(
  <HelloWorld/>,
  document.getElementById("irgut")
)
