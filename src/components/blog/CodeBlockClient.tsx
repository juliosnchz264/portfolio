'use client';

import { useTranslations } from 'next-intl';

interface CodeBlockProps {
  children: string;
  className?: string;
  filename?: string;
}

export default function CodeBlockClient({ children, className, filename }: CodeBlockProps) {
  const t = useTranslations('sections.blog.code_block');
  const language = className?.replace('language-', '') || 'text';

  return (
    <div className="code-block bg-bg-code-block border-border-subtle my-6 overflow-hidden rounded-lg border">
      {filename && (
        <div className="code-header bg-bg-secondary border-border-subtle flex items-center justify-between border-b px-4 py-2">
          <span className="code-filename text-text-muted font-mono text-sm">{filename}</span>
          <button
            className="code-copy border-border-subtle hover:bg-gopher-blue hover:border-gopher-blue hover:text-bg-primary rounded border px-2 py-1 font-mono text-xs transition-all"
            onClick={() => navigator.clipboard.writeText(children)}
          >
            {t('copy')}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto p-4">
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
}
