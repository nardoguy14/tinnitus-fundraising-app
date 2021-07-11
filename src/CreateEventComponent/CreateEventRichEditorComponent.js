import React from "react";
import {Editor, EditorState, getDefaultKeyBinding, RichUtils, convertToRaw, convertFromRaw} from "draft-js";
import {InlineStyleControls, BlockStyleControls} from './Controls'
import './RichEditor.css'

import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import axios from 'axios';
import { FormText, Form } from 'react-bootstrap';
import 'draft-js/dist/Draft.css';
import TokenService from "../lib/tokenService";
import {editUser} from "../lib/apiRequestor";


export class CreateEventRichEditorComponent extends React.Component {
    constructor(props) {
        super(props);

        var state = null
        state = EditorState.createEmpty()

        this.state = {
            editorState: state
        };

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => {
            const contentState = editorState.getCurrentContent();
            console.log('content state', convertToRaw(contentState))

            var body = {
                description: JSON.stringify(convertToRaw(contentState))
            }

            this.props.setDescription(body)
            this.setState({editorState})
        };

        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.savedEditorState !== this.props.savedEditorState && this.props.savedEditorState !== null) {
            this.setState({editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.savedEditorState)))})
        }
    }



    styleMap = {
        CODE: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 2,
        },
    }

    getBlockStyle(block) {
        switch (block.getType()) {
            case 'blockquote': return 'RichEditor-blockquote';
            default: return null;
        }
    }

    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4, /* maxDepth */
            );
            if (newEditorState !== this.state.editorState) {
                this.onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    render() {
        const {editorState} = this.state;
        var controls = null
        var className = null
        className = 'RichEditor-editor'
        controls = (
            <div>
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
            </div>
        )

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        console.log(editorState)
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <div className="RichEditor-root">
                {controls}
                <div className={className} onClick={this.focus}>
                    <Editor
                        blockStyleFn={this.getBlockStyle}
                        customStyleMap={this.styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        keyBindingFn={this.mapKeyToEditorCommand}
                        onChange={this.onChange}
                        placeholder="Nothing here yet!"
                        ref="editor"
                        spellCheck={true}
                    />
                </div>
            </div>
        );
    }
}
