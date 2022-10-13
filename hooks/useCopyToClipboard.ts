import { useState } from 'react';

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean>
type Message = string | null

interface CopyToClipboardReturn {
  copiedText?: CopiedValue;
  copy: CopyFn;
  isError?: boolean;
  isCopied?: boolean;
  isClicked?: boolean;
  message?: Message;
  reset?: () => void;
}

interface CopyToClipboardOptions {
    msg?: Message;
    errorMsg?: Message;
}

const useCopyToClipboard = (
  options?: CopyToClipboardOptions
): CopyToClipboardReturn => {
  const {
    msg = 'Copied to clipboard',
    errorMsg = 'Failed to copy to clipboard'
  } = options || {};
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const [message, setMessage] = useState<Message>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const copy: CopyFn = async text => {
    if (!navigator?.clipboard) {
      setMessage(errorMsg);
      setIsError(true);
      setIsCopied(false);
      setIsClicked(true);
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setMessage(msg);
      setIsCopied(true);
      setIsError(false);
      setIsClicked(true);
      return true;
    } catch (error) {
      setCopiedText(null);
      setMessage(errorMsg);
      setIsCopied(false);
      setIsError(true);
      setIsClicked(true);
      return false;
    }
  };

  const reset = () => {
    setIsCopied(false);
    setIsError(false);
    setIsClicked(false);
  };

  return { copiedText, copy, isCopied, isError, isClicked, message, reset };
};

export default useCopyToClipboard;
