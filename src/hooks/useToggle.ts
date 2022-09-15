import { useState } from 'react';

const useToggle = (initialState = false): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = () => { setState(prevstate => !prevstate); };

  return [state, toggle];
}

export default useToggle;
