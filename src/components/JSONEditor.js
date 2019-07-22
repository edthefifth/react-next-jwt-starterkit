import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

import React, { Component } from 'react';

class JSONEditor extends Component {
    render() {
        return (
            <Editor
                value={this.props.json}
                onChange={this.props.handleChange}
            />
        );
    }
}

export default JSONEditor;