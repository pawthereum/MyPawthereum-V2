import { useState } from 'react'
export const useMultichain = () => {
  const [multichainEnabled, setMultichainEnabled] = useState(false)

  function toggleUseMultichain (toggle) {
    setMultichainEnabled(toggle)
  }

  return { toggleUseMultichain, multichainEnabled }
};

export default useMultichain
