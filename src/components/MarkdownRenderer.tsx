import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Copy, Check, Terminal } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-none text-slate-200 text-[15px] leading-relaxed break-words space-y-3">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Custom heading styling
          h1: ({ ...props }) => (
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-white mt-5 mb-2 pb-1 border-b border-slate-700/60" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-lg sm:text-xl font-semibold font-heading text-indigo-300 mt-4 mb-2" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-base sm:text-lg font-medium font-heading text-indigo-200 mt-3 mb-1" {...props} />
          ),
          // Paragraphs
          p: ({ ...props }) => <p className="mb-2 leading-relaxed text-slate-200" {...props} />,
          // Strong
          strong: ({ ...props }) => <strong className="font-semibold text-white bg-indigo-500/10 px-1 rounded" {...props} />,
          // Lists
          ul: ({ ...props }) => <ul className="list-disc pl-5 space-y-1.5 my-2.5 text-slate-200" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal pl-5 space-y-1.5 my-2.5 text-slate-200" {...props} />,
          li: ({ ...props }) => <li className="pl-0.5 leading-relaxed" {...props} />,
          // Blockquote
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-4 border-indigo-500 bg-indigo-950/30 px-4 py-2 my-3 rounded-r-lg text-slate-300 italic"
              {...props}
            />
          ),
          // Tables
          table: ({ ...props }) => (
            <div className="my-4 overflow-x-auto rounded-xl border border-slate-700/80 shadow-md">
              <table className="min-w-full divide-y divide-slate-700 text-sm text-left" {...props} />
            </div>
          ),
          thead: ({ ...props }) => <thead className="bg-slate-800/90 text-indigo-200 font-semibold" {...props} />,
          tbody: ({ ...props }) => <tbody className="divide-y divide-slate-800 bg-slate-900/60" {...props} />,
          tr: ({ ...props }) => <tr className="hover:bg-slate-800/40 transition-colors" {...props} />,
          th: ({ ...props }) => <th className="px-3.5 py-2.5 text-left font-semibold" {...props} />,
          td: ({ ...props }) => <td className="px-3.5 py-2.5 text-slate-300 align-top" {...props} />,
          // Code & Syntax
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !String(children).includes('\n');
            const codeString = String(children).replace(/\n$/, '');

            if (isInline) {
              return (
                <code
                  className="bg-slate-800/90 text-indigo-300 px-1.5 py-0.5 rounded text-[13px] font-mono border border-slate-700/50"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return <CodeBlock language={match ? match[1] : ''} code={codeString} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const CodeBlock: React.FC<{ language: string; code: string }> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3.5 rounded-xl border border-slate-700/80 bg-slate-950/90 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span>{language || 'code'}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Copia codice"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copiato!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copia</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3.5 overflow-x-auto text-[13px] font-mono text-slate-200 leading-relaxed selection:bg-indigo-600/30">
        <code>{code}</code>
      </pre>
    </div>
  );
};
