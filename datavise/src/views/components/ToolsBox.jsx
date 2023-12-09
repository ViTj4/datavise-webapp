import { useState } from 'react'

export const ToolsBox = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleClick = () => {
    setIsVisible(!isVisible)
  }
  return (
    <view>
      <button onClick={() => handleClick()}>click</button>
      {isVisible ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100px',
            backgroundColor:'white',
          }}
        >
          <label>camembert</label>
          <label>scatter ploit</label>
          <label>line</label>
        </div>
      ) : (
        <></>
      )}
    </view>
  )
}
