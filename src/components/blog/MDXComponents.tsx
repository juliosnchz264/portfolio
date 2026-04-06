import { AnchorHTMLAttributes, HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';

import CodeBlockClient from '@/components/blog/CodeBlockClient';
import { slugify } from '@/lib/blog/utils';
import { cn } from '@/lib/utils';
import { MDXComponents as MDXComponentsType } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

// Type definitions for HTML elements with proper props
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children: ReactNode;
}

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  title?: string;
}

interface CodeProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

interface ListProps extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  children: ReactNode;
}

interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

interface BlockquoteProps extends HTMLAttributes<HTMLQuoteElement> {
  children: ReactNode;
}

interface PreProps extends HTMLAttributes<HTMLPreElement> {
  children: ReactNode;
}

// Custom components for MDX content

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: ReactNode;
}

function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info: 'bg-info-bg border-info-border',
    warning: 'bg-warning-bg border-warning-border',
    error: 'bg-error-bg border-error-border',
    success: 'bg-success-bg border-success-border',
  };

  const icons = {
    info: 'ℹ',
    warning: '⚠',
    error: '✕',
    success: '✓',
  };

  return (
    <div className={`callout my-6 rounded-lg border p-4 ${styles[type]}`}>
      {title && (
        <div className="callout-title mb-2 flex items-center gap-2 text-sm font-semibold">
          <span>{icons[type]}</span>
          {title}
        </div>
      )}
      <div className="callout-content text-sm leading-relaxed">{children}</div>
    </div>
  );
}

// CodeBlock is now a client component in CodeBlockClient.tsx

interface TerminalOutputProps {
  children: ReactNode;
}

function TerminalOutput({ children }: TerminalOutputProps) {
  return (
    <div className="terminal-output bg-bg-code-block border-border-subtle my-6 rounded-lg border p-4 font-mono">
      {children}
    </div>
  );
}

interface FileTreeProps {
  children: ReactNode;
}

function FileTree({ children }: FileTreeProps) {
  return (
    <div className="file-tree bg-bg-code-block border-border-subtle my-6 rounded-lg border p-4">
      <pre className="tree-content text-text-secondary m-0 font-mono text-sm leading-relaxed">{children}</pre>
    </div>
  );
}

// Main MDX components mapping
export const MDXComponents: MDXComponentsType = {
  // Override default HTML elements
  h1: ({ children, ...props }: HeadingProps) => (
    <h1 className="text-text-primary mt-8 mb-6 text-3xl font-light first:mt-0" {...props}>
      {children}
    </h1>
  ),

  h2: ({ children, ...props }: HeadingProps) => {
    const id = typeof children === 'string' ? slugify(children) : undefined;

    return (
      <h2
        id={id}
        className="text-text-primary border-border-subtle mt-8 mb-4 border-b pb-2 text-2xl font-light"
        {...props}
      >
        {children}
      </h2>
    );
  },

  h3: ({ children, ...props }: HeadingProps) => {
    const id = typeof children === 'string' ? slugify(children) : undefined;

    return (
      <h3
        id={id}
        className="text-text-primary mt-6 mb-3 text-xl font-light"
        {...props}
      >
        {children}
      </h3>
    );
  },

  p: ({ children, ...props }: ParagraphProps) => (
    <p className="text-text-secondary mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),

  a: ({ href, children, ...props }: LinkProps) => {
    // Internal links
    if (href?.startsWith('/')) {
      return (
        <Link
          href={href}
          className="text-gopher-blue hover:text-gopher-blue-hover underline transition-colors"
          {...props}
        >
          {children}
        </Link>
      );
    }

    // Anchor links
    if (href?.startsWith('#')) {
      return (
        <a
          href={href}
          className="text-gopher-blue hover:text-gopher-blue-hover underline transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }

    // External links
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gopher-blue hover:text-gopher-blue-hover underline transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  },

  img: ({ src, alt, title, width, height, ...props }: ImageProps) => (
    <figure className="figure my-8">
      <Image
        src={src}
        alt={alt}
        width={typeof width === 'number' ? width : 800}
        height={typeof height === 'number' ? height : 400}
        className="figure-image border-border-subtle w-full rounded-lg border"
        {...props}
      />
      {title && (
        <figcaption className="figure-caption text-text-muted mt-3 text-center text-sm italic">
          {title}
        </figcaption>
      )}
    </figure>
  ),

  code: ({ children, ...props }: CodeProps) => (
    <code className="bg-bg-tertiary text-gopher-blue rounded px-1.5 py-0.5 font-mono text-sm" {...props}>
      {children}
    </code>
  ),

  pre: ({ children, ...props }: PreProps) => (
    <pre
      className="bg-bg-code-block border-border-subtle my-6 overflow-x-auto rounded-lg border p-4 font-mono text-sm"
      {...props}
    >
      {children}
    </pre>
  ),

  ul: ({ children, ...props }: ListProps) => (
    <ul className="text-text-secondary mb-4 list-inside list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: ListProps) => (
    <ol className="text-text-secondary mb-4 list-inside list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }: ListItemProps) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),

  blockquote: ({ children, ...props }: BlockquoteProps) => (
    <blockquote
      className="border-gopher-blue text-text-secondary my-6 border-l-4 py-2 pl-6 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  hr: (props: HTMLAttributes<HTMLHRElement>) => <hr className="border-border-subtle my-8" {...props} />,

  // Custom components
  Callout,
  CodeBlock: CodeBlockClient,
  TerminalOutput,
  FileTree,

  // Layout components
  Grid: ({ children, cols = 2 }: { children: ReactNode; cols?: number }) => {
    const gridColsMap: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
    };

    return (
      <div
        className={cn(
          'grid my-8 gap-6',
          gridColsMap[cols] || gridColsMap[2]
        )}
      >
        {children}
      </div>
    );
  },
};
