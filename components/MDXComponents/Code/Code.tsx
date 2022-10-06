import { useCopyToClipboard } from '../../../hooks';
import { Prism, type SyntaxHighlighterProps as PrismProps } from 'react-syntax-highlighter';
import CodeStyle from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import { type FC, type DetailedHTMLProps, type HTMLAttributes } from 'react';
import { CopyButton } from '@components/UI';

interface SyntaxHighlighterProps extends PrismProps {
  match: RegExpExecArray;
}

const Code: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
  > = (props) => {
    const { children, ...rest } = props;

    return (
      <code {...rest}>
        {children}
      </code>
    );
  };

const SyntaxHighlighter: FC<SyntaxHighlighterProps> = (props) => {
  const { children, match } = props;
  const { copy, isCopied } = useCopyToClipboard('Copied');
  const handleCopy = () => copy(children as string);

  return (
    <>
      <div className="w-full relative">
        <CopyButton
          isCopied={isCopied as boolean}
          handleCopy={handleCopy}
          className="absolute right-0 mr-2 mt-2"/>
      </div>
      <Prism
        language={match[1]}
        PreTag="div"
        style={CodeStyle}>
        {children}
      </Prism>
    </>
  );
};

const MDXCode: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
  > = (props) => {
    const { children, className, ...rest } = props;
    const match = /language-(\w+)/.exec(className || '');

    return match ? <SyntaxHighlighter match={match}>
      {children as string}
    </SyntaxHighlighter> : <Code {...rest}>{children}</Code>;
  };

export { Code, SyntaxHighlighter, MDXCode };
