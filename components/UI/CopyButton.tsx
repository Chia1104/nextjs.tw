import { useCopyToClipboard, useTimeout } from '../../hooks';
import { DocumentIcon, DocumentCheckIcon } from '@components/icons';
import type { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

interface CopyButtonProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
  > {
    value: string;
    msg?: string;
    errorMsg?: string;
    timeout?: number;
  }

const CopyButton: FC<CopyButtonProps> = (props) => {
  const { value, msg, errorMsg, className, timeout = 2000, ...rest } = props;
  const {
    copy,
    isCopied,
    isError,
    isClicked,
    message,
    reset,
  } = useCopyToClipboard({ msg, errorMsg });
  useTimeout(reset as (() => void), isClicked ? timeout : null);
  const handleCopy = () => copy(value);

  return (
    <button
      name="copy"
      aria-label="copy"
      onClick={handleCopy}
      className={`rounded p-1 hover:bg-light/80 focus:outline-none group
        transition-all duration-300 ${className} 
        ${ isCopied && 'hover:bg-success/80'}
        ${ isError && 'hover:bg-error/80'}`}
      {...rest}>
      {
        isCopied ? (
          <DocumentCheckIcon
            className="w-4 h-4 text-white group-hover:text-dark" />
        ) : (
          <DocumentIcon className="w-4 h-4 text-white group-hover:text-dark" />
        )
      }
    </button>
  );
};

export default CopyButton;
