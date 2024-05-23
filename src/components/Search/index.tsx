import { useEffect, useState } from 'react'
import useDebounce from '~/hooks/useDebounce'

type Props = {
  search: string
  callBack: (text: string) => void
}
export default function Search(props: Props) {
  const { search, callBack } = props
  const [inputValue, setInputValue] = useState(search)
  const debouncedValue: string = useDebounce(inputValue, 1000)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  useEffect(() => {
    callBack(debouncedValue)
  }, [debouncedValue])
  return (
    <div className='form-row align-items-center'>
      <div className='col-auto'>
        <label className='sr-only' htmlFor='inlineFormInput'>
          Name
        </label>
        <input
          type='text'
          className='form-control mb-2'
          id='inlineFormInput'
          placeholder='Type to search...'
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}
