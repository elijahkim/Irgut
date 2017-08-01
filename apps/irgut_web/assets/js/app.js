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
import CodeMirror from 'react-codemirror2'
import Return from "./components/Return"
import 'codemirror-mode-elixir'

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.channel;
    this.state = {
      code: "foo = fn -> IO.inspect \"HELLO\" end",
      return: "",
    }
    this.updateCode = this.updateCode.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    let socket = new Socket("/socket", {
      logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) })
    })

    const roomId = window.location.href.split("/")[4]

    socket.connect({user_id: "123"})
    this.channel = socket.channel(`room:${roomId}`)
    this.channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })

    this.channel.on("editor:return", msg => {
      this.setState({return: msg.body})
    })

    this.channel.on("editor:updated", msg => {
      this.setState({code: msg.body})
    })
  }

  updateCode(newCode) {
    this.channel.push("editor:update", {code: newCode})
  }

  handleButtonClick() {
    const { code } = this.state;
    this.channel.push("editor:evaluate", {code: code});
  }

  handleKeyPress(event) {
    if(event.key === "Enter" && event.metaKey) {
      this.handleButtonClick();
    }
  }

  render() {
    let { code } = this.state;

    return (
      <div className="container" onKeyDown={this.handleKeyPress}>
        <div className="editor">
          <CodeMirror
            value={this.state.code}
            onValueChange={(editor, metadata, newCode) => this.updateCode(newCode)}
            options={{
              lineNumbers: true,
              smartIndent: true,
              tabSize: 2,
              mode: "elixir",
            }}
          />
          <button onClick={() => this.handleButtonClick()}>
            Run
          </button>
        </div>
        <Return body={this.state.return} />
      </div>
    )
  }
}

ReactDOM.render(
  <HelloWorld/>,
  document.getElementById("irgut")
)
