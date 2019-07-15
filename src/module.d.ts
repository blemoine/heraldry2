import { ResizableProps } from 'react-resizable';

declare module 'react-resizable' {
  interface ResizableProps {
    resizeHandles?: Array<'s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'>;
  }
}
