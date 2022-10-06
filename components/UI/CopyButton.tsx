import { DocumentIcon, DocumentCheckIcon } from '@components/icons';
import type { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

interface CopyButtonProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
  > {
    isCopied: boolean;
    handleCopy: () => void;
  }

const CopyButton: FC<CopyButtonProps> = (props) => {
  const { isCopied, handleCopy, className, ...rest } = props;

  return (
    <button
      onClick={handleCopy}
      className={`border rounded p-1
        ${className} ${ isCopied && 'border-green-300' }`}>
      {
        isCopied ? (
          <DocumentCheckIcon className="w-4 h-4 text-green-300" />
        ) : (
          <DocumentIcon className="w-4 h-4 text-white" />
        )
      }
    </button>
  );
};

export default CopyButton;
