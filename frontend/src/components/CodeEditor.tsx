import Editor from '@monaco-editor/react';
import { useSessionStore } from '../store/sessionStore';

interface CodeEditorProps {
  sessionId: string;
  role: 'presenter' | 'spectator';
  onCodeChange?: (code: string) => void;
}

export const CodeEditor = ({ sessionId, role, onCodeChange }: CodeEditorProps) => {
  const { code, language } = useSessionStore();
  const isReadOnly = role === 'spectator';

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && onCodeChange) {
      onCodeChange(value);
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <span className="session-id">Session: {sessionId}</span>
        <span className={`role-badge ${role}`}>
          {role === 'presenter' ? '👨‍💻 Presenter' : '👁️ Spectator'}
        </span>
      </div>
      <Editor
        height="calc(100vh - 60px)"
        language={language}
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          readOnly: isReadOnly,
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};
