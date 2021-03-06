import React, { Component, PropTypes } from 'react'
import { ipcRenderer } from 'electron'
import Codemirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/dialog/dialog'
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/searchcursor'
import 'codemirror/addon/search/jump-to-line'
import toMarkdown from 'to-markdown'
import marked from 'marked'

class MarkdownEditor extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      value: toMarkdown(props.value)
    }

    this.handleFinishUploadFile = this.handleFinishUploadFile.bind(this)
  }

  componentWillMount() {
		ipcRenderer.on("finish-add-file", this.handleFinishUploadFile)
	}

	componentWillUnmount() {
		ipcRenderer.removeListener("finish-add-file", this.handleFinishUploadFile)
	}

  handleFinishUploadFile(e, fileUrl) {
		const { editor } = this.refs
		console.log("finishUploadFile", fileUrl)
		let cm = editor.getCodeMirror()
		let CodeMirror = editor.getCodeMirrorInstance()
		cm.replaceRange("![](" + fileUrl + ")", CodeMirror.Pos(cm.getCursor().line))
	}

  getContent() {
    const { value } = this.state
    return marked(value)
  }

  handleChangeContent(value) {
    this.setState({
      value: value
    })
  }

  render() {
    const { value } = this.state

    let options = {
			lineNumbers: false,
			lineWrapping: true,
			mode: 'markdown',
			theme:'default'
    }

		return (
			<Codemirror ref="editor" options={options} value={value}
				onChange={this.handleChangeContent.bind(this)} />
		)
  }
}

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired
}

export default MarkdownEditor
