import { useState } from 'react';

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean>
type Message = string | null

interface CopyToClipboardReturn {
  copiedText?: CopiedValue;
  copy: CopyFn;
  isError?: boolean;
  isCopied?: boolean;
  message?: Message;
}

const useCopyToClipboard = (
  msg?: Message, errorMsg?: Message
): CopyToClipboardReturn => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const [message, setMessage] = useState<Message>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copy: CopyFn = async text => {
    if (!navigator?.clipboard) {
      setMessage(errorMsg || 'Failed to copy to clipboard');
      setIsError(true);
      setIsCopied(false);
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setMessage(msg || 'Copied to clipboard');
      setIsCopied(true);
      setIsError(false);
      return true;
    } catch (error) {
      setCopiedText(null);
      setMessage(errorMsg || 'Failed to copy to clipboard');
      setIsCopied(false);
      setIsError(true);
      return false;
    }
  };

  return { copiedText, copy, isCopied, isError, message };
};

export default useCopyToClipboard;
