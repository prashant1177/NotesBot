import Button from "../../ui/Button/Button";

export default function ErrorByAI({thinking,handleAskAi,debug,ErrorFix}){

    return (
        <div className="w-full p-8 flex items-center gap-4 flex-col">
              <div dangerouslySetInnerHTML={{ __html:ErrorFix }}/>
      
              {debug && (
                <div className="flex w-full justify-center">
                  <Button onClick={handleAskAi}>
                    {thinking ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Thinking...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Error Assistant
                      </div>
                    )}
                  </Button>
                </div>
              )}
            </div>
    )
}


export const generateFormattedHtml = (text) => {
    // Parse the error text
    const lines = text.split('\n');
    const errorMatch = lines[0].match(/^Error:\s*(.+)$/);
    const lineMatch = lines[1]?.match(/^Line:\s*(.+)$/);
    const causeMatch = lines[2]?.match(/^Cause:\s*(.+)$/);
    
    // Find the fix section
    const fixIndex = lines.findIndex(line => line.startsWith('Fix:'));
    const fixContent = fixIndex !== -1 ? lines.slice(fixIndex).join('\n').replace(/^Fix:\s*/, '') : '';
    
    const error = errorMatch ? errorMatch[1] : '';
    const line = lineMatch ? lineMatch[1] : '';
    const cause = causeMatch ? causeMatch[1] : '';
    
    // Process the fix content to handle code blocks and inline code
    const processText = (text) => {
      return text
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
          const langLabel = lang ? `<div className="bg-gray-800 px-3 py-1 text-xs text-gray-300 font-mono">${lang}</div>` : '';
          return `<div className="my-3"><div className="bg-gray-900 rounded-md overflow-hidden">${langLabel}<pre className="p-3 text-sm text-green-400 font-mono overflow-x-auto"><code>${code.trim()}</code></pre></div></div>`;
        })
        .replace(/`([^`]+)`/g, '<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-red-600">$1</code>');
    };
    
    return `
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg className="text-red-500 flex-shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 9v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="m12 17 .01 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div className="flex-1">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Error: ${error}</h2>
              ${line ? `<div className="text-sm text-red-700 mb-2"><span className="font-medium">Line:</span> ${line}</div>` : ''}
            </div>
            ${cause ? `<div className="mb-4"><h3 className="font-medium text-red-800 mb-1">Cause:</h3><p className="text-red-700 text-sm leading-relaxed">${cause}</p></div>` : ''}
            ${fixContent ? `<div><h3 className="font-medium text-red-800 mb-2">Fix:</h3><div className="text-red-700 text-sm leading-relaxed">${processText(fixContent)}</div></div>` : ''}
          </div>
        </div>
      </div>
    `;
  };
